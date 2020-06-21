const graphql = require("graphql");
const { GraphQLString, GraphQLList } = graphql;
const Expense = require("../../models/expense");
const Laundry = require("../../models/laundry");
const { ExpenseLaundryType } = require("../graphqlTypes/expenseLaundryType");

const expenseLaundryQueries = {
  getExpensesAndLaundryByMonth: {
    type: new GraphQLList(ExpenseLaundryType),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString },
    },
    async resolve(parent, args, context) {
      const { fromDate, endDate } = args;
      const { req } = context;
      if (req.isAuth) {
        const moneySpent = await Expense.find({
          date: { $gte: new Date(fromDate), $lt: new Date(endDate) },
        }).sort({ date: -1 });

        const laundry = await Laundry.find({
          date: { $gte: fromDate, $lt: endDate },
        }).sort({ date: -1 });

        return [{ expenses: moneySpent, laundries: laundry }];
      } else {
        throw new Error("please login");
      }
    },
  },
};

module.exports = expenseLaundryQueries;

