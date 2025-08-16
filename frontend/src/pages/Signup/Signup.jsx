

import React, { useState } from 'react';
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from 'axios';
import { toast } from 'react-toastify';


const Signup = () => {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    const [error, setError] =useState("")
    const [name, setName]=useState("")

    const navigate = useNavigate()
  
    const handleSignup = async (e) => {
      e.preventDefault()

      if(!name){
        setError("Please enter your name")
        return
      }
  
      if(!validateEmail(email)) {
        setError("Please enter a valid email address")
        return 
      }
  
      if(!password){
        setError("Please set a password")
        return
      }

      setError("")

      //signup API
      try {
        const res = await axios.post("http://localhost:3000/api/auth/signup", 
        {username: name, email, password}, {withCredentials: true})

        if(res.data.success === false){
          setError(res.data.message)
          toast.error(res.data.message)
          return
        }

        toast.success(res.data.message)

        setError("")

        navigate("/login")
      } catch (error) {
        toast.error(error.message)
        console.log(error.message);
        setError(error.message)
        
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
    <div><div className='flex items justify-center mt-15'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
      <form onSubmit={handleSignup}>
        <h4 className='text-2xl mb-7'>Signup</h4>

        <input type='text' placeholder='Name' 
        className="input-box" value={name}
        onChange={(e)=> setName(e.target.value)}
        ></input>
        <input type='text' placeholder='Email' 
        className="input-box" value={email}
        onChange={(e)=> setEmail(e.target.value)}
        ></input>

        <PasswordInput value={password} 
        onChange={e => setPassword(e.target.value)}/>
        
        

        {error && <p className='text-red-500 text-sm pb-1'>{error}</p>}

        <button type="submit" className='btn-primary'>
          SIGN UP
          </button>

        <p className='text-sm text-center mt-4 ' >
          Already have an account?{" "}
          <Link to={"/login"} className='font-medium text-[#2B85FF] underline'>
          Login
          </Link>

        </p>

      </form>
    </div>

  </div></div>
  </> 
  )
}

export default Signup


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import PasswordInput from '../../components/Input/PasswordInput'; 
// import { Link } from "react-router-dom";
// import { validateEmail } from "../../utils/helper";

// const Signup = () => {
//   // Initialize useForm hook
//   const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

//   const handleSignup = async (data) => {
//     // Clear previous errors before re-validation
//     clearErrors();

//     // Check for missing name
//     if (!data.name) {
//       setError("name", { type: "manual", message: "Please enter your name" });
//       return;
//     }

//     // Check for invalid email
//     if (validateEmail(data.email) !== true) {
//       setError("email", { type: "manual", message: "Please enter a valid email address" });
//       return;
//     }

//     // Check for missing password
//     if (!data.password) {
//       setError("password", { type: "manual", message: "Please set a password" });
//       return;
//     }

//     // Proceed with signup API or logic after validation
//     console.log(data); // Check the submitted form data
//   };

//   return (
//     <div className="flex items justify-center mt-28">
//       <div className="w-96 border rounded bg-white px-7 py-10">
//         <form onSubmit={handleSubmit(handleSignup)}>
//           <h4 className="text-2xl mb-7">Signup</h4>

//           {/* Name Input */}
//           <input
//             type="text"
//             placeholder="Name"
//             className="input-box"
//             {...register("name", { required: "Please enter your name" })}
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//           {/* Email Input */}
//           <input
//             type="text"
//             placeholder="Email"
//             className="input-box"
//             {...register("email", { required: "Please enter your email", validate: validateEmail })}
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//           {/* Password Input */}
//           <PasswordInput
//             {...register("password", { required: "Please set a password" })}
//           />
//           {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//           <button type="submit" className="btn-primary">
//             SIGN UP
//           </button>

//           <p className="text-sm text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-[#2B85FF] underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



