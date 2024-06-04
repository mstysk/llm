import { User } from "../lib/domain/User.ts";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar.tsx";

export const Profile = ({ user }: { user: User }) => (
  <div class="flex gap-5">
    <div class="h-55 w-55">
    <Avatar>
      <AvatarImage class="" src={user.avatar_url} alt={user.name} />
      <AvatarFallback class="bg-indigo-500 text-white p-[10px]">
        {user.name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </div>
  </div>
);
