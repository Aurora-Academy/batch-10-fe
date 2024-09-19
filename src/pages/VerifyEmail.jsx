import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";

const VerifyEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    email: "",
    token: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axiosInstance.post(
        `${URLS.USERS}/verify-email`,
        verificationData
      );
      if (data.msg === "Thank you for verifying your email") {
        setMsg("Thank you for verifying your email");
        setTimeout(() => {
          setError("");
          setMsg("");
          navigate("/login");
        }, 2000);
      }
    } catch (e) {
      const errMsg = e?.response?.data?.msg || "Something went wrong";
      setError(errMsg);
    }
  };

  const handleInput = (e) => {
    const regex = new RegExp(/^\d+$/, "g");
    const isValid = regex.test(e.target.value);
    if (isValid || e.target.value === "") {
      setVerificationData((prev) => {
        return { ...prev, token: e.target.value };
      });
    }
  };

  useEffect(() => {
    if (!state?.email) {
      navigate("/register");
    }
    setVerificationData((prev) => {
      return { ...prev, email: state?.email };
    });
  }, [navigate, state]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div>
          <div className="col-md-8">
            <div className="card shadow" style={{ width: "28rem" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="display-6 text-center">
                    Please check your email!
                  </h1>
                  <small className="text-center text-body-secondary mb-3">
                    We&apos;ve emailed a 6-digit confirmation code. Please enter
                    the code in the box below to verify your email.
                  </small>
                  {(msg || error) && (
                    <Alert
                      variant={error ? "danger" : "success"}
                      className="text-center"
                    >
                      {error || msg}
                    </Alert>
                  )}
                  <form
                    className="d-flex flex-column"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        value={verificationData?.email}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Token</label>
                      <input
                        className="form-control"
                        value={verificationData?.token}
                        maxLength="6"
                        onChange={(e) => handleInput(e)}
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Verify
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

export default VerifyEmail;
