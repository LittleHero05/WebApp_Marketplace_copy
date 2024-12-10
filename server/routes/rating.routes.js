import express from 'express';
import ratingCtrl from '../controllers/rating.controller.js';

const router = express.Router();

router.route('/api/ratings')
    .get(ratingCtrl.list)
    .post(ratingCtrl.create)
    .delete(ratingCtrl.removeAll);

router.route('/api/ratings/:ratingId')
    .get(ratingCtrl.read)
    .put(ratingCtrl.update)
    .delete(ratingCtrl.remove);

router.param('ratingId', ratingCtrl.ratingByID);
router.route('/api/ratings/:ratingId').get(ratingCtrl.read);
router.route('/api/ratings/:ratingId').put(ratingCtrl.update);
router.route('/api/ratings/:ratingId').delete(ratingCtrl.remove);

export default router;