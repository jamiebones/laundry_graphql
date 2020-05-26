import React, { useState } from "react";
import DatePicker from "react-datepicker";

const FilterDate = ({ upDateStart, upDateEnd, submitHandler }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartChange = date => {
    setStartDate(date);
    upDateStart(date);
  };

  const handleEndChange = date => {
    setEndDate(date);
    upDateEnd(date);
  };

  return (
    <div>
      <div className="form-group">
        <label> start date: </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>end date: </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-warning btn-sm text-center"
          onClick={submitHandler}
        >
          filter
        </button>
      </div>
    </div>
  );
};

export default FilterDate;
