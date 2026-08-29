---
name: ci-cd
description: >-
  Design, write, and debug CI/CD pipelines for GitHub Actions and GitLab CI/CD.
  Use when adding or changing a pipeline (.github/workflows/*.yml,
  .gitlab-ci.yml), wiring build/test/deploy stages, setting up caching,
  matrix builds, secrets/OIDC, environments, SSH or registry deploys, or
  translating a pipeline between GitHub Actions and GitLab.
---

# CI/CD: GitHub Actions & GitLab CI/CD

A pipeline has one job: turn every push into a fast, trustworthy verdict, and
turn every green push to the release branch into a deployed artifact — with no
manual steps in between.

## Mental model (applies to both platforms)

1. **Stages run in order, jobs in a stage run in parallel.** Split work so the
   cheap, fast checks (lint, typecheck, unit) fail before the expensive ones
   (e2e, build images, deploy).
2. **Every job starts from a clean runner.** Nothing survives between jobs
   except what you explicitly cache or pass as an artifact.
3. **Deploy is gated, not automatic-by-accident.** Restrict it to the release
   branch + `push` event, put it behind a protected environment, and make it
   idempotent (safe to re-run).
4. **A pipeline you can't read in 30 seconds is a liability.** Prefer a short
   linear file with clear job names over clever DRY.

## Decision guide

| Situation | Do this |
| --- | --- |
| Same steps across Node/Python/OS versions | Matrix build |
| Slow `npm ci` / `pip install` every run | Cache the package manager's store, keyed on the lockfile hash |
| Build output needed by a later job | Upload/download as an artifact (not cache) |
| Deploy to cloud (AWS/GCP/Azure) | OIDC federation — no long-lived keys |
| Deploy to a VPS you own | SSH with a dedicated deploy key in a secret |
| Deploy to a container registry | Registry login action/service + buildx/kaniko |
| Steps must not run on forks / Dependabot | Guard with an `if:` / `rules:` on the actor or event |
| Secret needed only at deploy | Scope it to the environment, not the whole repo |

---

## GitHub Actions

### Anatomy

```yaml
name: CI/CD
on:
  push:
    branches: ["**"]
  pull_request:
    branches: [main]

concurrency:                       # cancel superseded runs on the same ref
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:                       # least privilege; add only what a job needs
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: npm }   # built-in dep caching
      - run: npm ci
      - run: npm run lint
      - run: npm test

  deploy:
    needs: test                    # ordering + "only if test passed"
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production        # protection rules, required reviewers, env secrets
    steps:
      - run: ./deploy.sh
```

### Things that bite people

- **Pin actions** to a major tag (`@v4`) at minimum; pin to a full SHA for
  anything security-sensitive. `@master` is a supply-chain risk.
- **`GITHUB_TOKEN` defaults vary.** Set `permissions:` explicitly at the
  workflow or job level; start from `contents: read`.
- **`pull_request` from a fork** has a read-only token and no secrets. Use
  `pull_request_target` only with extreme care (it runs your base branch's
  workflow with secrets against untrusted code).
- **Caching ≠ artifacts.** `actions/cache` is best-effort and scoped by key +
  branch; `actions/upload-artifact` is guaranteed and cross-job.
- **`needs:`** controls both order *and* conditional execution. A job with no
  `needs` starts immediately.
- **Matrix:** `strategy.matrix` + `fail-fast: false` to see all failures;
  `max-parallel` to throttle.
- **Reusable workflows** (`uses: ./.github/workflows/x.yml`) for real
  duplication across repos; composite actions for step-level reuse.
- **OIDC:** add `permissions: { id-token: write }` and use the cloud's
  official `configure-aws-credentials` / `auth` action — no stored keys.
- **Secret hygiene:** secrets are masked in logs but not in artifacts or
  outbound requests you make yourself.

### SSH deploy to a VPS

```yaml
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SSH_PORT || 22 }}
          script: |
            set -euo pipefail
            cd "${{ secrets.DEPLOY_PATH }}"
            git fetch origin main && git reset --hard origin/main
            docker compose up -d --build --remove-orphans
            docker image prune -f
```

---

## GitLab CI/CD

### Anatomy

```yaml
stages: [test, build, deploy]

default:
  image: node:20-alpine

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

cache:                             # keyed on the lockfile → shared across jobs
  key:
    files: [package-lock.json]
  paths: [.npm/, node_modules/]

lint:
  stage: test
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run lint

unit:
  stage: test
  script:
    - npm ci --cache .npm --prefer-offline
    - npm test

deploy:
  stage: deploy
  environment:
    name: production
    url: https://example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  script:
    - ./deploy.sh
```

### Things that bite people

- **`rules:` replaced `only/except`.** Use `rules:` — `only/except` is legacy
  and doesn't compose. First matching rule wins; no match = job not created.
- **`workflow:` at the top** decides whether the *whole pipeline* runs. Without
  it you get duplicate pipelines (branch + MR) on every push. Standard guard:
  ```yaml
  workflow:
    rules:
      - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
      - if: '$CI_COMMIT_TAG'
  ```
- **Cache vs artifacts:** `cache:` is best-effort speedup (deps); `artifacts:`
  are guaranteed and auto-passed to later stages. Use `dependencies:` or
  `needs:` to control which artifacts a job pulls.
- **`needs:`** creates a DAG — jobs start as soon as their `needs` finish,
  ignoring stage order. Great for speed; `needs: []` starts a job immediately.
- **Runner tags** (`tags:`) route a job to a specific runner. A job needing a
  tag no runner offers will hang as "pending".
- **Protected variables/environments:** mark deploy secrets *Protected* so
  they're only exposed on protected branches/tags. Mask them too.
- **`services:`** (e.g. `postgres:16`) run as sidecar containers reachable by
  hostname — use for integration tests.
- **`extends:` and YAML anchors** for reuse; `include:` to pull in templates
  or split files across repos.
- **Container builds** without Docker-in-Docker: use Kaniko, or a `dind`
  service with `DOCKER_TLS_CERTDIR`.

### SSH deploy to a VPS

```yaml
deploy:
  stage: deploy
  image: alpine:3.20
  environment: { name: production, url: https://example.com }
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
  before_script:
    - apk add --no-cache openssh-client
    - eval "$(ssh-agent -s)"
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - ssh-keyscan -p "${SSH_PORT:-22}" "$SSH_HOST" >> ~/.ssh/known_hosts
  script:
    - ssh -p "${SSH_PORT:-22}" "$SSH_USER@$SSH_HOST" "
        set -euo pipefail &&
        cd '$DEPLOY_PATH' &&
        git fetch origin main && git reset --hard origin/main &&
        docker compose up -d --build --remove-orphans &&
        docker image prune -f"
```

---

## Translating between the two

| GitHub Actions | GitLab CI/CD |
| --- | --- |
| `jobs.<id>` | top-level job key |
| `runs-on` | `image` + runner `tags` |
| `steps` / `uses` / `run` | `script` (+ `before_script`, `after_script`) |
| `needs` | `needs` (DAG) / `stage` (ordering) |
| `if:` on job/step | `rules:` (job) — no step-level conditionals |
| `strategy.matrix` | `parallel:matrix` |
| `actions/cache` | `cache:` |
| `upload/download-artifact` | `artifacts:` + `dependencies:` / `needs:` |
| `environment:` | `environment:` (name + url + on_stop) |
| repo/org **Secrets** | **CI/CD Variables** (Protected + Masked) |
| `concurrency` | `resource_group` (deploy) / `interruptible` + auto-cancel |
| reusable workflow | `include:` + `extends:` |
| `services:` (in a container job) | `services:` |

## Review checklist before committing a pipeline

- [ ] Fast checks fail before slow ones; total time is acceptable.
- [ ] Deploy is limited to the default branch + `push`/non-MR, behind an
      environment.
- [ ] Deploy is idempotent and has a post-deploy smoke test.
- [ ] Dependency install is cached on the lockfile hash.
- [ ] Actions pinned (GH) / images pinned to a tag, not `latest`.
- [ ] Secrets are scoped as tightly as possible; none echoed to logs.
- [ ] No duplicate pipelines (GL `workflow:` guard / GH `concurrency`).
- [ ] Forked-PR / untrusted contributor runs can't reach secrets.
- [ ] Job names describe what they verify, not how.
