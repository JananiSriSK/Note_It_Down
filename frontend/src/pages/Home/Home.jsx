
import React, { useEffect, useState } from 'react'
import NoteCard from '../../components/Cards/NoteCard.jsx'
import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import AddEditNotes from './AddEditNotes.jsx'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar.jsx"
import axios from 'axios'
import { toast } from "react-toastify"
import EmptyCard from "../../components/EmptyCard/EmptyCard.jsx"


Modal.setAppElement("#root");

const Home = () => {
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  // Get all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/all", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data);
        return;
      }

      setAllNotes(res.data.notes || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.rest);
      getAllNotes();
    }
  }, [currentUser, navigate]);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(
        "http://localhost:3000/api/note/delete/" + noteId,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();  // Re-fetch notes after deletion
    } catch (error) {
      toast(error.message);
    }
  }

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get("http://localhost:3000/api/note/search", {
        params: { query },
        withCredentials: true,
      });

      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        return;
      }

      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes(); // Re-fetch all notes
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        "http://localhost:3000/api/note/updatePinned/" + noteId,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();  // Re-fetch notes after updating pinned status
    } catch (error) {
      console.log(error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-col-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-8 max-md:m-5'>
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
              // ? "https://gifdb.com/images/high/cute-cartoon-peach-cat-angry-ckf0hx9571l5j10j.webp"
                // ? "https://i.pinimg.com/originals/1a/5b/5b/1a5b5b58da5f8dad79acba99304167c4.gif"
                ? "https://i.pinimg.com/originals/78/5f/ce/785fce6734c7285c7ab99f871c732158.gif"
                : "https://gifdb.com/images/featured-small/taking-notes-zvwniccig5sfjp81.gif"
                
            }
            message={
              isSearch
                ? "Oops! No Notes found matching your search"
                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className='w-13 h-13 flex items-center justify-center rounded-2xl bg-violet-300 
        cursor-pointer hover:bg-violet-400 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className='text-[32px] text-slate-800' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: 'add', data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes} // Ensure the modal triggers a fetch
        />
      </Modal>
    </>
  );
}

export default Home;

