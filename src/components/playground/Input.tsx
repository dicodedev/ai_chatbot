import React, { useState } from "react";
import axiosClient from "../../axios-client";

interface Props {
  type: string;
  _setChats: any;
  setLoading: any;
  loading: boolean;
  language: any;
}
export default function Input({
  _setChats,
  type,
  setLoading,
  loading,
  language,
}: Props) {
  const [prompt, setprompt] = useState<any>(null);
  const [promptClicked, setPromptClicked] = useState<boolean>(false);

  const startChat = () => {
    const payload = {
      room: "1",
      user_id: "1",
      from_bot: false,
      message: prompt,
      lang: language,
    };
    _setChats((prev: any) => [...prev, payload]);
    setLoading(true);

    axiosClient
      .post("chat/send", payload)
      .then(({ data }) => {})
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return type == "big" ? (
    <div className="flex items-start justify-between  fixed justify-self-center md:w-9/12 w-[calc(100%-3rem)] bottom-2 md:bottom-0  bg-white rounded-lg p-1 mt-3 mb-2 py-2">
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
        onClick={loading ? () => {} : startChat}
        className="w-[55px] cursor-pointer h-[40px] bg-[#50DA4D] rounded-lg flex items-center justify-center"
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
  ) : (
    <div className="flex items-start justify-between bg-white w-[100%] rounded-lg p-1 mt-[30px] py-2">
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
        onClick={loading ? () => {} : startChat}
        className="w-[55px] cursor-pointer h-[40px] bg-[#50DA4D] rounded-lg flex items-center justify-center"
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
  );
}
