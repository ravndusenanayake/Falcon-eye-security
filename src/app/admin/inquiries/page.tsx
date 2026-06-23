"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, Phone, Mail, Clock, ShieldAlert, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Inquiry {
  id: string;
  client: string;
  service: string;
  date: string;
  status: string;
  threatLevel: string;
  phone: string;
  email: string;
  details: string;
}

export default function InquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/inquiries");
      if (!response.ok) throw new Error("Failed to fetch inquiries");
      const data = await response.json();
      if (data.success) {
        setInquiries(data.inquiries);
      } else {
        throw new Error(data.message || "Failed to load inquiries");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not load data. Please ensure Firebase variables are configured.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const term = searchTerm.toLowerCase();
    return (
      inquiry.client.toLowerCase().includes(term) ||
      inquiry.service.toLowerCase().includes(term) ||
      inquiry.id.toLowerCase().includes(term) ||
      inquiry.status.toLowerCase().includes(term)
    );
  });

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
          <Button variant="secondary" className="px-4" onClick={fetchInquiries} disabled={loading}>
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">Database Connection Error</h4>
            <p className="text-sm text-gray-300 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black-900/80 text-xs uppercase text-gray-400 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Client</th>
                <th scope="col" className="px-6 py-4">Phone</th>
                <th scope="col" className="px-6 py-4">Service</th>
                <th scope="col" className="px-6 py-4">Threat Level</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading secure database...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    {error ? "Setup environment variables to connect" : `No inquiries found matching "${searchTerm}"`}
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white max-w-[100px] truncate" title={inquiry.id}>
                      {inquiry.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">{inquiry.client}</td>
                    <td className="px-6 py-4">{inquiry.phone}</td>
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
                        <button 
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-1.5 text-gray-400 hover:text-white rounded bg-white/5 hover:bg-white/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass w-full max-w-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-gold-500" />
                <h3 className="font-bold text-white text-lg">Inquiry Assessment</h3>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Client Name</span>
                  <p className="text-white font-medium">{selectedInquiry.client}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Service Requested</span>
                  <p className="text-gold-500 font-medium">{selectedInquiry.service}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Contact Info</span>
                  <div className="space-y-1">
                    <a href={`tel:${selectedInquiry.phone}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-500 transition-colors">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {selectedInquiry.phone}
                    </a>
                    <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-gold-500 transition-colors">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Metadata</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Submitted: {selectedInquiry.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        selectedInquiry.threatLevel === 'High' ? 'bg-red-400/10 text-red-400 ring-red-400/30' :
                        selectedInquiry.threatLevel === 'Medium' ? 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30' :
                        'bg-green-400/10 text-green-400 ring-green-400/30'
                      }`}>
                        Threat: {selectedInquiry.threatLevel}
                      </span>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        selectedInquiry.status === 'New' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/30' :
                        selectedInquiry.status === 'Quoted' ? 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30' :
                        selectedInquiry.status === 'Confirmed' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                        'bg-gray-400/10 text-gray-400 ring-gray-400/30'
                      }`}>
                        Status: {selectedInquiry.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Operational Requirements & Notes</span>
                <div className="bg-black-950/50 border border-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.details}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30">
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                {selectedInquiry.status === 'New' && (
                  <Button variant="secondary" onClick={() => updateStatus(selectedInquiry.id, 'Read')} className="w-full sm:w-auto">
                    Mark as Read
                  </Button>
                )}
                {selectedInquiry.status === 'Read' && (
                  <Button variant="secondary" onClick={() => updateStatus(selectedInquiry.id, 'Quoted')} className="w-full sm:w-auto">
                    Mark as Quoted
                  </Button>
                )}
                {selectedInquiry.status === 'Quoted' && (
                  <Button variant="secondary" onClick={() => updateStatus(selectedInquiry.id, 'Confirmed')} className="w-full sm:w-auto">
                    Mark as Confirmed
                  </Button>
                )}
              </div>
              <Button variant="secondary" onClick={() => setSelectedInquiry(null)} className="w-full sm:w-auto">
                Close
              </Button>
              <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full">
                  Contact via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

