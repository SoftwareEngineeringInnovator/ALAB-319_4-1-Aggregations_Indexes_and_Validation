# ALAB-319.4.1 - Aggregations, Indexes, and Validation

This project is part of the Per Scholas MongoDB and Express lessons.  
The goal of this lab was to expand an existing MongoDB + Express grades API by adding aggregation routes, indexes, and collection validation.

The project uses the MongoDB Atlas sample database:

- Database: `sample_training`
- Collection: `grades`

The original lab instructions mentioned `learner_id`, but the actual Atlas sample collection uses `student_id`, so this project uses `student_id` to stay consistent with the real data.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- nodemon

---

## Project Setup

The project uses ES modules, so `package.json` includes:

```json
"type": "module"
```
## Author

Fredy Chilito
Software Engineering Student
Created as part of the Per Scholas Software Engineering Program.
Project: Aggregations, Indexes, and Validation