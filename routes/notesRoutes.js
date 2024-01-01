import express from "express";
import { createNote, deleteNote, getAllNotes, getNotesById, updateNote } from '../controllers/notesController.js'
import { isUserLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/create-note/:id')
    .post(isUserLoggedIn, createNote)
router.route('/get-notes/:id')
    .get(isUserLoggedIn, getAllNotes)
router.route('/get-notes/:userId/:noteId')
    .get(isUserLoggedIn, getNotesById)
router.route('/update-note/:userId/:noteId')
    .patch(isUserLoggedIn, updateNote)
router.route('/delete-note/:userId/:noteId')
    .delete(isUserLoggedIn, deleteNote);


export default router;

