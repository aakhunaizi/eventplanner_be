const express = require("express");
const app = express();
const port = 8000;
const db = require("./db/models");
const eventRoutes = require("./routes/events");

app.use(express.json());
app.use("/events", eventRoutes);

db.sequelize.sync({ alter: true });

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
