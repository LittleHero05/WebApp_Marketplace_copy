import express from 'express';
import { upload, create, list, read, update, remove, removeAll, listingByID } from '../controllers/listing.controller.js';

const router = express.Router();

router.route('/api/listings')
    .get(list)
    .post(upload.single('image'), create);

router.route('/api/listings/:listingId')
    .get(read)
    .put(update)
    .delete(remove);

router.param('listingId', listingByID);

export default router;
