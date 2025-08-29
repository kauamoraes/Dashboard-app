import { useState } from "react";

interface Product {
    id: number;
    name: string;
    status: "Scoping" | "Quoting" | "Production";
    inventory: number;
    incoming: number;
    outOfStock: number;
    grade: string;
}

const productsData: Product[] = [
    { id: 1, name: "Hydrate replenish(body oil)", status: "Scoping", inventory: 45, incoming: 12, outOfStock: 11, grade: "A" },
    { id: 2, name: "Hydrate replenish", status: "Scoping", inventory: 45, incoming: 65, outOfStock: 11, grade: "A" },
    { id: 3, name: "Illumination (mask)", status: "Quoting", inventory: 45, incoming: 35, outOfStock: 11, grade: "B" },
];

const statusColors: Record<Product["status"], string> = {
    Scoping: "bg-blue-200 text-blue-800",
    Quoting: "bg-green-200 text-green-800",
    Production: "bg-yellow-200 text-yellow-800",
};

export function Products() {
    const [products, setProducts] = useState<Product[]>(productsData);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formProduct, setFormProduct] = useState<Partial<Product>>({});

    // Seleção de checkboxes
    const toggleSelect = (id: number) => {
        setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === products.length) setSelectedIds([]);
        else setSelectedIds(products.map(p => p.id));
    };

    // Add
    const handleAdd = () => {
        if (!formProduct.name || !formProduct.status) return;
        const newProduct: Product = {
            id: Date.now(),
            name: formProduct.name,
            status: formProduct.status as Product["status"],
            inventory: formProduct.inventory || 0,
            incoming: formProduct.incoming || 0,
            outOfStock: formProduct.outOfStock || 0,
            grade: formProduct.grade || "A",
        };
        setProducts(prev => [...prev, newProduct]);
        setOpenAddModal(false);
        setFormProduct({});
    };

    // Edit
    const handleEdit = () => {
        if (!selectedProduct || !formProduct.name || !formProduct.status) return;
        const updated: Product = {
            ...selectedProduct,
            name: formProduct.name,
            status: formProduct.status as Product["status"],
            inventory: formProduct.inventory || 0,
            incoming: formProduct.incoming || 0,
            outOfStock: formProduct.outOfStock || 0,
            grade: formProduct.grade || "A",
        };
        setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updated : p));
        setOpenEditModal(false);
        setSelectedProduct(null);
        setFormProduct({});
    };

    // Delete
    const handleDelete = () => {
        if (!selectedProduct) return;
        setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
        setOpenDeleteModal(false);
        setSelectedProduct(null);
    };

    return (
        <div className="p-6 font-sans w-[80rem] bg-gray-100 h-screen">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="flex justify-between mb-4">
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">Import</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">Export</button>
                        <button
                            className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                            onClick={() => { setOpenAddModal(true); setFormProduct({}); }}
                        >
                            + Add Product
                        </button>
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">My Products</h1>


                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === products.length}
                                    onChange={toggleSelectAll}
                                    className="mr-2"
                                />
                                Product
                            </th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Inventory</th>
                            <th className="p-3 text-left">Incoming</th>
                            <th className="p-3 text-left">Out of Stock</th>
                            <th className="p-3 text-center">Grade</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(p.id)}
                                        onChange={() => toggleSelect(p.id)}
                                        className="mr-2"
                                    />
                                    {p.name}
                                </td>
                                <td>
                                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md ${statusColors[p.status]}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className={`p-3 ${p.inventory === 0 ? "text-red-600 font-bold" : ""}`}>{p.inventory}</td>
                                <td className="p-3">{p.incoming}</td>
                                <td className="p-3">{p.outOfStock}</td>
                                <td className="p-3 text-center">{p.grade}</td>
                                <td className="p-3 text-center flex gap-2 justify-center">
                                    <button
                                        className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300 text-xs"
                                        onClick={() => { setSelectedProduct(p); setFormProduct(p); setOpenEditModal(true); }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-200 rounded hover:bg-red-300 text-xs"
                                        onClick={() => { setSelectedProduct(p); setOpenDeleteModal(true); }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Modal */}
                {openAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md w-96">
                            <h2 className="text-xl font-bold mb-4">Add Product</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.name || ""}
                                onChange={e => setFormProduct(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <select
                                className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.status || ""}
                                onChange={e => setFormProduct(prev => ({ ...prev, status: e.target.value as Product["status"] }))}
                            >
                                <option value="">Select status</option>
                                <option value="Scoping">Scoping</option>
                                <option value="Quoting">Quoting</option>
                                <option value="Production">Production</option>
                            </select>
                            <div className="flex gap-2 mb-2">
                                <input type="number" placeholder="Inventory" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.inventory || 0} onChange={e => setFormProduct(prev => ({ ...prev, inventory: +e.target.value }))} />
                                <input type="number" placeholder="Incoming" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.incoming || 0} onChange={e => setFormProduct(prev => ({ ...prev, incoming: +e.target.value }))} />
                                <input type="number" placeholder="Out of Stock" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.outOfStock || 0} onChange={e => setFormProduct(prev => ({ ...prev, outOfStock: +e.target.value }))} />
                            </div>
                            <input type="text" placeholder="Grade" className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.grade || ""} onChange={e => setFormProduct(prev => ({ ...prev, grade: e.target.value }))} />
                            <div className="flex justify-end gap-2">
                                <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setOpenAddModal(false)}>Cancel</button>
                                <button className="px-3 py-1 bg-black text-white rounded" onClick={handleAdd}>Add</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {openEditModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md w-96">
                            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.name || ""}
                                onChange={e => setFormProduct(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <select
                                className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.status || ""}
                                onChange={e => setFormProduct(prev => ({ ...prev, status: e.target.value as Product["status"] }))}
                            >
                                <option value="">Select status</option>
                                <option value="Scoping">Scoping</option>
                                <option value="Quoting">Quoting</option>
                                <option value="Production">Production</option>
                            </select>
                            <div className="flex gap-2 mb-2">
                                <input type="number" placeholder="Inventory" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.inventory || 0} onChange={e => setFormProduct(prev => ({ ...prev, inventory: +e.target.value }))} />
                                <input type="number" placeholder="Incoming" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.incoming || 0} onChange={e => setFormProduct(prev => ({ ...prev, incoming: +e.target.value }))} />
                                <input type="number" placeholder="Out of Stock" className="border px-2 py-1 w-1/3 rounded"
                                    value={formProduct.outOfStock || 0} onChange={e => setFormProduct(prev => ({ ...prev, outOfStock: +e.target.value }))} />
                            </div>
                            <input type="text" placeholder="Grade" className="border px-2 py-1 w-full mb-2 rounded"
                                value={formProduct.grade || ""} onChange={e => setFormProduct(prev => ({ ...prev, grade: e.target.value }))} />
                            <div className="flex justify-end gap-2">
                                <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setOpenEditModal(false)}>Cancel</button>
                                <button className="px-3 py-1 bg-black text-white rounded" onClick={handleEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {openDeleteModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md w-80 text-center">
                            <h2 className="text-lg font-bold mb-4">Delete Product?</h2>
                            <p className="mb-4">Are you sure you want to delete <b>{selectedProduct.name}</b>?</p>
                            <div className="flex justify-center gap-2">
                                <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={handleDelete}>Yes, Delete</button>
                                <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setOpenDeleteModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
