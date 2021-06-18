const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String,
            required: true
        }
    ]
});

const Project = mongoose.model("projects-data", projectSchema);

module.exports = Project;