const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const Customer = require("../../models/customer");
const { CustomerType } = require("../graphqlTypes/customerType");

const customerQueries = {
  customers: {
    type: new GraphQLList(CustomerType),
    resolve(parent, args) {
      //code to get data from the database
      return Customer.find();
    }
  },
  findCustomersByName: {
    type: new GraphQLList(CustomerType),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
      const queryName = args.name;
      try {
        const customerData = await Customer.find({
          name: { $regex: queryName, $options: "i" }
        });
        return customerData;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = customerQueries;
