// 1. We import our mock data and the Ticket type for safety
"use client";
import { useState } from "react";
import { mockTickets } from "@/lib/mockData";
import type { Ticket } from "@/types/ticket";
import { Ticket } from "lucide-react";

export default function Dashboard() {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteTicket = (id:string) => {
    const updatedTickets = tickets.filter((t) => t.id !== id);
    setTickets(updatedTickets);
  }

  //resolving tickets
  const resolveTicket = (id: string) => {
  const updatedTickets = tickets.map((t) => 
    t.id === id ? { ...t, status: "RESOLVED" as const } : t
  );
  setTickets(updatedTickets);
};

  return (
    // 'min-h-screen' makes the background cover the whole page
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Support Dashboard</h1>
        <p className="text-slate-400">Manage and track incoming technical tickets.</p>
      </div>
      <div>
        <input className="mb-6 w-full p-3 bg-slate-900 border border-slate-800 rounded-md focus:ring-2 focus:ring-blue-500" text-white
        placeholder="SEARCH BY TITLE OR ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
      </div>
      {/* The Ticket List Container */}
      <div className="grid gap-4">
        {/* 2. This is the "Magic": .map() loops through your array of tickets */}
        {tickets.filter((ticket) => ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).map((ticket: Ticket) => (
          <div 
            key={ticket.id} 
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3">
                {/* Displaying the ID and Title */}
                <span className="text-sm font-mono text-blue-400">{ticket.id}</span>
                <h2 className="text-lg font-semibold">{ticket.title}</h2>
              </div>
              <p className="mt-1 text-slate-400">{ticket.description}</p>
            </div>

            {/* Status & Priority Badges */}
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-400/30">
                {ticket.status}
              </span>
              <span>
                <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs" onClick={() => resolveTicket(ticket.id)}>Mark as Resolved</button>
              </span>
              <span className={`text-xs font-bold ${ticket.priority === 'URGENT' ? 'text-red-500' : 'text-yellow-500'}`}>
                {ticket.priority} PRIORITY
              </span>
              <span>
                <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded" onClick={() => deleteTicket(ticket.id)}>Delete</button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}