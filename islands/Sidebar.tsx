import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../components/Command.tsx";
import { Login } from "../components/Login.tsx";
import { Logout } from "../components/Logout.tsx";
import { Profile } from "../components/Profile.tsx";
import { User } from "../lib/domain/User.ts";

type Props = {
  user: User;
};
export default function Sidebar({ user }: Props) {
  return (
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <a href="/" class="flex items-center ps-2.5 mb-5">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          LocalLLM
        </span>
      </a>
      <ul class="space-y-2 font-medium">
        {user
          ? (
            <li>
              <Command>
                <CommandList>
                  <CommandGroup heading="General">
                    <CommandItem>
                      <a href="/chat">New</a>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
              <Profile user={user} />
              <Logout />
            </li>
          )
          : (
            <li>
              <Login />
            </li>
          )}
      </ul>
    </div>
  );
}
