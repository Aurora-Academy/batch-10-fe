import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/login";
import PropTypes from "prop-types";

// Higher Order Component
const PrivateRoute = ({ children, role }) => {
  return <>{isLoggedIn() ? children : <Navigate replace to="/login" />}</>;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  role: PropTypes.string,
};

export default PrivateRoute;
