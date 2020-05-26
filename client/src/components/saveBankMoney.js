import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/react-hooks";
import { saveBankMoney } from "../graphql/mutation";
import CurrencyInput from "react-currency-input";
import moment from "moment";

import { RemoveBracket } from "../module/utility";

const SaveIncomeStyles = styled.div`
  .label-display {
    display: block;
    padding: 5px 0;
  }

  textarea {
    margin-bottom: 30px;
  }

  input:nth-child(2) {
    width: 30%;
    margin: auto;
  }

  .holding {
    background: #561677;
    padding: 30px;
    margin-top: 90px;
    color: #fff;
  }
  .btn {
    margin-top: 20px;
  }
  h4 {
    margin-bottom: 10px;
  }
`;

const SaveBankMoney = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [amount, setAmount] = useState(" ");

  const [saveBankAmount, { loading, error }] = useMutation(saveBankMoney);

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleAmountChange = (event, maskedvalue, floatvalue) => {
    setAmount(maskedvalue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confimSaved = window.confirm(`please confirm the following information
                                          Amount: ${amount}
                                          Date: ${moment(startDate).format(
                                            "dddd, MMMM Do YYYY"
                                          )} `);
      if (!confimSaved) return;
      await saveBankAmount({
        variables: {
          amount: RemoveBracket(amount),
          date: moment(startDate).format("DD-MMM-YYYY"),
        },
      });
      //clear the data
      setStartDate(new Date());
      setAmount(" ");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SaveIncomeStyles>
      <div className="row">
        <div className="offset-3 col-md-6">
          <div className="holding text-center">
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            <h4>Add Money Paid To The Bank</h4>

            <form>
              <div className="form-group">
                <label htmlFor="paymentDate" className="label-display">
                  date:{" "}
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="label-display">
                  amount:{" "}
                </label>
                <CurrencyInput
                  value={amount}
                  onChangeEvent={handleAmountChange}
                  precision="2"
                  className="form-control"
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </SaveIncomeStyles>
  );
};

export default SaveBankMoney;
