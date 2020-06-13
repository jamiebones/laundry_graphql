const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

//const isAuth = require("./middleware/is-auth");
const keys = require("./config/keys");
const mongoURI = keys.mongoURI;
//const prodMongoURI = keys.mongoProdURI;

const app = express();

app.use(cors());


mongoose.connect('mongodb+srv://jamiebones:blazing147@laundryshop-2y3sx.mongodb.net/laundry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("mongo db connected remotely");
})
.catch((err) => console.log(err));

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("mongo db connected");
//   })
//   .catch((err) => console.log(err));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("app listening on port 4000");
});
