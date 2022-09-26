import { Server } from 'https://deno.land/std@0.157.0/http/server.ts';

const handler = () => {
  const body = 'Hello Deno World!\n';

  return new Response(body, { status: 200 });
};

const port = 3000;
const server = new Server({ handler });
const listener = Deno.listen({ port: port });

console.log("Server listening on http://localhost:3000!");

await server.serve(listener);