import Layout from '@/components/Layout';
import PostContent from '@/components/PostContent';
import PostForm from '@/components/PostForm';
import UsernameForm from '@/components/UsernameForm';
import useUserInfo from '@/hooks/useUserInfo';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  //console.log(session);
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState([]);

  function fetchPosts() {
    axios.get('/api/posts').then((res) => {
      setPosts(res.data.posts);
      setIdsLikedByMe(res.data.idsLikedByMe);
    });
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <Layout>
      <h1 className='text-lg font-bold p-4'>Home</h1>
      <PostForm
        onPost={() => {
          fetchPosts();
        }}
      />

      <div className='border-t border-twitterBorder p-5'>
        {posts.length > 0 &&
          posts.map((post) => (
            <div>
              <PostContent
                {...post}
                likedByMe={idsLikedByMe.includes(post._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
}
