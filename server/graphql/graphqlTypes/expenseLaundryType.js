const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList} = graphql;
const {ExpenseType} = require("./expenseType");
const { LaundryCustomers } = require("./laundryType");

const ExpenseLaundryType = new GraphQLObjectType({
  name: "expenseLaundry",
  fields: () => ({
    id: { type: GraphQLID },
    expenses: { type: new GraphQLList(ExpenseType) },
    laundries: { type: new GraphQLList(LaundryCustomers) },
  })
});

module.exports = { ExpenseLaundryType };
