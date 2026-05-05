import { AiOutlineYoutube } from "react-icons/ai";
import { Container, Title, Body, Caption, PrimaryButton } from "../../routes";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin, CiTwitter } from "react-icons/ci";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! ✅ We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-16 bg-gray-50 mt-25">
      <Container>
        <div className="text-center mb-12">
          <Title level={2} className="text-primary font-bold">
            Contact Us
          </Title>
          <Body className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a question or need support? We’d love to hear from you!  
            Get in touch with the Mazady AAU team.
          </Body>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-s1 rounded-xl p-8"
          >
            <div className="mb-5">
              <Caption className="mb-2">Your Name *</Caption>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none"
                required
              />
            </div>

            <div className="mb-5">
              <Caption className="mb-2">Your Email *</Caption>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none"
                placeholder="you@aau.edu.jo"
                required
              />
            </div>

            <div className="mb-5">
              <Caption className="mb-2">Message *</Caption>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none"
                rows="5"
                required
              ></textarea>
            </div>

            <PrimaryButton type="submit" className="w-full mt-20">
              Send Message
            </PrimaryButton>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white shadow-s1 rounded-xl p-8">

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.2584450665877!2d35.87926730962232!3d32.11632191735126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c9da8110d261f%3A0xb03fdda6ac56638f!2z2KzYp9mF2LnYqSDYudmF2KfZhiDYp9mE2LnYsdio2YrYqSBBbW1hbiBBcmFiIFVuaXZlcnNpdHk!5e0!3m2!1sen!2sjo!4v1756714931760!5m2!1sen!2sjo" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            

            <h3 className="text-xl font-semibold mb-4 mt-15">📧 Email</h3>
            <p className="text-gray-600 mb-6">support@aau.edu.jo</p>


            <h3 className="text-xl font-semibold mb-4">📞 Phone</h3>
            <p className="text-gray-600">+962 6 123 4567</p>
            
 <div className="flex items-center mt-5 gap-4">
  <div className="bg-emerald-900 w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <AiOutlineYoutube size={27} className="text-amber-50" />
  </div>
  <div className="bg-emerald-900 w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <FaInstagram size={27} className="text-amber-50" />
  </div>
  <div className="bg-emerald-900 w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <CiTwitter size={27} className="text-amber-50 font-extrabold" />
  </div>
  <div className="bg-emerald-900 w-16 aspect-square flex items-center justify-center rounded-full shadow">
    <CiLinkedin size={27} className="text-amber-50" />
  </div>
</div>

          </div>
          
        </div>
       
      </Container>
    </section>
  );
};

export default Contact;
