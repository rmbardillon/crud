const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./router/routes");
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB
const connectionString = "mongodb://localhost:27017/crud";
mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB");
});

// Import and use routes
app.use("/api", routes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
