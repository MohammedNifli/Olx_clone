// Login.jsx

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGO_URL } from "../utilities/constant.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Check if email and password are not empty
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged User:", user);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 h-screen grid grid-cols-12 pb-5">
        <span className="col-span-4"></span>
        <div className="col-span-4 m-10 bg-white my-auto rounded-xl h-3/3">
          <Link to={"/"}>
            <img className="w-14 mt-8 mx-auto text-center" src={LOGO_URL} alt="Logo" />
          </Link>

          <div className="mx-auto text-center">
            <img className="p-2 w-24 mx-auto" src="/olx-logo.png" alt="" />

            <h1 className="font-bold text-xl mt-6">Enter Email and Password</h1>

            <input
              ref={emailRef}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-10 border-black"
              type="text"
              placeholder="Email"
            />
            <input
              ref={passwordRef}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black"
              type="password"
              placeholder="Password"
            />

            {errorMessage && (
              <p className="mt-2 text-red-500">{errorMessage}</p>
            )}

            <button
              onClick={handleSignIn}
              className="w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-6"
            >
              Login
            </button>

            <Link to={"/signup"}>
              <p className="underline mt-6">Create an account</p>
            </Link>
          </div>
        </div>
        <span className="col-span-4"></span>
      </div>
    </div>
  );
};

export default Login;
