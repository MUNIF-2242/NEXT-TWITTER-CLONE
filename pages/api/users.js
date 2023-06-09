import { initMongoose } from '@/lib/mongoose';
import User from '@/models/User';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method === 'PUT') {
    const { username } = req.body;
    await User.findByIdAndUpdate(session.user.id, { username });
    //res.json(session);
    res.json('username added to db');
  }
  if (req.method === 'GET') {
    const id = req.query.id;
    const user = await User.findById(id);
    res.json({ user });
  }
}
