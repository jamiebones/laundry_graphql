const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");
const Customer = require("../../models/customer");

const CustomerDetails = new GraphQLObjectType({
  name: "CustomerDetails",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) }
  })
});

const LaundryType = new GraphQLObjectType({
  name: "Laundry",
  fields: () => ({
    id: { type: GraphQLID },
    clothes: { type: GraphQLString },
    amount: { type: GraphQLString },
    number: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    customerId: { type: GraphQLString },
    clothesCollected: { type: GraphQLBoolean }
  })
});

const LaundryCustomers = new GraphQLObjectType({
  name: "LaundryCustomers",
  fields: () => ({
    id: { type: GraphQLID },
    clothes: { type: GraphQLString },
    amount: { type: GraphQLString },
    number: { type: GraphQLString },
    date: { type: GraphQLDateTime },
    customerId: { type: GraphQLString },
    clothesCollected: { type: GraphQLBoolean },
    //find out why the customer stuff is not working
    customer: {
      type: CustomerDetails,
      async resolve(parent, args) {
        const customer = await Customer.findOne({ _id: parent.customerId });
        return customer;
      }
    }
  })
});

module.exports = { LaundryType, LaundryCustomers };
