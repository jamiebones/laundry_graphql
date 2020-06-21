const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    userId: { type: GraphQLID },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = { UserType };
