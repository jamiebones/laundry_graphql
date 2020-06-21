import React from "react";

export default React.createContext({
  token: null,
  authenticated: false,
  login: () => {},
  logout: () => {},
});
