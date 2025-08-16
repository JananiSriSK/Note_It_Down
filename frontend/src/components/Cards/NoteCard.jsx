import React from 'react'
import {MdCreate, MdDelete, MdOutlinePushPin} from "react-icons/md"
import moment from "moment"

const NoteCard = ({title, date, content, tags, isPinned, onPinNote, onEdit, onDelete}) => {
  return (
    <div className='border rounded p-4 m-3 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between' >
            <div>
                <h6 className='text-base  font-medium'>{title}</h6>
                <span className='text-xs text-violet-800'>{moment(date).format("Do MMMM YYYY")}</span>
            </div>

            <MdOutlinePushPin className=  {`icon-btn  hover:text-violet-500 ${isPinned ? 
                "text-violet-700" : "text-violet-300"}`} 
                onClick ={onPinNote}/>
        </div>
        <p className='text-xs text-slate-600 mt-2'>
            {content?.slice(0,1000)}
        </p>

        <div className='flex items-center justify-between mt-2'>
            <div className='tex-xs text-slate-500'>{tags.map((item)=> `#${item} `)}</div>
        
        <div className='flex items-center gap-2'>
            <MdCreate className='icon-btn hover:text-violet-400' 
            onClick={onEdit}/>
            <MdDelete className='icon-btn hover:text-violet-400' 
            onClick={onDelete}/>

        </div>
        </div>
    
    </div>

    
  )
}

export default NoteCard