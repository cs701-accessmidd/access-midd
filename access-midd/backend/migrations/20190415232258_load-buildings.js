
exports.up = function(knex, Promise) {
    console.log('up')
    return knex.schema.createTable('buildings', (table) => {
        table.string('name');
        table.string('code');
        table.float('latitude');
        table.float('longitude');
        table.string('plan_url');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('buildings');
};
