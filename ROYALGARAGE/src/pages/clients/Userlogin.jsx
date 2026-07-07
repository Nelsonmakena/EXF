import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router";
import logo from "/src/assets/logo.png";
import login from "/src/assets/login2.png";

import logodata from "/src/assets/logoanimation.json";

import Lottie from "lottie-react";

import { useContext, useState } from "react";
import HomeClient from "./HomeClient";
import { Globalcontext } from "../../context";

export default function Userlogin() {
  const [state, setState] = useState("login");

  const navigate = useNavigate();
  /// clobal state
  const { SetIsloggedin, SetRole } = useContext(Globalcontext);

  // function userlogin() {
  //   SetIsloggedin(true);
  //   SetRole("client");
  // navigate("/client/dashboard");
  //}

  /// fetching user login data

  const logindata = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
  };

  // fetching new user data

  const NewUserData = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    // check if password match

    if (data.password != data.confrim_password) {
      return console.log("paswords dont match");
    }
  };

  return (
    <>
      {/**login and sign in  */}
      <section className="section  flex items-center justify-center">
        <div className="flex h-screen container-main card-lg  w-full  bg-card md:h-fit">
          <div className="  w-full  hidden md:flex md:items-center justify-center ">
            <Lottie animationData={logodata} />
          </div>

          {state === "login" ? (
            // sign in
            <div className="w-full flex flex-col items-center justify-center">
              <form
                onSubmit={logindata}
                className="md:w-96 w-80 flex flex-col items-center justify-center"
              >
                <h2 className="heading-bold text-header ">Sign in</h2>
                <p className="text-sm  mt-3">
                  Welcome back! Please sign in to continue
                </p>

                <div className="flex items-center gap-4 w-full my-5">
                  <div className="w-full h-px bg-primary"></div>

                  <div className="w-full h-px bg-primary"></div>
                </div>

                <div className="flex items-center w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                  <div className="flex items-center gap-2">
                    <input className="h-5" type="checkbox" id="checkbox" />
                    <label className="text-sm" htmlFor="checkbox">
                      Remember me
                    </label>
                  </div>
                  <a className="text-sm  text-muted underline" href="#">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className=" flex  items-center justify-center mt-8 w-full h-11 rounded-full bg-header text-white heading-normal hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
                <p className="text-gray-500/90 text-sm mt-4">
                  Don’t have an account?{" "}
                  <a
                    onClick={() => setState("signup")}
                    className="text-muted  hover:underline"
                    href="#"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          ) : (
            // sign up

            <div className=" w-full flex flex-col items-center justify-center">
              <form
                onSubmit={NewUserData}
                className="md:w-96 w-80 flex flex-col items-center justify-center"
              >
                <h2 className="heading-bold text-header ">Sign up </h2>
                <p className="text-sm heading-medium mt-3">
                  Welcome Please signup to continue
                </p>

                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="first name "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    name="second_name"
                    placeholder="second name "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="last name "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    name="phonenumber"
                    placeholder=" phone number "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    name="confrim_password"
                    placeholder="confirm Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="w-full flex items-center justify-between mt-8 text-gray-500/80"></div>

                <button
                  type="submit"
                  className="mt-8 w-full h-11 rounded-full text-white bg-header hover:opacity-90 transition-opacity"
                >
                  Sign up
                </button>
                <p className="text-gray-500/90 text-sm mt-4">
                  already have an acount{" "}
                  <a
                    onClick={() => setState("login")}
                    className="text-muted hover:underline"
                    href="#"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
