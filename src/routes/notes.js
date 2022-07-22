const router = require("express").Router();
let { validate, Joi } = require("express-validation");
const note = require("../controllers/note");

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

router.get(
  "/:id",
  validate({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  }),
  note.getNote
);

router.post(
  "/",
  validate({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  note.updateNote
);

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
