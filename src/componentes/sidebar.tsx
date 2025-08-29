import { 
    Banknote, 
    Boxes, 
    ChartColumnIncreasing, 
    ChevronLeft, 
    Folder, 
    LayoutDashboard, 
    MessageCircle, 
    Newspaper, 
    ShoppingBag, 
    UserPen 
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function SideBar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false); 

    const linkclasses = (path: string) => `
        flex items-center gap-2 px-4 py-2 rounded-lg text-xl transition
        ${location.pathname === path 
            ? "bg-[#C6FF00] text-black font-bold" 
            : "text-white hover:bg-slate-900"}
        ${collapsed ? "justify-center px-2" : ""}
    `;

    return (
        <div 
            className={`h-screen border-r border-gray-200 bg-black transition-all duration-300
            ${collapsed ? "w-20" : "w-60"}`}
        >
            <div className="border-b w-full p-4 flex items-center justify-between">
                {!collapsed && (
                    <h1 
                        className="text-2xl font-bold" 
                        style={{ color: "#C6FF00" }}
                    >
                        Made.
                    </h1>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white rounded-lg w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: "#283908" }}
                >
                    <ChevronLeft 
                        size={18} 
                        className={`transition-transform duration-300 ${collapsed ? "-rotate-180" : ""}`} 
                    />
                </button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <Link to="/" className={linkclasses("/")}>
                    <LayoutDashboard size={20} />
                    {!collapsed && "Dashboard"}
                </Link>

                <Link to="/products" className={linkclasses("/products")}>
                    <Boxes size={20} />
                    {!collapsed && "Products"}
                </Link>

                <Link to="/new-rfq" className={linkclasses("/new-rfq")}>
                    <Newspaper size={20} />
                    {!collapsed && "New RFQ"}
                </Link>

                <Link to="/productions" className={linkclasses("/productions")}>
                    <Folder size={20} />
                    {!collapsed && "Productions"}
                </Link>

                <Link to="/analytics" className={linkclasses("/analytics")}>
                    <ChartColumnIncreasing size={20} />
                    {!collapsed && "Analytics"}
                </Link>

                <Link to="/message" className={linkclasses("/message")}>
                    <MessageCircle size={20} />
                    {!collapsed && "Message"}
                </Link>

                <Link to="/payment" className={linkclasses("/payment")}>
                    <Banknote size={20} />
                    {!collapsed && "Payment"}
                </Link>

                <Link to="/pos" className={linkclasses("/pos")}>
                    <ShoppingBag size={20} />
                    {!collapsed && "POS"}
                </Link>

                <Link to="/profile" className={linkclasses("/profile")}>
                    <UserPen size={20} />
                    {!collapsed && "Profile"}
                </Link>
            </div>
        </div>
    );
}
