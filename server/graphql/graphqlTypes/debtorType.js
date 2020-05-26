const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Customer = require("../../models/customer");
const { CustomerDetails } = require("./customerType");

const DebtorType = new GraphQLObjectType({
  name: "Debtor",
  fields: () => ({
    customerId: { type: GraphQLID },
    customer: {
      type: CustomerDetails,
      async resolve(parent, args) {
        //get a list of all the clothes the person has washed
        const customer = await Customer.findOne({ _id: parent.customerId });
        return customer;
      }
    },
    laundryAmount: { type: GraphQLString },
    paymentMade: { type: GraphQLString }
  })
});

module.exports = { DebtorType };
