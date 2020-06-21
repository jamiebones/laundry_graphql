import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import Cookies from "js-cookie";

import client from "./apolloClient";

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
import BalanceMoney from "./components/balanceMoney";
import LoginPage from "./components/login";

import AuthContext from "./context/authContext";

import { Login } from "./graphql/mutation";
const store = require("store");

const AppStyles = styled.div`
  .mainComponent {
    margin-top: 50px;
  }
`;

const App = (props) => {
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //check for a token value here by running a query
    const token = store.get("authToken");
    console.log(token);
    let user = store.get("currentUser");
    if (token) {
      setToken(token);
      setAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  const loginFunction = ({ userId, token, email }) => {
    //call the mutation here and verify if we are all
    if (token) {
      setToken(token);
      setAuthenticated(true);
      setCurrentUser({ userId, email });
    }
  };

  const logoutFunction = () => {
    //call the mutation here and verify if we are all
    setToken("");
    setAuthenticated(false);
    setCurrentUser({});
    store.set("authToken", "");
    store.set("currentUser", {});
    client.resetStore();
  };
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider
        value={{
          token: token,
          login: loginFunction,
          logout: logoutFunction,
          authenticated: authenticated,
        }}
      >
        <Router>
          <Layout>
            <AppStyles>
              <Navigation
                token={token}
                authenticated={authenticated}
                currentUser={currentUser}
                logoutFunction={logoutFunction}
              />

              <Switch>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mainComponent">
                        <Route
                          exact
                          path="/login"
                          render={(props) => (
                            <LoginPage {...props} loginFunction={loginFunction} />
                          )}
                        />
                
                          <React.Fragment>
                            <Route
                              component={AddCustomers}
                              path="/add_customers"
                            />
                            <Route
                              component={UploadCustomers}
                              path="/upload_customers"
                            />
                            <Route component={AddIncome} path="/add_income" />
                            <Route component={SaveIncome} path="/save_income" />
                            <Route
                              component={SaveLaundry}
                              path="/save_laundry"
                            />
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
                            <Route
                              component={ViewExpense}
                              path="/view_expenses"
                            />
                            <Route component={ViewProfit} path="/view_profit" />

                            <Route
                              component={ViewClothesCollected}
                              path="/view_clothes_collected"
                            />

                            <Route
                              component={AddBankMoney}
                              path="/add_bank_money"
                            />
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
                              component={BalanceMoney}
                              path="/view_balance"
                            />

                            <Route component={SendBulkSms} path="/send_sms" />
                          </React.Fragment>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </Switch>
            </AppStyles>
          </Layout>
        </Router>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};


export default App;
