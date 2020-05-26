const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } = graphql;

const Income = require("../../models/income");
const Expense = require("../../models/expense");
const BankMoney = require("../../models/bankMoney");
const { IncomeType, ProfitType } = require("../graphqlTypes/incomeType");

const incomeQueries = {
  getCustomerMoneyPaid: {
    type: new GraphQLList(IncomeType),
    args: {
      customerId: { type: GraphQLString }
    },
    async resolve(parent, args) {
      //
      const moneySpent = Income.find({ customerId: args.customerId });
      return moneySpent;
    }
  },
  getCustomerMoneyPaidByDate: {
    type: new GraphQLList(IncomeType),
    args: {
      customerId: { type: GraphQLString },
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const { customerId, fromDate, endDate } = args;
      const moneySpent = await Income.find({
        customerId: customerId,
        date: { $gte: new Date(fromDate), $lt: new Date(endDate) }
      });
      return moneySpent;
    }
  },
  getIncomeByMonth: {
    type: new GraphQLList(IncomeType),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const { fromDate, endDate } = args;
      const moneyMade = await Income.find({
        date: { $gte: new Date(fromDate), $lt: new Date(endDate) }
      }).sort({ date: -1 });
      return moneyMade;
    }
  },
  getTotalIncome: {
    type: new GraphQLList(IncomeType),
    async resolve(parent, args) {
      const moneyMade = await Income.find({}).sort({ date: -1 });
      return moneyMade;
    }
  },
  getProfitofAllTime: {
    type: ProfitType,
    async resolve(parent, args) {
      const conversionStage = {
        $addFields: {
          convertedAmount: { $toInt: "$amount" }
        }
      };

      const income = await Income.aggregate([
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      const expense = await Expense.aggregate([
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      const bankMoney = await BankMoney.aggregate([
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      return {
        income: (income[0] && income[0].amount) || 0,
        expense: (expense[0] && expense[0].amount) || 0,
        bankMoney: (bankMoney[0] && bankMoney[0].amount) || 0
      };
    }
  },
  getProfitByDate: {
    type: ProfitType,
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const { fromDate, endDate } = args;
      const conversionStage = {
        $addFields: {
          convertedAmount: { $toInt: "$amount" }
        }
      };
      const income = await Income.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromDate), $lte: new Date(endDate) }
          }
        },
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      const expense = await Expense.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromDate), $lte: new Date(endDate) }
          }
        },
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      const bankMoney = await BankMoney.aggregate([
        {
          $match: {
            date: { $gte: new Date(fromDate), $lte: new Date(endDate) }
          }
        },
        conversionStage,
        { $group: { _id: null, amount: { $sum: "$convertedAmount" } } }
      ]);

      const incomeAmount = (income[0] && income[0].amount) || 0;
      const expenseAmount = (expense[0] && expense[0].amount) || 0;
      const bankMoneyAmount = (bankMoney[0] && bankMoney[0].amount) || 0;

      return {
        income: incomeAmount,
        expense: expenseAmount,
        bankMoney: bankMoneyAmount
      };
    }
  }
};

module.exports = incomeQueries;
