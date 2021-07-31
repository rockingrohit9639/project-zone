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
  adder_id: {
    type : String,
    default: ''
  },
  adder_fname: {
    type : String,
    default: 'Project Zone',
  },
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
      commenter_id: {
        type: String,
      },
      data: {
        type: String,
      },
      upvotes: {
        type: Number,
        default: 0,
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
