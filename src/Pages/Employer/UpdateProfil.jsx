import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfil } from "../../actions/user";
import { setFormDataInState } from "../../reducers/userReducers";

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
    await dispatch(updateProfil(formData));
    setIsEditing(false);
    alert("Updated and saved");
  };

  useEffect(() => {
    dispatch(setFormDataInState(formData));
  }, [formData, dispatch]);

  return (
    <div className="min-h-screen flex">
      <div className="w-full p-6 bg-white border-r border-gray-200">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Informations Personnelles
          </h1>
        </header>
        <form className="grid grid-cols-2 gap-6">
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
              className={`px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                !isEditing ? "bg-gray-200" : ""
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
              className={`px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                !isEditing ? "bg-gray-200" : ""
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
              className={`px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                !isEditing ? "bg-gray-200" : ""
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700">
              Votre Rôle
            </label>
            <input
              type="text"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                !isEditing ? "bg-gray-200" : ""
              }`}
            />
          </div>

          <div className="col-span-2 flex justify-end mt-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Mettre à jour
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
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
