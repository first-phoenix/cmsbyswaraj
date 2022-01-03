const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

//config
dotenv.config({path:"backend/config/config.env"});

//connect to database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})


// unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    //close server and exit process
    server.close(() => process.exit(1));
})