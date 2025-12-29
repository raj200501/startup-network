# Baseline Report

## Commands Run (from repo root)

```bash
npm install
```

Key output:
```
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
up to date in 537ms
```

```bash
npm run smoke
```

Key output:
```
DownloadError: Download failed for url "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2204-7.0.24.tgz"
Status Code is 403 (MongoDB's 404)
```

```bash
npm test
```

Key output:
```
npm error Missing script: "test"
```

```bash
cd client && npm test -- --watchAll=false
```

Key output:
```
No tests found, exiting with code 1
```

## Current Status
- Root install succeeds with a warning about `http-proxy` env config.
- Smoke test fails due to MongoDB binary download (MongoMemoryServer).
- Root `npm test` script is missing.
- Client tests fail because no tests are present.

## How to Run (Current)
- Dev: `npm run dev`
- Smoke: `npm run smoke`
- Client: `cd client && npm start`
