import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../slices/cartSlice";
import OrderServices from "../services/orders";
import { getCurrentUser } from "../utils/session";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quantity, cart } = useSelector((state) => state.cart);
  const user = JSON.parse(getCurrentUser());
  const [grandTotal, setGrandTotal] = useState(
    cart.reduce(
      (prev, acc) => prev + Number(acc?.quantity) * Number(acc?.price),
      0
    )
  );
  const [rooms, setRooms] = useState(
    cart.map((item) => {
      return {
        room: item?._id,
        price: item?.price,
        amount: Number(item?.price),
      };
    })
  );
  const [payload, setPayload] = useState({
    name: user?.name || "",
    email: user?.email || "",
    arrivalDate: "",
    departureDate: "",
    rooms: [],
    amount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...payload, rooms, amount: grandTotal };
    const order = await OrderServices.create(formData);
    if (order) {
      await dispatch(removeAll());
      setGrandTotal(0);
      setRooms([]);
      navigate("/checkout/status");
    }
  };

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Checkout Room</h2>
          <p className="lead">Hotel booking at your finger tips</p>
        </div>
        <div className="row g-5">
          {/* <!--cart--> */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{quantity}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.length > 0 &&
                cart.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between lh-sm"
                    >
                      <div>
                        <h6 className="my-0">{item?.name}</h6>
                        <small className="text-body-secondary">
                          Max Guests:{item?.totalGuests}
                        </small>
                      </div>
                      <span className="text-body-secondary">
                        NPR&nbsp;{Number(item?.quantity) * Number(item?.price)}
                      </span>
                    </li>
                  );
                })}

              <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0">Total</h6>
                </div>
                <span className="text-success">
                  NPR&nbsp;
                  {grandTotal}
                </span>
              </li>
            </ul>
          </div>
          {/* Billing */}
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form
              className="needs-validation"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                    value={payload?.name}
                    onChange={(e) =>
                      setPayload((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Email
                    <span className="text-body-secondary">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={payload?.email}
                    onChange={(e) =>
                      setPayload((prev) => {
                        return { ...prev, email: e.target.value };
                      })
                    }
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Arrival Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={payload?.arrivalDate}
                    onChange={(e) =>
                      setPayload((prev) => {
                        return { ...prev, arrivalDate: e.target.value };
                      })
                    }
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Departure Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={payload?.departureDate}
                    onChange={(e) =>
                      setPayload((prev) => {
                        return { ...prev, departureDate: e.target.value };
                      })
                    }
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
