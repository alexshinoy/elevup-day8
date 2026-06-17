import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

export default function VideoDetail() {
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  
  const { 
    savedVideos, toggleSave, 
    likedVideos, toggleLike, 
    subscriptions, toggleSubscribe,
    comments, addComment 
  } = useContext(StoreContext);

  const isSaved = savedVideos.includes(id);
  const isLiked = likedVideos.includes(id);
  const channelName = "Tech Tutor Master"; 
  const isSubscribed = subscriptions.includes(channelName);
  const videoComments = comments[id] || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(id, commentText);
      setCommentText("");
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* PERFECTED NATIVE IFRAME */}
      <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'black' }}>
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Video Header & Actions */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-main)' }}>Full Stack Web Development Tutorial</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>T</div>
            <div>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '1.1rem' }}>{channelName}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>1.2M subscribers</p>
            </div>
            <button onClick={() => toggleSubscribe(channelName)} style={{ padding: '10px 20px', borderRadius: '25px', border: 'none', backgroundColor: isSubscribed ? 'var(--hover-bg)' : 'var(--text-main)', color: isSubscribed ? 'var(--text-main)' : 'var(--bg-main)', cursor: 'pointer', fontWeight: 'bold', marginLeft: '15px' }}>
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => toggleLike(id)} className="category-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isLiked ? 'var(--text-main)' : 'var(--hover-bg)', color: isLiked ? 'var(--bg-main)' : 'var(--text-main)' }}>
              <ThumbsUp size={18} /> {isLiked ? "Liked" : "Like"}
            </button>
            <button className="category-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={18} /> Share
            </button>
            <button onClick={() => toggleSave(id)} className="category-pill" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />} {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--hover-bg)', borderRadius: '12px', color: 'var(--text-main)' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>150K views • 2 weeks ago</p>
        <p>This is a simulated description. You are viewing video ID: {id}.</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '20px' }}>{videoComments.length} Comments</h3>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></div>
          <div style={{ flex: 1 }}>
            <input type="text" placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="comment-input" />
            {commentText && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setCommentText("")} style={{ padding: '8px 15px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 15px', background: '#3ea6ff', color: 'white', border: 'none', borderRadius: '18px', cursor: 'pointer', fontWeight: 'bold' }}>Comment</button>
              </div>
            )}
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {videoComments.map(comment => (
            <div key={comment.id} style={{ display: 'flex', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border)' }}></div>
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '5px' }}>@GuestUser • {comment.date}</p>
                <p style={{ color: 'var(--text-main)' }}>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}