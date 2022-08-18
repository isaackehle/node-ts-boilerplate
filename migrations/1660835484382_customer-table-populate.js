/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  const TABLE = "customers";
  const customers = [
    { name: "Obi Wan", dob: new Date("2001-01-02"), isHired: false, ssn: "123-12-3123" },
    { name: "Qui-Gon Jinn", dob: new Date("1985-11-05"), isHired: false, ssn: "298-29-8298" },
  ];

  customers.forEach((customer) => {
    const { name, dob, isHired, ssn } = customer;
    pgm.sql(`INSERT INTO public.${TABLE} (name, dob, isHired, ssn) VALUES ('${name}', '${dob.toUTCString()}', ${isHired}, '${ssn}');`);
  });
};

exports.down = () => {
  // placeholder
};
