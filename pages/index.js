import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  //console.log(session);
  // function getUserInfo() {
  //   if (status === 'loading') {
  //     return;
  //   }
  //   fetch('/api/users?id=' + session.user.id);
  // }

  // useEffect(() => {
  //   getUserInfo();
  // }, [status]);

  return (
    <>
      <h1>Test</h1>
    </>
  );
}
