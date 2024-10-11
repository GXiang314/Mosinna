import app from "./app";
import db from "./db";

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  await db.sequelize.authenticate().then(function (errors) {
    console.log(errors);
  });
});
