import { Home, Compass, PlaySquare, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper function to apply active background color
  const getStyle = (path) => ({
    textDecoration: 'none',
    color: 'var(--text-main)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontWeight: location.pathname === path ? 'bold' : '500',
    padding: '10px 15px',
    borderRadius: '10px',
    backgroundColor: location.pathname === path ? 'var(--hover-bg)' : 'transparent',
    transition: 'background-color 0.2s'
  });

  return (
    <aside style={{ width: '220px', padding: '15px', borderRight: `1px solid var(--border)`, height: '100%', backgroundColor: 'var(--bg-surface)' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        
        <li style={{ marginBottom: '5px' }}>
          <Link to="/" style={getStyle('/')}>
            <Home size={22}/> Home
          </Link>
        </li>
        
        <li style={{ marginBottom: '5px' }}>
          <Link to="/explore" style={getStyle('/explore')}>
            <Compass size={22}/> Explore
          </Link>
        </li>
        
        <li style={{ marginBottom: '5px' }}>
          <Link to="/subscriptions" style={getStyle('/subscriptions')}>
            <PlaySquare size={22}/> Subscriptions
          </Link>
        </li>
        
        <li style={{ marginBottom: '5px' }}>
          <Link to="/history" style={getStyle('/history')}>
            <Clock size={22}/> History
          </Link>
        </li>

      </ul>
    </aside>
  );
}