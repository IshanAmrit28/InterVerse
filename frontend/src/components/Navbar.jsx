const Navbar = () => {
  return (
    <nav className="container py-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <a
          href="/"
          className="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none fs-4 fw-bold"
        >
          InterVerse
        </a>

        <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="#" className="nav-link px-3 text-main">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-3 text-black">
              Interview
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-3 text-black">
              Reports
            </a>
          </li>
        </ul>

        {/* <div className="text-end displsu">
          <button type="button" className="btn btn-outline-dark me-2">
            Login
          </button>
          <button type="button" className="btn btn-warning">
            Sign Up
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
