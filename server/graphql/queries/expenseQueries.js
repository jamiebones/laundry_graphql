const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = graphql;

const Expense = require("../../models/expense");
const { ExpenseType } = require("../graphqlTypes/expenseType");

const incomeQueries = {
  getExpenseByMonth: {
    type: new GraphQLList(ExpenseType),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const { fromDate, endDate } = args;
      const moneySpent = await Expense.find({
        date: { $gte: new Date(fromDate), $lt: new Date(endDate) }
      }).sort({ date: -1 });
      return moneySpent;
    }
  },
  getTotalExpense: {
    type: new GraphQLList(ExpenseType),
    async resolve(parent, args) {
      const moneySpent = await Expense.find({}).sort({ date: -1 });
      return moneySpent;
    }
  }
};

module.exports = incomeQueries;
