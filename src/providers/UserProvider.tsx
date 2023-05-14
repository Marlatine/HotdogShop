import React, { useState, useEffect, createContext } from "react";
import { HotdogShops } from "@/components/hotdogShopsList/interface";

interface ContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedHotdogShop: HotdogShops | null;
  setSelectedHotdogShop: React.Dispatch<
    React.SetStateAction<HotdogShops | null>
  >;
}

export const PowerUserConext = createContext<ContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
  selectedHotdogShop: null,
  setSelectedHotdogShop: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedHotdogShop, setSelectedHotdogShop] =
    useState<HotdogShops | null>(null);

  return (
    <>
      <PowerUserConext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          selectedHotdogShop,
          setSelectedHotdogShop,
        }}
      >
        {children}
      </PowerUserConext.Provider>
    </>
  );
};

export default UserProvider;
