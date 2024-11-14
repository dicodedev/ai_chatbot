import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/icons/logo.svg";
import Pusher from "pusher-js";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loaders";
import "../assets/css/loader.min.css";
import { setChats } from "../redux/slices/AppSlice";
import Header from "../components/playground/Header";
import StartChat from "../components/playground/StartChat";
import Conversation from "../components/playground/Conversation";

export default function Playground() {
  const languages = ["English", "Pidgin", "Yoruba", "Igbo", "Hausa"];

  const [language, setLanguage] = useState<any>(languages[0]);

  const appState = useSelector((state: any) => state.app);
  const chats = appState.chats ? JSON.parse(appState.chats) : [];

  const [_chats, _setChats] = useState<any>(chats);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChats(_chats));
  }, [_chats]);

  return (
    <div className="px-3 bg-black h-[100vh] w-[100%] p-3 flex flex-col items-center">
      <Header
        language={language}
        chatLength={chats.length}
        languages={languages}
        setLanguage={setLanguage}
      />
      <div className="w-11/12 md:w-9/12">
        {chats && chats.length ? (
          <Conversation
            chats={_chats}
            loading={loading}
            language={language}
            setLoading={setLoading}
            setChats={_setChats}
          />
        ) : (
          <StartChat
            language={language}
            setLoading={setLoading}
            setChats={_setChats}
          />
        )}
      </div>
    </div>
  );
}
