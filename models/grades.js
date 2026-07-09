import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        required: true
    },

    class_id: {
        type: Number,
        required: true
    },

    scores: [
        {
            type: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }
    ]
});

export default mongoose.model("grade", gradeSchema, "grades");