import React, { useState } from "react";
import { Link } from "react-router-dom";
import AngleDown from "../../assets/icons/chevron-down.svg";
import Checked from "../../assets/icons/check.svg";
import Sun from "../../assets/icons/sun.svg";
import English from "../../assets/flags/english.jpg";
import Nigeria from "../../assets/flags/nigeria.jpg";

interface Props {
  chatLength: number;
  languages: any;
  language: string;
  setLanguage: any;
}

export default function Header({
  chatLength,
  languages,
  language,
  setLanguage,
}: Props) {
  const [showLangDropDown, setShowLangDropdown] = useState<boolean>(false);

  const getFlag = (name: string) => {
    return name == "English" ? English : Nigeria;
  };
  return (
    <div className="flex justify-between w-[100%]">
      <Link to="/" className="flex items-center no-underline">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
            stroke={"#FFF"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-white font-geist ml-2">Lang AI</span>
      </Link>

      <div className="flex items-center">
        <img className="mr-4" src={Sun} />
        {chatLength && (
          <div className="relative">
            <div
              onClick={() => setShowLangDropdown(!showLangDropDown)}
              className="flex cursor-pointer items-center border rounded-lg p-2"
            >
              <img className="w-[25px] h-[15px]" src={getFlag(language)} />
              <span className="text-white text-sm ml-2 mr-1">{language}</span>
              <img src={AngleDown} />
            </div>
            {showLangDropDown && (
              <div className="bg-[#212021] rounded-2 mt-2 z-50 absolute right-0 w-[9rem] ">
                {languages.map((item: any, key: number) => (
                  <div
                    key={key}
                    onClick={() => {
                      setLanguage(item);
                      setShowLangDropdown(false);
                    }}
                    className="flex items-center hover:bg-[#444]  cursor-pointer py-2 px-3 justify-between w-100"
                  >
                    <img className="w-[25px] h-[15px]" src={getFlag(item)} />
                    <span className="text-white text-sm ml-2 mr-1">{item}</span>
                    <img
                      src={Checked}
                      className={item != language ? "opacity-0" : null}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
