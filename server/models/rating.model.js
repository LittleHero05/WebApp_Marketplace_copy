import pkg from "lodash";
import mongoose from "mongoose";
import User from "./user.model.js";

const RatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: "User is required",
    },
    ratedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: "Rater is required",
    },
    rating: {
        type: Number,
        required: "Rating is required",
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 5;
            },
            message: "Rating must be between 1 and 5",
        }
    },
    review: {
        type: String,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

RatingSchema.pre('save', function(next) {
    if (this.user.equals(this.ratedBy)) {
        return next(new Error('User and ratedBy cannot be the same'));
    }
    next();
});

export default mongoose.model("Rating", RatingSchema);
