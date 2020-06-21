const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/user");
const cookieParser = require("cookie-parser");

const { UserType } = require("../graphqlTypes/userType");

const { secretOrKey } = require("../../config/keys");

const authQueries = {
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
      //const { req, res } = object;

      try {
        const { email, password } = args;
        let emailAddress = email.toLowerCase();
        const theUser = await users.findOne({ email: emailAddress });

        if (!theUser) {
          throw new Error(`Could not find account: ${email}`);
        }

        const match = await bcrypt.compare(password, theUser.password);
        if (!match) {
          //return error to user to let them know the password is incorrect
          throw new Error(`Incorrect credentials`);
        }

        const token = jwt.sign(
          { email: theUser.email, userId: theUser.id },
          secretOrKey
        );

        // res.cookie("jwt", token, {
        //   httpOnly: true,
        //   //secure: true, //on HTTPS
        //   //domain: 'example.com', //set your domain
        // });

        // res.send({
        //   success: true,
        // });
        return {
          email: email,
          userId: theUser.id,
          token: token,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = authQueries;
