const Model = require('objection').Model;
const knex = require('./db');
Model.knex(knex);

class Notes extends Model {
  static get tableName() {
    return 'notes';
  }
  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.deleted;
    return json;
  }
}

module.exports = Notes;
