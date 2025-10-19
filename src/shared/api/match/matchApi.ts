import matchService from "./matchService";

export const matchApi = () => {
  const createMatch = async (
    playerA: string,
    playerB: string) => {
    const res = await matchService.createMatch(playerA, playerB);
    return res;
  };
  return {
    createMatch
  };
};
