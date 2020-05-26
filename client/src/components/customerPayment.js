import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Customer_payment, Customer_payment_Date } from "../graphql/queries";
import FilterDate from "./filterDateComponent";
import CustomerPaymentComponent from "./customerPaymentComponent";
import moment from "moment";
import { _ } from "underscore";

const CustomersPayment = props => {
  const { customerId, name } = props.location.state;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataViewing, setDataViewing] = useState("");

  const [payment, setPayment] = useState([]);

  const allResult = useQuery(Customer_payment, {
    variables: { customerId: customerId }
  });

  const [getFilterDate, filterResult] = useLazyQuery(Customer_payment_Date);

  const upDateStart = date => {
    setStartDate(date);
  };

  const upDateEnd = date => {
    setEndDate(date);
  };

  useEffect(() => {
    if (allResult.data) {
      setPayment(allResult.data.getCustomerMoneyPaid);
      setDataViewing("viewing all data");
    }
  }, [allResult.data]);

  useEffect(() => {
    if (filterResult.data) {
      setPayment(filterResult.data.getCustomerMoneyPaidByDate);
      setDataViewing(
        `viewing data from ${moment(startDate).format(
          "dddd, MMMM Do YYYY"
        )} to ${moment(endDate).format("dddd, MMMM Do YYYY")}`
      );
    }
  }, [filterResult.data]);

  const submitHandler = async () => {
    //submit function
    //lets query the sucker then
    await getFilterDate({
      variables: {
        customerId: customerId,
        fromDate: startDate,
        endDate: endDate
      }
    });
  };

  if (allResult.loading) return <p>Loading ...</p>;
  if (allResult.error) return <p>Error: {allResult.error.message}</p>;

  if (filterResult.loading) return <p>Loading ...</p>;
  if (filterResult.error) return <p>Error: {filterResult.error.message}</p>;

  return (
    <div>
      <div>
        <p className="lead">Laundry Payment Details for : {name}</p>
        <p>{dataViewing}</p>
        <div>
          {payment.length > 0 ? (
            <div>
              <div className="float-right">
                <FilterDate
                  upDateStart={upDateStart}
                  upDateEnd={upDateEnd}
                  submitHandler={submitHandler}
                />
              </div>

              <CustomerPaymentComponent payment={payment} />
            </div>
          ) : (
            <p>No payment made yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPayment;
