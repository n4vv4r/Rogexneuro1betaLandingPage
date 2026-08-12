# RXos package channel

**URL:** https://www.rogexlaboratories.com/rx-os/packages  
**Format:** `.rxc` (Roxenite app / command source)  
**OS command:** `rx app add <name>` · `rx app search` · `rx app list`

## Layout

| Path | Role |
|------|------|
| `INDEX.json` | Catalog (name, version, desc, sha3, file) |
| `*.rxc` | Package payloads |
| Web UI | https://www.rogexlaboratories.com/rx-os/packages/ |

## Admin (upload / delete without redeploy)

1. In Vercel → Environment Variables set:
   - `RXOS_PACKAGES_ADMIN_SECRET` (or reuse `NEWSPAPER_ADMIN_SECRET`)
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (same as Newspaper)
2. Open https://www.rogexlaboratories.com/rx-os/packages/ → **Admin** panel
3. Paste secret, choose `.rxc`, upload or delete

Dynamic packages are stored in Redis and served at the same path when no static file exists.

## Seed packages (git / deploy)

To pin a package in git (survives Redis wipe):

```bash
# from ROGEX-LABORATORIES/
node tools/sync-rxos-packages.mjs add path/to/app.rxc --desc "…" --version 1.0.0
node tools/sync-rxos-packages.mjs del hellopkg
node tools/sync-rxos-packages.mjs index   # regenerate INDEX.json
```

Then commit and deploy.

## Example `.rxc`

```
app "hellopkg"
state n is 0
page home:
  title "hellopkg"
  text "Hello from the package channel."
  value n
  button "wave":
    add 1 to n
```
