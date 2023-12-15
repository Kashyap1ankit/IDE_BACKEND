import mongoose from "mongoose";

export const connectToMongo = async () => {
  // Connection URL to your local MongoDB server
  const mongoURL = process.env.MONGO_URL; // Replace "mylocaldb" with your database name

  // Establish the MongoDB connection
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event handlers for the connection
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB on", mongoURL);
    return db;

    next();
  });
};

// export connectToMongo;
