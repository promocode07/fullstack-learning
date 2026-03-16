"use client"

import { useParams } from "next/navigation"
import { mockTickets } from "@/lib/mockData"
import Link from "next/link"

export default function ticketDetails() {
    const params = useParams();
    const ticketID = params.id;

    //finding the id that matches the one in the url
    const ticket = mockTickets.find((t) => t.id === ticketID);

    if(!ticket)
        return <div className="p-10 text-white">"ticket Not Found!"</div>

    return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <Link href="/" className="text-blue-400 hover:underline">← Back to Dashboard</Link>
      
      <div className="mt-8 border border-slate-800 bg-slate-900 p-8 rounded-xl">
        <span className="text-blue-400 font-mono">{ticket.id}</span>
        <h1 className="text-4xl font-bold mt-2">{ticket.title}</h1>
        <p className="text-slate-400 mt-4 text-lg">{ticket.description}</p>
        
        <div className="mt-6 flex gap-4">
          <div className="bg-slate-800 px-4 py-2 rounded">Status: {ticket.status}</div>
          <div className="bg-slate-800 px-4 py-2 rounded">Priority: {ticket.priority}</div>
        </div>
      </div>
    </main>
  );

}