import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  //console.log(session);

  const [userInfo, setUserInfo] = useState(null);
  const [status, setStatus] = useState('loading');
  function getUserInfo() {
    if (sessionStatus === 'loading') {
      return;
    }

    if (!session?.user?.id) {
      setStatus('unauthenticated');
      return;
    }

    fetch('/api/users?id=' + session.user.id).then((response) => {
      response.json().then((json) => {
        //console.log(json);
        setUserInfo(json.user);
        setStatus('authenticated');
      });
    });
  }

  useEffect(() => {
    getUserInfo();
  }, [sessionStatus]);

  return { userInfo, setUserInfo, status };
}
