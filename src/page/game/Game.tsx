import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiRock, GiPaper, GiScissors } from "react-icons/gi";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";

const choices = [
  { name: "Piedra", icon: <GiRock className="text-gray-300" />, beats: "Tijera" },
  { name: "Papel", icon: <GiPaper className="text-green-300" />, beats: "Piedra" },
  { name: "Tijera", icon: <GiScissors className="text-pink-400" />, beats: "Papel" },
];

const Game: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerA, playerB } = location.state || { playerA: "", playerB: "" };

  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [winner, setWinner] = useState("");

  const playRound = (a: string, b: string) => {
    if (a === b) return "Empate";
    const choice = choices.find((c) => c.name === a);
    return choice?.beats === b ? playerA : playerB;
  };

  const handlePlay = (a: string, b: string) => {
    setChoiceA(a);
    setChoiceB(b);
    setWinner(playRound(a, b));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white p-6">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white/20 px-3 py-2 rounded-xl hover:bg-white/30 transition"
        >
          <FaArrowLeft /> Volver
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        ¡Batalla entre {playerA} y {playerB}!
      </motion.h1>

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-3">{playerA}</h2>
          <div className="flex gap-4">
            {choices.map((c) => (
              <motion.button
                key={c.name}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePlay(c.name, choiceB || randomChoice())}
                className="p-4 bg-white/20 rounded-full text-4xl hover:bg-white/30 transition"
              >
                {c.icon}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-3">{playerB}</h2>
          <div className="flex gap-4">
            {choices.map((c) => (
              <motion.button
                key={c.name}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePlay(choiceA || randomChoice(), c.name)}
                className="p-4 bg-white/20 rounded-full text-4xl hover:bg-white/30 transition"
              >
                {c.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {winner && (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <h3 className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-2">
            <FaTrophy className="text-yellow-400" />
            {winner === "Empate" ? "¡Es un empate!" : `🏆 Ganador: ${winner} 🏆`}
          </h3>
          <p className="mt-2 text-sm text-white/70">
            {choiceA} vs {choiceB}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const randomChoice = () => {
  const options = ["Piedra", "Papel", "Tijera"];
  return options[Math.floor(Math.random() * options.length)];
};

export default Game;
