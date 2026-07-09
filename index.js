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

app.listen(port, () => {
    console.log('Listening on port: ' + port);
    connectDB();
})



