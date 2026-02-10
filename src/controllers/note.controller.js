const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const noteService = require("../services/note.service");

const createNote = catchAsync(async (req, res) => {
  const note = await noteService.createNote({
    ...req.body,
    userId: req.user._id,
  });
  res.status(httpStatus.CREATED).send(note);
});

const getNotes = catchAsync(async (req, res) => {
  const notes = await noteService.queryNotes({ userId: req.user._id });
  const transformedNotes = notes.map((note) => ({
    title: note.title,
    content: note.content,
    id: note._id,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  }));
  res.send(transformedNotes);
});

const getNote = catchAsync(async (req, res) => {
  const note = await noteService.getNoteById(req.params.id, req.user._id);
  res.send(note);
});

const updateNote = catchAsync(async (req, res) => {
  const note = await noteService.updateNoteById(req.params.id, req.body, req.user._id);
  res.send(note);
});

const appendToNote = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const note = await noteService.appendToNoteById(req.params.id, title, content, req.user._id);
  res.send(note);
});

const deleteNote = catchAsync(async (req, res) => {
  await noteService.deleteNoteById(req.params.id, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  appendToNote,
  deleteNote,
};
