const graphql = require("graphql");
const { GraphQLList } = graphql;

const Income = require("../../models/income");
const Laundry = require("../../models/laundry");
const { DebtorType } = require("../graphqlTypes/debtorType");

const conversionStage = {
  $addFields: {
    convertedAmount: { $toInt: "$amount" }
  }
};

const debtorQueries = {
  debtors: {
    type: new GraphQLList(DebtorType),
    async resolve(parent, args) {
      const laundries = () => {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              Laundry.aggregate([
                conversionStage,
                {
                  $group: {
                    _id: "$customerId",
                    amount: { $sum: "$convertedAmount" }
                  }
                }
              ])
            );
          } catch (error) {
            reject(error);
          }
        });
      };

      const payment = () => {
        return new Promise((resolve, reject) => {
          try {
            resolve(
              Income.aggregate([
                conversionStage,
                {
                  $group: {
                    _id: "$customerId",
                    amount: { $sum: "$convertedAmount" }
                  }
                }
              ])
            );
          } catch (error) {
            reject(error);
          }
        });
      };

      try {
        const result = await Promise.all([laundries(), payment()]);
        //lets do some filtering operations here
        const laundryArray = result[0];
        const paymentArray = result[1];
        let debTorArray = [];
        laundryArray.map(item => {
          const customerPayment = paymentArray.find(e => {
            return e._id == item._id;
          });
          if (customerPayment) {
            //we have a customer payment that matches with the laundry stuffs
            //check if the amount is the same
            if (customerPayment.amount != item.amount) {
              //debtor found
              //create new object to hold customerId laundryamount and customerPayment
              const newObject = {
                customerId: item._id,
                laundryAmount: item.amount,
                paymentMade: customerPayment.amount
              };
              debTorArray.push(newObject);
            }
          } else {
            const newObject = {
              customerId: item._id,
              laundryAmount: item.amount,
              paymentMade: 0
            };
            debTorArray.push(newObject);
          }
        });
        return debTorArray;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = debtorQueries;
