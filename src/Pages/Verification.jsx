import { useSelector, useDispatch } from "react-redux";
import { getAllPostsForVerif, updateJobStatus } from "../actions/jobs";
import { updatePostInState } from "../reducers/jobsReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Toast from "../components/Toast";

const Verification = () => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("userToken");

    toast(<Toast type="success" message="Vous ètes déconnectés!" />);
    navigate("/", true);
  };

  useEffect(() => {
    dispatch(getAllPostsForVerif());
  }, [dispatch]);

  const handleUpdateStatus = (jobId, status) => {
    const updatedPost = posts.find((post) => post._id === jobId);
    if (updatedPost) {
      const newPost = { ...updatedPost, status };
      dispatch(updatePostInState(newPost));
      dispatch(updateJobStatus(jobId, status));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-4 sm:px-8 bg-gray-100">
      <div className="py-8 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-semibold leading-tight">Ma Table</h2>
          <button className="bg-blueColor text-white" onClick={handleLogout}>
            Se Déconnecté
          </button>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Catégorie
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lieu
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Finale
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Participants
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type de Temps
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Compétence Recherchée
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Créé Le
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valider
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rejeté
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.finalDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.totalParticipate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.typeTemps}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.competenceSearch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {post.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleUpdateStatus(post._id, "ACCEPT")
                            }
                            className={`px-2 py-1 rounded text-lg text-white ${
                              post.status === "ACCEPT"
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                            } transition duration-150 ease-in-out`}
                            disabled={post.status === "ACCEPT"}
                          >
                            Valider
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleUpdateStatus(post._id, "REJECT")
                            }
                            className={`px-2 py-1 rounded text-lg text-white ${
                              post.status === "REJECT"
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            } transition duration-150 ease-in-out`}
                            disabled={post.status === "REJECT"}
                          >
                            Rejeté
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
