import { WithSession } from "@fresh-session";
import { User } from "./User.ts";

export type State = {
  user: User;
};

export type StateWithSession = State & WithSession;
