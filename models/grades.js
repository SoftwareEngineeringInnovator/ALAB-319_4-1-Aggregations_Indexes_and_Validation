import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    scores: [
        {
            type: { type: String },
            scores: { type: Number }
        }
    ],
    class_id: {
        type: String,
        required: true
    },
    learner_id: {
        type: String,
        required: true
    }
})

export default mongoose.model("grade", gradeSchema, "grades");