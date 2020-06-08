const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID,  } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDateTime },
    amount: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

module.exports = { ExpenseType };
