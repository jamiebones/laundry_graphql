const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLFloat } = graphql;
const BankMoney = require("../../models/bankMoney");

const { BankMoneyType } = require("../graphqlTypes/bankMoneyType");

const Mutation = {
  addBankMoney: {
    type: BankMoneyType,
    args: {
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
        const { amount, date } = args;
        let newBankMoney = await new BankMoney({
          amount,
          date
        });
        return newBankMoney.save();
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};

module.exports = Mutation;
