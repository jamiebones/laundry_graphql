const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const isAuth = require("./is-auth");
const cookieParser = require('cookie-parser')
const route = require("./routes/login");

const corsOptions = {
  origin: 'http://localhost:3000',
 // origin: "https://laundryshop.herokuapp.com" ,//change with your own client URL
 // credentials: true
}


const app = express();
app.use(morgan("combined"));
app.use(cors(corsOptions));
//app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://jamiebones:blazing147@laundryshop-2y3sx.mongodb.net/laundry",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
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
app.use(isAuth);
app.use(cookieParser())
app.use("/graphql", (req, res ) =>
  graphqlHTTP({
    schema,
    graphiql: true,
    context: { req }
  })(req, res)
);

if (process.env.NODE_ENV === "production") {
  console.log("production mode")
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port , () => {
  console.log(`app listening on port ${port}`);
});
