import notesModel from "../models/notesModel.js"
import userModel from "../models/userModel.js";


const createNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: "title and content are required"
            })
        }
        const data = {
            title,
            content
        }
        const resp = await new notesModel(data).save();
        const updateUser = await userModel.updateOne({ _id: id }, { $push: { notes: resp._id } })
        res.status(200).json({
            success: true,
            message: "Notes created successfully",
            resp,
            updateUser
        });
    } catch (error) {
        console.log("error while creating notes")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error: createNote",
            error
        })
    }
}

const getAllNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const notes = await notesModel.findById(id);
        res.status(200).json({
            success: true,
            message: "All notes fetched successfully",
            notes
        })
    } catch (error) {
        console.log("error occurred while fetching all notes: notesController");
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error while fetches all notes",
            error
        })
    }
}

const getNotesById = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const data = await userModel.findById({ _id: userId }).select('notes').populate('notes');
        const notes = data.notes;
        console.log(notes)
        let sel = null;
        for (const note of notes) {
            if (noteId === note._id.toString()) {
                sel = note;
                break; // Exit the loop once the note is found
            }
        }
        res.status(200).json({
            success: true,
            message: "Fetched note",
            sel
        })
    } catch (error) {
        console.log("error while fetching note")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error while fetching notes",
            error
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const user = await userModel.findById(userId).select("notes");
        if (!user) {
            return req.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        if (!user.notes.includes(noteId)) {
            return res.status(400).json({
                success: false,
                message: "note is not found to update"
            })
        }
        const updateContent = req.body;
        // const found = await notesModel.findOne({_id: id});
        // if(!found){
        //     res.status(400).json({
        //         success: false, 
        //         message: "user not found"
        //     })
        // }
        const updatedNote = await notesModel.updateOne({ _id: noteId }, { $set: { content: updateContent.content } }, { new: true })
        res.status(200).json({
            success: true,
            message: "content updated successfully",
            updatedNote
        })

    } catch (error) {
        console.log("error while updating the content")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error while updating content",
            error
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const { userId, noteId } = req.params;
        const user = await userModel.findById(userId).select("notes");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        if (!user.notes.includes(noteId)) {
            return res.status(400).json({
                success: false,
                message: "note is not found to delete"
            })
        }
        await notesModel.findByIdAndDelete(noteId);
        await userModel.updateOne({_id: userId}, {$pull: {notes: noteId}})
        res.status(200).json({
            success: true,
            message: "note deleted successfully"
        })
    } catch (error) {
        console.log("error occurred while deleting note")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "note deletion successfull"
        })
    }
}




export { getAllNotes, getNotesById, createNote, updateNote, deleteNote }