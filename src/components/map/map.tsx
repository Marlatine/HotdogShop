import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import RoomIcon from "@mui/icons-material/Room";
import ReactDOMServer from "react-dom/server";
import { PowerUserConext } from "@/providers/UserProvider";
import styles from "./map.module.css";
import { HotdogShops } from "@/pages/home/interface";

const Map = () => {
  const { selectedHotdogShop, setSelectedHotdogShop } =
    useContext(PowerUserConext);
  const [hotdogShops, setHotdogShops] = useState<HotdogShops[]>([]);
  const mapRef = useRef<L.Map>(null);
  const [selectedMarker, setSelectedMarker] = useState<L.Marker | null>(null);

  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<RoomIcon className={styles.icon} />),
  });

  const handlePopupOpen = (event: any) => {
    const marker = event.target;
    setSelectedMarker(marker);
  };

  useEffect(() => {
    const localStorageArray = JSON.parse(
      localStorage.getItem("hotdogShops") || "[]"
    );
    setHotdogShops(localStorageArray);
    if (
      selectedHotdogShop?.name &&
      selectedHotdogShop.location &&
      selectedHotdogShop.position
    ) {
      if (selectedHotdogShop && mapRef.current) {
        const [lat, lng] = selectedHotdogShop.position;
        const position: LatLngExpression = [lat, lng];
        const map = mapRef.current;
        map.setView(position, 15);

        const marker = selectedMarker;
        if (marker) {
          marker.openPopup();
        }
      }
    } else {
      return;
    }
  }, [selectedHotdogShop, localStorage]);

  const handleHotdogShopClick = (shop: HotdogShops) => {
    setSelectedHotdogShop(shop);
  };

  return (
    <div className={styles.container}>
      <MapContainer
        ref={mapRef}
        center={[59.1318, 10.2167]}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hotdogShops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.position[0], shop.position[1]]}
            icon={icon}
            eventHandlers={{
              click: () => handleHotdogShopClick(shop),
            }}
          >
            {selectedHotdogShop && selectedHotdogShop.id === shop.id && (
              <Popup>
                {shop.name}
                <br />
                {shop.location}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
