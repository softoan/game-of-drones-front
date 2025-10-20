import { createAsyncThunk } from "@reduxjs/toolkit";
import matchService from "../../shared/api/match/matchService";
import type { IMatch } from "../../entities/IMatches";

export const createMatchThunk = createAsyncThunk(
  "matches/create",
  async ({ playerA, playerB }: { playerA: string; playerB: string }, { rejectWithValue }) => {
    try {
      const result = await matchService.createMatch(playerA, playerB);
      if (result.error) {
        return rejectWithValue(result.message);
      }
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Error desconocido al crear la partida");
    }
  }
);

export const fetchMatchByIdThunk = createAsyncThunk(
  "matches/fetchById",
  async (matchId: string, { rejectWithValue }) => {
    try {
      const result = await matchService.getMatchById(matchId);
      if (result.error) return rejectWithValue(result.message);
      return result.data as IMatch;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const makeMoveThunk = createAsyncThunk(
  "match/makeMove",
  async (
    { matchId, move, playerId }: { matchId: string; move: string; playerId: string },
    { rejectWithValue }
  ) => {
    const response = await matchService.makeMove(matchId, { move, playerId });
    if (response.error) {
      return rejectWithValue(response.message);
    }
    return response.data;
  }
);