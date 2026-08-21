# Deploying to cv.emilaugustynowicz.pl

This repo now builds into a static site served by nginx in Docker. You have an
existing Caddy container on the server, so this new container just needs to
join the same Docker network and get one routing entry in Caddy.

## 1. Copy these files to the server

```
Dockerfile
.dockerignore
docker/nginx.conf
docker-compose.yml
```

(or `git pull` if this repo is already on the server).

## 2. Find your existing Caddy network

```bash
docker inspect <caddy_container_name> --format '{{json .NetworkSettings.Networks}}'
```

Edit `docker-compose.yml` and set `networks.caddy_net.name` to that network's
actual name (rename the alias too if you'd rather call it something else).

## 3. Point Caddy at the new container

Which of these applies depends on how your Caddy is set up — pick one:

**A. Caddyfile mounted into the Caddy container**
Add this block to the `Caddyfile` and reload/restart Caddy:

```
cv.emilaugustynowicz.pl {
    reverse_proxy portfolio:80
}
```

(`portfolio` is the container name from `docker-compose.yml`; Caddy resolves
it via Docker DNS as long as both containers share the network.)

**B. caddy-docker-proxy (label-based routing)**
Uncomment the `labels:` block already in `docker-compose.yml` — no Caddyfile
edit needed, it picks up new containers automatically.

## 4. Build and start

```bash
docker compose up -d --build
```

## 5. DNS

Add an **A record**: `cv` → `57.128.218.231` (same IP `emilaugustynowicz.pl`
already resolves to), or a CNAME to `emilaugustynowicz.pl` if you prefer.
Caddy will provision the Let's Encrypt certificate for
`cv.emilaugustynowicz.pl` automatically on first request once DNS resolves.

## 6. Verify

```bash
curl -I https://cv.emilaugustynowicz.pl
```

Should return `200 OK` with the site's HTML.
