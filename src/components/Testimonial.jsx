import Slider from "react-slick";
import johnDoe from "../assets/john.png"; // Replace with actual images
import janeSmith from "../assets/john1.png"; // Replace with actual images
import sarahBrown from "../assets/john2.png"; // Replace with actual images
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "JobBenin has completely transformed my career. I found my dream job in just two weeks!",
    name: "John Doe",
    title: "Software Engineer",
    image: johnDoe,
  },
  {
    text: "Thanks to JobBenin, I was able to find a job that perfectly matches my skills and interests.",
    name: "Jane Smith",
    title: "Graphic Designer",
    image: janeSmith,
  },
  {
    text: "The job search process was so smooth and efficient with JobBenin. Highly recommend it!",
    name: "Sarah Brown",
    title: "Marketing Specialist",
    image: sarahBrown,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials-background">
      <div className="overlay"></div>
      <div className="container mx-auto text-center testimonials-content">
        <h2 className="text-4xl font-semibold mb-4 text-white">Testimonials</h2>
        <p className="text-lg mb-12 text-white">Few words from candidates</p>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-lg font-medium mb-4">{testimonial.text}</p>
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                </div>
                <h5 className="text-sm font-bold">{testimonial.name}</h5>
                <p className="text-xs">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
