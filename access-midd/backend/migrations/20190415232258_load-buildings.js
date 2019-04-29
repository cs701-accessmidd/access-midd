exports.up = () => {};

exports.down = knex => knex.schema.dropTableIfExists('buildings');
