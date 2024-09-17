import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";
import { setToken } from "../utils/session";

const Register = () => {
  const registerRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const showHidePw = () => {
    const currentPw = document.getElementsByClassName("myPassword");
    for (let i = 0; i < currentPw.length; i++) {
      if (currentPw[i].type === "password") {
        currentPw[i].type = "text";
      } else {
        currentPw[i].type = "password";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const rawFormData = registerRef.current;
      const formData = new FormData(rawFormData);
      formData.delete("confirmPassword");
      const { data } = await axiosInstance.post(
        `${URLS.USERS}/register`,
        formData
      );
      console.log({ data });
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
                  <h1 className="text-center">Register</h1>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <form
                    ref={registerRef}
                    className="d-flex flex-column"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input className="form-control" name="name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control myPassword"
                        name="password"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control myPassword"
                        name="confirmPassword"
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
                    Already have an account?
                    <Link
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      to="/login"
                    >
                      &nbsp;Login
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

export default Register;
