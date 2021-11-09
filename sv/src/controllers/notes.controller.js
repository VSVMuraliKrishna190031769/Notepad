const notesController = {};
const Note = require('../models/Note');

notesController.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

notesController.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;

    const note = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    });

    await note.save();

    res.json({ message: 'Note created successfully' });
}

notesController.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, date, author } = req.body;

    const note = await Note.findOneAndUpdate(id, {
        title,
        author,
        date,
        content
    });

    res.json({ message: 'Note updated successfully' });
};

notesController.getNote = async (req, res) => {
    const { id } = req.params;

    const note = await Note.findById(id);

    res.json(note);
};

notesController.deleteNote = async (req, res) => {
    const { id } = req.params;

    const note = await Note.findOneAndDelete(id);

    res.json({ message: 'Note deleted successfully' });
};

module.exports = notesController;