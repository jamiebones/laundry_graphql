import { gql } from "apollo-boost";

const findCustomersByName = gql`
  query customers($name: String!) {
    findCustomersByName(name: $name) {
      name
      title
      contact
      id
      address
      laundry {
        clothes
      }
    }
  }
`;

const getCustomersLaundry = gql`
  query customersLaundry($customerId: String!) {
    customersLaundry(customerId: $customerId) {
      clothes
      amount
      date
      id
      clothesCollected
      number
    }
  }
`;

const Customer_payment = gql`
  query getCustomerMoneyPaid($customerId: String!) {
    getCustomerMoneyPaid(customerId: $customerId) {
      date
      amount
    }
  }
`;

const Customer_payment_Date = gql`
  query getCustomerMoneyPaidByDate(
    $customerId: String!
    $fromDate: String!
    $endDate: String
  ) {
    getCustomerMoneyPaidByDate(
      customerId: $customerId
      fromDate: $fromDate
      endDate: $endDate
    ) {
      date
      amount
    }
  }
`;

const AllIncome = gql`
  query getAllIncome {
    getTotalIncome {
      date
      amount
      customer {
        name
        contact
        title
      }
    }
  }
`;

const AllExpense = gql`
  query getAllExpense {
    getTotalExpense {
      date
      amount
      description
    }
  }
`;

const Expense_By_Date = gql`
  query expenseByDate($fromDate: String!, $endDate: String) {
    getExpenseByMonth(fromDate: $fromDate, endDate: $endDate) {
      date
      amount
      description
    }
  }
`;

const Income_By_Date = gql`
  query incomePaidByDate($fromDate: String!, $endDate: String) {
    getIncomeByMonth(fromDate: $fromDate, endDate: $endDate) {
      date
      amount
      customer {
        name
        contact
        title
      }
    }
  }
`;

const Profit_By_Date = gql`
  query profitByDate($fromDate: String!, $endDate: String) {
    getProfitByDate(fromDate: $fromDate, endDate: $endDate) {
      income
      expense
      bankMoney
    }
  }
`;

const Balance_Money_Left = gql`
  query balanceMoney($fromDate: String!, $endDate: String) {
    getBalanceMoneyLeft(fromDate: $fromDate, endDate: $endDate) {
      income
      expense
      bankMoney
    }
  }
`;




const All_Time_Profit = gql`
  query allTimeProfit {
    getProfitofAllTime {
      income
      expense
      bankMoney
    }
  }
`;

const AllLaundry = gql`
  query getLaundryCollectedOrNot($clothesCollected: Boolean!) {
    getLaundryCollectedOrNot(clothesCollected: $clothesCollected) {
      clothes
      amount
      number
      date
      clothesCollected
      customer {
        name
        contact
      }
    }
  }
`;

const FilterLaundryByDate = gql`
  query getLaundryCollectedOrNotByDate(
    $clothesCollected: Boolean!
    $fromDate: String
    $endDate: String
  ) {
    getLaundryCollectedOrNotByDate(
      clothesCollected: $clothesCollected
      fromDate: $fromDate
      endDate: $endDate
    ) {
      clothes
      amount
      number
      date
      clothesCollected
      customer {
        name
        contact
      }
    }
  }
`;

const BankMoney_By_Date = gql`
  query BankMoneyByDate($fromDate: String!, $endDate: String) {
    getMoneyInBankByMonth(fromDate: $fromDate, endDate: $endDate) {
      date
      amount
    }
  }
`;

const All_Time_BankMoney = gql`
  query allTimeBankMoney {
    getTotalBankMoney {
      date
      amount
    }
  }
`;

const Get_Debtors = gql`
  query allDebtors {
    debtors {
      customerId
      customer {
        name
        title
      }
      laundryAmount
      paymentMade
    }
  }
`;

const Send_BulkMessage = gql`
  query sendBulkSms(
    $message: String!
    $customerType: String!
    $returnType: String!
  ) {
    sendMessage(
      message: $message
      customerType: $customerType
      returnType: $returnType
    ) {
      msg
    }
  }
`;

//

const expense_laundry_details = gql`
  query getExpensesAndLaundryByMonth($fromDate: String!, $endDate: String) {
    getExpensesAndLaundryByMonth(fromDate: $fromDate, endDate: $endDate) {
      expenses {
        amount
        description
        date
      }
      laundries {
        customer {
          name
        }
        amount
        clothes
        date
        number
      }
    }
  }
`;

const Login = gql`
  query login($email: String, $password: String) {
    login(email: $email, password: $password) {
      userId
      token
      email
    }
  }
`;

export {
  Send_BulkMessage,
  findCustomersByName,
  getCustomersLaundry,
  Customer_payment,
  Customer_payment_Date,
  AllIncome,
  Income_By_Date,
  AllExpense,
  Expense_By_Date,
  Profit_By_Date,
  All_Time_Profit,
  AllLaundry,
  FilterLaundryByDate,
  BankMoney_By_Date,
  All_Time_BankMoney,
  Get_Debtors,
  expense_laundry_details,
  Balance_Money_Left,
  Login
};
