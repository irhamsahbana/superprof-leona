import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../layouts/Footer";

function NotFound() {
  let isLoggedIn = useSelector((state) => state.user);

  return (
    <div className="py-64 h-screen bg-gradient-to-b from-white to-sky-100">
      <section id="title">
        <h1 className="text-3xl font-bold py-3 text-center align-center">
          Page Not Found
        </h1>
      </section>
      <section id="subheading">
        <h5 className="text-base text-center leading-normal mt-5 mb-4">
          <Link to={isLoggedIn ? "/home" : "/"} className="hover:text-blue-400">
            Head home
          </Link>
        </h5>
      </section>
      <Footer />
    </div>
  );
}

export default NotFound;
