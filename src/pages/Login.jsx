import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const showHidePw = () => {
    const currentPw = document.getElementById("myPassword");
    if (currentPw.type === "password") {
      currentPw.type = "text";
    } else {
      currentPw.type = "password";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axiosInstance.post(`${URLS.USERS}/login`, login);
      if (data?.data) {
        navigate("/");
      }
    } catch (e) {
      const errMsg = e?.response?.data?.msg || "Something went wrong";
      setError(errMsg);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div>
          <div className="col-md-8">
            <div className="card shadow" style={{ width: "22rem" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="text-center">Login</h1>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <form
                    className="d-flex flex-column"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={login?.email}
                        onChange={(e) =>
                          setLogin((p) => {
                            return { ...p, email: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="myPassword"
                        value={login?.password}
                        onChange={(e) =>
                          setLogin((p) => {
                            return { ...p, password: e.target.value };
                          })
                        }
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onClick={showHidePw}
                      />
                      <label className="form-check-label">Show Password</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column mt-2">
                  <div>
                    Forgot
                    <Link
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      to="/forget-password"
                    >
                      &nbsp;Username/Password?
                    </Link>
                  </div>
                  <div>
                    Don&apos;t have an account?
                    <Link
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      to="/register"
                    >
                      &nbsp;Sign up?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
