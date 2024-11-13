import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/icons/logo.svg";
import Pusher from "pusher-js";
import axios from "axios";
import { ReactTyped } from "react-typed";
import English from "../assets/flags/english.jpg";
import Nigeria from "../assets/flags/nigeria.jpg";
import AngleDown from "../assets/icons/chevron-down.svg";
import Checked from "../assets/icons/check.svg";
import Sun from "../assets/icons/sun.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loaders";
import "../assets/css/loader.min.css";
import { setChats } from "../redux/slices/AppSlice";

export default function Dashboard() {
  const languages = ["English", "Pidgin", "Yoruba", "Igbo", "Hausa"];
  const [prompt, setprompt] = useState<any>(null);
  const [language, setLanguage] = useState<any>(languages[0]);
  const [showLangDropDown, setShowLangDropdown] = useState<boolean>(false);
  const [promptClicked, setPromptClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const appState = useSelector((state: any) => state.app);
  const chats = appState.chats ? JSON.parse(appState.chats) : [];

  const [_chats, _setChats] = useState<any>(chats);

  const dispatch = useDispatch();

  const messageEnd = useRef();
  const contRef = useRef();

  const startChat = () => {
    try {
      const payload = {
        room: "1",
        user_id: "1",
        from_bot: false,
        message: prompt,
        lang: language,
      };
      _setChats((prev: any) => [...prev, payload]);
      setLoading(true);

      axios
        .post(`http://127.0.0.1:8000/api/chat/send`, payload)
        .then((res) => {});
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  const scrollToBottom = () => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(setChats(_chats));
  }, [_chats]);

  useEffect(() => {
    const pusher = new Pusher("c1efe3a3474e7360b601", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("rooms");
    channel.bind("message", (data: any) => {
      setLoading(false);
      _setChats((prev: any) => [...prev, data]);
    });

    setInterval(() => {
      scrollToBottom();
    }, 2000);
  }, []);

  const getFlag = (name: string) => {
    return name == "English" ? English : Nigeria;
  };

  // useEffect(() => {
  //   if (chats.length) {
  //     console.log("effect", chats);
  //   }
  // }, [chats]);

  return (
    <div className="px-3 bg-black h-[100vh] w-[100%] p-3 flex flex-col items-center">
      <div className="flex justify-between w-100">
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
          {chats.length && (
            <div className="relative">
              <div
                onClick={() => setShowLangDropdown(!showLangDropDown)}
                className="flex cursor-pointer items-center border-1 rounded-lg p-2"
              >
                <img className="w-[25px] h-[15px]" src={getFlag(language)} />
                <span className="text-white text-sm ml-2 mr-1">{language}</span>
                <img src={AngleDown} />
              </div>
              {showLangDropDown && (
                <div className="bg-[#212021] rounded-2 mt-2 absolute right-0 w-[9rem] ">
                  {languages.map((item, key) => (
                    <div
                      key={key}
                      onClick={() => {
                        setLanguage(item);
                        setShowLangDropdown(false);
                      }}
                      className="flex items-center hover:bg-[#444] cursor-pointer py-2 px-3 justify-between w-100"
                    >
                      <img className="w-[25px] h-[15px]" src={getFlag(item)} />
                      <span className="text-white text-sm ml-2 mr-1">
                        {item}
                      </span>
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
      <div className="w-11/12 md:w-9/12">
        {chats && chats.length ? (
          <div className="relative no-scrollbar overflow-y-scroll h-[calc(100vh-6rem)] mt-4">
            <div
              onChange={() => console.log("changed")}
              className="w-100 pb-[5rem]"
            >
              {chats.map((item: any, key: number) => (
                <div
                  key={key}
                  className={"flex mb-" + (item.from_bot ? "4" : "2")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    className="w-[20px] min-w-[20px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
                      stroke={"#" + (item.from_bot ? "50DA4D" : "808080")}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item.from_bot ? (
                    <ReactTyped
                      className="text-white ml-2 text-sm"
                      strings={[item.message.replaceAll(".", ".<br/><br/>")]}
                      showCursor={false}
                      typeSpeed={30}
                    />
                  ) : (
                    <p className="text-white ml-2 text-sm">{item.message}</p>
                  )}
                </div>
              ))}
              {loading ? (
                <div className="flex mb-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
                      stroke={"#50DA4D"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-white ml-2 text-sm">
                    <Loader type="ball-beat" active />
                  </p>
                </div>
              ) : null}

              {/* MESSAGE END */}
              <div ref={messageEnd}></div>
            </div>

            {/* INPUT */}
            <div className="flex items-start justify-between  fixed justify-self-center md:w-9/12 w-11/12 bottom-0  bg-white rounded-lg p-1 mt-3 mb-2 py-2">
              <svg
                width="26"
                height="26"
                viewBox="0 0 22 22"
                className="ml-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                contentEditable={true}
                onInput={(e) => setprompt(e.currentTarget.textContent)}
                onClick={() => setPromptClicked(true)}
                onBlur={() => setPromptClicked(false)}
                onKeyDown={() => setPromptClicked(true)}
                className="text-[#444] outline-0 font-geist text-sm w-available font-[3px] mx-2 bg-transparent p-0"
              >
                {!promptClicked && "Type something here..."}
              </span>
              <span
                onClick={startChat}
                className="w-[55px] h-[40px] bg-[#50DA4D] rounded-lg flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H17M17 7L11 1M17 7L11 13"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex pt-[5rem] justify-center  ml-0 h-[100vh] border-0">
            <div className="bg-[#212021] h-fit w-90 md:w-[25rem] rounded-lg pt-4 pb-3 flex flex-column items-center justify-between p-3">
              <div className="flex flex-col items-center">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
                    stroke="#50DA4D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="text-2xl text-white mt-3 font-[400]">
                  How can i help you today?
                </h1>
                <p className="text-gray-300 font-[400] text-[12px] text-center px-1">
                  This code will display a prompt asking the user for their
                  name, and then it will display a greeting message with the
                  name entered by the user
                </p>
              </div>

              {/* INPUT  */}
              <div className="flex items-start justify-between bg-white w-100 rounded-lg p-1 mt-3 py-2">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 22 22"
                  className="ml-1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.34025 15.9997C1.0881 13.8298 1.72473 11.0644 3.79795 9.66006L3.80018 9.65784C5.46564 8.53235 7.65775 8.57012 9.28433 9.75228L12.7164 12.2477C14.3418 13.4299 16.5339 13.4676 18.2005 12.3421L18.2027 12.3399C20.2771 10.9356 20.9148 8.16792 19.6604 6.00026M16.002 19.6593C13.8321 20.9114 11.0667 20.2748 9.66229 18.2016L9.66006 18.1994C8.53457 16.5339 8.57234 14.3418 9.7545 12.7152L12.2499 9.28317C13.4321 7.6577 13.4699 5.46559 12.3444 3.79901L12.3399 3.79679C10.9356 1.72468 8.16792 1.08582 6.00026 2.3402M18.0705 3.92901C21.9758 7.83436 21.9758 14.1651 18.0705 18.0705C14.1651 21.9758 7.83436 21.9758 3.92901 18.0705C0.0236626 14.1651 0.0236626 7.83436 3.92901 3.92901C7.83436 0.0236626 14.1651 0.0236626 18.0705 3.92901Z"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  contentEditable={true}
                  onInput={(e) => setprompt(e.currentTarget.textContent)}
                  onClick={() => setPromptClicked(true)}
                  onBlur={() => setPromptClicked(false)}
                  onKeyDown={() => setPromptClicked(true)}
                  className="text-[#444] outline-0 font-geist text-sm font-[3px] w-[20rem] max-w-[20rem] mx-2 bg-transparent p-0"
                >
                  {!promptClicked && "Type something here..."}
                </span>
                <span
                  onClick={startChat}
                  className="w-[55px] h-[40px] bg-[#50DA4D] rounded-lg flex items-center justify-center"
                >
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7H17M17 7L11 1M17 7L11 13"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
