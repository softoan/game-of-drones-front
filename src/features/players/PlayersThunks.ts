import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPlayer } from "../../entities/PlayersTypes";

export const registerPlayerThunk = createAsyncThunk(
    "players/register",
    async ({ idPlayer, name, type }: { idPlayer: string, name: string; type: "A" | "B" }) => {
        // axios
        console.log("Enviando jugador al backend:", name);
        await new Promise((res) => setTimeout(res, 1000));

        const player: IPlayer = {
            idPlayer,
            name,
            registered: true,
        };

        return { player, type };
    }
);
