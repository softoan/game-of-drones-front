export interface IPlayer {
  idPlayer: string;
  name: string;
  registered: boolean;
}

export interface IPlayersState {
  playerA: IPlayer | null;
  playerB: IPlayer | null;
  loading: boolean;
  error: string | null;
}
