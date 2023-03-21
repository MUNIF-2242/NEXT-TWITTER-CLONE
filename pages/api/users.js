import { initMongoose } from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
  await initMongoose();

  const id = req.query.id;
  res.json(id);
}
