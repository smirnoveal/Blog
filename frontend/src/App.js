import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetailModal from './components/PostDetailModal';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import AddPostForm from './components/AddPostForm';
import AuthForm from './components/AuthForm';
import './index.css';
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Пост', description: 'Путешествия', content: 'В этом году я провел свой отпуск в горах Адыгеи!', likes: 0, dislikes: 0 },
    { id: 2, title: 'Пост', description: 'Работа', content: 'Мало того, что работа не отпускает, так ещё и учеба добивает!', likes: 0, dislikes: 0 },
  ]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('a-z');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(()=>{
    const findUser = async () => {
      const token = localStorage.getItem('user-token');
      if(token !== null) {
        try {
          const response = axios.get(`http://127.0.0.1:8000/api/users/auth/`,{headers: {authorization: `Token ${token}`}})
          setIsLoggedIn(true)

        } catch (e) {
          localStorage.clear()
          setIsLoggedIn(false)
        }

      }
    }
    findUser()
  },[])

  const handlePostSelect = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
    setComments([{ id: 1, text: 'Comment 1', author: 'Author 1' }]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    ));
  };

  const handleAddPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: posts.length + 1, likes: 0, dislikes: 0 }]);
  };

  const handleLogin = async (credentials, isLogin) => {
    if(isLogin) {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/login/',formData);

        if(response.status === 200) {
          localStorage.setItem('user-token', response.data.token)
          setIsLoggedIn(true);

        }
      } catch (e) {
        console.log(e)
        alert('Неверные учетные данные')
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(true);
    }



  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear()
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedPosts = [...posts].sort((a, b) => {
      if (order === 'a-z') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
    setPosts(sortedPosts);
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  const handleEditPost = (postId, title, description) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, title, description } : post
    ));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const filteredPosts = filterCategory
    ? posts.filter(post => post.category === filterCategory)
    : posts;

  const postsPerPage = 5;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage, 
    currentPage * postsPerPage
  );

  return (
    <div>
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      {!isLoggedIn ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <Filter 
            onSortChange={handleSortChange} 
            onCategoryChange={handleCategoryChange} 
            categories={['first category', 'second category']}
          />
          <PostList 
            posts={displayedPosts} 
            onPostSelect={handlePostSelect} 
            onLike={handleLike}
            onDislike={handleDislike}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
          <AddPostForm onAddPost={handleAddPost} />
          {selectedPost && (
            <PostDetailModal 
              post={selectedPost} 
              comments={comments} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;