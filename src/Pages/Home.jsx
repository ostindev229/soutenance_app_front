import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Value from "../components/Value";
import JobList from "../components/JobList";
import Testimonial from "../components/Testimonial";
import { getAllPosts } from "../actions/jobs";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import UserDescription from "../components/Description";

import Footer from "../components/Footer";
import Loader from "../components/Loader"; // Import the Loader component
import ScrollingMessage from "../components/ScrollingMessage"; // Import the ScrollingMessage component

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
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Ensure loader shows for at least 3 seconds
        await dispatch(getAllPosts());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [dispatch, refresh]);

  return (
    <div>
      <Navbar setRefresh={setRefresh} />

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
        {loading ? (
          <Loader /> // Show loader while fetching data
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length === 0 && allPosts.length === 0 ? (
          <ScrollingMessage text="Aucune offre publiée" /> // Use ScrollingMessage component
        ) : (
          <JobList
            posts={posts.length > 0 ? posts : allPosts}
            showParticipantList={false}
            postulateBtn={true}
            isRecruiter={false}
          />
        )}
      </AnimatedSection>
      <AnimatedSection>
        <Value />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonial />
      </AnimatedSection>

      <AnimatedSection>
        <UserDescription />
      </AnimatedSection>

      <Footer />
    </div>
  );
}

export default Home;
