const httpStatus = require("http-status");
const Notes = require("../models/Notes");
const ApiError = require("../utils/ApiError");

/**
 * Create a note
 * @param {Object} noteBody
 * @returns {Promise<Notes>}
 */
const createNote = async (noteBody) => {
  return Notes.create(noteBody);
};

/**
 * Query for notes
 * @param {Object} filter
 * @returns {Promise<Notes[]>}
 */
const queryNotes = async (filter) => {
  return Notes.find(filter);
};

/**
 * Get note by id
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<Notes>}
 */
const getNoteById = async (id, userId) => {
  const note = await Notes.findOne({ _id: id, userId });
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, "Note not found");
  }
  return note;
};

/**
 * Update note by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @param {ObjectId} userId
 * @returns {Promise<Notes>}
 */
const updateNoteById = async (id, updateBody, userId) => {
  const note = await getNoteById(id, userId);
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

/**
 * Append content to note by id
 * @param {ObjectId} id
 * @param {string} title
 * @param {string} content
 * @param {ObjectId} userId
 * @returns {Promise<Notes>}
 */
const appendToNoteById = async (id, title, content, userId) => {
  const note = await getNoteById(id, userId);
  if (title) {
    note.title = note.title ? `${note.title}. ${title}` : title;
  }
  if (content) {
    note.content = note.content ? `${note.content}. ${content}` : content;
  }
  await note.save();
  return note;
};

/**
 * Delete note by id
 * @param {ObjectId} id
 * @param {ObjectId} userId
 * @returns {Promise<Notes>}
 */
const deleteNoteById = async (id, userId) => {
  const note = await getNoteById(id, userId);
  await note.deleteOne();
  return note;
};

module.exports = {
  createNote,
  queryNotes,
  getNoteById,
  updateNoteById,
  appendToNoteById,
  deleteNoteById,
};
