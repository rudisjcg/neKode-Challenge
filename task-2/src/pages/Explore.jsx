import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialDogData } from "../redux/reducers/getDogdata";

function Explore() {
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

  console.log(dogListData);

  return (
    <>
      <section className="">
        <div className="row">
          <input />
          <button>Search</button>
          <select></select>
        </div>
        <div className="tableRow">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed</th>
              </tr>
            </thead>
            <tbody>
              <th>Doggy</th>
              <th>Doggiest</th>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Explore;
