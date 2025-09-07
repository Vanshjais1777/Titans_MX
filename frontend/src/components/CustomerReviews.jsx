import React from "react";
import custom1 from "../assets/custom1.jpg"
import custom2 from "../assets/custom2.jpg"
import custom3 from "../assets/custom3.jpg"

const reviews = [
  {
    name: "Lucia E. Nugent",
    title: "CEO of Clinico",
    review: "The best useful website",
    description:
      "I was truly impressed by the level of detail and thoughtfulness that went into the design. The website is intuitive and made a real impact on my workflow.",
    image: custom1,
  },
  {
    name: "Brenda R. Smith",
    title: "Founder of Wellcome",
    review: "Ranking is the #1!",
    description:
      "Thanks to this platform, our online presence has skyrocketed. The tools are powerful, and the results speak for themselves. Highly recommended!",
    image: custom2,
  },
  {
    name: "Brian B. Wilkerson",
    title: "CEO of Mack Soft",
    review: "The website is SEO friendly",
    description:
      "Finally, a website that truly understands the needs of modern businesses. The SEO optimization is top-notch, helping us achieve new milestones.",
    image: custom3,
  },
  {
    name: "Miguel L. Benbow",
    title: "Founder of Moche LTD",
    review: "100% secure and safe website",
    description:
      "Security has always been a priority for us, and this website delivers. It's reliable, fast, and keeps our data safe, giving us peace of mind.",
    image: custom2,
  },
  {
    name: "Hilda A. Sheppard",
    title: "CEO of Doodle",
    review: "Very developer-friendly website",
    description:
      "The development team loves it! The platform is easy to integrate and provides all the necessary documentation to get started quickly.",
    image: custom3,
  },
  {
    name: "Oscar M. Bailey",
    title: "CTO of NextGen Tech",
    review: "A revolutionary experience!",
    description:
      "This website has redefined how we manage our operations. The innovative features and seamless performance have made it a game-changer for our company.",
    image: custom1,
  },
];

const CustomerReviews = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Good Reviews By Customers
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what our satisfied customers have to say about their experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-400 to-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 border-2 border-gray-200"
              />
              <h4 className="text-lg font-bold mb-2 text-gray-800">
                {review.review}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {review.description}
              </p>
              <p className="font-semibold text-gray-700">{review.name}</p>
              <p className="text-gray-500 text-sm">{review.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
