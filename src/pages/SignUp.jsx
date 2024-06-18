import { LOGO_URL } from "../utilities/constant";
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore"; // Corrected import statement
import { signUpValidate } from '../utilities/SignUpValidation';

const SignUp = () => {
  const [userName, setUserName] = useState(""); // Initialized to an empty string
  const [phoneNumber, setPhoneNumber] = useState(""); // Initialized to an empty string
  const [email, setEmail] = useState(""); // Initialized to an empty string
  const [password, setPassword] = useState(""); // Initialized to an empty string
  const [errorMessage, setErrorMessage] = useState(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); // Added navigate hook

  const handleSignUp = async () => {
    const message = signUpValidate(nameRef.current.value, phoneRef.current.value, emailRef.current.value, passwordRef.current.value);
    console.log("hey am in olx", nameRef.current.value, phoneRef.current.value, emailRef.current.value, passwordRef.current.value)
    if (message) {
      setErrorMessage(message);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: userName });
      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        username: userName,
        mobile: phoneNumber, // Corrected variable name from 'mobile' to 'phoneNumber'
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 border border-gray-950 grid grid-cols-12 h-screen pb-5">
        <span className="col-span-4"></span>
        <div className="col-span-4 m-10 border border-gray-800 bg-white h-3/3 my-auto rounded-xl">
          <div className="mx-auto text-center">
            <img className="p-2 w-24 mx-auto" src={LOGO_URL} alt="" />
            <h1 className="font-bold text-xl mt-6">Create your Account </h1>
            <input
              ref={nameRef}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="py-2 px-2 border-2 w-3/4 rounded-md mt-10 border-black"
              type="text"
              placeholder="Username"
            />
            <input
              ref={phoneRef}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="py-2 px-2 border-2 w-3/4 rounded-md mt-5 border-black"
              type="text"
              placeholder="Phone Number"
            />
            <input
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-2 border-2 w-3/4 rounded-md mt-5 border-black"
              type="text"
              placeholder="Email"
            />
            <input
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-2 border-2 w-3/4 rounded-md mt-5 border-black"
              type="password"
              placeholder="Password"
            />
            {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
            <button
              onClick={handleSignUp}
              className="w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-6"
            >
              Create
            </button>
            <p className="underline my-5">Login with Account</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
6