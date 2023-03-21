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
      <h1>Test</h1>
    </>
  );
}
