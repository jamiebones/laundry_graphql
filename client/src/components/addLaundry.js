import React, { useState } from "react";
import SearchComponent from "./searchComponents";

const AddLaundry = () => {
  const [customerName, setCustomerName] = useState(undefined);

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

        <SearchComponent customerName={customerName} action="/save_laundry" />
      </div>
    </div>
  );
};

export default AddLaundry;
