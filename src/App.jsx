import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyFP from "./pages/VerifyFP";
import AdminLayout from "./layouts/AdminLayout";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import PrivateRoute from "./components/PrivateRoute";
import AdminRooms from "./pages/admin/rooms/List";
import AdminRoomsCreate from "./pages/admin/rooms/Create";

import AdminProfile from "./pages/admin/Profile";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";
import AdminRoomEdit from "./pages/admin/rooms/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password/verify" element={<VerifyFP />} />
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="booking" element={<Booking />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="orders"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AdminOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute role={["admin", "user"]}>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="rooms"
            element={
              <PrivateRoute role={["admin"]}>
                <AdminRooms />
              </PrivateRoute>
            }
          />
          <Route
            path="rooms/create"
            element={
              <PrivateRoute role={["admin"]}>
                <AdminRoomsCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="rooms/:id"
            element={
              <PrivateRoute role={["admin"]}>
                <AdminRoomEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute role={["admin"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
