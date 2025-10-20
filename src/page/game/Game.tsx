import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { resetPlayers } from "../../features/players/PlayersSlice";
import { FaArrowLeft, FaTrophy, FaPowerOff, FaHourglassHalf } from "react-icons/fa";
import { env } from "../../environment/Environment";
import { clearMatchState } from "../../features/matches/MatchesSlice";
import { fetchMatchByIdThunk, makeMoveThunk } from "../../features/matches/CreateMatchTk";
import { movements } from "../../shared/Movements";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { playerA, playerB } = useSelector((state: RootState) => state.players);
  const { matchId, status, score, currentTurn } = useSelector((state: RootState) => state.matches);

  const [message, setMessage] = useState<string>("Esperando jugada inicial...");
  const [winner, setWinner] = useState<string>("");

  useEffect(() => {
    if (!playerA || !playerB || !matchId) {
      navigate(env.home);
      return;
    }
    dispatch(fetchMatchByIdThunk(matchId));
  }, [dispatch, matchId]);

  const scoreA = score?.playerA ?? 0;
  const scoreB = score?.playerB ?? 0;

  const handleMove = async (player: "A" | "B", move: string) => {
    const playerId = player === "A" ? playerA?.idPlayer : playerB?.idPlayer;
    if (!matchId || !playerId) return;

    setMessage(`${player === "A" ? playerA?.name : playerB?.name} ha elegido...`);

    const result = await dispatch(makeMoveThunk({ matchId, move, playerId }));

    if (makeMoveThunk.fulfilled.match(result)) {
      const data = result.payload;

      if (data.currentTurn) {
        const nextPlayerName =
          data.currentTurn === playerA?.idPlayer ? playerA?.name : playerB?.name;
        setMessage(`Turno de ${nextPlayerName}`);
      }

      if (data.winner) {
        const roundWinner =
          data.winner === playerA?.idPlayer
            ? playerA?.name
            : data.winner === playerB?.idPlayer
              ? playerB?.name
              : "Empate";

        setWinner(roundWinner ?? '');

        if (roundWinner === "Empate") {
          setMessage("¡Empate en la ronda!");
        } else {
          setMessage(`¡${roundWinner} ganó esta ronda!`);
        }
      }
      if (data.status === "FINISHED" || data.score.playerA === 3 || data.score.playerB === 3) {
        setMessage("¡Fin del juego! Volviendo al inicio...");
        setTimeout(() => {
          navigate(env.home);
          dispatch(resetPlayers());
          dispatch(clearMatchState());
        }, 5000);
      }
    }
  };

  const handleExit = () => {
    dispatch(resetPlayers());
    dispatch(clearMatchState());
    navigate(env.home);
  };

  if (!playerA || !playerB) {
    navigate(env.home);
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6 relative">
      <div className="absolute top-4 left-4 flex gap-3">
        <button
          onClick={() => navigate(env.home)}
          className="bg-white/20 px-3 py-2 rounded-xl hover:bg-white/30 transition flex items-center gap-2"
        >
          <FaArrowLeft /> Volver
        </button>

        <button
          onClick={handleExit}
          className="bg-red-500/70 px-3 py-2 rounded-xl hover:bg-red-500 transition flex items-center gap-2"
        >
          <FaPowerOff /> Salir
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        ¡Batalla entre {playerA.name} y {playerB.name}!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between w-full max-w-md mb-10 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20"
      >
        <div
          className={`text-center flex-1 ${currentTurn === playerA?.idPlayer ? "text-yellow-300" : "opacity-70"
            }`}
        >
          <p className="text-lg font-semibold">{playerA.name}</p>
          <p className="text-3xl font-bold">{status === "loading" ? "..." : scoreA}</p>
        </div>

        <div className="px-6 text-xl font-bold text-white/70">VS</div>

        <div
          className={`text-center flex-1 ${currentTurn === playerB?.idPlayer ? "text-yellow-300" : "opacity-70"
            }`}
        >
          <p className="text-lg font-semibold">{playerB.name}</p>
          <p className="text-3xl font-bold">{status === "loading" ? "..." : scoreB}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={message}
        className="mb-6 bg-white/20 px-6 py-3 rounded-xl text-center text-white/90 flex items-center gap-3"
      >
        <FaHourglassHalf className="text-yellow-300" />
        <span>{message}</span>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-3">{playerA.name}</h2>
          <div className="flex gap-4">
            {movements.map((c) => (
              <motion.button
                key={c.name}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove("A", c.name)}
                disabled={currentTurn !== playerA?.idPlayer}
                className={`p-4 rounded-full text-4xl transition ${currentTurn === playerA?.idPlayer
                  ? "bcolor-bg text-black"
                  : "bg-white/20 hover:bg-white/30"
                  }`}
              >
                {c.icon}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-3">{playerB.name}</h2>
          <div className="flex gap-4">
            {movements.map((c) => (
              <motion.button
                key={c.name}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMove("B", c.name)}
                disabled={currentTurn !== playerB?.idPlayer}
                className={`p-4 rounded-full text-4xl transition ${currentTurn === playerB?.idPlayer
                  ? "bcolor-n-bg text-white"
                  : "bg-white/20 hover:bg-white/30"
                  }`}
              >
                {c.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>


      {winner && (<>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-2">
            <FaTrophy className="text-yellow-400" />
            {winner === "Empate" ? "¡Es un empate!" : `Ganador: ${winner}`}
          </h3>
        </motion.div>

        <div className="balloon-container absolute inset-0">
          <div className="balloon"></div>
          <div className="balloon"></div>
          <div className="balloon"></div>
          <div className="balloon"></div>
          <div className="balloon"></div>
        </div>
      </>
      )}
    </div>
  );
};

export default Game;
