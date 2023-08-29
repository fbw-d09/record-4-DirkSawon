require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/users.js');
const orders = require('./routes/orders.js');
const records = require('./routes/records.js');

const User = require('./models/User.js');

const { connect, closeConnection } = require('./configs/db.js');

const app = express();

const Chance = require('chance');
const chance = new Chance();

// Read parameters for db initialization options:
const [ node, script, ...args ] = process.argv;
// Check for args:
if (args[0] === "init" && args[1] === "-db") {
    // initialize db via Chance generated random data...

    // write function to return object:
    /* const chanceFirstname = chance.first();
    const chanceLastname = chance.last();
    const chanceCompany = chance.company().replace(' ', '');
    const chanceEmail = `${ chanceFirstname }.${ chanceLastname }@provider.${ chance.country().toLowerCase() }`;
    const chancePassword = chance.string({ length: 10 });

    console.log("random firstname:", chanceFirstname);
    console.log("random lastname:", chanceLastname);
    console.log("random company:", chanceCompany);
    console.log("random email:", chanceEmail);
    console.log("random pw:", chancePassword); */

    // Script from Faker tutorial:

    // Maybe use config/db.js instead:
    const connectDB = async () => {
        try {
          await mongoose.connect(`${ process.env.DB_URL }${ process.env.DB_NAME }`);
          console.log("connected to db");
        } catch (error) {
          console.error(error);
        }
      };
    connectDB();

    const generateUsers = (num) => {
        const user = [];
      
        for (let i = 0; i < num; i++) {
          const id = i+1;
          const firstname = chance.first();
          const lastname = chance.last();
          const email = chance.email();
          const password = chance.string({ length: 10 });

          /* const fullName = faker.name.firstName();
          const ratings = faker.datatype.number({ min: 1, max: 5 });
          const reviews = faker.lorem.sentences(3);
          const location = faker.lorem.sentences(1);
          const password = faker.datatype.number();
          const email = faker.internet.email();
          const category = faker.commerce.department();
          const createdAt = faker.date.past(); */
      
          user.push({
            id,
            firstname,
            lastname,
            email,
            password,
          });
        }
      
        return user;
      };

      const user = generateUsers(50);

      User.insertMany(user)
        .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
        .catch(err => {
            console.error(err);
            console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
  });
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", users);
app.use("/orders", orders);
app.use("/records", records);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server läuft auf port ${ port }`);
});
