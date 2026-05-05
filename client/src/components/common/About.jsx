import { Container, Title, Body } from "../../routes";

export const About = () => {
  return (
    <section className="py-16 bg-gray-50 mt-25">
      <Container>
        <div className="text-center mb-12">
          <Title level={2} className="text-primary font-bold">
            About Mazady AAU
          </Title>
          <Body className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Mazady AAU is the official campus auction and marketplace platform for 
            Amman Arab University students and faculty. Our mission is to make 
            buying, selling, and sharing essentials easier and more secure within 
            the AAU community.
          </Body>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          <div className="p-6 shadow-s1 bg-white rounded-xl">
            <Title level={4} className="text-green mb-3">
              🎯 Our Mission
            </Title>
            <Body className="text-gray-600">
              To empower AAU students and faculty with a trusted marketplace 
              where they can exchange textbooks, electronics, dorm supplies, 
              and student projects at affordable prices — all within the AAU campus.
            </Body>
          </div>

          <div className="p-6 shadow-s1 bg-white rounded-xl">
            <Title level={4} className="text-green mb-3">
              🌟 Our Vision
            </Title>
            <Body className="text-gray-600">
              To create a connected, supportive AAU community where sustainability, 
              affordability, and innovation thrive through campus-based commerce.
            </Body>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <Title level={3} className="text-center mb-10 text-primary font-bold">
            Why Choose Mazady AAU?
          </Title>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-s1 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">📚 Student-Friendly</h3>
              <p className="text-gray-600">
                Made exclusively for AAU students and faculty — safe, secure, and community-focused.
              </p>
            </div>

            <div className="p-6 bg-white shadow-s1 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">💸 Affordable Deals</h3>
              <p className="text-gray-600">
                Buy and sell essentials at budget-friendly prices while helping classmates save money.
              </p>
            </div>

            <div className="p-6 bg-white shadow-s1 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-2">🔒 Secure Platform</h3>
              <p className="text-gray-600">
                Verified users, safe payments, and transparent auctions — built for trust at AAU.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
