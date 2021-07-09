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
  rating: {
    type: Number,
    default: 0,
  },
  allratings: [
    {
      type: Number,
      default: 0,
    },
  ],
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
  github: {
    type: String,
    default: "",
  },
});

const Project = mongoose.model("projects-data", projectSchema);

module.exports = Project;
