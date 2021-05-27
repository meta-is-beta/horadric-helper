name: Build Horadric Helper
on:
  push:
    branches:
      - main

jobs:
  Build-Horadric-Helper-Main:
    runs-on: ubuntu-latest

    steps:
      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: "14"

      - name: Check out repository code
        uses: actions/checkout@v2
        with:
          repository: ${{ github.repository }}
          ref: ${{ github.head_ref }}

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:unit

      - name: Build project
        run: npm run build

      - name: Deploy
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          branch: "main"
          skip_dirty_check: true
          commit_message: Main release

      - name: Purge CDN for 'latest' tag
        run: curl -X POST \
              http://purge.jsdelivr.net/ \
              -H 'cache-control: no-cache' \
              -H 'content-type: application/json' \
              -d '{
              "path": [
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-item-showcase.umd.js",
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-item-showcase.umd.min.js",
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-item-showcase.common.js",
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/poe-item-showcase.css"
                ]
              }'
