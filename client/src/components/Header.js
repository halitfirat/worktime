import React from 'react';

const Header = () => {
  return (
    <div
      className="header"
    >
      <div
        className="header-sub"
      >
        SCHEDULE YOUR
      </div>

      <div
        className="header-main"
      >
        WORKTIME
      </div>
      <div
        className="header-link"
      >
        <a
          href="https://github.com/halitfirat/worktime"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <span
            className="icon-github"
          ></span>{' '}
          <span>GITHUB</span>
        </a>
      </div>
    </div>
  );
};

export default Header;
