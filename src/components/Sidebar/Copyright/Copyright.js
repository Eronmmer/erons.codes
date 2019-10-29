// @flow strict
import React from 'react';
import { Link } from "gatsby";
import styles from './Copyright.module.scss';


type Props = {
  copyright: string
};

const Copyright = ({ copyright }: Props) => (
  <div className={styles["copyright"]}>
    {/* {copyright} */}
    Written and maintained with ❤ and ☕ by <Link to="/about">Erons</Link>
  </div>
);

export default Copyright;
