const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      fname: {
        type: String,
      },
      userimg: {
        type: String,
      },
      data: {
        type: String,
      },
      createdat: {
        type: String,
      },
    },
  ],
});

const Project = mongoose.model("projects-data", projectSchema);

module.exports = Project;
