exports.up = knex => knex.schema.createTable('buildings', (table) => {
  table.string('name');
  table.string('code');
  table.float('latitude');
  table.float('longitude');
  table.string('plan_url');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTableIfExists('buildings');
