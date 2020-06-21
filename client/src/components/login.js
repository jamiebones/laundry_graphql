import React, { useState, useEffect } from "react";
import { Login } from "../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
const store = require("store");

const Form = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [executeLogin, loginResult] = useLazyQuery(Login);

  useEffect(() => {
    if (loginResult.data) {
      const { userId, token, email } = loginResult.data.login;
      store.set("authToken", token);
      store.set("currentUser", { userId, email });
      props.loginFunction(loginResult.data.login);
      setSubmitted(false);
      props.history.push("/add_laundry");
    }
  }, [loginResult.data]);

  const submitForm = (event) => {
    event.preventDefault();

    executeLogin({
      variables: {
        email,
        password,
      },
    });
  };

  if (loginResult.loading) return <p>Loading ...</p>;
  if (loginResult.error) return <p>Error: {loginResult.error.message}</p>;

  return (
    <div className="row">
      <div className="offset-3 col-md-6">
        <form onSubmit={submitForm}>
          <p>
            Email:{" "}
            <input
              className="form-control"
              type="text"
              onChange={(event) => setEmail(event.target.value)}
            />
          </p>
          <p>
            Password:{" "}
            <input
              className="form-control"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>
          <p>
            <button
              disabled={submitted}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
