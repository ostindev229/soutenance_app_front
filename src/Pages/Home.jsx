import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Value from "../components/Value";
import JobList from "../components/JobList";
import Testimonial from "../components/Testimonial";
import { getAllPosts } from "../actions/jobs";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );
};

function Home() {
  const allPosts = useSelector((state) => state.posts.posts);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <AnimatedSection>
        <Search setJobs={(searchedJob) => setPosts(() => [...searchedJob])} />
      </AnimatedSection>
      <AnimatedSection>
        <div className="text-center my-8">
          <h2 className="text-3xl font-bold text-blue-600">
            Liste des offres disponibles
          </h2>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <JobList
          posts={posts.length > 0 ? posts : allPosts}
          showParticipantList={false}
          postulateBtn={true}
          isRecruiter={false}
        />
      </AnimatedSection>
      <AnimatedSection>
        <Value />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonial />
      </AnimatedSection>
    </div>
  );
}

export default Home;
