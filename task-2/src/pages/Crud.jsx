import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Header from "../components/Header";
import { pDogs, textDogs } from "../constants";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Crud() {
  const dispatch = useDispatch();
  const [dogListData, setDogListData] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [open, setOpen] = useState(false);
  const storedFormsJSON = localStorage.getItem("storedForms");
  const storedForms = storedFormsJSON ? JSON.parse(storedFormsJSON) : [];
  const [isEditing, setIsEditing] = useState(false);
  const handleClose = () => setOpen(false);
  const btn = true;
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "250px" : "400px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
  const handleOpen = () => {
    setOpen(true);
    setFormData({
      id: String,
      name: "",
      breed: "",
      subBreed: "",
      imageList: [],
      checkedImages: [],
    });
  };

  const getSubBreed = async (breed) => {
    const { data } = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    setSubBreed(data?.message);
  };

  const handleSubBreedChange = (event) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      subBreed: selectedValue,
    }));
  };

  const handleImageList = (event) => {
    const selectedValue = event.target.value;

    if (event.target.checked) {
      // Si el checkbox está marcado, agrega el valor al array
      setFormData((prevData) => ({
        ...prevData,
        checkedImages: [...prevData.checkedImages, selectedValue],
        imageList: [...prevData.imageList, selectedValue],
      }));
    } else {
      // Si el checkbox se desmarca, quita el valor del array
      setFormData((prevData) => ({
        ...prevData,
        checkedImages: prevData.checkedImages.filter(
          (value) => value !== selectedValue
        ),
        imageList: prevData.checkedImages.filter(
          (value) => value !== selectedValue
        ),
      }));
    }
  };

  const handleImageNew = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      // Si el checkbox está marcado, agrega el valor al array
      setImageList([...imageList, selectedValue]);
    } else {
      // Si el checkbox se desmarca, quita el valor del array
      setImageList(imageList.filter((value) => value !== selectedValue));
    }
  };

  async function getList() {
    const breedNames = Object.keys(data?.dogData?.message);
    return setDogListData(breedNames);
  }

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
  async function handleDeleteForm(id) {
    const indexToDelete = storedForms.findIndex((form) => form.id === id);
    if (indexToDelete !== -1) {
      storedForms.splice(indexToDelete, 1);
      localStorage.setItem("storedForms", JSON.stringify(storedForms));
    }
    navigate(0);
  }

  async function getImages(breed) {
    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random/4`
    );
    setImages(data?.message);
  }

  useEffect(() => {
    getList();
  }, [data]);
  useEffect(() => {
    dispatch(getInitialDogData());
  }, []);
  useEffect(() => {
    if (breed || formData.breed) {
      getSubBreed(breed || formData.breed);
      getImages(breed || formData.breed);
    }
  }, [breed || formData.breed]);

  return (
    <>
      <Header text={textDogs} btn={btn} />
      <section className="explorePage">
        <div>
          <button className="btn__modal_Create" onClick={handleOpen}>
            New Dog
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
                <th>Sub-Breeds</th>
                <th>Images</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              {storedForms?.map((elem) => (
                <tr key={elem.id}>
                  <td>{elem.name}</td>
                  <td>{elem.breed}</td>
                  <td>{elem.subBreed.join(", ")}</td>
                  <td className="img__table_wrapper">
                    {elem.imageList.map((src) => (
                      <img key={src.id} src={src} className="img__formList" />
                    ))}
                  </td>
                  <td>
                    <div className="tableBtnWrapper">
                      <button
                        className="table_Btn"
                        onClick={() => handleEditForm(elem)}
                      >
                        Edit
                      </button>

                      <button
                        className="table_Btn"
                        onClick={() => handleDeleteForm(elem.id)}
                      >
                        Remove
                      </button>
                    </div>
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
                onChange={(ev) => (
                  setName(ev.target.value),
                  setFormData({ ...formData, name: ev.target.value })
                )}
                required
              />
              <label className="dogForm__label">Name of the dog</label>
              <input
                className="dogsForm__input"
                type="text"
                list="dogs"
                placeholder="Select a Doggy"
                value={isEditing ? formData.breed : breed}
                onChange={(ev) => {
                  const selectedValue = ev.target.value;
                  if (isEditing) {
                    setFormData({ ...formData, breed: selectedValue });
                  } else {
                    setBreed(selectedValue);
                    // Luego, puedes realizar tu solicitud Axios aquí según el valor de selectedValue
                    if (selectedValue) {
                      getSubBreed(selectedValue);
                    }
                  }
                }}
                required
              />
              <datalist id="dogs" className="dogForm__datalist">
                {dogListData.slice().map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </datalist>
              <label className="dogForm__label">Sub-Breed</label>
              <select
                placeholder="check their Sub Breed"
                value={formData.subBreed}
                onChange={handleSubBreedChange}
                className="dogsForm__input"
              >
                {subBreed >= 0 && (
                  <option value="" disabled>
                    Does not have breeds
                  </option>
                )}
                {subBreed.length > 0 &&
                  subBreed.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
              </select>
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
                  : formData.imageList?.map((el, index) => (
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
                          onChange={handleImageNew}
                        />
                      </picture>
                    ))}
                {formData.breed &&
                  images?.map((el, index) => (
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
                        checked={formData.checkedImages.includes(el)}
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
