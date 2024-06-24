import { useState, useEffect } from "react";
import { getJobsInfoByCandidateId } from "../../actions/postulate";
import JobStatsCard from "../../components/JobStatsCard";
import validate from "../../assets/validate.png";
import election from "../../assets/election.png";
import promotion from "../../assets/promotion.png";
import rejet1 from "../../assets/rejet1.jpeg";
import { deletePostByEmployeeAction } from "../../actions/jobs";
import Toast from "../../components/Toast";
import { toast } from "sonner";

const Form = () => {
  const [jobPostulateInfo, setJobPostulateInfo] = useState([]);
  const [tableItemsV2, setTableItemsV2] = useState([]);
  const [loading, setLoading] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobsInfoByCandidateIdAsync = async () => {
      setIsLoading(true);
      try {
        const data = await getJobsInfoByCandidateId();
        setJobPostulateInfo(data);

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
            title: "Jobs en cours de validation",
            items: [...inProgress],
          },
          { label: "Accepté", title: "Jobs validés", items: [...accepted] },
          { label: "Refusé", title: "Jobs rejetés", items: [...rejected] },
        ];
        setTableItemsV2(tableItemsV2);
      } catch (error) {
        console.error("Failed to fetch job postulate info:", error);
      } finally {
        setIsLoading(false);
      }
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

  const handleDelete = async (id) => {
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
    try {
      await deletePostByEmployeeAction(id);

      // Refresh the jobPostulateInfo after deletion
      const updatedData = await getJobsInfoByCandidateId();
      setJobPostulateInfo(updatedData);

      toast(<Toast type="success" message="Candidature supprimée!" />);

      // Update the table items
      const inProgress = updatedData
        ? updatedData.filter((item) => item.status === "IN_PROGRESS")
        : [];
      const accepted = updatedData
        ? updatedData.filter((item) => item.status === "ACCEPT")
        : [];
      const rejected = updatedData
        ? updatedData.filter((item) => item.status === "REJECT")
        : [];

      const updatedTableItemsV2 = [
        {
          label: "En cours",
          title: "Jobs en cours de validation",
          items: [...inProgress],
        },
        { label: "Accepté", title: "Jobs validés", items: [...accepted] },
        { label: "Refusé", title: "Jobs rejetés", items: [...rejected] },
      ];
      setTableItemsV2(updatedTableItemsV2);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="font-semibold text-2xl md:text-3xl lg:text-3xl mb-6">
        Tableau de bord des candidatures
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        <JobStatsCard
          icon={promotion}
          value={jobPostulateInfo ? jobPostulateInfo.length : 0}
          label="Total des candidatures"
        />
        <JobStatsCard
          icon={validate}
          value={
            jobPostulateInfo
              ? jobPostulateInfo.filter((item) => item.status === "ACCEPT")
                  .length
              : 0
          }
          label="Candidatures validées"
        />
        <JobStatsCard
          icon={election}
          value={
            jobPostulateInfo
              ? jobPostulateInfo.filter((item) => item.status === "IN_PROGRESS")
                  .length
              : 0
          }
          label="Candidatures en cours"
        />
        <JobStatsCard
          icon={rejet1}
          value={
            jobPostulateInfo
              ? jobPostulateInfo.filter((item) => item.status === "REJECT")
                  .length
              : 0
          }
          label="Candidatures rejetées"
        />
      </div>
      <div className="px-4 md:px-8 bg-white shadow-lg rounded-lg">
        <div className="max-w-lg mb-6">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Rapports de candidatures
          </h3>
          <p className="text-gray-600 mt-2">
            Analysez les statistiques de vos candidatures en cours, validées et
            rejetées.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-10 w-10 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : tableItemsV2.length === 0 ? (
          <h1 className="text-gray-800 text-lg">Aucune donnée disponible</h1>
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
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            disabled={loading[item.id]}
                          >
                            {loading[item.id] ? (
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                              </svg>
                            ) : (
                              "Supprimer"
                            )}
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
    </div>
  );
};

export default Form;
