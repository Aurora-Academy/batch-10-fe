import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axiosInstance.post(
        `${URLS.USERS}/generate-fp-token`,
        { email }
      );
      if (data.msg) {
        navigate("/forget-password/verify", { state: { email } });
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
            <div className="card shadow" style={{ width: "28rem" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="display-6 text-center">
                    Forgot your password?
                  </h1>
                  <small className="text-center text-body-secondary mb-3">
                    Please enter the email address associated with your account
                    and we&apos;ll email you a token to reset your password.
                  </small>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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
                    Already have an account?&nbsp;
                    <Link
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      to="/login"
                    >
                      Login
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

export default ForgetPassword;
