import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SkeletonVideo from "../components/SkeletonVideo";
import { StoreContext } from "../context/StoreContext";

// Expanded Dataset
const mockVideos = [
  { id: "w7ejDZ8SWv8", title: "React JS Crash Course", thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg", channel: "Traversy Media", category: "React" },
  { id: "W6NZfCO5SIk", title: "JavaScript Tutorial for Beginners", thumbnail: "https://img.youtube.com/vi/W6NZfCO5SIk/maxresdefault.jpg", channel: "Programming with Mosh", category: "JavaScript" },
  { id: "jV8B24rSN5o", title: "CSS Tutorial - Zero to Hero", thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg", channel: "FreeCodeCamp", category: "CSS" },
  { id: "bMknfKXIFA8", title: "React Course - Beginner's Tutorial", thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg", channel: "FreeCodeCamp", category: "React" },
  { id: "PkZNo7MFNFg", title: "Learn JavaScript - Full Course", thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg", channel: "Tech Tutor Master", category: "JavaScript" },
  { id: "1Rs2ND1ryYc", title: "CSS Zero to Mastery", thumbnail: "https://img.youtube.com/vi/1Rs2ND1ryYc/maxresdefault.jpg", channel: "Web Dev Simplified", category: "CSS" },
];

const categories = ["All", "React", "JavaScript", "CSS"];

export default function Feed({ view, searchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  
  // Pull our database states to filter the views
  const { savedVideos, subscriptions } = useContext(StoreContext);

  // Simulate Network Fetch when changing views
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); 
    return () => clearTimeout(timer);
  }, [view, searchTerm, selectedCategory]);

  const filteredVideos = mockVideos.filter(video => {
    // 1. Search Filter
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.channel.toLowerCase().includes(searchTerm.toLowerCase());
    // 2. Category Filter
    const matchesCategory = selectedCategory === "All" || video.category === selectedCategory;
    
    // 3. View Routing Logic (From Sidebar)
    let matchesView = true;
    if (view === "history") matchesView = savedVideos.includes(video.id);
    if (view === "subscriptions") matchesView = subscriptions.includes(video.channel);
    
    return matchesSearch && matchesCategory && matchesView;
  });

  // Dynamic titles based on the Sidebar tab
  const getPageTitle = () => {
    if (searchTerm) return `Search Results for "${searchTerm}"`;
    if (view === "history") return "Your Watch History & Saved Videos";
    if (view === "subscriptions") return "From Your Subscribed Channels";
    if (view === "explore") return "Trending & Explore";
    return "Recommended for You";
  };

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Category Pills (Only show on Home/Explore) */}
      {(view === "home" || view === "explore") && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>
        {getPageTitle()}
      </h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {isLoading ? (
          [...Array(6)].map((_, i) => <SkeletonVideo key={i} />)
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '320px', cursor: 'pointer' }}>
                <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {video.channel.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '5px', color: 'var(--text-main)' }}>{video.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{video.channel}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ marginTop: '20px', color: 'var(--text-muted)' }}>
            {view === "history" ? "You haven't saved any videos yet. Go watch a video and click Save!" 
            : view === "subscriptions" ? "You haven't subscribed to any channels in this list." 
            : "No videos found."}
          </div>
        )}
      </div>
    </div>
  );
}