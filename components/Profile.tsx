import { User } from "../lib/domain/User.ts";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar.tsx";

export const Profile = ({ user }: { user: User }) => (
  <Avatar>
    <AvatarImage src={user.avatar_url} alt={user.name} />
    <AvatarFallback>{user.name}</AvatarFallback>
  </Avatar>
);
