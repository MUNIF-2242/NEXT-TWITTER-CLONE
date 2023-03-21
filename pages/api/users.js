import { initMongoose } from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
  await initMongoose();
  res.json('ok');
}
