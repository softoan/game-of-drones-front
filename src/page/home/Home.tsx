import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { motion } from "framer-motion";
import { GiRock, GiPaper, GiScissors, GiLightningTrio } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import PlayerForm from "../../component/player-form/PlayerForm";
import { registerPlayerTk } from "../../features/players/PlayersTk";
import { useNavigate } from "react-router-dom";
import { env } from "../../environment/Environment";
import { createMatchThunk } from "../../features/matches/CreateMatchTk";
import { Error } from "../../shared/alert/Alert";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { playerA, playerB, loading } = useSelector((state: RootState) => state.players);
  const { matchId, status, error } = useSelector((state: RootState) => state.matches);
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  useEffect(() => {
    if (status === "succeeded" && matchId) {
      navigate(env.game);
    }
  }, [status, matchId, navigate]);

  const handleRegister = async (type: "A" | "B", name: string) => {
    if (!name.trim()) {
      Error("Error", "Por favor ingresa el nombre del jugador.")
      return;
    }
    await dispatch(registerPlayerTk({ idPlayer: '', name, type }));
  };

  const handleStart = async () => {
    if (!playerA || !playerB) {
      Error("Error", "Debes registrar ambos jugadores antes de comenzar.")
      return;
    }
    console.log("Jugadores listos:", playerA, playerB);
    await dispatch(createMatchThunk({
      playerA: playerA.idPlayer,
      playerB: playerB.idPlayer,
    }));

  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center gap-3 text-4xl sm:text-5xl font-extrabold mb-8"
      >
        <GiRock className="text-yellow-300 animate-bounce" />
        <span>Piedra</span>·<GiPaper className="text-green-300 animate-pulse" />
        <span>Papel</span>·
        <GiScissors className="text-pink-300 animate-spin-slow" />
        <span>Tijera</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/20"
      >
        <h2 className="text-2xl font-semibold mb-6 text-yellow-300 tracking-widest flex items-center justify-center gap-2">
          <GiLightningTrio className="text-yellow-400 animate-pulse" />
          ¡Registra tus jugadores!
          <GiLightningTrio className="text-yellow-400 animate-pulse" />
        </h2>

        {!playerA ? (
          <PlayerForm
            label="Jugador A"
            value={nameA}
            onChange={setNameA}
            onSubmit={() => handleRegister("A", nameA)}
            loading={loading}
            flagPlayerB={false}
          />
        ) : (
          <PlayerForm
            label="Jugador B"
            value={nameB}
            onChange={setNameB}
            onSubmit={() => handleRegister("B", nameB)}
            loading={loading}
            flagPlayerB={!!playerB}
          />
        )}

        {playerA && playerB && (
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-400 to-green-500 text-black py-3 rounded-xl font-semibold text-lg"
          >
            <FaPlay className="text-black animate-pulse" />
            ¡Comenzar Juego!
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
