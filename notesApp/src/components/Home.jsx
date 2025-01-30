import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';


const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();

    const allPaste = useSelector((state) => state.paste?.pastes);

    useEffect(() => {
        if (pasteId) {
            console.log("inside use effecthook");
            const paste = allPaste.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }

    }, [pasteId])


    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            //update
            dispatch(updateToPastes(paste));
        }
        else {
            //create
            dispatch(addToPastes(paste));
        }

        //After creation or updation we need to make sure the content, title etc.. will be clean 
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        // <div className='flex flex-row gap-7 place-content-between'>
        <div className='flex flex-col gap-4'>
            {/* <div> */}
            <div className='flex flex-row gap-4 items-center'>
                <input
                    // className='p-1 border rounded-2xl mt-2 w-66% pl-4'
                    className='p-2 mt-2 border rounded-2xl w-2/3 hover:border-blue-600'
                    type="text"
                    placeholder='enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={createPaste}
                    // className='p-1  rounded-2xl mt-2'
                    className='p-2 mt-2 border rounded-2xl bg-blue-500 text-white hover:bg-blue-600'>
                    {
                        pasteId ? "Update Paste"
                            : "Create Paste"
                    }
                </button>
            </div>

            <div >
                <textarea
                    className='rounded-2xl mt-4 min-w-[500px] p-4 border hover:border-blue-600'
                    value={value} placeholder='enter you content here' onChange={(e) => { setValue(e.target.value) }}
                    rows={20}
                />
            </div>
        </div>
    )
}

export default Home
