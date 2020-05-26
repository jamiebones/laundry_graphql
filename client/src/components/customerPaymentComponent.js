import React from "react";
import { SumTotal, FormatMoney } from "../module/utility";
import moment from "moment";
import { _ } from "underscore";

const CustomersPaymentComponent = ({ payment }) => {
  return (
    <div>
      <div>
        <div>
          {payment.length > 0 ? (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payment.length > 0 &&
                    payment.map(({ amount, date, id }, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{1 + index}</th>
                          <td>{moment(date).format("dddd, MMMM Do YYYY")}</td>
                          <td>{amount}</td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <td scope="col"></td>
                    <td scope="col">
                      <p>
                        <b>Total:</b>
                      </p>
                    </td>
                    <td scope="col">
                      <p className="pull-right">
                        <b>
                          &#8358;
                          {SumTotal(payment, "amount")}
                        </b>
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p>No payment made yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPaymentComponent;
