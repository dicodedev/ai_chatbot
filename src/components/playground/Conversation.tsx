import React, { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import Input from "./Input";
import Loader from "react-loaders";

interface Prop {
  chats: any;
  setChats: any;
  loading: boolean;
  setLoading: any;
  language: string;
  pusher: any;
}

export default function Conversation({
  chats,
  setChats,
  loading,
  setLoading,
  language,
  pusher,
}: Prop) {
  const messageEnd = useRef();

  const scrollToBottom = () => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setInterval(() => {
      scrollToBottom();
    }, 1000);
  }, []);

  useEffect(() => {
    if (pusher) {
      const channel = pusher.subscribe("rooms");
      channel.bind("message", (data: any) => {
        setLoading(false);
        setChats((prev: any) => [...prev, data]);
      });
    }
  }, [pusher]);

  return (
    <div className="relative no-scrollbar overflow-y-scroll h-[calc(100vh-6rem)] mt-4">
      <div onChange={() => console.log("changed")} className="w-100 pb-[5rem]">
        {chats.map((item: any, key: number) => (
          <div key={key} className={"flex mb-" + (item.from_bot ? "4" : "2")}>
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
            {item.from_bot && key + 1 == chats.length ? (
              <ReactTyped
                className="text-white ml-2 text-sm mb-2"
                strings={[
                  item.message.replace("\n\n", "").replaceAll("\n", "<br/>"),
                ]}
                showCursor={false}
                typeSpeed={5}
                parseRef={(ref) => console.log(ref.current.input)}
              />
            ) : (
              <p
                className="text-white ml-2 text-sm mb-2"
                dangerouslySetInnerHTML={{
                  __html: item.message
                    .replace("\n\n", "")
                    .replaceAll("\n", "<br/>"),
                }}
              />
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
        <div ref={messageEnd}></div>
      </div>
      <Input
        language={language}
        type="big"
        setLoading={setLoading}
        loading={loading}
        _setChats={setChats}
      />
    </div>
  );
}
