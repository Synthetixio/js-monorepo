import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import fs from "fs";
import path from "path";

const directoryPath = "./deployments";

// Recursively read all files in the directory and its subdirectories
function readDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  let result = [];

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recurse into subdirectories
      result.push(...readDirectory(filePath));
    } else if (stats.isFile()) {
      // Read contents of file
      const fileContents = fs.readFileSync(filePath);
      const json = JSON.parse(fileContents);

      // Add to result array
      result.push({
        abi: json.abi,
        address: json.address,
        name: filePath.split(".json")[0],
      });
    }
  });

  return result;
}

// Call the function and log the result
const contracts = readDirectory(directoryPath);

export default defineConfig({
  out: "src/generated.ts",
  contracts,
  plugins: [
    /**
     * Generates react hooks from your abis
     * @see https://wagmi.sh/cli/plugins/react
     */
    react(),
  ],
});
