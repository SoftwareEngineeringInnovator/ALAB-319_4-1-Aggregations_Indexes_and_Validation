import 'dotenv/config';

import express from 'express';

import connectDB from './db.js';

import Grade from './models/grades.js'

const app = express();

const port = 3000;

app.get('/', async (req, res) => {

    // db.grades.aggregate() <- MongoDB driver syntax

    const result = await Grade.aggregate(
        // Pipeline (array)
        [
            // Stage 1 (object)
            {
                $project: {
                    class_id: 1,
                    average: {
                        $avg: "$scores.score"
                    }
                }
            },
            // Stage 2 (object)
            {
                $limit: 3
            }
        ]
    ) // <- Mongoose syntax

    res.send(result);
})

// GET /grades/stats - This route calculates grade statistics for all learners in the grades collection.
app.get("/grades/stats", async (req, res) => {
    try {
        const result = await Grade.aggregate([
            // Calculate the average score for each learner document.
            {
                $project: {
                    average: {
                        $avg: "$scores.score"
                    }
                }
            },

            // Count total learners and learners with an average above 70.
            {
                $group: {
                    _id: null,
                    totalLearners: {
                        $sum: 1
                    },
                    learnersAbove70: {
                        $sum: {
                            $cond: [
                                { $gt: ["$average", 70] },
                                1,
                                0
                            ]
                        }
                    }
                }
            },

            // Calculate the percentage of learners above 70.
            {
                $project: {
                    _id: 0,
                    totalLearners: 1,
                    learnersAbove70: 1,
                    percentageAbove70: {
                        $multiply: [
                            {
                                $divide: [
                                    "$learnersAbove70",
                                    "$totalLearners"
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({
            error: "Error while getting grade stats.",
            details: error.message
        });
    }
});

app.listen(port, () => {
    console.log('Listening on port: ' + port);
    connectDB();
})



