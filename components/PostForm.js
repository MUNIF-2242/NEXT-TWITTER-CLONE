import useUserInfo from '../hooks/useUserInfo';
import { useState } from 'react';
import axios from 'axios';
import Avatar from './Avatar';

export default function PostForm({ onPost }) {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState('');
  //const [images, setImages] = useState([]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post('/api/posts', { text });
    setText('');
    // setImages([]);
    if (onPost) {
      onPost();
    }

    console.log({ text });
  }

  if (status === 'loading') {
    return '';
  }
  return (
    <form className='mx-5' onSubmit={handlePostSubmit}>
      <div className='flex'>
        <Avatar src={userInfo?.image} />
        <div className='grow pl-2'>
          <div>
            <textarea
              className='w-full p-2 bg-transparent text-twitterWhite'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={'Whats happen'}
            />
          </div>

          <div className='text-right border-t border-twitterBorder pt-2 pb-2'>
            <button className='bg-twitterBlue text-white px-5 py-1 rounded-full'>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
