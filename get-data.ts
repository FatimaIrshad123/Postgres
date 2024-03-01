import { Client } from 'pg';

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'user12',
    user: 'postgres',
    password: '',
  });

async function getUsers() {
    const client = await Client();
    
    const selectUsersText = 'SELECT * FROM users';
    const userRes = await client.query(selectUsersText);
    
    console.log("Users:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getUserFromEmail(email: string) {
    const client = await Client();
    
    const selectUserText = 'SELECT * FROM users WHERE email = $1';
    const userRes = await client.query(selectUserText, [email]);
    
    console.log("Single User detail:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}
async function getTodosForUser(userId: number) {
    const client = await Client();
    
    const selectTodosText = 'SELECT * FROM todos WHERE user_id = $1';
    const todoRes = await client.query(selectTodosText, [userId]);
    
    console.log(`Todos for User ID ${userId}:`);
    for (let todo of todoRes.rows) {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

getUsers();

getUserFromEmail("john.do11e@gmail2.com")

const userIdToFetch = 1;
getTodosForUser(userIdToFetch);