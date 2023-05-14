import React, { useState } from "react";
import Map from "../../components/map";
import Searchbar from "@/components/searchbar/searchbar";
import HotdogShopsList from "@/components/hotdogShopsList/hotdogShopsList";
import styles from "./home.module.css";
import Navbar from "@/components/navbar/navbar";

const Home = () => {
  const [search, setSearch] = useState<String>("");

  const handleSearchChange = (value: any) => {
    setSearch(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <div className={styles["search-list-container"]}>
          <Searchbar onSearchChange={handleSearchChange} />
          <HotdogShopsList search={search} />
        </div>
        <div className={styles["map-container"]}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Home;
