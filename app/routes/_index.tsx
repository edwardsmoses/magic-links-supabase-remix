import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import { createSupabaseServerClient } from "~/supabase/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabaseClient } = createSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  return json({ user });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="bg-orange-50 h-screen flex justify-center items-center">
      {loaderData.user ? (
        <div>
          <h1 className="text-3xl">Welcome to Remix</h1>

          <h1 className="text-xl text-slate-600">
            You are signed in as {loaderData.user.email}
          </h1>

          <Form action="/auth-sign-out" method="POST" className="mt-2">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign out
            </button>
          </Form>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl">Welcome to Remix</h1>

          <h1 className="text-xl text-slate-600">Please sign in</h1>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to="/auth"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
