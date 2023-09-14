import axios from "axios";
import { useEffect, useState } from "react";

function DogCard({ dogData }) {
  const dogImagesUrl = `https://dog.ceo/api/breed/${dogData}/images/random`;
  const subBreedUrl = `https://dog.ceo/api/breed/${dogData}/list`;
  const [dogImage, setDogImage] = useState([]);
  const [subBreedDog, setSubBreedDog] = useState([]);

  async function getDogImage() {
    const { data } = await axios.get(dogImagesUrl);
    const res = await data?.message;
    setDogImage(res);
  }

  async function getSubBreed() {
    const { data } = await axios.get(subBreedUrl);
    const res = await data?.message;
    setSubBreedDog(res);
  }

  useEffect(() => {
    getDogImage();
    getSubBreed();
  }, []);

  return (
    <li className="dog">
      <h2 className="dogName">{dogData}</h2>
      <div className="dogWrapper">
        <img src={dogImage} className="cardImg" />
        <div className="dogDescription">
          {subBreedDog && subBreedDog.length > 0 ? (
            subBreedDog.map((sub, index) => (
              <h1 className="breedName" key={index}>
                {sub}
              </h1>
            ))
          ) : (
            <h1 className="breedName">
              Does not <br /> have Breeds
            </h1>
          )}
        </div>
      </div>
    </li>
  );
}

export default DogCard;
