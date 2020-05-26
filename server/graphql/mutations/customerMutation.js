const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType
} = graphql;

const Customer = require("../../models/customer");
const {
  CustomerType,
  AddCustomerType,
  AddMultipleCustomerType
} = require("../graphqlTypes/customerType");

const Mutation = {
  addCustomer: {
    type: AddCustomerType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: GraphQLString },
      address: { type: GraphQLString },
      contact: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(parent, args) {
      //using mongoose to save the data here
      try {
        let newCustomer = await new Customer({
          name: args.name,
          title: args.title,
          address: args.address,
          contact: args.contact
        });
        return newCustomer.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  addMultipleCustomers: {
    type: AddMultipleCustomerType,
    args: {
      customers: { type: GraphQLString }
    },
    async resolve(parent, args) {
      try {
        //the customers is coming in as a JSON string so we need to parse it
        const parsedCustomers = JSON.parse(args.customers);
        const doc = await Customer.collection.insertMany(parsedCustomers);
        const total = doc.length;
        return total;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = Mutation;
