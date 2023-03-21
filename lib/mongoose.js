import mongoose from 'mongoose';

export async function initMongoose() {
  if (mongoose.connection.readyState) {
    return mongoose.connection.asPromise();
  }
  await mongoose.connect(process.env.MONGODB_URI);
}
