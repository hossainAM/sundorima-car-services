import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../../Shared/PageTitle/PageTitle';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const location = useLocation();

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth); //Reset password

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let from = location.state?.from?.pathname || "/";

    let errorElement;

    if (error) {
      errorElement = <p>Error: {error?.message}</p>
    }

    if(loading || sending) {
        return <Loading></Loading>
    }

    //use useEffect as user is loading in async way
    // useEffect(() => {
    //     if(user) {
    //     navigate(from, { replace: true });//navigate after getting access token
    // }
    // }, [from, navigate, user])

      const handleSubmit = async e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
        //jwt token
        const {data} = await axios.post('http://localhost:5000/login', {email})
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });
    }

    const handleSignUp = e => {
        navigate('/signUp')
    }

    //Reset Password
    const handleResetPassword = async () => {
        const email = emailRef.current.value;
        if(email){
              await sendPasswordResetEmail(email);
              toast('Sent email');
        }
        else{
            toast('Please Provide your Email Address')
        }
    }

    return (
        <>
        <PageTitle title="Login"></PageTitle>
            <h2 className='text-primary text-center mt-2' >Please Login!!</h2>
            <Form onSubmit={handleSubmit} className='container w-50 mx-auto'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                </Form.Group>
                <Button className='w-50 mx-auto d-block' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className='text-center mt-2'>New to Sundorima Car Services? <Link to='/signUp' onClick={handleSignUp}className='text-primary text-decoration-none'>Please Sign Up</Link></p>
            <p className='text-center mt-2'>Forgot Password? <button onClick={handleResetPassword} className='text-primary text-decoration-none btn btn-link'>Reset Password</button></p>
            <p className='text-danger text-center'>{errorElement}</p>
            <SocialLogIn></SocialLogIn>
        </>
    );
};

export default Login;