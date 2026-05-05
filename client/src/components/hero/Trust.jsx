import { trustList } from "../../utils/data";
import { Container, Heading } from "../../routes";

export const Trust = () => {
  return (
    <>
      <section className="process py-12 relative z-10">
        <Container>
          <Heading
            title="Trusted by AAU Students & Faculty."
            subtitle="Our marketplace is powered by the Amman Arab University community. From student clubs to faculty members, hundreds of people already use Mazady AAU to buy, sell, and share essentials on campus."
          />

          <div className="content grid grid-cols-3 md:grid-cols-7 gap-5 mt-8">
  {trustList.map((item, index) => (
    <div 
      key={index} 
      className="flex items-center justify-center border rounded-lg p-4 bg-white"
    >
      <img 
        src={item.profile} 
        alt={item.name} 
        className="w-20 h-20 object-contain mx-auto"
      />
    </div>
  ))}
</div>

        </Container>
      </section>
    </>
  );
};