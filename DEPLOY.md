# Deploying to cv.emilaugustynowicz.pl

## Automated (CI/CD)

`.github/workflows/ci-cd.yml` runs on every push/PR: lint, typecheck, build,
unit tests (Vitest), and e2e tests (Playwright). On a push to `master`, once
those pass, it deploys automatically over SSH.

The deploy step SSHes into the server and runs, inside the existing repo
checkout at `DEPLOY_PATH`:

```bash
git fetch origin master
git reset --hard origin/master
docker compose up -d --build --remove-orphans
docker image prune -f
```

Then it polls `https://cv.emilaugustynowicz.pl` for a `200 OK` as a smoke test.

### One-time setup

1. On the server, make sure the repo is already cloned somewhere (matching
   step 1 below) and that `docker compose` works there manually at least once.
2. Generate a dedicated deploy key and add the **public** half to the
   server's `~/.ssh/authorized_keys` for the deploy user:

   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key -N ""
   ```

3. In the GitHub repo → **Settings → Secrets and variables → Actions**, add:
   - `SSH_HOST` — `57.128.218.231`
   - `SSH_USER` — the deploy user on the server
   - `SSH_PRIVATE_KEY` — contents of `deploy_key` (the private half)
   - `SSH_PORT` — only if not port 22
   - `DEPLOY_PATH` — absolute path to the repo checkout on the server, e.g.
     `/home/<user>/portfolio_react_ts`
4. Push to `master` — the **Deploy to production** job in the Actions tab
   shows the run.

The deploy user needs permission to run `docker` (in the `docker` group) and
write access to `DEPLOY_PATH`.

## Manual

This repo now builds into a static site served by nginx in Docker. You have an
existing Caddy container on the server, so this new container just needs to
join the same Docker network and get one routing entry in Caddy.

### 1. Copy these files to the server

```text
Dockerfile
.dockerignore
docker/nginx.conf
docker-compose.yml
```

(or `git pull` if this repo is already on the server).

### 2. Network

Already resolved: the existing Caddy container (`strona_portfolio-caddy-1`)
sits on the `strona_portfolio_default` network, and `docker-compose.yml` is
already set to join it — nothing to change here.

### 3. Point Caddy at the new container

Which of these applies depends on how your Caddy is set up — pick one:

**A. Caddyfile mounted into the Caddy container**
Add this block to the `Caddyfile` and reload/restart Caddy:

```caddyfile
cv.emilaugustynowicz.pl {
    reverse_proxy portfolio:80
}
```

(`portfolio` is the container name from `docker-compose.yml`; Caddy resolves
it via Docker DNS as long as both containers share the network.)

**B. caddy-docker-proxy (label-based routing)**
Uncomment the `labels:` block already in `docker-compose.yml` — no Caddyfile
edit needed, it picks up new containers automatically.

### 4. Build and start

```bash
docker compose up -d --build
```

### 5. DNS

Add an **A record**: `cv` → `57.128.218.231` (same IP `emilaugustynowicz.pl`
already resolves to), or a CNAME to `emilaugustynowicz.pl` if you prefer.
Caddy will provision the Let's Encrypt certificate for
`cv.emilaugustynowicz.pl` automatically on first request once DNS resolves.

### 6. Verify

```bash
curl -I https://cv.emilaugustynowicz.pl
```

Should return `200 OK` with the site's HTML.
