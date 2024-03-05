import {Client} from 'pg'

const client = new Client ({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'practice',
    password: ''
})

async function createTable() {
    await client.connect()
    let userTable = await client.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL);
  `);

  let todoTable = await client.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT false
        );
    `);
    let insertTodo = await client.query(`
    INSERT INTO todos (user_id,title,description) VALUES('1','abc','abc')
    `)
    let user = await client.query(`SELECT * FROM users`)   
    let todo = await client.query(`SELECT * FROM todos`)
}
async function getUser(email:string) {
    await client.connect()
    const query = `SELECT * FROM users WHERE email = $1`
    const values = [email]
    const result = await client.query(query,values)
    console.log(result.rows)
}
getUser('abc@gmail.com')