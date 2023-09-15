import { useEffect, useState } from "react";
import { headerDocPicture } from "../assets";
import DogCard from "../components/DogCard";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";
import { Link } from "react-router-dom";

function Home() {
  const [dogListData, setDogListData] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.app;
  });
  const [visible, setVisible] = useState(10);

  const getList = async () => {
    const breedNames = Object.keys(data?.dogData?.message);
    return setDogListData(breedNames);
  };

  const showMoreDogs = () => {
    setVisible((prevValue) => prevValue + 10);
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
          <button className="btnPictureHome">
            <Link className="link" to={"/explore"}>
              Explore more!
            </Link>
          </button>
          <img src={headerDocPicture} className="imgSource" />
        </picture>
      </section>

      <section className="dogsSection">
        <h1 className="dogsTitle">Checkout these dogs!</h1>

        <div className="dogsContainer">
          <ul className="dogsCardWrapper">
            {dogListData?.slice(0, visible).map((dog) => {
              return <DogCard key={dog} dogData={dog} />;
            })}
          </ul>
          <button className="btnDogs" onClick={() => showMoreDogs()}>
            Load More
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
