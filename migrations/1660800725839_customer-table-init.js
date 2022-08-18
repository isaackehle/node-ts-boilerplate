/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("customers", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("uuid_generate_v4 ()") },
    name: { type: "varchar(1000)", notNull: true },
    ssn: { type: "varchar(11)" },
    dob: { type: "timestamp", notNull: true },
    isHired: { type: "boolean", default: false },
    createdAt: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });
};

exports.down = () => {
  // placeholder
};
