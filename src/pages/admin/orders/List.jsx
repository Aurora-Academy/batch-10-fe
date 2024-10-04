import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { TbEdit, TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Paginate from "../../../components/Paginate";
import AddButton from "../../../components/AddButton";
import TableLoader from "../../../components/TableLoader";

import { formatDate } from "../../../utils/date";
import { shortenString } from "../../../utils/string";

import {
  listOrders,
  removeOrder,
  setCurrentPage,
  setLimit,
} from "../../../slices/orderSlice";

const AdminRooms = () => {
  const dispatch = useDispatch();
  const { orders, currentPage, limit, loading, total } = useSelector(
    (state) => state.orders
  );

  const [searchNumber, setSearchNumber] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const initFetch = useCallback(() => {
    dispatch(
      listOrders({
        page: currentPage,
        limit: limit,
        number: searchNumber,
        status: searchStatus,
      })
    );
  }, [currentPage, dispatch, limit, searchNumber, searchStatus]);

  const handleDelete = async (e, orderNumber) => {
    e.preventDefault();
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      const d = await dispatch(removeOrder(orderNumber));
      if (d?.payload.data) {
        toast(d?.payload?.data || "Something went wrong");
      }
      if (d?.payload?.msg) {
        Swal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
        });
      }
    }
  };

  useEffect(() => {
    initFetch();
  }, [initFetch]);
  return (
    <>
      <div className="col-md-9 m-5">
        <h1>List</h1>
        <AddButton
          text="Add new Order"
          variant="danger"
          url="/admin/orders/create"
        />
        <div className="d-flex">
          <div className="input-group mt-3 mb-3">
            <Form.Select
              className="form-inline "
              style={{ width: "10px" }}
              onChange={(e) => setSearchStatus(e.target.value)}
              size="sm"
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refund">Refund</option>
            </Form.Select>
            <input
              style={{ width: "500px" }}
              type="text"
              className="form-control"
              placeholder="Search by name..."
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Arrival</th>
              <th scope="col">Departure</th>
              <th scope="col">Amount (NPR)</th>
              <th scope="col">No. of rooms</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <>
                <TableLoader />
                <TableLoader />
                <TableLoader />
              </>
            )}

            {!loading && orders && orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <tr key={order?._id}>
                    <th scope="row">{shortenString(order?.number)}</th>
                    <td>{order?.name}</td>
                    <td>{formatDate(order?.arrivalDate, "ll")}</td>
                    <td>{formatDate(order?.departureDate, "ll")}</td>
                    <td>{order?.amount}</td>
                    <td>{order?.rooms.length}</td>
                    <td>
                      <span
                        className={`badge text-bg-${
                          order?.status === "paid"
                            ? "success"
                            : order?.status === "refund"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {order?.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group me-2" role="button">
                        <Link to={`/admin/orders/${order?._id}`}>
                          <TbEdit className="text-primary" />
                        </Link>
                      </div>
                      <div
                        className="btn-group"
                        role="button"
                        onClick={(e) => handleDelete(e, order?.number)}
                      >
                        <TbTrash className="text-danger" />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Paginate
          dispatch={dispatch}
          currentPage={currentPage}
          limit={Number(limit)}
          total={total}
          setLimit={setLimit}
          setPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AdminRooms;
