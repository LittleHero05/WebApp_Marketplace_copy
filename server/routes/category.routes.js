import express from 'express'
import categoryCtrl from '../controllers/category.controller.js'

const router = express.Router();

router.route('/api/categories')
    .get(categoryCtrl.list)
    .post(categoryCtrl.create)
    .delete(categoryCtrl.removeAll);

router.route('/api/categories/:categoryId')
    .get(categoryCtrl.read)
    .put(categoryCtrl.update)
    .delete(categoryCtrl.remove);

router.param('categoryId', categoryCtrl.categoryByID);
router.route('/api/categories/:categoryId').get(categoryCtrl.read);
router.route('/api/categories/:categoryId').put(categoryCtrl.update);
router.route('/api/categories/:categoryId').delete(categoryCtrl.remove);

export default router;