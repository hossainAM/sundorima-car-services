import React, { useEffect } from 'react';
import { useSignInWithGoogle, useSignInWithFacebook, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Spinner/Spinner';

const SocialLogIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);//Google
    const [signInWithFacebook, , user1, loading1, error1] = useSignInWithFacebook(auth); //Facebook
    const [signInWithGithub, user2, loading2, error2] = useSignInWithGithub(auth);//Github

    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    //Google + Facebook
    let errorElement;

     if(loading || loading1 || loading2){
       return <Loading></Loading>
   }

    if (error || error1 || error2) {
      errorElement =
        <p>Error: {error?.message} {error1?.message} {error2?.message}</p>
  }
    // if (user || user1 || user2) {
    //    navigate('/home')
    // }

    if(user || user1 || user2) {
    navigate(from, { replace: true });
}

    return (
        <>
        <div className='d-flex align-items-center justify-content-center'>
            <div style={{height: '1px'}} className='bg-primary w-25'></div>
            <p className='px-2 pt-2 fs-4'>or</p>
            <div style={{height: '1px'}} className='bg-primary w-25'></div>
        </div>
        <p className='text-danger text-center'>{errorElement}</p>
        <div>
            <button onClick={() => signInWithGoogle()} className='btn btn-success w-25 d-block mx-auto my-2'>Google Sign In</button>
            <button onClick={() => signInWithFacebook()} className='btn btn-info w-25 d-block mx-auto my-2'>Facebook Sign In</button>
            <button onClick={() => signInWithGithub()} className='btn btn-danger w-25 d-block mx-auto'>Github Sign In</button>
        </div>
        </>
    );
};

export default SocialLogIn;