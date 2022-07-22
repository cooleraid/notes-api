const Models = require("../models");
const Utils = require('../utils');

exports.addNote = async (req, res, next) => {
  try {
    let { title, description } = req.body;
    let note = await Models.Notes.query().insertAndFetch({ title, description });
    return res.status(201).json({ status: "success", message: Utils.messages['success'], data: note });
  } catch (error) {
    next(error);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { title, description } = req.body;
    let note = await Models.Notes.query().findOne({ id, deleted: false });
    if (!note) return res.status(404).json({ status: "error", message: Utils.messages.__404('Note') });
    note = await note.$query().patchAndFetch({ title, description });
    return res.status(200).json({ status: "success", message: Utils.messages['success'], data: note });
  } catch (error) {
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    let {
      sort_by = "created_on", sort_dir = "DESC", limit = 10, page = 1, search = "", ...conditions
    } = req.query;
    let search_fields = 'title,description'
    let query = Models.Notes.query().where({ deleted: false });

    const { results: data, page_info } = await Utils.pagination(
      query, conditions, search, search_fields, page, limit, sort_by, sort_dir
    );
    return res.json({ status: "success", message: Utils.messages['success'], data: { data, page_info } });
  } catch (error) {
    next(error);
  }
};

exports.getNote = async (req, res, next) => {
  try {
    let { id } = req.params;
    let note = await Models.Notes.query().findOne({ id, deleted: false });
    if (!note) return res.status(404).json({ status: "error", message: Utils.messages.__404('Note') });
    return res.status(200).json({ status: "success", message: Utils.messages['success'], data: note });
  } catch (error) {
    next(error);
  }
};