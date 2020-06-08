import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { Send_BulkMessage } from "../graphql/queries";
import { _ } from "underscore";
import styled from "styled-components";

const SendBulkSmsStyles = styled.div`
  .view {
    border: 2px solid #d8bebe;

    p {
      padding: 10px;
    }
  }
`;

const SendBulkSms = (props) => {
  const [sendMessageToCustomers, msgReport] = useLazyQuery(Send_BulkMessage);
  const [msgSent, setMsgSent] = useState([]);
  const [msgCount, setMsgCount] = useState(0);
  const [message, setMessage] = useState();
  const [customerType, setCustomerType] = useState();

  useEffect(() => {
    if (msgReport.data) {
      setMsgSent(msgReport.data.sendMessage);
    }
  }, [msgReport.data]);

  const changeMessage = (e) => {
    const msg = e.target.value;
    setMessage(msg);
    setMsgCount(msg.length);
  };

  const customerTypeChange = (e) => {
    const sel = e.target.value;
    if (sel == "0") return;
    setCustomerType(sel);
  };

  const submitHandler = () => {
    sendMessageToCustomers({
      variables: {
        message: message,
        customerType: customerType,
        returnType: "1",
      },
    });
  };

  const viewMessageSample = () => {
    sendMessageToCustomers({
      variables: {
        message: message,
        customerType: customerType,
        returnType: "2",
      },
    });
  };

  if (msgReport.loading) return <p>Loading ...</p>;
  if (msgReport.error) return <p>Error: {msgReport.error.message}</p>;
  console.log(msgSent);
  return (
    <SendBulkSmsStyles>
      <div className="row">
        <div className="col-md-6">
          <p className="text-center">Send sms to customers</p>
          <select
            className="form-control customerType"
            onChange={customerTypeChange}
          >
            <option value="0">select customer type</option>
            <option value="1">all customers</option>
            <option value="2">customers owing</option>
            <option value="3">customers owing above 5k</option>
            <option value="4">
              customer that has not washed for at least a month
            </option>
            <option value="5">paying customers not owing</option>
          </select>
          <br />
          <br />

          <textarea
            className="form-control"
            rows="7"
            value={message}
            onChange={changeMessage}
          />
          <span style={{ float: "right" }}>{msgCount}/140</span>

          <br />
          <br />

          <button
            className="btn btn-success text-center"
            onClick={submitHandler}
          >
            send sms
          </button>

          <div style={{float: "right"}}>
            <button
              className="btn btn-info text-center"
              onClick={viewMessageSample}
            >
              view message sample
            </button>
          </div>
        </div>

        <div className="col-md-5 offset-md-1">
          {msgSent.length > 0 &&
            msgSent.map(({ msg }, index) => {
              return <p key={index}>{msg}</p>;
            })}
        </div>
      </div>
    </SendBulkSmsStyles>
  );
};

export default SendBulkSms;
