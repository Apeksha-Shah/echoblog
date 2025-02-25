import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import apiClient from '../axiosClient';

const CreatePost = ({ isEditing }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const post = location.state?.post;

    const blogId = isEditing ? post.blog_id : location.state?.blogId;

    const [categoryName, setCategoryName] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState(isEditing ? post.title : '');
    const [content, setContent] = useState(isEditing ? post.content : '');
    const [existingFiles, setExistingFiles] = useState(isEditing ? post.files : []);
    const [files, setFiles] = useState([]);
    const [tags, setTags] = useState(isEditing ? post.tags.join(', ') : '');
    const [publishDate, setPublishDate] = useState(isEditing ? post.publishDate : '');

    const fetchCategoryName = async () => {
        try {
            const response = await apiClient.get(`/api/categories/${post.category_ids}`);
            setCategoryName(response.data.category_name);
            setCategory(response.data.category_name);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isEditing) {
            fetchCategoryName();
        }
    }, [isEditing]);

    useEffect(() => {
        if (isEditing && post) {
            setTitle(post.title);
            setContent(post.content);
            setTags(post.tags.join(', '));
            setPublishDate(post.publishDate);
            setExistingFiles(post.files); 
        }
    }, [isEditing, post]);

    const token = localStorage.getItem('token');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    const handleFileUpload = (e) => setFiles([...files, ...Array.from(e.target.files)]);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value);
    const handlePublishDateChange = (e) => setPublishDate(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const author_id = decodedToken.id;

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('tags', tags.split(',').map((tag) => tag.trim()));
            formData.append('publishDate', publishDate);
            formData.append('author_id', author_id);
            formData.append('blogId', blogId);

            existingFiles.forEach((file) => {
                formData.append('files', file);
            });

            files.forEach((file) => {
                formData.append('files', file);
            });

            if (isEditing) {
                await apiClient.put(`/api/posts/${post._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await apiClient.post('/api/posts/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            resetFields();
            navigate(`/blog/${blogId}`, { state: { blogId } });
        } catch (err) {
            console.error(err);
        }
    };

    const resetFields = () => {
        setTitle('');
        setContent('');
        setFiles([]);
        setCategory('');
        setTags('');
        setPublishDate('');
    };

    useEffect(() => {
        if (!token) {
            navigate('/Login');
        }
    }, [token, navigate]);

    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen">
            <Header />
            <div className="flex flex-col p-5">
                <form method="POST" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter Post Title"
                        className="text-2xl mb-5 p-3 w-full rounded bg-gray-700 text-white focus:outline-none"
                        required
                    />

                    <div className="flex space-x-4 mb-5">
                        <input
                            type="file"
                            accept="image/*,video/*"
                            name="files"
                            onChange={handleFileUpload}
                            className="file:mr-5 text-sm bg-gray-700 text-white focus:outline-none"
                            multiple
                        />
                    </div>

                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mb-5">
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Write your post content here..."
                            className="w-full md:w-3/4 h-96 p-3 rounded resize-none bg-gray-700 text-white focus:outline-none"
                            required
                        />

                        <div className="w-full md:w-1/2 bg-gray-800 p-5 rounded space-y-5">
                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Education">Education</option>
                                    <option value="Business">Business</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Current Events">Current Events</option>
                                    <option value="Hobbies and Interests">Hobbies and Interests</option>
                                    <option value="Parenting">Parenting</option>
                                    <option value="Personal Development">Personal Development</option>
                                    <option value="Reviews">Reviews</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={handleTagsChange}
                                    placeholder="Enter tags (comma separated)"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-bold mb-2">Publish Date</label>
                                <input
                                    type="date"
                                    value={publishDate}
                                    onChange={handlePublishDateChange}
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-start space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {isEditing ? 'Edit' : 'Publish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
