"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Calendar, Shield, MapPin, Users, Check, X, AlertCircle, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Guard {
  id: string;
  name: string;
  role: string;
}

interface Deployment {
  id: string;
  clientName: string;
  serviceType: string;
  location: string;
  startDate: string;
  endDate: string;
  guardsAssigned: string[]; // names of guards
  status: string;
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("Personal Protection");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGuards, setSelectedGuards] = useState<string[]>([]);

  // Action Menu & Edit States
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [editingDeployment, setEditingDeployment] = useState<Deployment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActionMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch deployments
      const depResponse = await fetch("/api/deployments");
      const depData = await depResponse.json();
      
      // Fetch guards
      const guardResponse = await fetch("/api/staff");
      const guardData = await guardResponse.json();

      if (depData.success && guardData.success) {
        setDeployments(depData.deployments);
        setGuards(guardData.staff.map((s: any) => ({ id: s.id, name: s.name, role: s.role })));
      } else {
        throw new Error("Failed to fetch deployments or staff data");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardToggle = (id: string) => {
    setSelectedGuards(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start Date cannot be later than End Date");
      return;
    }

    try {
      const response = await fetch("/api/deployments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          serviceType,
          location,
          startDate,
          endDate,
          guardsAssigned: selectedGuards,
          status: "Scheduled"
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        // Clear form
        setClientName("");
        setServiceType("Personal Protection");
        setLocation("");
        setStartDate("");
        setEndDate("");
        setSelectedGuards([]);
        // Refresh
        fetchData();
      } else {
        alert("Failed to save deployment.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving deployment.");
    }
  };

  const handleUpdateDeployment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeployment) return;

    if (new Date(editingDeployment.startDate) > new Date(editingDeployment.endDate)) {
      alert("Start Date cannot be later than End Date");
      return;
    }

    try {
      const response = await fetch(`/api/deployments/${editingDeployment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDeployment)
      });

      if (response.ok) {
        setEditingDeployment(null);
        fetchData();
      } else {
        alert("Failed to update deployment.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating deployment.");
    }
  };

  const handleDeleteDeployment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this deployment?")) return;

    try {
      const response = await fetch(`/api/deployments/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setActionMenuOpen(null);
        fetchData();
      } else {
        alert("Failed to delete deployment.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting deployment.");
    }
  };

  const filteredDeployments = deployments.filter(dep => 
    filterStatus === "All" || dep.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-gray-400">Manage active operational assignments and close protection squad schedules.</p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-black-900 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-gold-500 focus:outline-none flex-grow sm:flex-grow-0"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-400">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-6 w-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading deployment charts...</span>
            </div>
          </div>
        ) : filteredDeployments.length === 0 ? (
          <div className="col-span-full py-12 text-center glass rounded-xl border border-white/5 text-gray-500">
            No deployments found matching the current filter.
          </div>
        ) : (
          filteredDeployments.map((dep) => (
            <div key={dep.id} className="glass border border-white/5 rounded-xl p-6 flex flex-col justify-between hover:border-gold-500/30 transition-all hover:scale-[1.01] duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="pr-2">
                    <h4 className="font-bold text-white text-lg">{dep.clientName}</h4>
                    <p className="text-xs text-gold-500 font-semibold">{dep.serviceType}</p>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                      dep.status === 'Active' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                      dep.status === 'Completed' ? 'bg-gray-400/10 text-gray-400 ring-gray-400/30' :
                      'bg-blue-400/10 text-blue-400 ring-blue-400/30'
                    }`}>
                      {dep.status}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenuOpen(actionMenuOpen === dep.id ? null : dep.id);
                      }}
                      className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {actionMenuOpen === dep.id && (
                      <div ref={menuRef} className="absolute right-0 top-8 w-40 bg-black-800 border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden animate-in fade-in zoom-in-95">
                        <button
                          onClick={() => {
                            setEditingDeployment(dep);
                            setActionMenuOpen(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                          Edit Schedule
                        </button>
                        <button
                          onClick={() => handleDeleteDeployment(dep.id)}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-white/5"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Option
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date & Location */}
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                    <span>{dep.startDate} to {dep.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="truncate">{dep.location}</span>
                  </div>
                </div>

                {/* Guards Assigned */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-xs uppercase text-gray-400 font-semibold tracking-wider">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Assigned Squad ({dep.guardsAssigned.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dep.guardsAssigned.length === 0 ? (
                      <span className="text-xs text-red-400">No guards assigned</span>
                    ) : (
                      dep.guardsAssigned.map((guardId) => {
                        const guardDetails = guards.find(g => g.id === guardId);
                        const displayName = guardDetails ? guardDetails.name : guardId;
                        return (
                          <span key={guardId} className="inline-flex items-center rounded bg-white/5 text-gray-300 px-2 py-0.5 text-xs border border-white/10">
                            {displayName}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Deployment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="glass w-full max-w-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50">
              <h3 className="font-bold text-white text-lg">Schedule New Deployment</h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="block text-xs text-gray-400 uppercase">Client / Event Name</label>
                <input 
                  required 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  placeholder="e.g. Mr. Rajapaksa Estate" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Service Type</label>
                  <select 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Personal Protection">Personal Protection</option>
                    <option value="Corporate Security">Corporate Security</option>
                    <option value="Diplomatic Escort">Diplomatic Escort</option>
                    <option value="Special Venue Protection">Special Venue Protection</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Location</label>
                  <input 
                    required 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                    placeholder="e.g. Colombo 7" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Start Date</label>
                  <input 
                    required 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">End Date</label>
                  <input 
                    required 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-gray-400 uppercase">Assign Officers</label>
                {guards.length === 0 ? (
                  <p className="text-xs text-gray-500">No guards available. Please add guards in the Staff tab first.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {guards.map((guard) => {
                      const isChecked = selectedGuards.includes(guard.id);
                      return (
                        <button
                          key={guard.id}
                          type="button"
                          onClick={() => handleGuardToggle(guard.id)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm text-left transition-all ${
                            isChecked 
                              ? "bg-gold-500/10 border-gold-500/50 text-white" 
                              : "bg-black-950/40 border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <div>
                            <p className="font-medium">{guard.name}</p>
                            <p className="text-xs text-gray-500">{guard.role}</p>
                          </div>
                          {isChecked && <Check className="h-4 w-4 text-gold-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={guards.length === 0}>
                Schedule Deployment
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Deployment Modal */}
      {editingDeployment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleUpdateDeployment} className="glass w-full max-w-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-gold-500" />
                Edit Deployment
              </h3>
              <button 
                type="button"
                onClick={() => setEditingDeployment(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="block text-xs text-gray-400 uppercase">Client / Event Name</label>
                <input 
                  required 
                  type="text" 
                  value={editingDeployment.clientName}
                  onChange={(e) => setEditingDeployment({...editingDeployment, clientName: e.target.value})}
                  className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Service Type</label>
                  <select 
                    value={editingDeployment.serviceType}
                    onChange={(e) => setEditingDeployment({...editingDeployment, serviceType: e.target.value})}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Personal Protection">Personal Protection</option>
                    <option value="Corporate Security">Corporate Security</option>
                    <option value="Diplomatic Escort">Diplomatic Escort</option>
                    <option value="Special Venue Protection">Special Venue Protection</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Status</label>
                  <select 
                    value={editingDeployment.status}
                    onChange={(e) => setEditingDeployment({...editingDeployment, status: e.target.value})}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-gray-400 uppercase">Location</label>
                <input 
                  required 
                  type="text" 
                  value={editingDeployment.location}
                  onChange={(e) => setEditingDeployment({...editingDeployment, location: e.target.value})}
                  className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Start Date</label>
                  <input 
                    required 
                    type="date" 
                    value={editingDeployment.startDate}
                    onChange={(e) => setEditingDeployment({...editingDeployment, startDate: e.target.value})}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">End Date</label>
                  <input 
                    required 
                    type="date" 
                    value={editingDeployment.endDate}
                    onChange={(e) => setEditingDeployment({...editingDeployment, endDate: e.target.value})}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-gray-400 uppercase">Assign Officers</label>
                {guards.length === 0 ? (
                  <p className="text-xs text-gray-500">No guards available.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {guards.map((guard) => {
                      const isChecked = editingDeployment.guardsAssigned.includes(guard.id);
                      return (
                        <button
                          key={guard.id}
                          type="button"
                          onClick={() => {
                            const newGuards = isChecked
                              ? editingDeployment.guardsAssigned.filter(id => id !== guard.id)
                              : [...editingDeployment.guardsAssigned, guard.id];
                            setEditingDeployment({...editingDeployment, guardsAssigned: newGuards});
                          }}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm text-left transition-all ${
                            isChecked 
                              ? "bg-gold-500/10 border-gold-500/50 text-white" 
                              : "bg-black-950/40 border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <div>
                            <p className="font-medium">{guard.name}</p>
                            <p className="text-xs text-gray-500">{guard.role}</p>
                          </div>
                          {isChecked && <Check className="h-4 w-4 text-gold-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30">
              <Button type="button" variant="secondary" onClick={() => setEditingDeployment(null)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
