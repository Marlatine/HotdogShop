import React, { useContext } from "react";
import styles from "./navbar.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { PowerUserConext } from "@/providers/UserProvider";

const Navbar = () => {
  const { setLoggedIn } = useContext(PowerUserConext);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Sandefjord`s hotdog shops</h1>
        <ul>
          <li>
            <Link
              onClick={() => setLoggedIn(false)}
              className={styles.link}
              href={"/"}
            >
              <LogoutIcon />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
