import { Router } from 'https://deno.land/x/oak/mod.ts';

interface Todo {
  id: string,
  text: string
}

let todos: Todo[] = [];

const router = new Router();

router.get('/todos', (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post('/todos', async (ctx) => {
  const result = ctx.request.body();
  const data = await result.value;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text
  };

  todos.push(newTodo);
  ctx.response.body = {
    message: 'Created todo!',
    todo: newTodo
  };
});

router.put('/todos/:todoId', async (ctx) => {
  const result = ctx.request.body();
  const data = await result.value;

  const todoId = ctx.params.todoId;
  const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);

  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: data.text
  };

  ctx.response.body = {
    message: 'Updated todo!'
  };
});

router.delete('/todos/:todoId', (ctx) => {
  const todoId = ctx.params.todoId;

  todos = todos.filter(todoItem => todoItem.id !== todoId);

  ctx.response.body = {
    message: 'Deleted todo!'
  };
});

export default router;