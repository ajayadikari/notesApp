import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minlength: 10,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'content is required'],
        trim: true
    }
}, { timestamps: true })

export default mongoose.model('Notes', schema)