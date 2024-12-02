import React from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaHands } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/shop");
  };

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-gray-100 dark:bg-slate-900">
        <div className="flex-1 mr-5">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 dark:text-slate-200">
            Style Reimagined, Trends Redefined.
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-5 dark:text-slate-200">
            Welcome to TEN Fashion
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed dark:text-slate-200">
            At <strong>TEN Fashion</strong>, we believe that fashion is not just
            about clothing; it is a statement, an expression of individuality,
            and a form of art. Our journey began with a simple yet profound idea
            — to bring the latest trends and timeless styles directly to your
            doorstep, creating a fashion destination that resonates with the
            dynamic spirit of the UK.
          </p>
        </div>
        <div className="flex-1 mt-5 md:mt-0">
          <img
            className="rounded-lg shadow-lg w-full"
            src="https://ukbhatia.com/wp-content/uploads/2023/12/imagess-1024x683.jpg"
            alt="Fashion and trends"
          />
        </div>
      </div>

      {/* Our Story, Vision, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 bg-white dark:bg-slate-900">
        {[
          {
            icon: <FaClockRotateLeft />,
            title: "Our Story",
            description: `We saw an opportunity to transform the e-commerce landscape by
            combining cutting-edge technology with a deep understanding of our
            customers needs and desires. Our journey started with a commitment
            to provide a curated selection of high-quality products, an
            intuitive shopping experience, and unparalleled customer service.`,
          },
          {
            icon: <FaEye />,
            title: "Our Vision",
            description: ` Our vision is to create a digital marketplace that transcends the
            ordinary, where every click brings joy and every purchase tells a
            story. We aspire to be more than just an online store; we aim to be
            a trusted companion on your journey to discover and acquire the
            things you love, delivered with excellence and care.`,
          },
          {
            icon: <FaHands />,
            title: "Our Priority",
            description: `Shopping with us is more than a transaction; it is an experience.
            Our user-friendly interface ensures that every visit to TEN Fashion
            is a seamless journey from discovery to delivery. We prioritize your
            satisfaction, providing not just products but a service that exceeds
            expectations.`,
          },
          {
            icon: <FaHandshake />,
            title: "Our Promise",
            description: `Every interaction with TEN Fashion comes with a promise — a promise
            of excellence, authenticity, and satisfaction. We stand by our
            commitment to deliver not just products but an experience that
            leaves a lasting imprint on your journey.`,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl text-gray-600 mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Parallax Section */}
      <div
        className="h-[500px] bg-fixed bg-cover bg-center flex items-center justify-center relative dark:bg-slate-900"
        style={{
          backgroundImage:
            "url('https://as2.ftcdn.net/v2/jpg/05/96/62/65/1000_F_596626503_jrzjZNYStDexiWxQFqO7oCh6M8PdMlJs.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-lg text-center text-white max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Parallax with another video
          </h1>
          <p className="text-lg mb-5">More eye-catching</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            onClick={handleShopNowClick}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-10 bg-gray-100 text-center dark:bg-slate-900">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 dark:text-slate-200">
          Aliquam viverra tellus a urna facilisis bibendum.
        </h2>
        <div className="flex flex-wrap justify-center">
          {[
            {
              img: "https://ukbhatia.com/wp-content/uploads/2021/01/truck-2.png",
              title: "Fast delivery",
              description: `At TEN fashion, we understand the need for speed. Enjoy
              lightning-fast delivery that brings your fashion favorites to your
              doorstep in record time. Because we know you can’t wait to unwrap
              your style.`,
            },
            {
              img: "https://ukbhatia.com/wp-content/uploads/2021/01/package-2.png",
              title: "15 day returns",
              description: `At TEN fashion, we want you to adore your fashion finds. If for
              any reason you’re not head over heels, don’t worry! Enjoy a
              generous 15-day return policy from the date of receiving your
              order.`,
            },
            {
              img: "https://ukbhatia.com/wp-content/uploads/2021/01/wallet-2.png",
              title: "Secure Payment",
              description: `At TEN fashion, your security is our priority. We want your
              shopping experience to be not only stylish but also worry-free.
              That’s why we’ve implemented stringent measures to ensure your
              payments are always secure.`,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-5 m-3 rounded-lg shadow-md w-full md:w-1/4"
            >
              <img src={item.img} alt={item.title} className="w-16 h-16 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
