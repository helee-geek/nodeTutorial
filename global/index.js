console.log("Hello");
console.warn("Danger.!");
console.error("SyntaxError");
global.x = "Welcome To, TutorialsPoint.";
console.log(global.x);

console.log("Process ID:", process.pid);
console.log("Node.js Version:", process.version);
console.log("Command-line arguments:", process.argv);
console.log("Process Uptime:", process.uptime(), "seconds");
console.log("Current Working Directory:", process.cwd());
console.log("Memory Usage:", process.memoryUsage());

console.log("Directory Name:", __dirname);
console.log("File Name:", __filename);

