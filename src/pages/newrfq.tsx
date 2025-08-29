import { useState } from "react";

interface RFQ {
    id: number;
    client: string;
    product: string;
    quantity: number;
    estimatedPrice: number;
    status: "Pending" | "Approved" | "Rejected";
    notes: string;
}

export function Newrfq() {
    const [rfqs, setRfqs] = useState<RFQ[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formRFQ, setFormRFQ] = useState<Partial<RFQ>>({});
    const [editingId, setEditingId] = useState<number | null>(null);

    // Salvar novo RFQ
    const saveRFQ = () => {
        if (!formRFQ.client || !formRFQ.product) return;

        if (editingId !== null) {
            // Editando
            setRfqs(prev =>
                prev.map(r => (r.id === editingId ? { ...r, ...formRFQ, id: editingId } as RFQ : r))
            );
            setEditingId(null);
            setEditModal(false);
        } else {
            // Novo
            setRfqs(prev => [...prev, { ...formRFQ, id: Date.now() } as RFQ]);
            setOpenModal(false);
        }

        setFormRFQ({});
    };

    const deleteRFQ = (id: number) => {
        setRfqs(prev => prev.filter(r => r.id !== id));
    };

    const openEdit = (rfq: RFQ) => {
        setEditingId(rfq.id);
        setFormRFQ(rfq);
        setEditModal(true);
    };

    return (
        <div className="p-6 font-sans w-[80rem] bg-gray-100 h-screen">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold mb-4">RFQs</h2>

                <div className="mb-4">
                    <button
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                        onClick={() => setOpenModal(true)}
                    >
                        + New RFQ
                    </button>
                </div>
            </div>

            {/* Modal Adicionar */}
            {(openModal || editModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-xl font-bold mb-4">{editModal ? "Edit RFQ" : "New RFQ"}</h3>

                        <input
                            type="text"
                            placeholder="Client"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.client || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, client: e.target.value }))}
                        />
                        <input
                            type="text"
                            placeholder="Product"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.product || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, product: e.target.value }))}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.quantity || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, quantity: +e.target.value }))}
                        />
                        <input
                            type="number"
                            placeholder="Estimated Price"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.estimatedPrice || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, estimatedPrice: +e.target.value }))}
                        />
                        <select
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.status || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, status: e.target.value as RFQ["status"] }))}
                        >
                            <option value="">Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <textarea
                            placeholder="Notes"
                            className="border px-2 py-1 w-full mb-2 rounded"
                            value={formRFQ.notes || ""}
                            onChange={e => setFormRFQ(prev => ({ ...prev, notes: e.target.value }))}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-3 py-1 bg-gray-300 rounded"
                                onClick={() => {
                                    setOpenModal(false);
                                    setEditModal(false);
                                    setFormRFQ({});
                                    setEditingId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 bg-black text-white rounded"
                                onClick={saveRFQ}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista RFQs */}
            <div className="bg-white p-4 mb-8 rounded-lg shadow">
                <table className="w-full border-collapse mt-4">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Client</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rfqs.map(r => (
                            <tr key={r.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{r.client}</td>
                                <td className="p-3">{r.product}</td>
                                <td className="p-3">{r.quantity}</td>
                                <td className="p-3">{r.estimatedPrice}</td>
                                <td className="p-3">{r.status}</td>
                                <td className="p-3 text-center flex justify-center gap-2">
                                    <button
                                        className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                                        onClick={() => openEdit(r)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                                        onClick={() => deleteRFQ(r.id)}
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
