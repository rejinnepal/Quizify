const express = require("express");
const app = express();
// require("dotenv").config();
const cors = require("cors");
// var mongojs = require('mongojs');
app.use(express.json());
app.use(cors());
 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
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

app.post("/questions/add", async (req, res) => {
    try {
        const newQuestion = new QuestionModel(req.body); // Assuming the request body contains the question data
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err) {
        console.error("Error while creating new question:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/questions/delete/:id", async (req, res) => {
    try {
        const questionId = req.params.id;
        
        const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);
        
        if (!deletedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        
        res.send({ message: "Question successfully deleted" });
    } catch (err) {
        console.error("Error while deleting question:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/questions/update/:id", async (req, res) => {
    try {
        const questionId = req.params.id;
        const updateData = req.body;

        const updatedQuestion = await QuestionModel.findByIdAndUpdate(
            questionId, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found or update failed" });
        }
        
        res.json({ message: "Question successfully updated", question: updatedQuestion });
    } catch (err) {
        console.error("Error while updating question:", err);
        res.status(500).json({ error: "Internal server error", details: err });
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
