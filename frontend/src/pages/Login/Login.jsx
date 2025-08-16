import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice.js';
import axios from 'axios';
import { toast } from "react-toastify"



const Login = () => {
  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")
  const [error, setError] =useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if(!validateEmail(email)) {
      setError("Please enter a valid email address")
      return 
    }

    if(!password){
      setError("Please enter the password")
      return
    }

    setError("")

    //login API
    try {
      dispatch(signInStart())

      const res = await axios.post("http://localhost:3000/api/auth/signin",
      {email, password}, 
      {withCredentials: true})

      if(res.data.success ==false){
        toast.error(res.data.message)
        console.log(res.data);
        dispatch(signInFailure(data.message))
      }
      toast.success(res.data.message)
      dispatch(signInSuccess(res.data))
      navigate("/")


    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message))     
    }
    
  }
  return (
    <>
    <div className='bg-violet-200 flex items-center justify-between px-8 py-2 drop-shadow'>
    
    <h2 className='text-xl font-medium text-black  py-2'>
        <span className='text-slate-900'>Note</span>
        <span className='text-slate-600'>It</span>
        <span className='text-slate-900'>Down📝 </span>
        </h2>
      
    <img className='flex items-center justify-between w-15 h-15 object-contain rounded-full ml-30'
    src= 'https://media.tenor.com/z1YT2LePMWkAAAAj/tkthao219-peach.gif' alt='cat gif'/>
    
    <p className='text-base font-normal text-slate-800 '> Your personal note taking site💭</p>
    </div>
    
    <div className='flex items justify-center mt-15'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input type='text' placeholder='Email' 
          className="input-box" value={email}
          onChange={(e)=> setEmail(e.target.value)}
          ></input>

          <PasswordInput value={password} 
          onChange={e => setPassword(e.target.value)}/>

          {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

          <button type="submit" className='btn-primary cursor-pointer'>
            
            LOGIN</button>

          <p className='text-sm text-center mt-4 ' >
            Not signed up yet?{" "}
            <Link to={"/signup"} className='font-medium text-[#2B85FF] underline'>
            Create an account
            </Link>

          </p>

        </form>
      </div>

    </div>
    </>
  )
}

export default Login


// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import PasswordInput from '../../components/Input/PasswordInput'; // Assuming this is a custom input component
// import { Link } from "react-router-dom";
// import { validateEmail } from "../../utils/helper";

// const Login = () => {
//   // Initialize useForm hook
//   const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();

//   // Reset errors on component mount or when form data changes
//   useEffect(() => {
//     reset();  // Reset form data and errors on initial render
//   }, [reset]);

//   // Form submit handler
//   const handleLogin = async (data) => {
//     // Clear previous errors
//     clearErrors();

//     // Validate email and password
//     if (validateEmail(data.email) !== true) {
//       setError("email", { type: "manual", message: validateEmail(data.email) });
//       return;
//     }

//     if (!data.password) {
//       setError("password", { type: "manual", message: "Wrong password" });
//       return;
//     }

//     // Clear password error if valid
//     clearErrors("password");

//     // Proceed with login API or other logic
//     console.log(data); // Check the submitted form data
//   };

//   // Login API


//   return (
//     <div className='flex items justify-center mt-28'>
//       <div className='w-96 border rounded bg-white px-7 py-10'>
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <h4 className='text-2xl mb-7'>Login</h4>

//           {/* Email Input */}
//           <input
//             type='text' placeholder='Email' className="input-box"
//             {...register("email", { 
//               required: "Please enter your email", 
//               validate: validateEmail
//             })}
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//           {/* Password Input */}
//           <PasswordInput
//             {...register("password", { 
//               required: "Please enter your password" 
//             })}
//           />
//           {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//           <button type="submit" className='btn-primary'>
//             LOGIN
//           </button>

//           <p className='text-sm text-center mt-4'>
//             Not signed up yet?{" "}
//             <Link to={"/signup"} className='font-medium text-[#2B85FF] underline'>
//               Create an account
//             </Link>
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;