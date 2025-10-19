import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { env } from "../environment/Environment";

const Home = lazy(() => import("../page/home/Home"));
const Game = lazy(() => import("../page/game/Game"));
export const Routing: React.FC = () => {
  return (
    <Suspense
      fallback={
        <>{"Cargando..."}</>
      }
    >
      <Routes>
        <Route path={env.home} element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
