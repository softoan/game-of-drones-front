import playerService from "./playerService";
export const playerApi = () => {
  const createPlayer = async (name: string) => {
    const res = await playerService.createPlayer(name);
    return res;
  };

  return {
    createPlayer
  };
};
