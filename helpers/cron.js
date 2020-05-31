const { CronJob } = require("cron");
const Users = require("../api/user.dao");

const job = new CronJob(
  "*/30 * * * * *",
  () => {
    console.log("checking quota every: 30 seconds");
    Users.get({}, (err, users) => {
      if (err) {
        console.log(err);
      } else {
        const pendingUpdate = [];
        let filtered = {};
        if (users.length !== 0) {
          filtered = users.filter((el) => el.quota < 2);
          if (filtered !== undefined) {
            pendingUpdate.push(...filtered);
          }
          if (pendingUpdate.length !== 0) {
            for (let i = 0; i < pendingUpdate.length; i++) {
              Users.updateOne(
                { _id: pendingUpdate[i]._id },
                { quota: 2 },
                () => {}
              );
            }
            console.log(`successfully updated: ${pendingUpdate.length} data`);
          }
        }
      }
    });
  },
  null,
  false,
  "Asia/Jakarta"
);

job.start();

module.export = job;
