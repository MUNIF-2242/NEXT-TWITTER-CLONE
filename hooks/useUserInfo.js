import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  //console.log(session);

  const [userInfo, setUserInfo] = useState();
  const [status, setStatus] = useState('loading');
  function getUserInfo() {
    if (sessionStatus === 'loading') {
      return;
    }
    fetch('/api/users?id=' + session.user.id).then((response) => {
      response.json().then((json) => {
        //console.log(json);
        setUserInfo(json.user);
        setStatus('user info loaded');
      });
    });
  }

  useEffect(() => {
    getUserInfo();
  }, [sessionStatus]);

  return { userInfo, status };
}
