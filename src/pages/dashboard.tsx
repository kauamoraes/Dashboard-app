import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dataVendas = [
    { name: 'Jan', vendas: 2.500 },
    { name: 'Fev', vendas: 2.000 },
    { name: 'Mar', vendas: 3.000 },
    { name: 'Abr', vendas: 2.400 },
    { name: 'Mai', vendas: 2.500 },
];

const usersData = [
    { name: 'Jan', usuarios: 120 },
    { name: 'Fev', usuarios: 140 },
    { name: 'Mar', usuarios: 180 },
    { name: 'Abr', usuarios: 160 },
    { name: 'Mai', usuarios: 200 },
];

export function Dashboard() {
    return (

        <div className="flex min-h-screen w-[80rem]">
            <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
                <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
                        />
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-black">
                            U
                        </div>
                    </div>
                </header>

                {/* Conteúdo */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {/* Cards responsivos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow w-full">
                            <h3 className="text-sm text-gray-500">Vendas</h3>
                            <p className="text-2xl font-bold">R$ 12.400</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow w-full">
                            <h3 className="text-sm text-gray-500">Usuários</h3>
                            <p className="text-2xl font-bold">1.240</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow w-full">
                            <h3 className="text-sm text-gray-500">Pedidos</h3>
                            <p className="text-2xl font-bold">356</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow w-full">
                            <h3 className="text-sm text-gray-500">Taxa de Conversão</h3>
                            <p className="text-2xl font-bold">4.5%</p>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white p-6 rounded-xl shadow h-80 w-full">
                            <h3 className="font-bold mb-4">Gráfico de Vendas</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataVendas}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="vendas" fill="#C6FF00" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow h-80 w-full">
                            <h3 className="font-bold mb-4">Gráfico de Usuários</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={usersData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="usuarios" fill="#00C6FF" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    {/* Tabela */}
                    <div className="bg-white p-6 rounded-xl shadow mt-6 w-full overflow-x-auto">
                        <h3 className="font-bold mb-4">Últimos pedidos</h3>
                        <table className="w-full text-left border-collapse min-w-max">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">Cliente</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 px-4">#1234</td>
                                    <td className="py-2 px-4">Maria</td>
                                    <td className="py-2 px-4">✅ Pago</td>
                                    <td className="py-2 px-4">R$ 240,00</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4">#1235</td>
                                    <td className="py-2 px-4">João</td>
                                    <td className="py-2 px-4">⏳ Pendente</td>
                                    <td className="py-2 px-4">R$ 120,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>

    )
}

