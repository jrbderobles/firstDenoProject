import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.31.1/mod.ts';
import 'https://deno.land/std@v0.157.0/dotenv/load.ts';

let db: Database;

export async function connect() {
  const client = new MongoClient();
  const MONGODB_URI = `mongodb+srv://${Deno.env.get('MONGO_USER')}:${Deno.env.get('MONGO_PASSWORD')}@${Deno.env.get('MONGO_CLUSTER')}.mongodb.net/?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`;

  await client.connect(MONGODB_URI);
  console.log('Database connected!');

  db = client.database(Deno.env.get('MONGO_DEFAULT_DATABASE'));
}


export function getDb() {
  return db;
}