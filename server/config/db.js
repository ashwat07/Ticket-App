import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.set("debug", true); // debug mode on

try {
  mongoose.connect(
    "mongodb://localhost/ticket-app",
    { useNewUrlParser: true }
  );
} catch (e) {
  mongoose.createConnection("mongodb://localhost/ticket-app", {
    useNewUrlParser: true,
  });
}

mongoose.connection
  .once("open", () => console.log("Database Server is running!"))
  .on("error", (e) => {
    throw e;
  });
