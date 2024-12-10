import {mongoose} from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    description: {
        type: String,
        trim: true,
    },
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    }
});

export default mongoose.model('Category', CategorySchema);