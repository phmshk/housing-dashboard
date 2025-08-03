import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";

async function connectMongoose() {
  await mongoose.connect(config.mongoUri);
}

try {
  connectMongoose();
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
}

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
