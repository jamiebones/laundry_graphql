const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID,  } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");

const BankMoneyType = new GraphQLObjectType({
  name: "BankMoney",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDateTime },
    amount: { type: GraphQLString }
  })
});

module.exports = { BankMoneyType };
