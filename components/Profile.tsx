import { User } from "../lib/domain/User.ts";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar.tsx";

export const Profile = ( {user}: {user: User} ) => (
  <>
    <Avatar>
      <AvatarImage src={user.avatar_url} alt={user.name} />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
    <p class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      name: {user.name}
      email: {user.email}
    </p>
  </>
);
