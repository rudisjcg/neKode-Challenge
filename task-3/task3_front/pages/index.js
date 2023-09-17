import DogCard from "@/components/DogCard";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { mongooseConnect } from "@/db/mongoose";
import { Category } from "@/modals/Category";
import { Product } from "@/modals/Product";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export default function Home({ products, mainCategories, categoriesProducts }) {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  return (
    <>
      <Layout>
        <Header />
        <section className="dogsSection">
          <h1 className="dogsTitle">Checkout these dogs!</h1>
          <div className="dogsContainer">
            <AliceCarousel
              mouseTracking
              items={products}
              responsive={responsive}
              controlsStrategy="alternate"
            >
              {products?.map((prodc) => (
                <DogCard
                  key={prodc._id}
                  dogs={prodc}
                  categories={mainCategories}
                  cateProducts={categoriesProducts}
                />
              ))}
            </AliceCarousel>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c?.parent);
  const categoriesProducts = {}; //cat Id => [products]
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c?._id?.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
