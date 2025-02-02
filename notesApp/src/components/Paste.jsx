import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = useCallback((pasteId) => {
        dispatch(removeFromPastes(pasteId));
    }, [dispatch]);

    const handleCopy = useCallback(async (content) => {
        try {
            console.log('Copying content:', content); // Debug log
            if (typeof content !== 'string') {
                throw new Error('Content must be a string');
            }
            await navigator.clipboard.writeText(String(content));
            toast.success("Copied to clipboard");
        } catch (err) {
            console.error('Copy failed:', err);
            toast.error("Failed to copy to clipboard");
        }
    }, []);

    const trimAndSliceString = (str) => {
        // Trim multiple spaces
        const trimmedStr = str.replace(/\s\s+/g, ' ');
        // Slice to first 50 characters
        return trimmedStr.slice(0, 50);
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex justify-center mb-6">
                <input
                    className="p-2 border rounded-2xl w-full max-w-2xl hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="search"
                    placeholder="Search pastes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div
                            key={paste._id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold">
                                    {paste.title}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {new Date(paste.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="mb-4 whitespace-pre-wrap bg-grey-600  p-3 rounded">
                                {trimAndSliceString(paste.content)}
                                {/* {paste.content.substring(0,30)} */}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Link
                                    to={`/?pasteId=${paste._id}`}
                                    className="btn-primary"
                                >
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                        Edit
                                    </button>
                                </Link>

                                <Link
                                    to={`/?pastes=${paste._id}`}
                                    className="btn-secondary"
                                >
                                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                                        View
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleDelete(paste._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleCopy(paste.content)}
                                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                                >
                                    Copy
                                </button>

                                <button
                                    className="px-4 py-2 bg-gray-500 border text-white rounded hover:bg-gray-600 transition-colors"
                                    onClick={() => {
                                        // Implement share functionality
                                        toast.info("Share functionality coming soon!");
                                    }}
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No pastes found. Create your first paste!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Paste;