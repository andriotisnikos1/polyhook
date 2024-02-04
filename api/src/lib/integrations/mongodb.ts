import mongodb from 'mongodb';
import { getSecret } from './doppler.js';
export default async function initMongoDB() {
    const connectionString = await getSecret("MONGO_URI")
    const connection = await mongodb.MongoClient.connect(connectionString)
    const db = connection.db("polyhook")
    return { mongo: connection, db }
}
