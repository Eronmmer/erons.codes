// @flow strict
import React from "react";
import { Link } from "gatsby";
import styles from "./Copyright.module.scss";

type Props = {
	copyright: string,
};

const Copyright = ({ copyright }: Props) => (
	<div className={styles["copyright"]}>
		{/* {copyright} */}
		Written and maintained with <span style={{ color: "darkRed" }}>❤</span> and
		☕ by{" "}
		<a href="https://erons.xyz/" target="_blank" rel="noopener noreferrer">
			Erons
		</a>
	</div>
);

export default Copyright;
