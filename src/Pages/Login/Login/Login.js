import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Spinner/Spinner';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const handleSubmit = e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password)
    }

    let errorElement;

    if (error) {
      errorElement = <p>Error: {error?.message}</p>
    }

    //use useEffect as user is loading in async way
    useEffect(() => {
        if(user) {
        navigate(from, { replace: true });
    }
    }, [from, navigate, user])

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