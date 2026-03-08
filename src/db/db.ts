import Database from "better-sqlite3";
const db: Database.Database= new Database("./picnicDay.sqlite");

export default db;