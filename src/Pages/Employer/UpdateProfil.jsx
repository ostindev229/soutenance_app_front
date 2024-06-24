import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfil } from "../../actions/user";
import { setFormDataInState } from "../../reducers/userReducers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!formData.email || !formData.phoneNumber || !formData.username) {
      toast.error("Tous les champs doivent être remplis.");
      return;
    }

    await dispatch(updateProfil(formData));
    setIsEditing(false);
    toast.success("Informations utilisateur mises à jour avec succès");
  };

  useEffect(() => {
    dispatch(setFormDataInState(formData));
  }, [formData, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <ToastContainer />
      <div className="w-[80%]   bg-white p-8 shadow-2xl rounded-xl mt-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Informations Personnelles
          </h1>
        </header>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Votre Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Votre Numéro de Téléphone
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Votre Nom d'utilisateur
            </label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>

          <div className="flex justify-end mt-8">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
              >
                Mettre à jour
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 shadow-md transition"
              >
                Sauvegarder la mise à jour
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
