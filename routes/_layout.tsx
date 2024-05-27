import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="bg-sky-500">
      <Component />
    </div>
  );
}
