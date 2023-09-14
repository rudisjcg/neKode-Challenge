import { useEffect, useState } from "react";
import { headerDocPicture } from "../assets";
import DogCard from "../components/DogCard";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";

function Home() {
  const [dogListData, setDogListData] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.app;
  });

  const getList = async () => {
    const breedNames = Object.keys(data?.dogData?.message);
    return setDogListData(breedNames);
  };

  useEffect(() => {
    dispatch(getInitialDogData());
  }, []);
  useEffect(() => {
    getList();
  }, [data]);

  return (
    <>
      <section className="headerSection">
        <picture className="pictureHomeContainer">
          <button className="btnPictureHome">Explore more!</button>
          <img src={headerDocPicture} className="imgSource" />
        </picture>
      </section>

      <section className="dogsSection">
        <h1 className="dogsTitle">Checkout these dogs!</h1>

        <div className="dogsContainer">
          <ul className="dogsCardWrapper">
            {dogListData?.slice(0, 25).map((dog) => {
              return <DogCard key={dog} dogData={dog} />;
            })}
          </ul>
          <button className="btnDogs">Load More</button>
        </div>
      </section>
    </>
  );
}

export default Home;
