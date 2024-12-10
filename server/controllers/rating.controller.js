import Rating from "../models/rating.model.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const rating = new Rating(req.body);
  try {
    await rating.save();
    return res.status(200).json({
      message: "Successfully created rating",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const list = async (req, res) => {
  try {
    let ratings = await Rating.find().select('user ratedBy rating review created');
    res.json(ratings);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const ratingByID = async (req, res, next, id) => {
    try {
        let rating = await Rating.findById(id);
        if (!rating)
            return res.status(400).json({
                error: "Rating not found",
            });
        req.profile = rating;
        next();
    }
    catch (err) {
        return res.status(400).json({
            error: "Could not retrieve rating",
        });
    }
}

const read = (req, res) => {
    return res.json(req.profile);
}

const update = async (req, res) => {
    try {
        let rating = req.profile;
        rating = extend(rating, req.body);
        await rating.save();
        res.json(rating);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
}

const remove = async (req, res) => {
    try {
        let rating = req.profile;
        let deletedRating = await rating.deleteOne();
        res.json(deletedRating);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
}

const removeAll = async (req, res) => {
    try {
        let deletedRatings = await Rating.deleteMany();
        res.json(deletedRatings);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
}

export default { create, list, ratingByID, read, update, remove, removeAll };