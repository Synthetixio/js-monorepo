# Github

## Debugging GitHub actions locally

1. Install `act` https://github.com/nektos/act
2. Add `- run: sleep 1h` line to `main.yml`. This will prevent docker container from exiting
3. Execute `act pull_request`
4. In a separate terminal attach to a running container 
   ```sh
   docker exec -it act-Main-Workflow-build bash
   ```
5. Inside running container update `$PATH` env to access node and npm
   ```sh
   export PATH="$PATH:/opt/hostedtoolcache/node/16.15.0/x64/bin/"

   node -v   
   v16.15.0
   ```
6. To kill a running container:
   ```sh
   docker kill act-Main-Workflow-build
   ```