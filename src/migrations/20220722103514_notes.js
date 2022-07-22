exports.up = function(knex) {
    return knex.schema.createTable("notes", function(table) {
      table.bigIncrements();
      table.string('title');
      table.text('description');
      table.timestamp('created_on').defaultTo(knex.fn.now())
      table.timestamp('modified_on').defaultTo(
        knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      )
      table.boolean('deleted').defaultTo(false)
    })
  };
  
  exports.down = function(knex) {
    
  };
  