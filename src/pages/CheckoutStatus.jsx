import PropTypes from "prop-types";
import OrderStatus from "../components/OrderStatus";

const CheckoutStatus = ({ msg, status }) => {
  return (
    <div className="container">
      <OrderStatus msg={msg} status={status} />
    </div>
  );
};

CheckoutStatus.propTypes = {
  msg: PropTypes.string,
  status: PropTypes.string,
};

export default CheckoutStatus;
