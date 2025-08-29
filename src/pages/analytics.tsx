import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 2100 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 1600 },
    { month: "May", sales: 900 },
    { month: "Jun", sales: 1700 },
];

const usersData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 700 },
    { month: "Mar", users: 300 },
    { month: "Apr", users: 500 },
    { month: "May", users: 200 },
    { month: "Jun", users: 600 },
];

export function Analytics() {
    return (
        <div>
            <h2 className="p-4 text-2xl font-bold">Analytics</h2>
            <div className="p-6 font-sans w-[80rem] bg-gray-100 h-screen">


                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-sm text-gray-500">Vendas</h3>
                        <p className="text-2xl font-bold">R$ 12.400</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-sm text-gray-500">Usuários</h3>
                        <p className="text-2xl font-bold">1.240</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-sm text-gray-500">Pedidos</h3>
                        <p className="text-2xl font-bold">356</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-sm text-gray-500">Taxa de Conversão</h3>
                        <p className="text-2xl font-bold">4.5%</p>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl shadow h-80">
                        <h3 className="font-bold mb-4">Vendas Mensais</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow h-80">
                        <h3 className="font-bold mb-4">Usuários Mensais</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={usersData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tabela detalhada */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="font-bold mb-4">Últimos Pedidos</h3>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Cliente</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3">#1234</td>
                                <td className="p-3">Maria</td>
                                <td className="p-3">✅ Pago</td>
                                <td className="p-3">R$ 240,00</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3">#1235</td>
                                <td className="p-3">João</td>
                                <td className="p-3">⏳ Pendente</td>
                                <td className="p-3">R$ 120,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
