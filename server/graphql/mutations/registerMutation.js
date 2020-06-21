const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const User = require("../../models/user");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const { UserType } = require("../graphqlTypes/userType");

const Mutation = {
  registerAccount: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
      const { req } = context;
      if (req.isAuth == false) {
        throw new Error("please login");
      }
      try {
        const { email, password } = args;
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = await new User({ email: email, password: hash });
        return newUser.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = Mutation;
