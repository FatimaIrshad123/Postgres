mport { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'user12',
    user: 'postgres',
    password: '',
  });

  async function deleteTodo(todoId: number) {
    const client = await Client();
    
    const deleteTodoText = 'DELETE FROM todos WHERE id = $1';
    await client.query(deleteTodoText, [todoId]);
    
    console.log(`Todo with ID ${todoId} deleted!`);
}

const todoIdToDelete = 1;
deleteTodo(todoIdToDelete);
