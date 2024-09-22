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
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <AdminOrders />
              </PrivateRoute>
            }
          />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
