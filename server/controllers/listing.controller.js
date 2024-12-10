import multer from 'multer';
import path from 'path';
import Listing from '../models/listing.model.js';
import errorHandler from './error.controller.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'public/images/listings'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage });

export const create = async (req, res) => {
    const { body, file } = req;
    if (file) {
        body.images = [`public/images/listings/${file.filename}`];
    }
    const listing = new Listing(body);
    try {
        await listing.save();
        return res.status(200).json({
            message: "Successfully created listing",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export const list = async (req, res) => {
    try {
        let listings = await Listing.find()
            .select('title description price category images location condition status created updated')
            .populate('postedBy', 'name');
        console.log(listings);
        res.json(listings);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export const read = (req, res) => {
    return res.json(req.profile);
};

export const listingByID = async (req, res, next, id) => {
    try {
        let listing = await Listing.findById(id);
        if (!listing)
            return res.status(400).json({
                error: "Listing not found",
            });
        req.profile = listing;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve listing",
        });
    }
};

export const update = async (req, res) => {
    try {
        let listing = req.profile;
        listing = extend(listing, req.body);
        listing.updated = Date.now();
        await listing.save();
        res.json(listing);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export const remove = async (req, res) => {
    try {
        let listing = req.profile;
        let deletedListing = await listing.deleteOne();
        res.json(deletedListing);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export const removeAll = async (req, res) => {
    try {
        await Listing.deleteMany({});
        return res.status(200).json({
            message: "Successfully deleted all listings",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};
