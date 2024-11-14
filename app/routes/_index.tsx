import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{
			name: "description",
			content: "Welcome to Remix! Using Vite and Cloudflare!",
		},
	];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const users = await context.db.selectFrom('users').selectAll().execute();

  return null;
}

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Welcome to Remix (with Vite and Cloudflare)</h1>
			<ul>
				<li>
					<a
						target="_blank"
						href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
						rel="noreferrer"
					>
						Cloudflare Pages Docs - Remix guide
					</a>
				</li>
				<li>
					<a target="_blank" href="https://remix.run/docs" rel="noreferrer">
						Remix Docs
					</a>
				</li>
				<code>data: {JSON.stringify(data, null, 4)}</code>
			</ul>
		</div>
	);
}
