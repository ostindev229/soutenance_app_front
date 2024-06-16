import { useState, useEffect } from "react";

import { getJobsInfoByCandidateId } from "../../actions/postulate";
import JobStatsCard from "../../components/JobStatsCard";
import validate from "../../assets/validate.png";
import election from "../../assets/election.png";
import promotion from "../../assets/promotion.png";

const Form = () => {
  const [jobPostulateInfo, setJobPostulateInfo] = useState([]);
  const [tableItemsV2, setTableItemsV2] = useState([]);

  useEffect(() => {
    const getJobsInfoByCandidateIdAsync = async () => {
      const data = await getJobsInfoByCandidateId();
      console.log(data);
      setJobPostulateInfo(data);
      console.log(jobPostulateInfo);
      const inProgress = data
        ? data.filter((item) => item.status === "IN_PROGRESS")
        : [];
      const accepted = data
        ? data.filter((item) => item.status === "ACCEPT")
        : [];
      const rejected = data
        ? data.filter((item) => item.status === "REJECT")
        : [];
      const tableItemsV2 = [
        {
          label: "En cours",
          title: "Job en cours de validation",
          items: [...inProgress],
        },
        { label: "Accepté", title: "Job validé", items: [...accepted] },
        { label: "Refusé", title: "Job rejeté", items: [...rejected] },
      ];
      setTableItemsV2(tableItemsV2);
    };

    getJobsInfoByCandidateIdAsync();
  }, []);

  const [selectedItem, setSelectedItem] = useState(0);
  const labelColors = {
    ACCEPT: {
      color: "text-green-600 bg-green-50",
    },
    IN_PROGRESS: {
      color: "text-blue-600 bg-blue-50",
    },
    Great: {
      color: "text-pink-600 bg-pink-50",
    },
    REJECT: {
      color: "text-red-600 bg-red-50",
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 justify-between">
        <JobStatsCard
          icon={promotion}
          value="5"
          label="Nombre total d'offres"
        />
        <JobStatsCard icon={validate} value="5" label="Offres validées" />
        <JobStatsCard icon={election} value="7" label="Offres en attente" />
      </div>
      <div className="  px-4 md:px-8 bg-white shadow-lg rounded-lg">
        <div className="max-w-lg mb-6">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Reports
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {tableItemsV2.length === 0 ? (
          <h1 className="text-gray-800 text-lg">Aucune donnée</h1>
        ) : (
          <div className="text-sm mt-12 overflow-x-auto">
            <ul
              role="tablist"
              className="w-full border-b flex items-center gap-x-3 overflow-x-auto"
            >
              {tableItemsV2.map((item, idx) => (
                <li
                  key={idx}
                  className={`py-2 border-b-2 ${
                    selectedItem === idx
                      ? "border-indigo-600 text-indigo-600"
                      : "border-white text-gray-500"
                  }`}
                >
                  <button
                    role="tab"
                    aria-selected={selectedItem === idx}
                    aria-controls={`tabpanel-${idx + 1}`}
                    className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    onClick={() => setSelectedItem(idx)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="w-full table-auto text-left">
                <thead className="bg-gray-100 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="w-3/12 py-4 px-6">
                      {tableItemsV2[selectedItem].title}
                    </th>
                    <th className="w-2/12 py-4 px-6">Catégorie</th>
                    <th className="w-2/12 py-4 px-6">Créateur</th>
                    <th className="w-2/12 py-4 px-6">Lieu</th>
                    <th className="w-2/12 py-4 px-6">Type de Job</th>
                    <th className="w-2/12 py-4 px-6">Statut</th>
                    <th className="w-2/12 py-4 px-6">Date de postulation</th>
                    {tableItemsV2[selectedItem].items.some(
                      (item) => item.status === "IN_PROGRESS"
                    ) && <th className="w-2/12 py-4 px-6">Action</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y">
                  {tableItemsV2[selectedItem].items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-600">
                        {item.creator}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-600">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-600">
                        {item.typeTemps}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`py-1 px-3 rounded-full font-semibold text-xs ${
                            labelColors[item?.status]?.color || ""
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-indigo-600">
                        {item.createdAt}
                      </td>
                      {item.status === "IN_PROGRESS" && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Supprimé
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
