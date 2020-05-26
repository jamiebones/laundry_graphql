/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
//import { GlobalStyle } from "../theme/globalstyles";

const LayoutStyle = styled.div``;

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <LayoutStyle>{children}</LayoutStyle>;
  }
}

export default Layout;
