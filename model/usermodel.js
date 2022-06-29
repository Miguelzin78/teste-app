const mongoose = require("mongoose")

const User = new mongoose.Schema({
username: {
type: String,
required: true
},
password: {
type: String,
required: true,
max: 1024
},
tweets: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Tweet'
}]
}, {
timestamps: true
}
)

module.exports = mongoose.model("User", User)

const Tweet = new mongoose.Schema({
  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
  },
  content: {
  type: String,
  required: true,
  min: 1
  },
  likes: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
  }]
  }, {
  timestamps: true
  }
  )
  
  module.exports = mongoose.model("Tweet", Tweet)