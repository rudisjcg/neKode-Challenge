import Image from "next/image";
import React from "react";

export default function DogCard({ dogs, cateProducts, categories }) {
  return (
    <div className="dog">
      <h2 className="dogName">{dogs?.title}</h2>
      <div className="dogWrapper">
        <Image
          src={dogs?.images[0]}
          alt="Dog Picture"
          className="cardImg"
          width={300}
          height={300}
        />
        <div className="dogDescription">
          {categories?.map((el) => {
            if (dogs?.category.includes(el?._id)) {
              return (
                <h1 className="breedName" key={el?._id}>
                  {el?.properties?.map((el) => el?.values)}
                </h1>
              ); // Assuming el.name is the text you want to display
            }
            return null; // Return null if the condition is not met
          })}
        </div>
      </div>
    </div>
  );
}
