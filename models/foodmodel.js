const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Food title is required']
    },
    description: {
      type: String,
      required: [true, 'Food description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Food price is required']
    },
    imageUrl: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ZJMkpJoYOJPyV728KwCNcxw3x6MNR3qg2w&s'
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {  // Corrected here
      type: Boolean,
      default: true
    },
    restaurant: { // Fixed typo from 'resturant' to 'restaurant'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resturant'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    ratingCount: { type: String },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
