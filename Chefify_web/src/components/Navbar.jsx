import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import LoginImg from '../assets/LoginImg.jpg';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand logo" href="/">
                        <img src="/imgs/Lab_01/Group9.png" alt="logo" style={{ height: '40px' }} />
                    </a>
                </div>
                {/* Input thu nhỏ */}
                <div className="search-input">
                    <input
                        className="form-control"
                        style={{ width: "400px" }}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-left justify-content-start" id="navbarScroll">
                    <form className="d-flex ">
                        <ul
                            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                            style={{ "--bs-scroll-height": "100px" }}
                        >
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">What to cook</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Recipes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Ingredients</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Occasions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">About Us</a>
                            </li>

                            {/* <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarScrollingDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link disabled"
                                    href="#"
                                    tabIndex="-1"
                                    aria-disabled="true"
                                >
                                    Link
                                </a>
                            </li> */}
                        </ul>
                        <button className="btn btn-outline-success me-2" type="submit">Login</button>
                        <button className="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#myModal">Subscribe</button>
                    </form>
                </div>
            </div>
            {/* <!-- The Modal --> */}
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-dialog-left">
                        <img src={LoginImg} alt="Image" />
                    </div>
                    <div className="modal-dialog-right">
                        <div className="modal-content">
                            {/* Header của modal */}
                            <div className="modal-header">
                                <h4 className="modal-title">LOGIN</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            {/* Nội dung của modal */}
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Enter your email to login in
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Subscribe
                                    </button>
                                </form>
                            </div>

                            {/* Footer của modal */}
                            <div className="modal-footer">
                                <p>--------------------------------OR--------------------------------</p>
                                <p>By countinuing, you agree to the update Terms of Safe. Terms of Service, and Privacy<br /> <span className="justify-content-between"></span>Polity<span /></p>
                                <hr></hr>
                                <button type="submit" className="btn btn-outline-danger w-100">
                                    Countinue with Google
                                </button>
                                <button type="submit" className="btn btn-outline-primary w-100">
                                    Countinue with Facebook
                                </button>
                                <button type="submit" className="btn btn-btn-outline-info w-100">
                                    Countinue with Apple
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
