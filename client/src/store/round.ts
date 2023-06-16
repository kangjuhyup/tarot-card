import create from 'zustand';

type roundState = {
  round: number;
  setRound: (new_round:number) => void;
};

const useRoundStore = create<roundState>((set) => ({
  round: 0,
  setRound: (new_round:number) => set(() => ({ round: new_round })),
}));

export default useRoundStore;
