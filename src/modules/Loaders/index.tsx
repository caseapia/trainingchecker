"use client"
import React from "react";
import PlayerLoader from "@/modules/Loaders/PlayerLoader";
import TableLoader from "@/modules/Loaders/TableLoader";
import LandingLoader from "@/modules/Loaders/LandingLoader";
import { useIsMobileDevice } from "@/hooks/isMobileDevice";
import Preloader from "@/public/assets/lotties/Preloader.json";
import Lottie from "lottie-react";

type LoaderProps = {
  type: "Player" | "Table" | "Landing";
  rows?: number;
  columns?: number;
};

const Loader: React.FC<LoaderProps> = ({ type, rows, columns }) => {
  const isMobile: boolean = useIsMobileDevice();
  return !isMobile ? (
    <DesktopPreloader type={type}
      rows={rows}
      columns={columns}/>
  ) : (
    <MobilePreloader/>
  );
};

const DesktopPreloader: React.FC<LoaderProps> = ({ type, rows, columns }) => {
  return (
    <>
      {type === "Player" && <PlayerLoader/>}
      {type === "Table" && rows !== undefined && columns !== undefined && <TableLoader rows={rows}
        columns={columns}/>}
      {type === "Landing" && <LandingLoader/>}
    </>
  );
};

const MobilePreloader = () => (
  <div style={{ display: "grid", placeItems: "center" }}>
    <Lottie animationData={Preloader}
      style={{ height: "200px", width: "200px" }}/>
  </div>
);

export default Loader;
