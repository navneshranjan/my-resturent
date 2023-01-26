import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const firebaseProvider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [ismenue, setIsmenue] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, firebaseProvider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      //store the user data in local storage so thad when you refresh the page data will be there
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsmenue(!ismenue);
    }
  };
  const logout = () => {
    setIsmenue(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="fixed w-screen md:p-6 md:px-16 px-4 py-3   z-50 ">
      {/* Desltop and Tab*/}
      <div className="hidden md:flex  w-full  items-center justify-between  ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 items-center ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
              Service
            </li>
          </ul>
          <div className="relative flex justify-center ">
            <MdShoppingBasket className="text-2xl text-textColor  cursor-pointer" />
            <div className="bg-cartNumBg rounded-full w-5 h-5 flex absolute -top-2 -right-5 justify-center items-center">
              <p className="text-xs text-white font-semibold ">2</p>
            </div>
          </div>
          <div onClick={login}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="profilePicture"
              className="h-10 w-10 shadow-xl min-w-[40px] min-h-[40px] rounded-full"
            />

            {ismenue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-20 right-20  "
              >
                {user && user.email === "navneshranjan@gmail.com" && (
                  <Link to={"/createitem"}>
                    <p className="px-4 py-2 flex text-base items-center gap-3 cursor-pointer hover:bg-slate-100 transition duration-100 ease-in-out text-textColor">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex text-base items-center gap-3 cursor-pointer hover:bg-slate-100 transition duration-100 ease-in-out text-textColor"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile*/}
      <div className=" flex md:hidden w-full h-full items-center justify-between ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl">City</p>
        </Link>
        <div>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="profilePicture"
            className="h-10 w-10 relative shadow-xl min-w-[40px] min-h-[40px] rounded-full"
            onClick={login}
          />

          {ismenue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-14 right-12  "
            >
              {user && user.email === "navneshranjan@gmail.com" && (
                <Link to={"/createitem"}>
                  <p className="px-4 py-2 flex text-base items-center gap-3 cursor-pointer hover:bg-slate-100 transition duration-100 ease-in-out text-textColor">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col px-4 py-2 gap-8 justify-center ">
                <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 ease-in-out cursor-pointer">
                  Service
                </li>
              </ul>

              <p
                className="px-4 py-2 flex text-base items-center gap-3 cursor-pointer hover:bg-slate-100 transition duration-100 ease-in-out text-textColor"
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
