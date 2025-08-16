

import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import TagInput from '../../components/Input/TagInput';
import axios from "axios";
import { toast } from "react-toastify";


const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || '');
  const [content, setContent] = useState(noteData?.content || '');
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Populate fields if in "edit" mode
  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || '');
      setContent(noteData.content || '');
      setTags(noteData.tags || []);
    }
  }, [type, noteData]);

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    console.log("Editing note with ID: ", noteId);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/note/edit/${noteId}`,
        { title, content, tags },
        { withCredentials: true }
      );

      console.log("Response: ", res.data);

      if (res.data.success === false) {
        console.log("Error Message: ", res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log("Error Message: ", error.message);
      setError(error.message);
    }
  };

  // Add New Note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/note/add",
        { title, content, tags },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.log("Error Message: ", error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative'>
      <button
        className='w-10 h-10 flex items-center justify-center rounded-full absolute -top-3 -right-3 cursor-pointer hover:bg-slate-50'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label text-slate-900 uppercase'>Title</label>
        <input
          type='text'
          className='input-label text-2xl text-slate-950 outline-none'
          placeholder='Your title...'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label text-slate-950 uppercase'>Content</label>
        <textarea
        
          type='text'
          className='text-sm text-slate-950 outline-none bg-violet-100 p-2 rounded'
          placeholder='Content...'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)} 
        />
      </div>

      <div className='mt-3 flex flex-col gap-2'>
        <label className='input-label text-slate-800 uppercase'>Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

      <button
        className='btn-primary font-medium mt-5 p-3 cursor-pointer'
        onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
