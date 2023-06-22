import create from 'zustand';

type logInState = {
  logIn: boolean;
  setLogIn: (new_logIn:boolean) => void;
};

const useLogInStore = create<logInState>((set) => ({
  logIn: false,
  setLogIn: (new_logIn:boolean) => set(() => ({ logIn: new_logIn })),
}));

export default useLogInStore;
