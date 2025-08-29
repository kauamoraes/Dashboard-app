import { useState } from "react";

interface User {
    id: number;
    name: string;
}

interface Message {
    id: number;
    senderId: number;
    text: string;
    timestamp: Date;
}


export function Message() {

    const [users] = useState<User[]>([
        { id: 1, name: "Maria" },
        { id: 2, name: "João" },
        { id: 3, name: "Lucas" },
    ]);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState("");

    const currentUser = { id: 0, name: "You" };

    const filteredMessages = selectedUser
        ? messages.filter(
            m => m.senderId === selectedUser.id || m.senderId === currentUser.id
        )
        : [];

    const sendMessage = () => {
        if (!messageText || !selectedUser) return;

        const newMessage: Message = {
            id: Date.now(),
            senderId: currentUser.id,
            text: messageText,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMessage]);
        setMessageText("");
    };


    return (
        <div className="flex h-screen w-[80rem]">
            {/* Painel de contatos */}
            <div className="w-80 border-r border-gray-200 bg-white p-4">
                <h2 className="font-bold text-xl mb-4">Contacts</h2>
                <ul>
                    {users.map(u => (
                        <li
                            key={u.id}
                            className="cursor-pointer p-2 rounded hover:bg-gray-100"
                            onClick={() => setSelectedUser(u)}
                        >
                            {u.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Painel de conversa */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {/* Cabeçalho */}
                <div className="p-4 border-b">
                    <h2 className="font-bold text-xl">{selectedUser ? `Chat with ${selectedUser.name}` : "Select a contact"}</h2>
                </div>

                {/* Mensagens */}
                <div className="flex-1 p-4 overflow-y-auto ">
                    {selectedUser && filteredMessages.map(msg => (
                        <div key={msg.id} className={`p-2 rounded max-w-xs ${msg.senderId === currentUser.id ? "bg-black text-white self-end mt-4" : "bg-white self-start"}`}>
                            {msg.text}
                            <div className="text-xs text-gray-400">{msg.timestamp.toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border rounded px-3 py-2"
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                    />
                    <button className="bg-black text-white px-4 py-2 rounded" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}