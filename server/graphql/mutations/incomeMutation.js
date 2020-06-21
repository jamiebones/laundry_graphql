const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const Income = require("../../models/income");
const Customer = require("../../models/customer");

const { IncomeType, AddIncomeType } = require("../graphqlTypes/incomeType");

const Mutation = {
  addIncome: {
    type: AddIncomeType,
    args: {
      customerId: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLString },
      date: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
      //using mongoose to save the data here
      const { req } = context;
      if (req.isAuth == false) {
        throw new Error("please login");
      }
      try {
        //check if the id is a valid id
        const { customerId, amount, date } = args;
        await Customer.findById(customerId);
        let newIncome = await new Income({
          customerId,
          amount,
          date
        });
        return newIncome.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = Mutation;
