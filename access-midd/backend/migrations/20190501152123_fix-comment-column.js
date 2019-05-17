exports.up = knex => knex.schema.createTable('buildings', (table) => {
  table.increments('id').primary();
  table.string('name');
  table.string('address');
  table.string('code');
  table.float('latitude');
  table.float('longitude');
  table.boolean('acc_entry');
  table.boolean('acc_restroom');
  table.boolean('elevator');
  table.string('plan_url');
  table.text('comment', 'longtext');
  table.timestamps();
});

exports.down = knex => knex.schema.dropTableIfExists('buildings');
