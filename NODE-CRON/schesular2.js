// JOB to check the status of invoices and id status is paid we archieve the record

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const invoices = require("./data/invoice.json");

const archiveInvoicesTask = () => {
  console.log("Running Archive Invoice Task", new Date());
  try {
    const paidInvoices = invoices.filter((item) => {
      return item.status === "paid";
    });

    if (paidInvoices.length > 0) {
      paidInvoices.forEach((item) => {
        invoices.splice(
          invoices.findIndex((e) => e.status === item.status),
          1
        );
      });
      console.log("The paid invoices are; ", invoices);

      fs.writeFileSync(
        path.join(__dirname, "./", "data", "invoice.json"),
        JSON.stringify(invoices),
        "utf-8"
      );
      
      fs.writeFileSync(
        path.join(__dirname, "./", "data", "archive.json"),
        JSON.stringify(paidInvoices),
        "utf-8"
      );
    }
  } catch (error) {
    console.log("Error", error);
    console.log("not");
    
  }
  console.log("Archive Invoice Task Ended");
};

cron.schedule("* * * * *", archiveInvoicesTask);
