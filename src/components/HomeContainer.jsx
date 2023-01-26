import React, { useState } from "react";
import delevery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { useTranslation } from "react-i18next";

const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
  { value: "bn", text: "Bengali" },
];

const HomeContainer = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("language");

  const handleChange = (e) => {
    setLanguage(e.target.value);
    e.preventDefault();
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className=" flex-1 flex flex-col py-2 items-center gap-6">
        <select
          name="language"
          id="language"
          value={language}
          onChange={handleChange}
        >
          {languages.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 text-base items-center justify-start bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-orange-500 font-semibold">Bike Delivery</p>
          <div className="h-8 w-8">
            <img src={delevery} alt="delevery" />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          {t("fastest")}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem] ">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-4/5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut fuga
          repellat unde dolore ab sequi. Repellat labore hic commodi totam ad
          aliquid eos eius facilis dignissimos, velit cupiditate optio magnam.
        </p>
        <button className="bg-orange-400 w-full px-4 py-2 rounded-lg md:w-auto hover:shadow-lg transition-all ease-in-out duration-100">
          {t("order")}
        </button>
      </div>
    </section>
  );
};

export default HomeContainer;
