const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/user");
const cookieParser = require("cookie-parser");

const { UserType } = require("../graphqlTypes/userType");

const Mutation = {
  loginplease: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        const { email, password } = args;
        let emailAddress = email.toLowerCase();
        const theUser = await users.find({ email: emailAddress });

        if (!theUser) {
          res.status(404).send({
            success: false,
            message: `Could not find account: ${email}`,
          });
          return;
        }

        const match = await bcrypt.compare(password, theUser[0].password);
        if (!match) {
          //return error to user to let them know the password is incorrect
          res.status(401).send({
            success: false,
            message: "Incorrect credentials",
          });
          return;
        }

        const token = jwt.sign(
          { email: theUser.email, userId: theUser._id },
          secretOrKey
        );

        res.cookie("jwt", token, {
          httpOnly: true,
          //secure: true, //on HTTPS
          //domain: 'example.com', //set your domain
        });

        res.send({
          success: true,
        });
        return {
            email: email,
            userId: theUser._id,
            token: token
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = Mutation;
