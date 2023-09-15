import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Crud() {
  const dispatch = useDispatch();
  const [dogListData, setDogListData] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [selSubBreed, setSelSubBreed] = useState("");
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: String,
    name: "",
    breed: "",
    subBreed: "",
    imageList: [],
    checkedImages: [],
  });
  const data = useSelector((state) => {
    return state.app;
  });

  async function getList() {
    const breedNames = Object.keys(data?.dogData?.message);
    return setDogListData(breedNames);
  }

  const getSubBreed = async (breed) => {
    const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    setSubBreed(data?.message);
  };

  const handleInputChange = (event) => {
    setBreed(event.target.value);
  };

  const handleSubBreedChange = (event) => {
    setSelSubBreed(event.target.value);
  };
  const handleImageList = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      // Si el checkbox está marcado, agrega el valor al array
      setImageList([...imageList, selectedValue]);
    } else {
      // Si el checkbox se desmarca, quita el valor del array
      setImageList(imageList.filter((value) => value !== selectedValue));
    }
  };
  const storedFormsJSON = localStorage.getItem("storedForms");
  const storedForms = storedFormsJSON ? JSON.parse(storedFormsJSON) : [];
  async function saveDogForm(ev) {
    ev.preventDefault();
    const editedIndex = storedForms.findIndex(
      (form) => form.id === formData.id
    );

    if (editedIndex !== -1) {
      storedForms[editedIndex] = {
        ...formData,
      };
    } else {
      // Si no se está editando, agrega un nuevo formulario
      const newFormData = {
        id: Date.now(),
        name,
        breed,
        subBreed,
        imageList,
      };
      storedForms.push(newFormData);
    }

    localStorage.setItem("storedForms", JSON.stringify(storedForms));

    // Limpia los campos del formulario actual
    setBreed("");
    setSubBreed("");
    setImages([]);
    setImageList([]);
    setOpen(false);
    setName("");
    setIsEditing(false);
  }
  async function handleEditForm(elem) {
    setFormData({
      id: elem.id,
      name: elem.name,
      breed: elem.breed,
      subBreed: elem.subBreed,
      imageList: elem.imageList,
      checkedImages: elem.imageList,
    });
    setOpen(!open);
    setIsEditing(true);
  }
  console.log(formData);
  async function handleDeleteForm(id) {
    const indexToDelete = storedForms.findIndex((form) => form.id === id);
    if (indexToDelete !== -1) {
      storedForms.splice(indexToDelete, 1);
      localStorage.setItem("storedForms", JSON.stringify(storedForms));
    }
  }

  async function getImages(breed) {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/4`
    );
    setImages(data?.message);
  }
  console.log(images);

  useEffect(() => {
    getList();
  }, [data]);
  useEffect(() => {
    dispatch(getInitialDogData());
  }, []);
  useEffect(() => {
    if (breed) {
      getSubBreed(breed);
      getImages(breed);
    }
  }, [breed]);

  return (
    <>
      <section className="explorePage">
        <div>
          <h1>Welcome to your Dogs List!</h1>
          <h2>Start Creating a list of your favorites dogs!</h2>
          <Button onClick={handleOpen}>OPEN</Button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Sub-Breeds</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {storedForms?.map((elem) => (
                <tr key={elem.id}>
                  <td>{elem.name}</td>
                  <td>{elem.breed}</td>
                  <td>{elem.subBreed}</td>
                  <td>
                    {elem.imageList.map((src) => (
                      <img key={src.id} src={src} className="img__formList" />
                    ))}
                  </td>
                  <td>
                    <button onClick={() => handleEditForm(elem)}>Edit</button>

                    <button onClick={() => handleDeleteForm(elem.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={saveDogForm} className="dogsForm">
              <label className="dogForm__label">Name</label>
              <input
                className="dogsForm__input"
                type="text"
                placeholder="whats your thought?"
                value={formData.name || name}
                onChange={(ev) =>
                  setFormData({ ...formData, name: ev.target.value })
                }
                required
              />
              <label className="dogForm__label">Name of the dog</label>
              <input
                className="dogsForm__input"
                type="text"
                list="dogs"
                placeholder="Select a Doggy"
                value={formData.breed || breed}
                onChange={handleInputChange}
                required
              />
              <datalist id="dogs" className="dogForm__datalist">
                {dogListData.slice().map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </datalist>
              <label className="dogForm__label">Sub-Breed</label>
              <input
                type="text"
                list="subBreeds"
                placeholder="Select Sub Breed"
                value={formData.subBreed || selSubBreed}
                onChange={(ev) => handleSubBreedChange(ev)}
                className="dogsForm__input"
              />
              <datalist id="subBreeds" className="dogForm__datalist">
                {subBreed.length > 0 &&
                  subBreed?.map((el) => <option key={el}>{el}</option>)}
              </datalist>
              <label className="dogForm__label">Images</label>
              <div className="dogForm__PictureWrapper">
                {isEditing
                  ? formData.imageList.map((el, index) => (
                      <picture key={index} className="dogForm__Picture">
                        <img
                          src={el}
                          className={`dogForm__ImgSRC ${
                            formData.checkedImages.includes(el)
                              ? "checkActive"
                              : "checkUnactive"
                          }`}
                        />
                        <input
                          className="dogForm_checkbox"
                          type="checkbox"
                          value={el}
                          checked={formData.checkedImages.includes(el)}
                          onChange={handleImageList}
                        />
                      </picture>
                    ))
                  : images?.map((el, index) => (
                      <picture key={index} className="dogForm__Picture">
                        <img
                          src={el}
                          className={`dogForm__ImgSRC ${
                            imageList.includes(el)
                              ? "checkActive"
                              : "checkUnactive"
                          }`}
                        />
                        <input
                          className="dogForm_checkbox"
                          type="checkbox"
                          value={el}
                          onChange={handleImageList}
                        />
                      </picture>
                    ))}
              </div>

              <button type="submit" className="btn__form">
                Save
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Crud;
