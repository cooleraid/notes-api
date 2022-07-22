const router = require("express").Router();
let { validate, Joi } = require("express-validation");
const note = require("../controllers/note");

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The note's title.
 *           example: Note Title
 *         description:
 *           type: string
 *           description: The note's description.
 *           example: Note Description
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Fetch Notes.
 *     description: Fetch a list of paginated notes.
 *     parameters:
 *       - in: query
 *         name: sort_by
 *         description: The field to sort records by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort_dir
 *         description: The direction to sort records by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: The number of records to return.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: The page to return.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         description: The string to search.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 */
router.get(
  "/",
  validate({
    query: Joi.object({
      sort_by: Joi.string(),
      sort_dir: Joi.string().valid("ASC", "DESC"),
      limit: Joi.number().integer().min(1),
      page: Joi.number().integer().min(1),
      search: Joi.string(),
    }),
  }),
  note.getNotes
);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Fetch Note.
 *     description: Fetch a single note.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the note to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 */
router.get(
  "/:id",
  validate({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  }),
  note.getNote
);

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Add Note.
 *     description: Add a new note.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 */
router.post(
  "/",
  validate({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  note.addNote
);

/**
 * @swagger
 * /notes/{id}:
 *   patch:
 *     summary: Update Note.
 *     description: Update an existing note.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the note to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Note'
 */
router.patch(
  "/:id",
  validate({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  }),
  note.updateNote
);
module.exports = router;
