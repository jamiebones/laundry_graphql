import { gql } from "apollo-boost";

const saveCustomersDetails = gql`
  mutation newCustomer(
    $name: String!
    $title: String
    $contact: [String]
    $address: String
  ) {
    addCustomer(
      name: $name
      title: $title
      contact: $contact
      address: $address
    ) {
      name
    }
  }
`;

const saveManyCustomersDetails = gql`
  mutation addManyCustomers($customers: String) {
    addMultipleCustomers(customers: $customers) {
      total
    }
  }
`;

const saveIncomeDetails = gql`
  mutation addIncome($customerId: String!, $amount: String!, $date: String!) {
    addIncome(customerId: $customerId, amount: $amount, date: $date) {
      date
      amount
    }
  }
`;

const saveExpenseDetails = gql`
  mutation addExpenses(
    $description: String!
    $amount: String!
    $date: String!
  ) {
    addExpenses(description: $description, amount: $amount, date: $date) {
      date
      amount
    }
  }
`;

const saveLaundryDetails = gql`
  mutation addLaundry(
    $customerId: String!
    $amount: String!
    $date: String!
    $number: String!
    $clothes: String!
  ) {
    addLaundry(
      customerId: $customerId
      amount: $amount
      date: $date
      number: $number
      clothes: $clothes
    ) {
      date
      amount
      clothes
      date
    }
  }
`;

const collectClothes = gql`
  mutation markAsCollected($laundryId: String!) {
    markAsCollected(laundryId: $laundryId) {
      id
    }
  }
`;

const saveBankMoney = gql`
  mutation addBankMoney($amount: String!, $date: String!) {
    addBankMoney(amount: $amount, date: $date) {
      date
      amount
    }
  }
`;

export {
  saveCustomersDetails,
  saveManyCustomersDetails,
  saveIncomeDetails,
  saveLaundryDetails,
  saveExpenseDetails,
  collectClothes,
  saveBankMoney
};
