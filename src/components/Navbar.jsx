import { Search, Menu, Moon, Sun, UserCircle, Settings, HelpCircle, LogOut, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ searchTerm, setSearchTerm, toggleSidebar }) {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const menuItemStyle = { display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.95rem' };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: `1px solid var(--border)`, backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Menu onClick={toggleSidebar} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
        <Link to="/" onClick={() => setSearchTerm("")} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" style={{ height: '24px' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>YouTube</span>
        </Link>
      </div>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '0.5rem 1rem', width: '400px', borderRadius: '20px 0 0 20px', border: `1px solid var(--border)`, outline: 'none', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }} />
        <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '0 20px 20px 0', border: `1px solid var(--border)`, borderLeft: 'none', backgroundColor: 'var(--hover-bg)', cursor: 'pointer', color: 'var(--text-main)' }}><Search size={18} /></button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}</button>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" alt="Profile" onClick={() => setIsProfileOpen(!isProfileOpen)} style={{ width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', border: '1px solid var(--border)' }} />
      </div>
    </nav>
  );
}