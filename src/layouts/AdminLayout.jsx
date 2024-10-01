import { Outlet } from "react-router-dom";
import UserFooter from "./UserFooter";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <div className="d-flex vh-100">
        <AdminNavbar />
        <div
          className="container-fluid overflow-auto"
          style={{ minHeight: "48rem" }}
        >
          <div className="container-fluid" style={{ minHeight: "53rem" }}>
            <div className="container">
              <div className="">
                <Outlet />
              </div>
            </div>
          </div>
          <UserFooter />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
