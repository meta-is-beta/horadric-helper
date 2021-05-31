curl -X POST \
              http://purge.jsdelivr.net/ \
              -H 'cache-control: no-cache' \
              -H 'content-type: application/json' \
              -d '{
              "path": [
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.umd.js",
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.umd.min.js",
                  "/gh/meta-is-beta/horadric-helper@latest/dist/poe/horadric-helper-poe.css"
                ]
              }'
