/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("customers", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("uuid_generate_v4 ()") },
    name: { type: "varchar(1000)", notNull: true },
    ssn: { type: "varchar(11)" },
    dob: { type: "timestamp" },
    isHired: { type: "boolean" },
    createdAt: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });

  // pgm.createTable("users", {
  //   id: "id",
  //   name: { type: "varchar(1000)", notNull: true },
  //   createdAt: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  // });

  //   pgm.createTable("posts", {
  //     id: "id",
  //     userId: { type: "integer", notNull: true, references: '"users"', onDelete: "cascade" },
  //     body: { type: "text", notNull: true },
  //     createdAt: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  //   });
  //   pgm.createIndex("posts", "userId");
};

exports.down = () => {
  // placeholder
};
