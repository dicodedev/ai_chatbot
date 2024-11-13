import React from "react";
import GridLines from "react-gridlines";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <GridLines
      cellWidth={8}
      lineColor="#fafafa"
      className="h-[100vh] w-[100vw] flex items-center justify-center text-center"
    >
      <Link to={"/playground"} className="bg-black p-2 px-3 rounded-md text-white text-sm no-underline">Go to playground</Link>
    
    </GridLines>
  );
}
