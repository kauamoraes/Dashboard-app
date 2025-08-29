import { useState } from "react";

interface Production {
    id: number;
    name: string;
    status: "Pending" | "In Progress" | "Completed";
    quantity: number;
    dueDate: string;
    notes: string;
}

const initialProductions: Production[] = [
    { id: 1, name: "Hydrate Replenish", status: "Pending", quantity: 50, dueDate: "2025-09-15", notes: "" },
    { id: 2, name: "Illumination Mask", status: "In Progress", quantity: 30, dueDate: "2025-09-20", notes: "" },
];

export function Productions() {
    const [productions, setProductions] = useState<Production[]>(initialProductions);
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formProduction, setFormProduction] = useState<Partial<Production>>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    const saveProduction = () => {
        if (!formProduction.name || !formProduction.status) return;

        if (editingId !== null) {
            // Editar produção
            setProductions(prev =>
                prev.map(p => (p.id === editingId ? { ...p, ...formProduction, id: editingId } as Production : p))
            );
            setEditingId(null);
            setEditModal(false);
        } else {
            // Novo
            setProductions(prev => [...prev, { ...formProduction, id: Date.now() } as Production]);
            setOpenModal(false);
        }
        setFormProduction({});
    };

    const deleteProduction = (id: number) => {
        setProductions(prev => prev.filter(p => p.id !== id));
    };

    const openEdit = (prod: Production) => {
        setEditingId(prod.id);
        setFormProduction(prod);
        setEditModal(true);
    };

    return (
        <div className="p-6 font-sans w-[80rem] bg-gray-100 h-screen">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold mb-4">Productions</h2>

                <div className="mb-4">
                    <button
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                        onClick={() => setOpenModal(true)}
                    >
                        + Add Production
                    </button>
                </div>
            </div>

            {/* Modal adicionar/editar */}
            {(openModal || editModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-xl font-bold mb-4">{editModal ? "Edit Production" : "New Production"}</h3>

                        <input
                            type="text"
                            placeholder="Name"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formProduction.name || ""}
                            onChange={e => setFormProduction(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formProduction.quantity || ""}
                            onChange={e => setFormProduction(prev => ({ ...prev, quantity: +e.target.value }))}
                        />
                        <input
                            type="date"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formProduction.dueDate || ""}
                            onChange={e => setFormProduction(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                        <select
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formProduction.status || ""}
                            onChange={e => setFormProduction(prev => ({ ...prev, status: e.target.value as Production["status"] }))}
                        >
                            <option value="">Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <textarea
                            placeholder="Notes"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formProduction.notes || ""}
                            onChange={e => setFormProduction(prev => ({ ...prev, notes: e.target.value }))}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-3 py-1 bg-gray-300 rounded"
                                onClick={() => {
                                    setOpenModal(false);
                                    setEditModal(false);
                                    setFormProduction({});
                                    setEditingId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button className="px-3 py-1 bg-black text-white rounded" onClick={saveProduction}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de produções */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full border-collapse mt-4">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Due Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Notes</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productions.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{p.name}</td>
                                <td className="p-3">{p.quantity}</td>
                                <td className="p-3">{p.dueDate}</td>
                                <td className="p-3">{p.status}</td>
                                <td className="p-3">{p.notes}</td>
                                <td className="p-3 text-center flex justify-center gap-2">
                                    <button
                                        className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                                        onClick={() => openEdit(p)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                                        onClick={() => deleteProduction(p.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
