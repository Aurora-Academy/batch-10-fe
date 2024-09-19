import { useState, useEffect } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { axiosInstance } from "../utils/axiosInstance";
import { URLS } from "../constants";

const VerifyFP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [verificationData, setVerificationData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { confirmPassword, ...rest } = verificationData;
      const { data } = await axiosInstance.post(
        `${URLS.USERS}/verify-fp-token`,
        rest
      );
      console.log({ data });
      if (data.msg === "Password Changed Successfully") {
        setMsg("Password Changed Successfully");
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

  //   const handleFormCheck = (event) => {
  //     const { password, confirmPassword } = verificationData;
  //     if (password === confirmPassword) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       console.log("match");
  //       setValidated(true);
  //     }
  //   };

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
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={verificationData?.email}
                          disabled
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom03">
                        <Form.Label>Token</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="6 digit number only"
                          value={verificationData?.token}
                          maxLength="6"
                          onChange={(e) => handleInput(e)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter proper token
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom04">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="New Password"
                          value={verificationData?.newPassword}
                          onChange={(e) =>
                            setVerificationData((prev) => {
                              return { ...prev, newPassword: e.target.value };
                            })
                          }
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom05">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                          type="text"
                          value={verificationData?.confirmPassword}
                          onChange={(e) =>
                            setVerificationData((prev) => {
                              return {
                                ...prev,
                                confirmPassword: e.target.value,
                              };
                            })
                          }
                          placeholder="Confirm new password"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid password.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
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

export default VerifyFP;
