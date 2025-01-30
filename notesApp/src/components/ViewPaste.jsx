import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const { id } = useParams();

  const allPaste = useSelector((state) => state.paste.pastes);

  const paste = allPaste.filter((p) => p._id === id)[0];
  console.log("Final Paste:", paste);
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
          type='text'
            value={paste.title}
            disabled
        />
      </div>
      <div className='mt-8'>
        <textarea className="rounded-2xl"
          value={paste.content}
          disabled 
        />


      </div>
    </div>
  )
}

export default ViewPaste
