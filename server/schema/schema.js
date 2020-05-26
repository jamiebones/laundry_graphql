const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;

const rootQueries = require("../graphql/queries/index");
const rootMutation = require("../graphql/mutations/index");

const RootQuery = new GraphQLObjectType({
  name: "ROOTQueryType",
  fields: {
    ...rootQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...rootMutation
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
