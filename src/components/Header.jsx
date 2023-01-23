import React from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingBasket } from "react-icons/md";
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

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, firebaseProvider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    //store the user data in local storage so thad when you refresh the page data will be there
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };
  return (
    <header className="fixed w-screen p-6 px-16   z-50 ">
      {/* Desltop and Tab*/}
      <div className="hidden md:flex  w-full  items-center justify-between  ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 justify-center ">
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
          </div>
        </div>
      </div>
      {/* Mobile*/}
      <div className=" flex md:hidden w-full "></div>
    </header>
  );
};

export default Header;
