// Correct function declaration
const mongoose=require("mongoose")
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("Error in DB connection", error);
    }
};

module.exports = dbConnect;
