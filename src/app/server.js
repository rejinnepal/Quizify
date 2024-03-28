const express = require("express");
const app = express();
// require("dotenv").config();
const cors = require("cors");
// var mongojs = require('mongojs');
app.use(express.json());
app.use(cors());
 
const mongoose = require("mongoose");
// mongodb+srv://rejinnepal815:<password>@cluster0.lapkezp.mongodb.net/
// mongodb+srv://rejinnepal815:<password>@cluster0.hjhnoq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose
    .connect(
        "mongodb+srv://rejinnepal815:" +
        "08iijVuIJ3ozfV79" +
        "@cluster0.hjhnoq7.mongodb.net/Quiz",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
      
    ).then((x) => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo: " + err);
    });


const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correct_option: { type: String, required: true },
    difficulty_level: { type: Number, required: true }
});

const QuestionModel = mongoose.model("Question", questionSchema);

// Define GET endpoint to fetch questions
app.get("/questions", async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.json(questions);
    } catch (err) {
        console.error("Error while fetching questions:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
