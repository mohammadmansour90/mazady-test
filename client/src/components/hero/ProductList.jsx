import { Container, Heading } from "../../routes";
import { productlists } from "../../utils/data";
import { ProductCard } from "../cards/ProductCard";

export const ProductList = () => {
  return (
    <>
      <section className="product-home">
        <Container>
          <Heading
            title="Student Auctions"
            subtitle="Explore Amman Arab University’s trusted student marketplace. 
            Buy and sell textbooks, electronics, dorm essentials, and more — 
  all verified within the AAU student community. 
  Save money, support classmates, and find exactly what you need for campus life."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-8">
            {productlists?.slice(0, 12)?.map((item, index) => (
              <ProductCard item={item} key={index + 1} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
