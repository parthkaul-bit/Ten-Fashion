import React from "react";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <div className="flex flex-col dark:bg-slate-900">
      {/* Top Section */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-800 shadow-lg rounded-lg overflow-hidden">
            {/* Address Section */}
            <div className="p-6 sm:p-8 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Address
              </h2>
              <div className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 space-y-2">
                <p>
                  <span className="font-semibold">Building No./Flat No.:</span>{" "}
                  41/A
                </p>
                <p>
                  <span className="font-semibold">Name of Premises:</span> Shri
                  Shyam Trading Company
                </p>
                <p>
                  <span className="font-semibold">Road/Street:</span> Tirupati
                  Palace, Nipania
                </p>
                <p>
                  <span className="font-semibold">City:</span> Indore, Madhya
                  Pradesh
                </p>
                <p>
                  <span className="font-semibold">PIN Code:</span> 452016
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:support@ukbhatia.com"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    support@ukbhatia.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a
                    href="tel:+919106069902"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    +91 9106069902
                  </a>
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <img
                src="https://ukbhatia.com/wp-content/uploads/2023/12/worker-using-digital-application-2048x1365.jpg"
                alt="Contact Illustration"
                className="h-64 lg:h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 dark:bg-slate-900">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
            Fill up the form if you have any question
          </h1>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
