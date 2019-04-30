exports.up = () => {}; // knex.schema.dropTableIfExists('buildings');

exports.down = knex => knex.schema.dropTableIfExists('buildings');
