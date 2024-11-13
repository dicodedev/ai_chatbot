import React from "react";

export default function Sidebar() {
  return (
    <div className="w-2.5/12 hidden md:block">
      <div className="bg-[#212021] px-3 py-2 rounded-lg">
        <span className="text-white font-geist">My Chats</span>
      </div>
      <div className="bg-[#212021] mt-3 rounded-lg h-[85vh] w-[15rem]"></div>
    </div>
  );
}
