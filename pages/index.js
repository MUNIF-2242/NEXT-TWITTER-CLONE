import PostForm from '@/components/PostForm';
import UsernameForm from '@/components/UsernameForm';
import useUserInfo from '@/hooks/useUserInfo';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  //console.log(session);
  const { userInfo, status: userInfoStatus } = useUserInfo();

  if (userInfoStatus === 'loading') {
    return 'loading user info';
  }

  if (!userInfo?.username) {
    return <UsernameForm />;
  }

  return (
    <>
      <div className='max-w-lg mx-auto border-l border-r border-x-twitterBorder min-h-screen'>
        <h1 className='text-lg font-bold p-4'>Home</h1>
        <PostForm />
      </div>
    </>
  );
}
