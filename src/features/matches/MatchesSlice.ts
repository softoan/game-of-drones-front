import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createMatchThunk, fetchMatchByIdThunk, makeMoveThunk } from "./CreateMatchThunk";
import type { MatchState } from "../../entities/IMatches";

const initialState: MatchState = {
  matchId: null,
  playerA: null,
  playerB: null,
  score: { playerA: 0, playerB: 0 },
  status: "idle",
  loading: false,
  error: null,
  rounds: [],
  currentTurn: null,
  winner: null,
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    clearMatchState: (state) => {
      state.matchId = null;
      state.playerA = null;
      state.playerB = null;
      state.score = { playerA: 0, playerB: 0 };
      state.status = "idle";
      state.loading = false;
      state.error = null;
      state.rounds = [];
      state.currentTurn = null;
      state.winner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMatchThunk.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(createMatchThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.loading = false;
        const match = action.payload;
        state.matchId = match._id;
        state.playerA = match.playerA;
        state.playerB = match.playerB;
        state.score = match.score ?? { playerA: 0, playerB: 0 };
        state.rounds = match.rounds ?? [];
        state.currentTurn = match.currentTurn ?? null;
        state.winner = match.winner ?? null;
      })
      .addCase(createMatchThunk.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = (action.payload as string) || "Error al crear la partida";
      })

      .addCase(fetchMatchByIdThunk.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchByIdThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.loading = false;
        const match = action.payload;
        state.matchId = match._id;
        state.playerA = match.playerA;
        state.playerB = match.playerB;
        state.score = match.score ?? { playerA: 0, playerB: 0 };
        state.rounds = match.rounds ?? [];
        state.currentTurn = match.currentTurn ?? null;
        state.winner = match.winner ?? null;
      })
      .addCase(fetchMatchByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = (action.payload as string) || "Error al obtener partida";
      })

      .addCase(makeMoveThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeMoveThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const match = action.payload;
        state.score = match.score ?? state.score;
        state.rounds = match.rounds ?? state.rounds;
        state.status = match.status ?? state.status;
        state.currentTurn = match.currentTurn ?? state.currentTurn;
        state.winner = match.winner ?? null;
      })
      .addCase(makeMoveThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error al registrar movimiento";
      });
  },
});

export const { clearMatchState } = matchesSlice.actions;
export default matchesSlice.reducer;
