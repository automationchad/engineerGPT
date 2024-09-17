import { atom, useAtom } from "jotai";

type Config = {
  selected: string | null;
  aiAnswer: string | null;
};

const configAtom = atom<Config>({
  selected: null,
  aiAnswer: null,
});

export function useMail() {
  return useAtom(configAtom);
}
