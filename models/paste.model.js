const { Schema, model } = require("mongoose");

const PasteSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      maxlength: 100,
      default: "Untitled",
      require:true
    },

    content: {
      type: String,
      required: true,
    },

    option: {
      type: String,
      enum: ["text", "code"],
      default: "text",
    },

    lang: {
      type: String, // example: "cpp", "js"
      default: "javascript",
    },
    isActive:{
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const PasteModel = model("Paste", PasteSchema);
module.exports = PasteModel;
