import Slider from "react-slick";
import johnDoe from "../assets/john.png"; // Remplacez par des images réelles
import janeSmith from "../assets/john1.png"; // Remplacez par des images réelles
import sarahBrown from "../assets/john2.png"; // Remplacez par des images réelles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "JobBenin a complètement transformé ma carrière. J'ai trouvé mon emploi de rêve en seulement deux semaines !",
    name: "Jean Dupont",
    title: "Ingénieur logiciel",
    image: johnDoe,
  },
  {
    text: "Grâce à JobBenin, j'ai pu trouver un emploi qui correspond parfaitement à mes compétences et à mes intérêts.",
    name: "Marie Durand",
    title: "Designer Graphique",
    image: janeSmith,
  },
  {
    text: "Le processus de recherche d'emploi a été tellement fluide et efficace avec JobBenin. Je le recommande vivement !",
    name: "Sarah Martin",
    title: "Spécialiste Marketing",
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
        <h2
          style={{ fontWeight: "bold" }}
          className="text-4xl font-semibold mb-4 text-white"
        >
          Témoignages
        </h2>
        <p className="text-lg mb-12 text-white">
          Quelques mots de nos candidats
        </p>
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
