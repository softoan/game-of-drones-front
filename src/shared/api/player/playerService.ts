import type { IPlayerResponse } from "../../../entities/IPlayerResponse";
import api from "../axiosConfig";

const playerService = {
  createPlayer: async (name: string): Promise<IPlayerResponse> => {
    try {
      const res = await api.post(`/players`, { name });
      const data = res.data.data;
      return {
        id: data._id,
        name: data.name,
        wins: data.wins ?? 0,
        losses: data.losses ?? 0,
        draws: data.draws ?? 0,
        error: false,
      };
    } catch (error: any) {
      return {
        id: "",
        name,
        wins: 0,
        losses: 0,
        draws: 0,
        error: true,
        message:
          error.response?.data?.message ??
          "Ups… parece que algo salió mal en la misión.",
      };
    }
  },
};

export default playerService;
