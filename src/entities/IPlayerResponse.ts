export interface IPlayerResponse {
  id: string;
  name: string;
  wins: number;
  losses: number;
  draws: number;
  error?: boolean;
  message?: string;
}