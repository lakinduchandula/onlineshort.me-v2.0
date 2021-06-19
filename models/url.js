const mongoose = require("mongoose");

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clientInfo: {
      clicks: [
        {
          IPAddress: {
            type: String,
          },
          browser: {
            type: String,
          },
          os: {
            type: String,
          },
          country: {
            type: String,
          },
          date: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

// create a model from schema and export it
module.exports = mongoose.model("Url", URLSchema);
