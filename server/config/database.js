const dns = require("node:dns");
const mongoose = require("mongoose");

// Some Windows/ISP DNS resolvers reject MongoDB Atlas SRV queries even when
// ordinary DNS works. Public resolvers keep Atlas connections reliable.
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (error) {
    console.warn("Unable to override DNS servers:", error.message);
}

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
