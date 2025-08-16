import React, { useState } from 'react'
import Searchbar from './Searchbar/Searchbar'
import ProfileInfo from './Cards/ProfileInfo'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  const onLogOut = async () => {
    try {
      dispatch(signoutStart())

      const res = await axios.get("http://localhost:3000/api/auth/signout",
       {withCredentials: true,})

       if(res.data.success === false){
        dispatch(signoutFailure(res.data.message))
        toast.error(res.data.message)
        return
       }
       toast.success(res.data.message)
       dispatch(signoutSuccess())
       navigate("/login")
      
    } catch (error) {
      toast.error(error.message)
      dispatch(signoutFailure(error.message))
      
    }
    
  }

  return (
    <div className='bg-violet-200 flex items-center justify-between px-6 py-2 drop-shadow'>

    <Link to={'/'}>
        <h2 className='text-xl font-medium text-black py-2'>
            <span className='text-slate-900'>Note</span>
            <span className='text-slate-600'>It</span>
            <span className='text-slate-900'>Down📝</span>

        </h2>

        </Link>

        <Searchbar value={searchQuery} 
        onChange={({target}) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  )
}

export default Navbar