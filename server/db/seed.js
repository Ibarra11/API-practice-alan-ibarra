const { createConnection } = require("../lib/createConnection");

main()
  .then(async () => {
    await db.end();
  })
  .catch(async (e) => {
    console.error(e);
    await db.end();
    process.exit(1);
  });
