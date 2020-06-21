const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = graphql;

const Expense = require("../../models/expense");
const { ExpenseType } = require("../graphqlTypes/expenseType");

const incomeQueries = {
  getExpenseByMonth: {
    type: new GraphQLList(ExpenseType),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
      const { req } = context;
      if (req.isAuth) {
        const { fromDate, endDate } = args;
        const moneySpent = await Expense.find({
          date: { $gte: new Date(fromDate), $lt: new Date(endDate) },
        }).sort({ date: -1 });
        return moneySpent;
      } else {
        throw new Error("please login");
      }
    },
  },
  getTotalExpense: {
    type: new GraphQLList(ExpenseType),
    async resolve(parent, args, context) {
      const { req } = context;
      if (req.isAuth) {
        const moneySpent = await Expense.find({}).sort({ date: -1 });
        return moneySpent;
      } else {
        throw new Error("please login");
      }
    },
  },
};

module.exports = incomeQueries;

