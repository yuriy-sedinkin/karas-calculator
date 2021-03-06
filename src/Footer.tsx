import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Footer: FC<Props> = () => {
  return (
    <footer className="App__footer">
      This is a modification of the original application built by <a href="https://github.com/majeX">majeX</a>; v1.2.1.&nbsp;
      <Link to="/changelog">Changelog</Link>
    </footer>
  );
};

export default Footer;
