import { MongoClient } from "mongodb"

export function db() {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
    const client = new MongoClient(MONGO_URI)
    const db = client.db("dwm4av")
    return db
}