import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Load initial data from LocalStorage (our "fake database")
  const loadData = (key, fallback) => JSON.parse(localStorage.getItem(key)) || fallback;

  const [savedVideos, setSavedVideos] = useState(() => loadData('savedVideos', []));
  const [likedVideos, setLikedVideos] = useState(() => loadData('likedVideos', []));
  const [subscriptions, setSubscriptions] = useState(() => loadData('subscriptions', []));
  const [comments, setComments] = useState(() => loadData('comments', {}));

  // Save to LocalStorage whenever state changes
  useEffect(() => localStorage.setItem('savedVideos', JSON.stringify(savedVideos)), [savedVideos]);
  useEffect(() => localStorage.setItem('likedVideos', JSON.stringify(likedVideos)), [likedVideos]);
  useEffect(() => localStorage.setItem('subscriptions', JSON.stringify(subscriptions)), [subscriptions]);
  useEffect(() => localStorage.setItem('comments', JSON.stringify(comments)), [comments]);

  // Actions
  const toggleSave = (id) => setSavedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  const toggleLike = (id) => setLikedVideos(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  const toggleSubscribe = (channel) => setSubscriptions(prev => prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]);
  
  const addComment = (videoId, text) => {
    setComments(prev => ({
      ...prev,
      [videoId]: [{ id: Date.now(), text, date: new Date().toLocaleDateString() }, ...(prev[videoId] || [])]
    }));
  };

  return (
    <StoreContext.Provider value={{ 
      savedVideos, toggleSave, 
      likedVideos, toggleLike, 
      subscriptions, toggleSubscribe,
      comments, addComment 
    }}>
      {children}
    </StoreContext.Provider>
  );
};