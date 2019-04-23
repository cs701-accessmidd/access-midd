exports.up = knex => knex.schema.createTable('buildings', (table) => {
  table.string('name');
  table.string('code');
  table.float('latitude');
  table.float('longitude');
  table.string('plan_url');
  table.timestamps();
});
// try adding: table.increments('id')

exports.down = knex => knex.schema.dropTableIfExists('buildings');
