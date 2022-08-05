# Github

## Debugging GitHub actions locally

### Debugging `main`

1. Install `act` https://github.com/nektos/act
2. Add `- run: sleep 1h` line to `main.yml`. This will prevent docker container from exiting
3. Execute `act pull_request`
4. In a separate terminal attach to a running container
   ```sh
   docker exec -it act-Main-Workflow-build bash
   ```
5. Inside running container update `$PATH` env to access node and yarn

   ```sh
   export PATH="$PATH:/opt/hostedtoolcache/node/16.15.0/x64/bin/"

   node -v
   v16.15.0
   ```

6. To kill a running container:
   ```sh
   docker kill act-Main-Workflow-build
   ```

### Debugging `updateDependency`

1. Create test event file `test.json`
   ```json
   {
     "action": "workflow_dispatch",
     "inputs": {
       "synthetix_version": "2.71.0",
       "monorepo_version": ""
     }
   }
   ```
2. Add `- run: sleep 1h` line to `updateDependency.yml` (where appropriate). This will prevent docker container from exiting
3. Run `act`
   ```sh
   act workflow_dispatch --eventpath test.json
   ```
4. In a separate terminal attach to a running container
   ```sh
   docker exec -it act-Publish-Library-Update-synthetix-in-contracts-interface bash
   ```
5. Inside running container update `$PATH` env to access node and npm

   ```sh
   export PATH="$PATH:/opt/hostedtoolcache/node/16.15.0/x64/bin/"

   node -v
   v16.15.0
   ```

6. To kill a running container:
   ```sh
   docker kill act-Publish-Library-Update-synthetix-in-contracts-interface
   ```
