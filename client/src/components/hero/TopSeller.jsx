import { Caption, Container, Heading, ProfileCard, Title } from "../../routes";
import { topSellerList } from "../../utils/data";

export const TopSeller = () => {
  return (
    <>
      <section className="process py-12">
        <Container>
          <Heading
            title ="Top Seller"
            subtitle="Meet our top AAU sellers who actively buy, sell, and share essentials on campus. From textbooks to electronics and dorm supplies, these trusted members make the marketplace thrive."
          />

          <div className="content grid grid-cols-1 md:grid-cols-5 gap-5 mt-8">
            {topSellerList.map((item, index) => (
              <div
                className="relative flex items-center border p-3 rounded-lg bg-white shadow hover:shadow-lg transition"
                key={index + 1}
              >
                <div className="flex items-center gap-3">
                  <ProfileCard className="w-16 h-16">
                    <img
                      src={item.profile}
                      alt={item.title}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </ProfileCard>
                  <div>
                    <Title level={5} className="font-semibold text-sm md:text-base">
                      {item.title}
                      </Title>

                    <Caption className="text-green-500 font-bold">
                      ${item.amount}
                    </Caption>
                  </div>
                </div>

                {/* Fixed positioned number in bottom-right corner */}
                <span className="absolute bottom-2 right-2 text-green-500 text-2xl font-bold opacity-50">
                  {String(item.id).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
