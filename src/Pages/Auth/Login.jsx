import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogIn = (data) => {
        console.log(data)
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogIn)} className='p-10'>
                <h2 className='text-4xl font-bold pb-2'>Welcome Back!</h2>
                <p>Login with ZapShift</p>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-700'>Email is required</p>}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/
                    })}
                        className="input" placeholder="Password" />
                    {errors.password?.type === "required" && <p className='text-red-700'>Password is required</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-700'>Password must contain at least 6 characters</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-700'>Password must contain at least one upper case and one lower case</p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn bg-primary mt-4">Login</button>
                </fieldset>
            </form>
            <p>Don't have any account? <Link className='text-primary' to={'/register'}>Register</Link></p>
        </div>

    );
};

export default Login;