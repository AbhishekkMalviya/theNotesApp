import React, { useEffect, useState } from 'react';
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
            const paste = allPaste.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPaste]);

    const createPaste = () => {
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        if (!value.trim()) {
            toast.error("Please enter some content");
            return;
        }

        const paste = {
            title: title.trim(),
            content: value.trim(),
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <input
                            className="w-full sm:w-2/3 p-3 rounded-xl
                                     border border-gray-200
                                     bg-gray-50
                                     text-gray-800
                                     focus:ring-2 focus:ring-blue-500
                                     focus:border-transparent outline-none
                                     transition-all duration-200
                                     placeholder-gray-400"
                            type="text"
                            placeholder="Enter title here"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        
                        <button
                            onClick={createPaste}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl
                                     bg-gradient-to-r from-blue-500 to-blue-600
                                     text-white font-medium
                                     transform transition-all duration-200 
                                     hover:from-blue-600 hover:to-blue-700
                                     hover:shadow-md
                                     focus:outline-none focus:ring-2 
                                     focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {pasteId ? "Update Paste" : "Create Paste"}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="relative rounded-2xl bg-gray-50 p-1">
                        <textarea
                            className="w-full h-[70vh] p-4 rounded-xl
                                     bg-gray-50
                                     text-gray-800
                                     focus:ring-2 focus:ring-blue-500
                                     focus:border-transparent outline-none
                                     transition-all duration-200
                                     resize-none
                                     placeholder-gray-400
                                     font-mono text-sm"
                            value={value}
                            placeholder="Enter your content here"
                            onChange={(e) => setValue(e.target.value)}
                            spellCheck="false"
                        />
                        
                        {/* Character count */}
                        <div className="absolute bottom-4 right-4 
                                      text-sm text-gray-400 bg-gray-50 
                                      px-2 py-1 rounded-lg">
                            {value.length} characters
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;