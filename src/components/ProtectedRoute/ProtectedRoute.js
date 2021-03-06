/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component,  ...props }) => {
  return (
    <Route>
      {
        () => props.isLoggedIn ? <Component { ...props } /> : <Redirect to='./' />
      }
    </Route>
  )
}

export default ProtectedRoute;