import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div>
          <div className="col-md-8">
            <div className="card shadow" style={{ width: "22rem" }}>
              <div className="card-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <h1 className="text-center">Login</h1>
                  <form className="d-flex flex-column">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="myPassword"
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" />
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
                    <a
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      href="/forget-password"
                    >
                      &nbsp;Username/Password?
                    </a>
                  </div>
                  <div>
                    Don&apos;t have an account?
                    <a
                      className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      href="/register"
                    >
                      &nbsp;Sign up?
                    </a>
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
