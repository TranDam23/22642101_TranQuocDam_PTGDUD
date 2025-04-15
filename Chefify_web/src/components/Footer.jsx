import "./Footer.css";
const Footer = () => {
    return (
        <footer className="bg-dark text-white">
            <div className="container py-4">
                <div className="row">
                    {/* About Us */}
                    <div className="col-lg-4">
                        <div className="row d-block">
                            <div className="col-md-12">
                                <h6 className="text-uppercase fw-bold mb-3">About Us</h6>
                                <p>
                                    Welcome to our website, a wonderful place to explore and learn how
                                    to cook like a pro.
                                </p>
                                <div className="d-flex">
                                    <input
                                        type="email"
                                        className="form-control me-2"
                                        placeholder="Enter your email"
                                    />
                                    <button className="btn btn-pink">Send</button>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="col-md-12">
                                <p className="mb-0">
                                    <a href="#!" className="text-white text-decoration-none">© 2023 Cheffify Company </a>
                                    <a href="#!" className="text-white text-decoration-none me-3">Terms of Service</a>
                                    <a href="#!" className="text-white text-decoration-none">Privacy Policy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                    {/* Learn More */}
                    <div className="col-lg-2">
                        <div className="row d-block">
                            <div className="col-md-8">
                                <h6 className="text-uppercase fw-bold mb-3">Learn More</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#!" className="text-white text-decoration-none">Our Cooks</a></li>
                                    <li><a href="#!" className="text-white text-decoration-none">See Our Features</a></li>
                                    <li><a href="#!" className="text-white text-decoration-none">FAQ</a></li>
                                </ul>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="col-md-8">
                                <h6 className="text-uppercase fw-bold mb-3">Shop</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#!" className="text-white text-decoration-none">Gift Subscription</a></li>
                                    <li><a href="#!" className="text-white text-decoration-none">Send Us Feedback</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-2"></div>
                    {/* Recipes */}
                    <div className="col-lg-2">
                        <h6 className="text-uppercase fw-bold mb-3">Recipes</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-white text-decoration-none">What to Cook This Week</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Pasta</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Dinner</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Healthy</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Vegetarian</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Vegan</a></li>
                            <li><a href="#!" className="text-white text-decoration-none">Christmas</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
