import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/react-hooks";
import { saveExpenseDetails } from "../graphql/mutation";
import CurrencyInput from "react-currency-input";
import moment from "moment";

import { RemoveBracket } from "../module/utility";

const SaveExpenseStyles = styled.div`
  .label-display {
    display: block;
    padding: 5px 0;
  }

  textarea {
    margin-bottom: 30px;
  }

  input:nth-child(2) {
    width: 28%;
  }

  .holding {
    background: #561677;
    padding: 30px;
    margin-top: 40px;
    color: #fff;
  }
`;

const SaveExpense = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState(" ");
  const [amount, setAmount] = useState(" ");

  const [saveExpenseAmount, { loading, error }] = useMutation(
    saveExpenseDetails
  );

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleAmountChange = (event, maskedvalue, floatvalue) => {
    setAmount(maskedvalue);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confimSaved = window.confirm(`please confirm the following information
                                          Description: ${description}
                                          Amount: ${amount}
                                          Date: ${moment(startDate).format(
                                            "dddd, MMMM Do YYYY"
                                          )} `);
      if (!confimSaved) return;
      await saveExpenseAmount({
        variables: {
          description: description,
          amount: RemoveBracket(amount),
          date: moment(startDate).format("DD-MMM-YYYY"),
        },
      });
      //clear the data
      setStartDate(new Date());
      setAmount(" ");
      setDescription(" ");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SaveExpenseStyles>
      <div className="row">
        <div className="offset-3 col-md-6">
          <div className="holding">
            <p className="text-center lead">Add Expenses</p>
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            <form>
              <div className="form-group">
                <label htmlFor="paymentDate" className="label-display">
                  date:{" "}
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  id="paymentDate"
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
                  id="amount"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="label-display">
                  description:{" "}
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="4"
                  placeholder="enter expense details"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
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
    </SaveExpenseStyles>
  );
};

export default SaveExpense;
