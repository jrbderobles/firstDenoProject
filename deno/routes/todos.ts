import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.31.1/mod.ts';

import { getDb } from '../helpers/db_client.ts';

interface Todo {
  id?: string,
  text: string
}

const router = new Router();

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection('todos').find().toArray();

  const transformedTodos = todos.map(todo => {
    return {
      id: todo._id.toString(),
      text: todo.text
    };
  });

  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;

  const newTodo: Todo = {
    text: data.text
  };
  
  const todoId = await getDb().collection('todos').insertOne(newTodo);
  newTodo.id = todoId.$oid;

  ctx.response.body = {
    message: 'Created todo!',
    todo: newTodo
  };
});

router.put('/todos/:todoId', async (ctx) => {
  const data = await ctx.request.body().value;
  const todoId = ctx.params.todoId!;

  await getDb().collection('todos').updateOne(
    { _id: new Bson.ObjectId(todoId) },
    { $set: { text: data.text } }
  );

  ctx.response.body = {
    message: 'Updated todo!'
  };
});

router.delete('/todos/:todoId', async (ctx) => {
  const todoId = ctx.params.todoId!;

  await getDb().collection('todos').deleteOne({ _id: new Bson.ObjectId(todoId)});

  ctx.response.body = {
    message: 'Deleted todo!'
  };
});

export default router;