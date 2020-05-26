const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Customer = require("../../models/customer");
const { CustomerType } = require("./customerType");
const { GraphQLDateTime } = require("graphql-iso-date");

const IncomeType = new GraphQLObjectType({
  name: "Income",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDateTime },
    amount: { type: GraphQLString },
    customerId: { type: GraphQLString },
    customer: {
      type: new GraphQLList(CustomerType),
      async resolve(parent, args) {
        //get a list of all the clothes the person has washed
        const customer = await Customer.find({ _id: parent.customerId });
        console.log(customer);
        return customer;
      }
    }
  })
});

const AddIncomeType = new GraphQLObjectType({
  name: "AddIncome",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDateTime },
    amount: { type: GraphQLString },
    customerId: { type: GraphQLString }
  })
});

const ProfitType = new GraphQLObjectType({
  name: "Profit",
  fields: () => ({
    income: { type: GraphQLString },
    expense: { type: GraphQLString },
    bankMoney: { type: GraphQLString }
  })
});

module.exports = { IncomeType, AddIncomeType, ProfitType };
