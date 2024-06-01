import { OAuthClients } from "../../routes/login.tsx";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
};

export const convertFromClient = (client: OAuthClients, data: any): User => {
  switch (client) {
    case "github":
      return {
        id: `${data.sub}@github`,
        name: data.name,
        email: data.email,
        avatar_url: data.avatar_url,
      };
    case "gitlab":
      return {
        id: `${data.sub}@gitlab`,
        name: data.name,
        email: data.email,
        avatar_url: data.picture,
      };
    default:
      throw new Error("Invalid client");
  }
};
