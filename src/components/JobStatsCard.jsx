import CountUp from "react-countup";
const JobStatsCard = (prop) => {
  return (
    <div className="  font-poppins bg-[#fff] text-white p-8 rounded-lg shadow-md flex flex-col md:flex-row md:gap-5 items-center md:items-start">
      <div className="bg-[#00B074] bg-opacity-15 w-20 h-20 rounded-full flex justify-center items-center mx-auto md:mx-0 transition-transform duration-200 transform hover:scale-105">
        <img src={prop.icon} className="w-12 h-12" alt="Icon" />
      </div>
      <div className="text-center md:text-left mt-4 md:mt-0">
        <h3 className="text-4xl text-[#464255] font-bold">
          <CountUp end={prop.value} duration={4} />
        </h3>
        <h4 className="text-base text-[#464255] mt-2">{prop.label}</h4>
      </div>
    </div>
  );
};

export default JobStatsCard;
