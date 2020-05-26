import React, { useState } from "react";
import SearchComponent from "./searchComponents";

const InitiateSearchComponents = props => {
  const [customerName, setCustomerName] = useState(" ");

  const handleNameChange = e => {
    e.preventDefault();
    setTimeout(setCustomerName(e.target.value), 300);
  };

  return (
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

        <SearchComponent customerName={customerName} action={props.action} />
      </div>
    </div>
  );
};

export default InitiateSearchComponents;
