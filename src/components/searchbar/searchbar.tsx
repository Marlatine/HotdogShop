import styles from "./searchbar.module.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ onSearchChange }: any) => {
  const handleSearchChange = (e: any) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="search"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <SearchIcon className={styles["search-icon"]} />
      </div>
    </div>
  );
};

export default Searchbar;
