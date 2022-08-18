/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  const TABLE = "customers";
  const customers = [
    { name: "Obi Wan", dob: new Date("2001-01-02"), ssn: "123-12-3123" },
    { name: "Qui-Gon Jinn", dob: new Date("1985-11-05"), ssn: "298-29-8298" },
  ];

  customers.forEach((customer) => {
    const { name, dob, ssn } = customer;
    pgm.sql(`INSERT INTO public.${TABLE} (name, dob, ssn) VALUES ('${name}', '${dob.toUTCString()}', '${ssn}');`);
  });
};

exports.down = () => {
  // placeholder
};
