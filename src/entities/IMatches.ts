
export interface IScore {
  playerA: number;
  playerB: number;
}

export interface IRound {
  roundNumber?: number;
  moves?: {
    playerId: string;
    move: string;
    timestamp: string;
  }[];
  winner: string | null;
  createdAt?: string;
}

export interface IMatch {
  _id: string;
  playerA: string;
  playerB: string;
  rounds: IRound[];
  score: IScore;
  status: "ONGOING" | "FINISHED" | "CANCELLED";
  currentTurn: string | null;
  winner: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MatchState {
  matchId: string | null;
  playerA: string | null;
  playerB: string | null;
  score: { playerA: number; playerB: number };
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
  rounds: IRound[];
  currentTurn: string | null;
  winner: string | null;
}

