/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("customers", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("uuid_generate_v4 ()") },
    name: { type: "varchar(1000)", notNull: true },
    ssn: { type: "varchar(11)" },
    dob: { type: "timestamp", notNull: true },
    createdAt: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });

  // pgm.createIndex("customers", "id");
};

exports.down = () => {
  // placeholder
};

// SELECT x.* FROM public.customers x WHERE x.id IN ('b5e179be-2936-4404-b18c-fcf215b368ff'::uuid)
