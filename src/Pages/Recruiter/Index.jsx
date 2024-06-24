import JobStatsCard from "../../components/JobStatsCard";
import { IoAddOutline } from "react-icons/io5";
import validate from "../../assets/validate.png";
import election from "../../assets/election.png";
import rejet1 from "../../assets/rejet1.jpeg";
import promotion from "../../assets/promotion.png";
import JobListEmpty from "../../components/JobListEmpty";
import JobList from "../../components/JobList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateModalJob from "../../components/CreateModalJob";
import { getPosts, getPostStateValue } from "../../actions/jobs";
import { useDisclosure } from "@chakra-ui/react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    accepted: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const getPostAsync = async () => {
      const data = await getPosts();
      dispatch(data);
    };

    getPostAsync();
  }, [dispatch]);

  useEffect(() => {
    const getPostStateValueAsync = async () => {
      const value = await getPostStateValue();
      console.log(value);
      setStats(value);
    };

    getPostStateValueAsync();
  }, [posts]);

  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-3xl mb-6">
        Tableau de bord
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        <JobStatsCard
          icon={promotion}
          value={posts.length}
          label="Nombre total d'offres"
        />
        <JobStatsCard
          icon={validate}
          value={stats.accepted}
          label="Offres validées"
        />
        <JobStatsCard
          icon={election}
          value={stats.pending}
          label="Offres en attente"
        />
        <JobStatsCard
          icon={rejet1}
          value={stats.rejected}
          label="Offres rejetées"
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-xl md:text-2xl lg:text-2xl">
          Mes offres créées
        </h2>
        <div
          onClick={onOpen}
          className="rounded-full w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-blue-500 flex items-center justify-center cursor-pointer transition-transform duration-200 transform hover:scale-105"
        >
          <IoAddOutline className="text-white text-2xl md:text-3xl lg:text-4xl" />
        </div>
      </div>
      {posts.length === 0 ? (
        <JobListEmpty onClick={onOpen} />
      ) : (
        <JobList
          posts={posts}
          showParticipantList={true}
          postulateBtn={false}
          viewMore={onOpen}
          isRecruiter={true}
        />
      )}
      <CreateModalJob onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default Index;
