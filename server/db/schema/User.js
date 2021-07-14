const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    bio: {
      type: String,
    },
    description: {
      type: String,
    },
    projects_added: [],
    projects_liked: [],
    projects_rated: [],
    comments_upvoted:[],
    badges: [
      {
        title: {
          type: String,
        },
        badge_description: {
          type: String,
        },
        earnedat: {
          type: String,
        },
      },
    ],
    social_links: {
      github: {
        type: String,
        default: "",
      },
      linkdin: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
    },
    projectones: {
      type: Number,
      default: 0,
    },
    profile_pic: {
      type: String,
    },
  },
  password_reset_token: {
    type: String,
    default: "",
  },
  email_acctivation: {
    email_acctivation_token: {
      type: String,
      default: "",
    },
    email_activated: {
      type: Boolean,
      default: false,
    },
  },
  google_signin: {
    type: Boolean,
    default: false,
  },
  messages_sent:[
    {
      type: String,
      required: true
    }
  ],
  created_at: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
