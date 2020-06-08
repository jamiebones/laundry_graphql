const Customers = require("../../models/customer");
const Laundry = require("../../models/laundry");
const Income = require("../../models/income");

const allCustomers = async () => {
  const customers = await Customers.find({}).lean();
  return customers;
};

const oneCustomer = async (id) => {
  const customer = await Customers.findById(id).lean();
  return customer;
};

const conversionStage = {
  $addFields: {
    convertedAmount: { $toInt: "$amount" },
  },
};

const alldebtorCustomers = async () => {
  const laundries = () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          Laundry.aggregate([
            conversionStage,
            {
              $group: {
                _id: "$customerId",
                amount: { $sum: "$convertedAmount" },
              },
            },
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
                amount: { $sum: "$convertedAmount" },
              },
            },
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
    for (let i = 0; i < laundryArray.length; i++) {
      const item = laundryArray[i];
      const customerPayment = paymentArray.find((e) => {
        return e._id == item._id;
      });

      if (customerPayment) {
        //we have a customer payment that matches with the laundry stuffs
        //check if the amount is the same
        if (customerPayment.amount != item.amount) {
          //debtor found
          //create new object to hold customerId laundryamount and customerPayment
          //get the customer here
          const customer = await oneCustomer(item._id);
          const newObject = {
            ...customer,
            customerId: item._id,
            laundryAmount: item.amount,
            paymentMade: customerPayment.amount,
          };
          debTorArray.push(newObject);
        }
      } else {
        const customer = await oneCustomer(item._id);
        const newObject = {
          ...customer,
          customerId: item._id,
          laundryAmount: item.amount,
          paymentMade: 0,
        };
        debTorArray.push(newObject);
      }
    }

    return debTorArray;
  } catch (error) {
    console.log(error);
  }
};

const debtorsOwingMoreThan5K = async () => {
  const customersOwing = await alldebtorCustomers();
  if (customersOwing.length) {
    //lets filter
    const fivethousandDebtors = customersOwing.filter((cust) => {
      return cust.laundryAmount - cust.paymentMade >= 5000;
    });

    return fivethousandDebtors;
  }
  return null;
};

const customersNotWashedForAWhile = async () => {
  let todayDate = new Date();
  let date30DaysAgo = todayDate.setDate(todayDate.getDate() - 30);
  const washingCustomers = await Laundry.find({
    date: { $gte: new Date(date30DaysAgo), $lt: new Date() },
  });
  const customers = await allCustomers();
  //filter and return customers not in laundry washing
  let customersNotWashing = [];
  for (let i = 0; i < customers.length; i++) {
    const cust = customers[i];
    let found = false;

    for (let j = 0; j < washingCustomers.length; j++) {
      const laundryCust = washingCustomers[j];
      if (laundryCust.customerId == cust._id) {
        found = true;
        break;
      }
      continue;
    }
    if (!found) {
      customersNotWashing.push(cust);
    }
  }
  return customersNotWashing;
};

const payingCustomers = async () => {
  const customers = await alldebtorCustomers();
  const payingCust = customers.filter((cust) => {
    return cust.laundryAmount == cust.paymentMade;
  });
  return payingCust;
};

module.exports = {
  allCustomers,
  alldebtorCustomers,
  debtorsOwingMoreThan5K,
  customersNotWashedForAWhile,
  payingCustomers,
};
