import { useState } from "react";

interface UserProfile {
    name: string;
    email: string;
    role: string;
}

export function Profile() {
    const [user, setUser] = useState<UserProfile>({
        name: "Lucas Silva",
        email: "lucas.silva@example.com",
        role: "Admin",
    });

    const [editModal, setEditModal] = useState(false);
    const [formData, setFormData] = useState<UserProfile>(user);

    const handleSave = () => {
        setUser(formData);
        setEditModal(false);
    };

    return (
        <div className="p-6 font-sans w-[80rem] mx-auto">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>

            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-bold">{user.name}</p>
                </div>
                <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-bold">{user.email}</p>
                </div>
                <div>
                    <p className="text-gray-500">Role</p>
                    <p className="font-bold">{user.role}</p>
                </div>

                <button
                    className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    onClick={() => setEditModal(true)}
                >
                    Edit Profile
                </button>
            </div>

            {/* Modal de edição */}
            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border px-3 py-2 w-full rounded"
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border px-3 py-2 w-full rounded"
                                value={formData.email}
                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                className="border px-3 py-2 w-full rounded"
                                value={formData.role}
                                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setEditModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
