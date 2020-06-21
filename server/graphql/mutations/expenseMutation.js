const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const Expense = require("../../models/expense");

const { ExpenseType } = require("../graphqlTypes/expenseType");

const Mutation = {
  addExpenses: {
    type: ExpenseType,
    args: {
      description: { type: GraphQLString },
      amount: { type: GraphQLString },
      date: { type: GraphQLString }
    },
    async resolve(parent, args, context ) {
      //using mongoose to save the data here
      const { req } = context;
      if (req.isAuth == false) {
        throw new Error("please login");
      }
      try {
        //check if the id is a valid id
        const { description, amount, date } = args;
        let newExpense = await new Expense({
          description,
          amount,
          date
        });
        return newExpense.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = Mutation;
