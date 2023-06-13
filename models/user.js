const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "userName": {
        "type": "string",
        "required": true
      },
      "password": {
        "type": "string",
        "required": true
      }
      
},
    { timestamps: true }
)

module.exports = mongoose.model("Login",userSchema)