
exports.up = knex => knex.schema.table('buildings', (table) => {
  table.boolean('acc_entry');
  table.boolean('acc_restroom');
  table.boolean('elevator');
  table.text('comment');
});

exports.down = knex => knex.schema.table('buildings', (table) => {
  table.dropColumns('acc_entry', 'acc_restroom', 'elevator', 'comment');
});
