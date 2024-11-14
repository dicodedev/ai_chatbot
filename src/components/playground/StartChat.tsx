import React from "react";
import Input from "./Input";

interface Props {
  setChats: any;
  setLoading: any;
  loading: boolean;
  language: string;
}
export default function StartChat({
  setChats,
  setLoading,
  language,
  loading,
}: Props) {
  return (
    <div className="flex pt-[5rem] justify-center  ml-0 h-[100vh] border-0">
      <div className="bg-[#212021] h-fit w-[90%] md:w-[25rem] rounded-lg pt-4 pb-3 flex flex-col items-center justify-between p-3">
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
            This code will display a prompt asking the user for their name, and
            then it will display a greeting message with the name entered by the
            user
          </p>
        </div>

        {/* INPUT  */}
        <Input
          type="small"
          language={language}
          setLoading={setLoading}
          _setChats={setChats}
          loading={loading}
        />
      </div>
    </div>
  );
}
