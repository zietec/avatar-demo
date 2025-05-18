import { atom } from "jotai";

const token: string | null = import.meta.env.VITE_TAVUS_API_KEY;

// Atom to store the API token
export const apiTokenAtom = atom<string | null>(token);

// Atom to track if token is being validated
export const isValidatingTokenAtom = atom(false);

// Derived atom to check if token exists
export const hasTokenAtom = atom((get) => get(apiTokenAtom) !== null);

// Action atom to set token
export const setApiTokenAtom = atom(null, (_, set, token: string) => {
  set(apiTokenAtom, token);
});

// Action atom to clear token
export const clearApiTokenAtom = atom(null, (_, set) => {
  set(apiTokenAtom, null);
});
