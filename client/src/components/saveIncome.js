import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/react-hooks";
import { saveIncomeDetails } from "../graphql/mutation";
import CurrencyInput from "react-currency-input";
import moment from "moment";

import { RemoveBracket } from "../module/utility";

const SaveIncomeStyles = styled.div`
  .input-label {
    padding: 10px 0px 10px;
    display: block;
    font-size: 15px;
  }

  input:nth-child(2) {
    width: 50%;
    margin: auto;
  }

  .btn-submit {
    margin-top: 20px;
  }
  .holding-div {
    background-color: #561677;
    padding: 50px;
    margin-top: 40px;
    color: #fff;
  p > span{
    font-size: 15px;
    font-weight: bold;
  }
`;

const SaveIncome = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const { customerId, name } = props.location.state;
  const [amount, setAmount] = useState("");

  const [saveIncomeAmount, { loading, error }] = useMutation(saveIncomeDetails);

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleAmountChange = (event, maskedvalue, floatvalue) => {
    setAmount(maskedvalue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmSave = window.confirm(`Please confirm the following information
      Customer: ${name}
      Amount: ${amount}
      Date: ${moment(startDate).format("dddd, MMMM Do YYYY")} 
     `);
      if (!confirmSave) return;
      await saveIncomeAmount({
        variables: {
          customerId: customerId,
          amount: RemoveBracket(amount),
          date: moment(startDate).format("DD-MMM-YYYY"),
        },
      });
      //clear the data
      setStartDate(new Date());
      setAmount(" ");
      alert("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SaveIncomeStyles>
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <div className="holding-div text-center">
            <p>
              Enter payment details for : <span>{name}</span>
            </p>

            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}

            <form>
              <div className="form-group">
                <label htmlFor="paymentDate" className="input-label">
                  payment date:{" "}
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  id="paymentDate"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="input-label">
                  amount:{" "}
                </label>
                <CurrencyInput
                  value={amount}
                  onChangeEvent={handleAmountChange}
                  precision="2"
                  className="form-control"
                  id="amount"
                />
              </div>

              <button
                className="btn btn-primary btn-submit"
                type="submit"
                onClick={handleSubmit}
              >
                Save Customer Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </SaveIncomeStyles>
  );
};

export default SaveIncome;
