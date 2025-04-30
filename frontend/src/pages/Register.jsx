import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const { register, 
            handleSubmit, 
            formState: {errors}, } 
            = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
   useEffect(() => {
    if(isAuthenticated) navigate("/tasks")
   }, [isAuthenticated])

    const onSubmit = handleSubmit(async(values) => {
       signup(values)
    })
  return (
    <div>
        <div>
            {
                registerErrors.map((error, i) => (
                    <div key={i}>
                        {error}
                    </div>
                ))
            }
             <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    { ...register("username", {required: true})} 
                    placeholder='Username'
                />
                {errors.username && (
                    <p>Username is Required</p>
                )}
                <input 
                    type='email' 
                    { ...register("email", {required: true})}
                    placeholder='Email' 
                />
                {errors.email && (
                    <p>Email is Required</p>
                )}
                <input 
                    type='password' 
                    { ...register("password", {required: true})}
                    placeholder='Password' 
                />
                {errors.password && (
                    <p>Password is Required</p>
                )}
                <button type='submit'>
                    Register
                </button>
            </form>
            <p>
                Already have an account
                <Link to="/login">Login</Link> 
            </p>
        </div>
    </div>
  )
}

export default Register