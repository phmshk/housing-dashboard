import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://phmoshkov:Jxx2GI0bQjKzlDpU@cluster0.mcewitl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
