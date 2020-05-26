import React, { useState } from "react";
import SearchComponent from "./searchComponents";
import styled from "styled-components";

const SearchStyles = styled.div`
    input{
      padding: 30px;
      font-size: 25px;
      margin-bottom: 30px;
    }


`;

const AddIncome = () => {
  const [customerName, setCustomerName] = useState(undefined);

  const handleNameChange = (e) => {
    e.preventDefault();
    setTimeout(setCustomerName(e.target.value), 300);
  };

  return (
    <SearchStyles>
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleNameChange}
              placeholder="search customer by name"
            />
          </div>

          <SearchComponent customerName={customerName} action="/save_income" />
        </div>
      </div>
    </SearchStyles>
  );
};

export default AddIncome;
