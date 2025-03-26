const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phoneNo: {
        type: String,  // Changed to String
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });  // Auto adds createdAt & updatedAt

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
