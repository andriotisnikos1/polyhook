import initMongoDB from './integrations/mongodb';

export const {mongo, db} = await initMongoDB()
