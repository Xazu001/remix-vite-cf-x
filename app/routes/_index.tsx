import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {" "}
        <h1 className="text-6xl">Welcome to Remix-CF-Vite-X!</h1>
        <h4 className="pt-4">Using Kysely, Drizzle and D1</h4>
      </div>
    </div>
  );
}
