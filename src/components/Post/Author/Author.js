// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles["author"]}>
      <p className={styles["author__bio"]}>
        {/* {author.bio} */}
        Written and maintained with ❤ and ☕ by <Link to="/pages/about">Erons</Link>
        <a
          className={styles["author__bio-twitter"]}
          href={getContactHref("twitter", author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>Follow {author.name}</strong> on Twitter
        </a>
      </p>
    </div>
  );
};

export default Author;
