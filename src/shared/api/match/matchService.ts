import { Error, Success } from "../../alert/Alert";
import api from "../axiosConfig";

const matchService = {
    createMatch: async (
        playerA: string,
        playerB: string
    ): Promise<{ error: boolean; message: string; data?: any }> => {
        try {
            const res = await api.post(`/matches`, { playerA, playerB });
            if (!res.data.error) {
                Success("Éxito", "La partida fue creada con éxito.");
                return {
                    error: false,
                    message: "Partida creada correctamente.",
                    data: res.data.data,
                };
            } else {
                Error("Atención", res.data.message ?? "No se pudo crear la partida.");
                return {
                    error: true,
                    message: res.data.message,
                };
            }
        } catch (error: any) {
            console.error("Error creando partida:", error);
            const backendMessage = error.response?.data?.message;
            Error("Error", backendMessage ?? "Ups… parece que algo salió mal creando la partida.");
            return {
                error: true,
                message: backendMessage ?? "Ups… parece que algo salió mal creando la partida.",
            };
        }
    },

    getMatchById: async (matchId: string) => {
        try {
            const res = await api.get(`/matches/${matchId}`);
            return res.data;
        } catch (error: any) {
            console.error("Error obteniendo partida:", error);
            return {
                error: true,
                message:
                    error.response?.data?.message ?? "Error al obtener datos de la partida",
            };
        }
    },
    makeMove: async (matchId: string, payload: { move: string; playerId: string }) => {
        try {
            const res = await api.post(`/matches/${matchId}/move`, payload);
            return res.data;
        } catch (error: any) {
            console.error("Error registrando movimiento:", error);
            return {
                error: true,
                message:
                    error.response?.data?.message ?? "Error al registrar el movimiento",
            };
        }
    },
};

export default matchService;
