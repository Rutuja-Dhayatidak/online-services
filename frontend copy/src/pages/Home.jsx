import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-8 py-4 shadow-sm bg-white"
      >
        <h1 className="text-2xl font-bold text-indigo-600">
          ServiceRent
        </h1>

        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </motion.nav>


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-gray-800 leading-tight max-w-3xl"
        >
          Book Trusted Services Near You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-gray-600 text-lg max-w-xl"
        >
          Find electricians, plumbers, cleaners and many more verified service providers in your city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 space-x-4"
        >
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-md"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50"
          >
            I am a Vendor
          </Link>
        </motion.div>
      </div>


      {/* Features Section */}
      <section className="px-8 pb-24">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose Us
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            {
              title: "Verified Vendors",
              desc: "All service providers are manually approved by admin"
            },
            {
              title: "Instant Booking",
              desc: "Book services in seconds with live availability"
            },
            {
              title: "Secure Payments",
              desc: "Safe and reliable booking system"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h4 className="text-xl font-semibold mb-3 text-indigo-600">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pb-20"
      >
        <h3 className="text-3xl font-bold mb-6">
          Ready to get started?
        </h3>

        <Link
          to="/register"
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-indigo-700"
        >
          Create Free Account
        </Link>
      </motion.div>

    </div>
  );
}
