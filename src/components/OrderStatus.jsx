import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const OrderStatus = ({
  msg = "Your order has been successfully placed!",
  status = "success",
}) => {
  return (
    <div className="py-5 text-center">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <div className="d-flex justify-content-center">
            {status === "success" ? (
              <FaThumbsUp size="5rem" className="text-success" />
            ) : (
              <FaThumbsDown size="5rem" className="text-danger" />
            )}
          </div>
          <h1 className="display-5 fw-bold">{msg}</h1>
          <div className="d-flex justify-content-center">
            <Link to="/admin/orders" className="btn btn-primary btn-lg">
              Check my order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderStatus.propTypes = {
  msg: PropTypes.string,
  status: PropTypes.string,
};

export default OrderStatus;
