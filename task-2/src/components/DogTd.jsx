import axios from "axios";
import { useEffect, useState } from "react";

export default function DogTd({ dogInfo, searchStatus, masterBreed }) {
  const subBreedUrl = `https://dog.ceo/api/breed/${dogInfo}/list`;
  const [subBreedDog, setSubBreedDog] = useState([]);
  const [breedMain, setBreedMain] = useState(...(masterBreed || ""));
  async function getSubBreed() {
    if (searchStatus) {
      return;
    }
    const { data } = await axios.get(subBreedUrl);
    const res = await data?.message;
    setSubBreedDog(res);
  }
  const hasSubBreeds = subBreedDog && subBreedDog.length > 0;

  useEffect(() => {
    getSubBreed();
    setBreedMain(masterBreed);
  }, [dogInfo, masterBreed]);
  return (
    <>
      {searchStatus ? (
        <tr>
          <td>{dogInfo}</td>
          <td>
            {dogInfo} is a Sub breed of {breedMain}
          </td>
        </tr>
      ) : (
        <tr>
          <td>{dogInfo}</td>
          <td className={hasSubBreeds ? "withBreeds" : "noBreeds"}>
            {hasSubBreeds
              ? subBreedDog.slice(0, 10).map((sub, subIndex) => <>{sub} | </>)
              : "Does not have Breeds"}
          </td>
        </tr>
      )}
    </>
  );
}
