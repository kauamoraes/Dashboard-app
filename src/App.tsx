import { Route, Routes } from "react-router-dom";
import { SideBar } from "./componentes/sidebar";
import { Dashboard } from "./pages/dashboard";
import { Products } from "./pages/products";
import { Newrfq } from "./pages/newrfq";
import { Productions } from "./pages/productions";
import { Analytics } from "./pages/analytics";
import { Message } from "./pages/message";
import { Payment } from "./pages/payment";
import { Pos } from "./pages/pos";
import { Profile } from "./pages/profile";

export function App() {

  return (
    <div className="flex">
      <SideBar />

      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-rfq" element={<Newrfq />} />
          <Route path="/productions" element={<Productions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/message" element={<Message />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

    </div>
  )
}
