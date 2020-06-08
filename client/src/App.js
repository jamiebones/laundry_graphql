import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Navigation from "./components/navbar";
import AddCustomers from "./components/addCustomers";
import UploadCustomers from "./components/uploadCustomersDetails";
import AddIncome from "./components/addIncome";
import Layout from "./components/layout";

import SaveIncome from "./components/saveIncome";
import AddLaundry from "./components/addLaundry";
import SaveLaundry from "./components/saveLaundry";
import AddExpense from "./components/saveExpense";
import ViewCustomerLaundry from "./components/viewCustomerLaundry";
import CustomersLaundry from "./components/CustomerLaundry";
import CustomersPayment from "./components/customerPayment";
import SearchCustomerPayment from "./components/viewCustomerPayments";
import ViewIncome from "./components/viewIncome";
import ViewExpense from "./components/viewExpense";
import ViewProfit from "./components/viewProfit";
import ViewClothesCollected from "./components/viewClothesCollected";
import AddBankMoney from "./components/saveBankMoney";
import ViewBankMoney from "./components/viewBankMoney";
import Debtors from "./components/getDebtors";
import ViewExpensesLaundryMade from "./components/viewExpenseLaundryMade";
import SendBulkSms from "./components/sendBulkSms";

// apollo client setup
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

const AppStyles = styled.div`
  .mainComponent {
    margin-top: 50px;
  }
`;

const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <AppStyles>
            <Navigation />

            <Switch>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mainComponent">
                      <Route component={AddCustomers} path="/add_customers" />
                      <Route
                        component={UploadCustomers}
                        path="/upload_customers"
                      />
                      <Route component={AddIncome} path="/add_income" />
                      <Route component={SaveIncome} path="/save_income" />
                      <Route component={SaveLaundry} path="/save_laundry" />
                      <Route component={AddLaundry} path="/add_laundry" />
                      <Route component={AddExpense} path="/add_expense" />
                      <Route
                        component={ViewCustomerLaundry}
                        path="/search_customer_laundry"
                      />
                      <Route
                        component={CustomersLaundry}
                        path="/view_laundry"
                      />
                      <Route
                        component={SearchCustomerPayment}
                        path="/search_payment"
                      />
                      <Route
                        component={CustomersPayment}
                        path="/view_payment"
                      />
                      <Route component={ViewIncome} path="/view_income" />
                      <Route component={ViewExpense} path="/view_expenses" />
                      <Route component={ViewProfit} path="/view_profit" />

                      <Route
                        component={ViewClothesCollected}
                        path="/view_clothes_collected"
                      />

                      <Route component={AddBankMoney} path="/add_bank_money" />
                      <Route
                        component={ViewBankMoney}
                        path="/view_money_in_bank"
                      />
                      <Route component={Debtors} path="/view_debtors" />

                      <Route
                        component={ViewExpensesLaundryMade}
                        path="/view_expense_monthly"
                      />

                      <Route
                        component={SendBulkSms}
                        path="/send_sms"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Switch>
          </AppStyles>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
