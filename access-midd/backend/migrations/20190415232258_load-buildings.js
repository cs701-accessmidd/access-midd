exports.up = knex => {};

exports.down = knex => knex.schema.dropTableIfExists('buildings');
