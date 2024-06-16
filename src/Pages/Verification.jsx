import { useSelector, useDispatch } from "react-redux";
import { getAllPostsForVerif, updateJobStatus } from "../actions/jobs";
import { updatePostInState } from "../reducers/jobsReducer";
import { useEffect } from "react";

const Verification = () => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);

  const dispatch = useDispatch();

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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Ma Table</h2>
        </div>
        <div className="my-2 flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Catégorie
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Lieu
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Finale
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Participants
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type de Temps
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Compétence Recherchée
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Créé À
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Statut
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valider
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rejeté
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.finalDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.totalParticipate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.typeOfTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.competenceSearch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleUpdateStatus(post._id, "ACCEPT")
                            }
                            className={`px-2 py-1 rounded text-white ${
                              post.status === "ACCEPT"
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500"
                            }`}
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
                            className={`px-2 py-1 rounded text-white ${
                              post.status === "REJECT"
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-red-500"
                            }`}
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
