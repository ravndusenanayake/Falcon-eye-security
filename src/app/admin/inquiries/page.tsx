"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, Eye, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockInquiries = [
  { id: "INQ-001", client: "Mr. Rajapaksa", service: "VIP Protection", date: "2026-06-16", status: "New", threatLevel: "High" },
  { id: "INQ-002", client: "TechCorp Event", service: "Event Security", date: "2026-06-16", status: "Quoted", threatLevel: "Low" },
  { id: "INQ-003", client: "Diplomat Transfer", service: "VIP Escort", date: "2026-06-15", status: "Confirmed", threatLevel: "Medium" },
  { id: "INQ-004", client: "Private Estate", service: "Venue Protection", date: "2026-06-14", status: "Completed", threatLevel: "Low" },
];

export default function InquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search inquiries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="px-4">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black-900/80 text-xs uppercase text-gray-400 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Client</th>
                <th scope="col" className="px-6 py-4">Service</th>
                <th scope="col" className="px-6 py-4">Threat Level</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{inquiry.id}</td>
                  <td className="px-6 py-4">{inquiry.client}</td>
                  <td className="px-6 py-4">{inquiry.service}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      inquiry.threatLevel === 'High' ? 'bg-red-400/10 text-red-400 ring-red-400/30' :
                      inquiry.threatLevel === 'Medium' ? 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30' :
                      'bg-green-400/10 text-green-400 ring-green-400/30'
                    }`}>
                      {inquiry.threatLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">{inquiry.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      inquiry.status === 'New' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/30' :
                      inquiry.status === 'Quoted' ? 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30' :
                      inquiry.status === 'Confirmed' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                      'bg-gray-400/10 text-gray-400 ring-gray-400/30'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-white rounded bg-white/5 hover:bg-white/10 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white rounded bg-white/5 hover:bg-white/10 transition-colors">
                        <FileEdit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
