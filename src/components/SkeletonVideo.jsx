export default function SkeletonVideo() {
  return (
    <div style={{ width: '320px', cursor: 'pointer' }}>
      <div className="skeleton skeleton-box"></div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '50%' }}></div>
        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      </div>
    </div>
  );
}