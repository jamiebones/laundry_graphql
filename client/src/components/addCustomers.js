import React, { useState } from "react";
import styled from "styled-components";
import { saveCustomersDetails } from "../graphql/mutation";
import { useMutation } from "@apollo/react-hooks";

const AddCustomers = props => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneValue, setPhoneValue] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const [addCustomerDetails, { data }] = useMutation(saveCustomersDetails, {});

  const addPhoneNumber = e => {
    e.preventDefault();
    setPhoneNumbers([...phoneNumbers, phoneValue]);
    setPhoneValue("");
  };

  const handlephoneNumberChange = e => {
    const value = e.target.value;
    setPhoneValue(value);
  };

  const removePhoneNumber = item => {
    const remainingNumbers = phoneNumbers.filter((number, i) => {
      return number !== item;
    });
    setPhoneNumbers(remainingNumbers);
  };
  const handleSelectTitle = e => {
    e.preventDefault();
    if (e.target.value == "0") return;
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCustomerDetails({
      variables: { name, title, address, contact: phoneNumbers }
    });

    //reset our form

    setAddress("");
    setTitle("");
    setPhoneNumbers([]);
    setName("");
  };

  return (
    <div>
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <form>
            <div className="form-group">
              <label htmlFor="title">Customer Title</label>
              <select
                className="form-control"
                id="title"
                onChange={handleSelectTitle}
              >
                <option value="0">select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Madam">Madam</option>
                <option value="Dr">Dr</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name: </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="enter customer"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            {phoneNumbers.map((number, index) => {
              return (
                <p key={index} onClick={() => removePhoneNumber(number)}>
                  {number}
                </p>
              );
            })}

            <div className="form-group">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={handlephoneNumberChange}
                  value={phoneValue}
                />
                <button className="input-group-addon" onClick={addPhoneNumber}>
                  Add
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                rows="4"
                value={address}
                onChange={e => setAddress(e.target.value)}
              ></textarea>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Save Customer Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomers;
