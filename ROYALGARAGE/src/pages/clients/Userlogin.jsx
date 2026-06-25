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

  function userlogin() {
    SetIsloggedin(true);
    SetRole("client");
    navigate("/client/dashboard");
  }

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
              <form className="md:w-96 w-80 flex flex-col items-center justify-center">
                <h2 className="heading-bold text-header ">Sign in</h2>
                <p className="text-sm  mt-3">
                  Welcome back! Please sign in to continue
                </p>

                <div className="flex items-center gap-4 w-full my-5">
                  <div className="w-full h-px bg-primary"></div>

                  <div className="w-full h-px bg-primary"></div>
                </div>

                <div className="flex items-center w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email id"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-input h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="13"
                    height="17"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="password"
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
                  onClick={userlogin}
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

            <div className="w-full flex flex-col items-center justify-center">
              <form className="md:w-96 w-80 flex flex-col items-center justify-center">
                <h2 className="heading-bold text-header ">Sign up </h2>
                <p className="text-sm heading-medium mt-3">
                  Welcome Please signup to continue
                </p>

                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="full name "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex  mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email id"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex mt-6 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="16"
                    height="11"
                    viewBox="0 0 16 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder=" phone number "
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>

                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="13"
                    height="17"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                  <svg
                    width="13"
                    height="17"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                      fill="#6B7280"
                    />
                  </svg>
                  <input
                    type="password"
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
