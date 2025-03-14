const resturantModels = require("../models/resturantModels");
const mongoose = require("mongoose");

// CREATE RESTURANT
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and address",
      });
    }

    const newResturant = new resturantModels({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error: error.message,
    });
  }
};

// GET ALL RESTAURANTS
const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModels.find({});
    if (!resturants.length) {
      return res.status(404).send({
        success: false,
        message: "No Restaurants Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Restaurants API",
      error: error.message,
    });
  }
};

// GET RESTAURANT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(resturantId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Restaurant ID",
      });
    }

    // Find restaurant by ID
    const resturant = await resturantModels.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant by ID API",
      error: error.message,
    });
  }
};

// DELETE RESTAURANT (Optional)
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found OR Provide Restaurant ID",
      });
    }
    await resturantModels.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error: error.message,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
