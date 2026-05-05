import { CategorySlider, Hero, Process, TopCollection, TopSeller, Trust } from "../../routes";
import { ProductList } from "../../components/hero/ProductList";

export const Home = () => {
  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductList />
      <TopSeller />
      <Process />
      <Trust />
      <TopCollection />
    </>
  );
};

