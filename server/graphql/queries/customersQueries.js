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
    resolve(parent, args, context ) {
      //code to get data from the database
      const { req } = context;
      if (req.isAuth ){
        return Customer.find();
      }
      else{
        throw new Error("please login")
      }
      
    }
  },
  findCustomersByName: {
    type: new GraphQLList(CustomerType),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args, context ) {
      const queryName = args.name;

      const { req } = context;
      if (req.isAuth ){
        try {
          const customerData = await Customer.find({
            name: { $regex: queryName, $options: "i" }
          });
          return customerData;
        } catch (error) {
          console.log(error);
        }
      }
      else{
        throw new Error("please login")
      }
     
      
    }
  }
};

module.exports = customerQueries;
