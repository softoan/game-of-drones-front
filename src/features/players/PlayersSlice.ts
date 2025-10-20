import { createSlice,  } from "@reduxjs/toolkit";
import type { IPlayersState } from "../../entities/PlayersTypes";
import { registerPlayerTk } from "./PlayersTk";

const initialState: IPlayersState = {
  playerA: null,
  playerB: null,
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    resetPlayers: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPlayerTk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPlayerTk.fulfilled, (state, action) => {
        const { player, type } = action.payload;
        if (type === "A") {
          state.playerA = { ...player, registered: true };
        } else {
          state.playerB = { ...player, registered: true };
        }
        state.loading = false;
      })
      .addCase(registerPlayerTk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al registrar jugador";
      });
  },
});

export const { resetPlayers } = playersSlice.actions;
export default playersSlice.reducer;
