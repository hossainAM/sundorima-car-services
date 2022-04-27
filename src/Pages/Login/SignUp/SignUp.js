import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import Loading from '../../../Shared/Spinner/Spinner';

const SignUp = () => {
    //State for terms and conditions checkbox
    const [agree, setAgree] = useState(false);

     //Sent email verification
     const [sendEmailVerification, sending, VerificationError] = useSendEmailVerification(auth);

    //Create user
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});

    //update profile
    const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);

    const navigate = useNavigate();
     const handleLogIn = e => {
         navigate('/login')
     }

      if(loading){
       return <Loading></Loading>
   }

    //  if(user) {
    //      console.log('user', user);
    //  }

    //SignUp
    const handleSignUp = async e => {
        e.preventDefault();
        const userName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const agree = e.target.terms.check;//option-1
    
        //create user
       await createUserWithEmailAndPassword(email, password);
       //update name
       await updateProfile({ displayName: userName });
          console.log('Updated profile');
          navigate('/home')
    }

    return (
        <div>
             <h2 className='text-primary text-center mt-2' >Please Sign Up!!</h2>
            <Form onSubmit={handleSignUp} className='container w-50 mx-auto'>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name= "name" placeholder="Enter Your Name" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name= "email" placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name= "password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onClick={() => setAgree(!agree)} type="checkbox" name="terms" label="Accept Terms and Conditions" />
                </Form.Group>
                <Button disabled={!agree} className='w-50 mx-auto d-block' variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p className='text-center mt-2'>Already have ab account? <Link to='/login' onClick={handleLogIn}className='text-primary text-decoration-none'>Please Login!!</Link></p>
            <SocialLogIn></SocialLogIn>
        </div>
    );
};

export default SignUp;