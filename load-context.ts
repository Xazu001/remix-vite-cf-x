import type { AppLoadContext } from "@remix-run/cloudflare";
import type { PlatformProxy } from "wrangler";
import type { Tables } from "server/database/tables";
import { D1Dialect } from "kysely-d1";
import { Kysely } from "kysely";
import { test } from "./server/services";

interface Env {
  db: D1Database;
}

export type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: Kysely<Tables>;
    test: string;
  }
}

export type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  return {
    ...context,
    test: test,
    db: new Kysely<Tables>({
      dialect: new D1Dialect({
        database: context.cloudflare.env.db,
      }),
    }),
  };
};
