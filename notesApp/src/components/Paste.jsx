import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);

    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleCopy(content) {
        navigator.clipboard.writeText(content)
        toast.success("copied to clipboard");
    }
    return (
        <div>
            <input
                className='p-2 border rounded-2xl min-w-[600px] mt-5 hover:border-blue-600'
                type='search'
                placeholder='search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                // <div className='border rounded '>
                                <div key={paste._id} className="border rounded">
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>

                                    <div className='flex flex-row gap-4 place-content-evenly'>
                                        <Link to={`/?pasteId=${paste?._id}`}>
                                            <button>Edit</button>
                                        </Link>

                                        <div><Link to={`/?pastes=${paste?._id}`}>
                                            <button>view</button>
                                        </Link>
                                        </div>


                                        <button onClick={() =>
                                            handleDelete(paste?.
                                                _id)}>
                                            delete
                                        </button>

                                        {/* <button onClick={handleCopy}>copy</button> */}
                                        <button onClick={() => handleCopy(paste.content)}>copy</button>

                                        <button>share</button>
                                        {/* implemetation of share button is pending */}

                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>
                                </div>

                            )
                        }
                    )
                }

            </div>
        </div>
    )
}

export default Paste
