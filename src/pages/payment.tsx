import { useState } from "react";

interface Payment {
  id: number;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string; // formato ISO ou string simples
  method: "credit_card" | "pix" | "boleto";
}

export function Payment() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, amount: 250.5, status: "paid", date: "2025-08-20", method: "pix" },
    { id: 2, amount: 100, status: "pending", date: "2025-08-22", method: "credit_card" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  // Função para abrir modal em modo "novo" ou "editar"
  const openModal = (payment?: Payment) => {
    setEditingPayment(payment ?? null);
    setIsModalOpen(true);
  };

  // Função para salvar (novo ou editar)
  const savePayment = (payment: Payment) => {
    if (editingPayment) {
      // Editando existente
      setPayments(prev =>
        prev.map(p => (p.id === editingPayment.id ? payment : p))
      );
    } else {
      // Novo pagamento
      setPayments(prev => [...prev, { ...payment, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingPayment(null);
  };

  const deletePayment = (id: number) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 w-[80rem] bg-gray-100 h-screen  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Payments</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New Payment
        </button>
      </div>

      {/* Tabela */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Method</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">R$ {p.amount.toFixed(2)}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    p.status === "paid"
                      ? "bg-green-200 text-green-800"
                      : p.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="p-2">{p.date}</td>
              <td className="p-2">{p.method}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => openModal(p)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePayment(p.id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              {editingPayment ? "Edit Payment" : "New Payment"}
            </h3>

            {/* Formulário */}
            <form
              onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newPayment: Payment = {
                  id: editingPayment?.id ?? 0,
                  amount: Number(formData.get("amount")),
                  status: formData.get("status") as "paid" | "pending" | "failed",
                  date: formData.get("date") as string,
                  method: formData.get("method") as
                    | "credit_card"
                    | "pix"
                    | "boleto",
                };
                savePayment(newPayment);
              }}
              className="space-y-3"
            >
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                defaultValue={editingPayment?.amount}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="status"
                defaultValue={editingPayment?.status ?? "pending"}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <input
                type="date"
                name="date"
                defaultValue={editingPayment?.date}
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="method"
                defaultValue={editingPayment?.method ?? "credit_card"}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="credit_card">Credit Card</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-black text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
