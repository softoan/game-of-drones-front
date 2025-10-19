import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPlayer } from "../../entities/PlayersTypes";
import { playerApi } from "../../shared/api/player/playerApi";
import { Error, Success } from "../../shared/alert/Alert";

export const registerPlayerThunk = createAsyncThunk(
    "players/register",
    async (
        { name, type }: { idPlayer: string; name: string; type: "A" | "B" },
        { rejectWithValue }
    ) => {
        const { createPlayer } = playerApi();
        const result = await createPlayer(name);

        if (result.error) {
            console.error("Error al crear jugador:", result.error);
            Error('Error', result.message ?? 'Error!!');
            return rejectWithValue(result.error);
        }
        Success('Éxto', 'El jugador fue creado con éxito.');
        const player: IPlayer = {
            idPlayer: result.id,
            name,
            registered: true,
        };

        return { player, type };

    }
);
