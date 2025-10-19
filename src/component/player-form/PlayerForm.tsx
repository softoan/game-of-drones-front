import React from "react";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import type { IPlayerFormProps } from "../../entities/IPlayerFormProps";

const PlayerForm: React.FC<IPlayerFormProps> = ({
  label,
  value,
  onChange,
  onSubmit,
  loading = false,
  disabled = false,
  flagPlayerB = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4 mb-6"
    >
      <motion.div whileFocus={{ scale: 1.05 }} className="relative">
        <FaUserAlt className="absolute left-3 top-3 text-white/60" />
        <input
          type="text"
          placeholder={`Nombre del ${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full p-3 pl-10 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
        />
      </motion.div>

      {!flagPlayerB && (
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading || disabled}
          onClick={onSubmit}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-semibold text-lg hover:shadow-[0_0_25px_rgba(255,255,0,0.6)] transition-all disabled:opacity-50"
        >
          {loading ? "Registrando..." : `Registrar ${label}`}
        </motion.button>
      )}
    </motion.div>
  );
};

export default PlayerForm;
