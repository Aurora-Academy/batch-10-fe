import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";
import UserFooter from "./UserFooter";

const UserLayout = () => {
  return (
    <>
      <div>
        <UserNavbar />
        <div className="container-fluid" style={{ "min-height": "48rem" }}>
          <Outlet />
        </div>
        <UserFooter />
      </div>
    </>
  );
};

export default UserLayout;
