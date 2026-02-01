const readline = require("readline");
const { spawn } = require("child_process");
const path = require("path");

// 🔑 project root = ../../ from this file
const projectRoot = path.resolve(__dirname, "../..");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("How many orders do you want to create? ", (count) => {
  rl.question("Order type (regular / partial / tnb / cir): ", (type) => {
    rl.question("Environment (staging / preprod / prod): ", (env) => {

      console.log("\n🚀 Starting Cypress order creation...\n");

      const cypressProcess = spawn(
        "npx",
        [
          "cypress",
          "run",
          "--env",
          `orderCount=${count},orderType=${type},environment=${env}`
        ],
        {
          stdio: "inherit",
          shell: true,
          cwd: projectRoot // ✅ THIS IS THE KEY FIX
        }
      );

      cypressProcess.on("close", (code) => {
        console.log(`\n✅ Cypress finished with exit code ${code}`);
        rl.close();
      });

    });
  });
});
