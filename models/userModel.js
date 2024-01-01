import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "name is required"], 
        trim: true
    }, 
    email: {
        type: String, 
        required: [true, "email is required"], 
        unique: true,
    }, 
    notes: [{
        type: mongoose.Types.ObjectId, 
        ref: 'Notes'
    }]
})

export default mongoose.model("User", schema);