import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.DATABASE_URL as string;

async function connectMongoose() {
  await mongoose.connect(MONGO_URI);
}

try {
  connectMongoose();
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
