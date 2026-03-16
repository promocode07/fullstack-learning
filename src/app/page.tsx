// 1. We import our mock data and the Ticket type for safety
"use client";
import { useState } from "react";
import { mockTickets } from "@/lib/mockData";
import type { Ticket } from "@/types/ticket";
import Link from "next/link";

export default function Dashboard() {

  const addTickets = () => {
    if(!newTitle.trim())
      return;

    const newTicket: Ticket = {
      id: `TIC-00${tickets.length + 1}`, // Generate simple ID
    title: newTitle,
    description: newDescription,
    status: "OPEN",
    priority: "MEDIUM", // Default priority
    }

    setTickets([newTicket, ...tickets]);

    // Reset and Close
  setNewTitle("");
  setNewDescription("");
  setIsModalOpen(false);

  }

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
const [newDescription, setNewDescription] = useState("");

  //searchbar
  const [tickets, setTickets] = useState(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");

  //delete function
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
        <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded mb-6" onClick={() => setIsModalOpen(true)}>Create-New</button>
      </div>
      <div>
        <input className="mb-6 w-full p-3 bg-slate-900 border border-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 text-white"
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
                <Link href={`/ticket/${ticket.id}`}>
          <h2 className="text-lg font-semibold hover:text-blue-400 cursor-pointer">
            {ticket.title}
          </h2>
        </Link>
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
      
     {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4">Create New Ticket</h2>
      
      <div className="flex flex-col gap-4">
        <input 
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ticket Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        
        <textarea 
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the issue..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button 
          onClick={() => setIsModalOpen(false)}
          className="flex-1 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          onClick={() => {
            console.log("Submitting:", newTitle);
            // We will write the add function next!
            setIsModalOpen(false);
            addTickets();
          }}
        >
          Submit Ticket
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}