const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:[true,'category type is required']
    },
    imageUrl:{
      type:String,
      default:"https://img.freepik.com/premium-vector/logo-food-company-that-says-sun-sun-sunflower_917213-253424.jpg",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);