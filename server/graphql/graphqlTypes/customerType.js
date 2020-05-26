const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;
const Laundry = require("../../models/laundry");
const { LaundryType } = require("./laundryType");

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) },
    laundry: {
      type: new GraphQLList(LaundryType),
      async resolve(parent, args) {
        //get a list of all the clothes the person has washed
        const laundry = await Laundry.find({ customerId: parent.id });
        return laundry;
      }
    }
  })
});

const CustomerDetails = new GraphQLObjectType({
  name: "CustomerDetailsType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) }
  })
});

const AddCustomerType = new GraphQLObjectType({
  name: "addCustomer",
  fields: () => ({
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: new GraphQLList(GraphQLString) }
  })
});

const AddMultipleCustomerType = new GraphQLObjectType({
  name: "addMultipleCustomer",
  fields: () => ({
    total: { type: GraphQLString }
  })
});
module.exports = {
  CustomerType,
  AddCustomerType,
  CustomerDetails,
  AddMultipleCustomerType
};
