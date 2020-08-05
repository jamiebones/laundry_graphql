import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/react-hooks";
import { saveLaundryDetails } from "../graphql/mutation";
import CurrencyInput from "react-currency-input";
import { RemoveBracket } from "../module/utility";
import moment from "moment";

const SaveIncomeStyles = styled.div``;

const SaveIncome = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const { customerId, name } = props.location.state;
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [number, setNumber] = useState(" ");

  const [
    saveLaundry,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(saveLaundryDetails);

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleAmountChange = (event, maskedvalue, floatvalue) => {
    setAmount(maskedvalue);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (number == "") return;
      if (description == "") return;
      if (amount == "") return;
      const confirmValues = window.confirm(`please confirm the following values
      Amount: ${amount}
      Date: ${moment(startDate).format("dddd, MMMM Do YYYY")} 
      Description : ${description}
      Number : ${number}`);

      if (!confirmValues) return;
      await saveLaundry({
        variables: {
          customerId: customerId,
          amount: RemoveBracket(amount),
          date: moment(startDate).format("DD-MMM-YYYY"),
          clothes: description,
          number: number,
          clothesCollected: false,
        },
      });
      //clear the data
      setStartDate(new Date());
      setAmount(" ");
      setDescription(" ");
      setNumber(" ");
      alert("laundry details saved");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SaveIncomeStyles>
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <p>Entering clothes details for : </p>

          <p>Name : {name}</p>
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error : {mutationError.message}</p>}
          <form>
            <div className="form-group">
              <label htmlFor="paymentDate">payment date: </label>
              <DatePicker
                selected={startDate}
                onChange={handleChange}
                id="paymentDate"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>clothes description: </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="enter clothes details"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label>number: </label>
              <input
                type="number"
                className="form-control"
                value={number}
                onChange={handleNumberChange || undefined}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">amount: </label>
              <CurrencyInput
                value={amount}
                onChangeEvent={handleAmountChange}
                precision="2"
                className="form-control"
                id="amount"
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
              disabled={mutationLoading}
            >
              Save Laundry Details
            </button>
          </form>
        </div>
      </div>
    </SaveIncomeStyles>
  );
};

export default SaveIncome;
