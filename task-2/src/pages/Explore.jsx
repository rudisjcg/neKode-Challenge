import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";
import axios from "axios";
import { dogUrl } from "../constants";
import DogTd from "../components/DogTd";

function Explore() {
  const [dogListData, setDogListData] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.app;
  });
  const [dogSearch, setDogSearch] = useState("");
  const [dogBreedsData, setDogBreedsData] = useState(false);
  const [dogName, setDogName] = useState(...(dogSearch || ""));

  async function getList() {
    const breedNames = Object.keys(data?.dogData?.message);
    return setDogListData(breedNames);
  }

  function handleInput(event) {
    setDogSearch(event.target.value.toLowerCase());
    getList();
    setDogBreedsData(false);
  }

  async function handleKeyPress(event) {
    if (event.key === "Enter" && dogSearch !== "") {
      await dogBreeds();
      setDogName(dogSearch);
    }
  }

  useEffect(() => {
    dispatch(getInitialDogData());
  }, []);

  useEffect(() => {
    getList();
  }, [data]);

  async function dogBreeds() {
    const { data } = await axios.get(dogUrl + `${dogSearch}/list`);
    setDogBreedsData(true);
    setDogListData(data?.message);
  }
  async function filteredDogs(filter) {
    const table = document.querySelector("#customTable");
    const rows = Array.from(table.querySelectorAll("tr"));

    const originalData = [...dogListData];

    const rowsToRemove = rows.filter((row) => {
      return (
        row.classList.contains("noBreeds") ||
        row.classList.contains("withBreeds")
      );
    });

    if (filter === "firstLettertoLast") {
      setDogListData(originalData);
      const newArrDogs = dogListData.slice().sort((a, b) => {
        return a[0].localeCompare(b[0]);
      });
      setDogListData(newArrDogs);
    } else if (filter === "lastLettertoFirst") {
      setDogListData(originalData);
      const newArrDogs = dogListData.slice().sort((a, b) => {
        return b[0].localeCompare(a[0]);
      });
      setDogListData(newArrDogs);
    } else if (filter === "withSubBreeds") {
      const noBreedsRows = [];
      const withBreedsRows = [];

      rows.forEach((row) => {
        if (row.querySelector(".noBreeds")) {
          noBreedsRows.push(row);
        } else if (row.querySelector(".withBreeds")) {
          withBreedsRows.push(row);
        }
      });

      // Borra todas las filas de la tabla
      rowsToRemove.forEach((row) => table.removeChild(row));
      console.log(rowsToRemove);

      // Agrega primero las filas #noBreeds y luego las filas #withBreeds
      withBreedsRows.forEach((row) => table.appendChild(row));
      noBreedsRows.forEach((row) => table.appendChild(row));
    } else if (filter === "withoutSubBreeds") {
      const noBreedsRows = [];
      const withBreedsRows = [];

      rows.forEach((row) => {
        if (row.querySelector(".noBreeds")) {
          noBreedsRows.push(row);
        } else if (row.querySelector(".withBreeds")) {
          withBreedsRows.push(row);
        }
      });

      // Borra todas las filas de la tabla
      rowsToRemove.forEach((row) => table.removeChild(row));

      // Agrega primero las filas #noBreeds y luego las filas #withBreeds
      noBreedsRows.forEach((row) => table.appendChild(row));
      withBreedsRows.forEach((row) => table.appendChild(row));
    }
  }

  return (
    <>
      <section className="explorePage">
        <div className="row">
          <div className="searchWrapper">
            <input
              placeholder="What Doggy you want to search?"
              onKeyDown={handleKeyPress}
              onChange={handleInput}
              className="inputSearch"
            />
            <select
              id="orderSelect"
              className="selectFilter"
              defaultValue={""}
              onChange={(event) => filteredDogs(event.target.value)}
            >
              <option value={""}>Default</option>
              <option value="lastLettertoFirst">Z - A</option>
              <option value="firstLettertoLast">A - Z</option>

              {dogName && dogBreedsData ? (
                <></>
              ) : (
                <>
                  <option value="withSubBreeds">With Breeds</option>
                  <option value="withoutSubBreeds">Without Breeds</option>
                </>
              )}
            </select>
          </div>
        </div>
        <div className="tableRow">
          <h1>List Of Dogs With their subBreeds</h1>
          <table id="customTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
              </tr>
            </thead>
            <tbody>
              {dogListData?.map((dog) => (
                <DogTd
                  key={dog.id}
                  dogInfo={dog}
                  searchStatus={dogBreedsData}
                  masterBreed={dogName}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Explore;
