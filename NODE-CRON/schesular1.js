// const cron = require("node-cron");

// const task = () => {
//   console.log("Running a Scheduled task at : ", new Date());
// };

// cron.schedule("* * * * *  *", task);


const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoicePath = path.join(__dirname, "data", "invoice.json");
const archivePath = path.join(__dirname, "data", "archive.json");

// Function to read JSON files safely
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.trim() ? JSON.parse(data) : []; // Handle empty files
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return []; // Return an empty array instead of crashing
  }
};

// Function to write JSON safely
const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
  }
};

// Archive job
const archiveInvoicesTask = () => {
  console.log("Running Archive Invoice Task", new Date());

  try {
    let invoices = readJSON(invoicePath);
    let archives = readJSON(archivePath);

    const paidInvoices = invoices.filter((item) => item.status === "paid");

    if (paidInvoices.length > 0) {
      invoices = invoices.filter((item) => item.status !== "paid");
      archives = [...archives, ...paidInvoices];

      writeJSON(invoicePath, invoices);
      writeJSON(archivePath, archives);

      console.log("Archived Invoices:", paidInvoices);
    } else {
      console.log("No paid invoices found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("Archive Invoice Task Ended");
};

// Run every minute
cron.schedule("*/20 * * * * *", archiveInvoicesTask);
