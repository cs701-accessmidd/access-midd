exports.up = knex => knex.schema.table('buildings', (table) => {
  table.string('address');
});

exports.down = knex => knex.schema.table('buildings', (table) => {
  table.dropColumn('address');
});
