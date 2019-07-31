//MONGO

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String },
  url: { type: String },
  likes: { type: Number, default: 0 } //jos likeja ei ole niin likejen määrä on nolla
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
