import { HotdogShops } from "@/pages/home/interface";
import { data } from "../../pages/api/data";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./hotdogShopsList.module.css";
import { Button, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PowerUserConext } from "@/providers/UserProvider";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const HotdogShopsList = ({ search }: any) => {
  const { setSelectedHotdogShop } = useContext(PowerUserConext);
  const [hotdogShops, setHotdogShops] = useState<HotdogShops[]>([]);
  const [filteredHotdogShops, setFilteredHotdogShops] = useState<HotdogShops[]>(
    []
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [editRowIndex, setEditRowIndex] = useState<number>(-1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [shopImage, setShopImage] = useState<string | null>(null);
  const positionInputRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newHotdogShop, setNewHotdogShop] = useState<HotdogShops>();

  useEffect(() => {
    const powerUser = JSON.parse(localStorage.getItem("powerUser") || "false");
    setLoggedIn(powerUser);

    const localStorageArray = JSON.parse(
      localStorage.getItem("hotdogShops") || "[]"
    );
    if (localStorageArray.length === 0) {
      localStorage.setItem("hotdogShops", JSON.stringify(data));
      setHotdogShops(data);
    } else {
      setHotdogShops(localStorageArray);
      setFilteredHotdogShops(localStorageArray);
    }
  }, []);

  useEffect(() => {
    const filteredHotdogShops = hotdogShops.filter((shop) => {
      return (
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.location.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredHotdogShops(filteredHotdogShops);
  }, [hotdogShops, search]);

  const handleSave = (shop: HotdogShops, index: number) => {
    const positions = positionInputRef.current?.value.split(",");
    const parsedPositions = positions?.map((pos) => parseFloat(pos.trim()));
    if (
      parsedPositions?.length === 2 &&
      !isNaN(parsedPositions[0]) &&
      !isNaN(parsedPositions[1])
    ) {
      const newShops = [...filteredHotdogShops];
      newShops[editRowIndex].position = parsedPositions as [number, number];

      const updatedHotdogShops = [...filteredHotdogShops];
      const shopToUpdate = updatedHotdogShops[index];
      if (name !== "") {
        shopToUpdate.name = name;
      }
      if (address !== "") {
        shopToUpdate.location = address;
      }
      if (editRowIndex === index && rating !== null) {
        shopToUpdate.rating = rating;
      }
      if (shopImage !== null) {
        shopToUpdate.image = shopImage;
      }
      if (newHotdogShop) {
        const updatedHotdogShops = [...hotdogShops, newHotdogShop];
        localStorage.setItem("hotdogShops", JSON.stringify(updatedHotdogShops));
      }

      setHotdogShops(updatedHotdogShops);
      localStorage.setItem("hotdogShops", JSON.stringify(updatedHotdogShops));
      setFilteredHotdogShops(newShops);
      setEditRowIndex(-1);
      setEditMode(false);
    } else {
      alert(
        "Please enter a valid position value. For example: 59.12110542246443, 10.231372738151792"
      );
    }
  };

  const handleDelete = (index: number) => {
    const updatedHotdogShops = [...hotdogShops];
    updatedHotdogShops.splice(index, 1);
    setHotdogShops(updatedHotdogShops);
    localStorage.setItem("hotdogShops", JSON.stringify(updatedHotdogShops));
  };

  const handleAddHotdogShop = () => {
    if (editMode === true) {
      alert("Please fill the input fields before adding a new hotdog shop");
    } else {
      setEditMode(true);
      const maxId = Math.max(...filteredHotdogShops.map((shop) => shop.id));
      const newHotdogShop = {
        id: maxId + 1,
        name: "",
        location: "",
        rating: null,
        image: "",
        position: [0],
      };
      const updatedHotdogShops = [...hotdogShops, newHotdogShop];
      setHotdogShops(updatedHotdogShops);

      setNewHotdogShop(newHotdogShop);
      setName("");
      setAddress("");
      setRating(null);
      setShopImage(null);
      setEditRowIndex(hotdogShops.length);
    }
  };

  const handleImageChange = (event: any) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setShopImage(reader.result as string);
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className={styles.container}>
      <div
        className={
          loggedIn ? styles["add-shop-container"] : styles["hidden-container"]
        }
      >
        {loggedIn ? (
          <div className={styles["add-button"]}>
            <Button
              className={styles["add-button"]}
              variant="outlined"
              onClick={handleAddHotdogShop}
            >
              <AddIcon />
              Add hotdog shop
            </Button>
          </div>
        ) : null}
      </div>
      <div className={styles["card-container"]}>
        {filteredHotdogShops.length !== 0 &&
          filteredHotdogShops.map((shop, index) => (
            <div
              key={index}
              onClick={() => setSelectedHotdogShop(shop)}
              className={loggedIn ? styles.card : styles["smaller-card"]}
            >
              {editRowIndex === index ? (
                <div className={styles["add-image-container"]}>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className={styles.hidden}
                  />
                  <AddAPhotoIcon />
                  {shopImage && (
                    <Image
                      src={shopImage}
                      alt="Preview"
                      width={500}
                      height={350}
                      className={styles.image}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={
                    loggedIn
                      ? styles["image-container"]
                      : styles["bigger-image-container"]
                  }
                >
                  <Image
                    className={styles.image}
                    src={shop.image}
                    alt=""
                    width={500}
                    height={350}
                  />
                </div>
              )}
              <div
                className={
                  loggedIn
                    ? styles["info-container"]
                    : styles["smaller-info-container"]
                }
              >
                <div className={styles["name-rating-container"]}>
                  {editRowIndex === index ? (
                    <div className={styles["input-container"]}>
                      <input
                        className={styles.input}
                        placeholder="Name"
                        type="text"
                        defaultValue={shop.name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  ) : (
                    <p
                      className={styles["shop-name"]}
                      onClick={() => setSelectedHotdogShop(shop)}
                    >
                      {shop.name}
                    </p>
                  )}
                  {editRowIndex === index ? (
                    <div className={styles["input-container"]}>
                      <Rating
                        name="controlled-edit-rating"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => setRating(newValue)}
                      />
                    </div>
                  ) : (
                    <Rating
                      name="rating-read"
                      value={shop.rating}
                      precision={0.5}
                      readOnly
                    />
                  )}
                </div>
                <div className={styles.adress}>
                  {editRowIndex === index ? (
                    <div className={styles["input-container"]}>
                      <input
                        className={styles.input}
                        placeholder="Address"
                        type="text"
                        defaultValue={shop.location}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <br />
                      <input
                        ref={positionInputRef}
                        className={styles.input}
                        placeholder={"Position"}
                        type="text"
                        defaultValue={
                          shop.position.length > 1
                            ? shop.position?.join(", ")
                            : ""
                        }
                      />
                    </div>
                  ) : (
                    <p>Address: {shop.location} </p>
                  )}
                </div>
                {loggedIn && editRowIndex !== index ? (
                  <>
                    <div className={styles.buttons}>
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        onClick={() => setEditRowIndex(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon className={styles.delete} />
                      </Button>
                    </div>
                  </>
                ) : loggedIn && editRowIndex === index ? (
                  <>
                    <div className={styles.buttons}>
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        onClick={() => handleSave(shop, index)}
                      >
                        Save
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotdogShopsList;
