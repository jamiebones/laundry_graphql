const graphql = require("graphql");
const { GraphQLString, GraphQLList,  } = graphql;

const BankMoney = require("../../models/bankMoney");
const { BankMoneyType } = require("../graphqlTypes/bankMoneyType");

const bankMoneyQueries = {
  getMoneyInBankByMonth: {
    type: new GraphQLList(BankMoneyType),
    args: {
      fromDate: { type: GraphQLString },
      endDate: { type: GraphQLString }
    },
    async resolve(parent, args, context ) {
      const { req } = context; 
      if ( req.isAuth ){
        const { fromDate, endDate } = args;
      
        const moneyInBank = await BankMoney.find({
          date: { $gte: new Date(fromDate), $lt: new Date(endDate) }
        }).sort({ date: -1 });
        return moneyInBank;
      }
      else{
        throw new Error('please login')
      }
     
    }
  },
  getTotalBankMoney: {
    type: new GraphQLList(BankMoneyType),
    async resolve(parent, args, context )
     {
       const { req } = context;
      if (req.isAuth){
        const moneyInBank = await BankMoney.find({}).sort({ date: -1 });
        return moneyInBank;
      }
      else{
        throw new Error('please log in')
      }
     
    }
  }
};

module.exports = bankMoneyQueries;
