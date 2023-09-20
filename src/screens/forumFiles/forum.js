import React from 'react';
import SideMenu from './sideMenu';

function Forum() {
  // Forum component code

  return (
    <div className="forum">
      {/* Side menu component */}
      <div className="side-menu">
        <SideMenu />
      </div>

      {/* Forum content */}
      <div className="forum-content">
        {/* ... Forum content JSX ... */}
      </div>
    </div>
  );
}

export default Forum;
