import React from "react";
import { Redirect } from "react-router-dom";


function NoMatch() {
  return (<Redirect to="/" />);
}

export default NoMatch;