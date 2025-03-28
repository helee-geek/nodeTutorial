// // HouseKeeping of records older than 180 days
// const cron = require("node-cron");
// const fs = require("fs");
// const path = require("path");

// const archieve = require("./data/archive.json");

// const HouseKeepingTask = () => {
//   console.log("Running House Keeping Task", new Date());
//   try {
//     archieve.map((item, index) => {
//       const presentDate = new Date().getTime();
//       const recordDate = new Date(item.date).getTime();

//       console.log(
//         "The number of days",
//         Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24))
//       );

//       if (
//         Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24)) > 180
//       ) {
//         archieve.splice(index, 1);
//         fs.writeFileSync(
//             path.join(__dirname, "./", "data", "archive.json"),
//             JSON.stringify(archieve),
//             "utf-8"
//         )
//       }
//     });
//   } catch (error) {
//     console.log("Error", error);
//   }
//   console.log("House Keeping Task Ended");
// };

// cron.schedule("* * * * *", HouseKeepingTask);

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const archivePath = path.join(__dirname, "data", "archive.json");

const HouseKeepingTask = () => {
  console.log("Running House Keeping Task", new Date());

  try {
    // Read the archive file inside the function to ensure fresh data
    let archive = JSON.parse(fs.readFileSync(archivePath, "utf-8"));

    const presentDate = new Date().getTime();

    const updatedArchive = archive.filter((item) => {
      const recordDate = new Date(item.date).getTime();
      const daysOld = Math.floor((presentDate - recordDate) / (1000 * 60 * 60 * 24));

      console.log(`ID: ${item.id}, Date: ${item.date}, Days Old: ${daysOld}`);

      return daysOld <= 180; // Keep only records within 180 days
    });

    console.log("Remaining Records After Filter:", updatedArchive);

    // Write to file only once after filtering
    fs.writeFileSync(archivePath, JSON.stringify(updatedArchive, null, 2), "utf-8");

  } catch (error) {
    console.log("Error:", error);
  }

  console.log("House Keeping Task Ended");
};

// Run the housekeeping task every minute
cron.schedule("*/20 * * * * *", HouseKeepingTask);
    