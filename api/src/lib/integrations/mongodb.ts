import mongodb from 'mongodb';
import { getSecret } from './doppler.js';
export default async function initMongoDB() {
    const connection = await mongodb.MongoClient.connect(await getSecret("MONGO_URI"))
    const db = connection.db("polyhook")
    return { mongo: connection, db }
}
