import { atom } from "jotai";
import { Recipient } from "./types";

export const isAuthenticatedAtom = atom(false);
export const userTypeAtom = atom("");

export const userDataAtom = atom({
  date_joined: "",
  email: "",
  first_name: "",
  is_active: false,
  is_cg: false,
  last_name: "",
  profile_pic: "",
  recipients: [] as Recipient[],
  user: 0,
  user_id: "0",
  username: "",
});
