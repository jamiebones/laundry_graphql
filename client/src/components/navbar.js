import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarStyles = styled.div`

  .navbar-light{
    background-color: #e3f2fd;
  }
  .header-nav {
     
  }
`;
const Navbar = () => {
  return (
    <NavbarStyles>
      <div className="header-nav">
        <div>
          <div>
            <header>
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">
                  Laundry Shop
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown2"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Customers
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown2"
                      >
                        <NavLink
                          exact
                          to="/upload_customers"
                          className="dropdown-item"
                        >
                          Upload Customers
                        </NavLink>

                        <div className="dropdown-divider"></div>
                        <NavLink
                          exact
                          to="/add_customers"
                          className="dropdown-item"
                        >
                          Add Customers
                        </NavLink>

                        <NavLink
                          exact
                          to="/search_customer_laundry"
                          className="dropdown-item"
                        >
                          Search Customer Laundry
                        </NavLink>

                        <NavLink
                          exact
                          to="/search_payment"
                          className="dropdown-item"
                        >
                          Customer Payment
                        </NavLink>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Laundry
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <NavLink
                          exact
                          to="/add_laundry"
                          className="dropdown-item"
                        >
                          Save Laundry
                        </NavLink>

                        <div className="dropdown-divider"></div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <NavLink exact to="/add_income" className="nav-link">
                        Add Income
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/add_expense" className="nav-link">
                        Add Expense
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/add_bank_money" className="nav-link">
                        Add Bank Money
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/view_income" className="nav-link">
                        View Income
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/view_expenses" className="nav-link">
                        View Expenses
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/view_profit" className="nav-link">
                        View Profit
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/view_money_in_bank"
                        className="nav-link"
                      >
                        View Money in Bank
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/view_clothes_collected"
                        className="nav-link"
                      >
                        Clothes Collected
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/view_debtors" className="nav-link">
                        Debtors
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/view_expense_monthly" className="nav-link">
                        Details
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink exact to="/send_sms" className="nav-link">
                        Send Sms
                      </NavLink>
                    </li>


                  </ul>
                </div>
              </nav>
            </header>
          </div>
        </div>
      </div>
    </NavbarStyles>
  );
};

export default Navbar;
