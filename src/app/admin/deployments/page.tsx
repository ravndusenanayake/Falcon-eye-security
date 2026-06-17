"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar, Shield, MapPin, Users, Check, X, AlertCircle } from "lucide-react";
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

  const handleGuardToggle = (name: string) => {
    setSelectedGuards(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleSeedDeployments = async () => {
    const demoDeployments = [
      { clientName: "Mr. Rajapaksa", serviceType: "VIP Close Protection", location: "Private Estate, Colombo 7", startDate: "2026-06-18", endDate: "2026-06-25", guardsAssigned: ["Suresh Silva", "Ajith Kumara"], status: "Active" },
      { clientName: "TechCorp Gala Event", serviceType: "Corporate Security", location: "Shangri-La, Colombo", startDate: "2026-06-20", endDate: "2026-06-21", guardsAssigned: ["Kamal Perera", "Ranil Wickramasinghe"], status: "Scheduled" }
    ];

    try {
      setLoading(true);
      for (const dep of demoDeployments) {
        await fetch("/api/deployments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dep)
        });
      }
      fetchData();
    } catch (err) {
      console.error("Error seeding deployments:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">Manage active operational assignments and close protection squad schedules.</p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleSeedDeployments}>
            Seed Demo Deployments
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Deployment
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
        ) : deployments.length === 0 ? (
          <div className="col-span-full py-12 text-center glass rounded-xl border border-white/5 text-gray-500">
            No active operational schedules found. Click 'Seed Demo Deployments' to view.
          </div>
        ) : (
          deployments.map((dep) => (
            <div key={dep.id} className="glass border border-white/5 rounded-xl p-6 flex flex-col justify-between hover:border-gold-500/30 transition-all hover:scale-[1.01] duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-lg">{dep.clientName}</h4>
                    <p className="text-xs text-gold-500 font-semibold">{dep.serviceType}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                    dep.status === 'Active' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                    'bg-blue-400/10 text-blue-400 ring-blue-400/30'
                  }`}>
                    {dep.status}
                  </span>
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
                      dep.guardsAssigned.map((guard) => (
                        <span key={guard} className="inline-flex items-center rounded bg-white/5 text-gray-300 px-2 py-0.5 text-xs border border-white/10">
                          {guard}
                        </span>
                      ))
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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
                      const isChecked = selectedGuards.includes(guard.name);
                      return (
                        <button
                          key={guard.id}
                          type="button"
                          onClick={() => handleGuardToggle(guard.name)}
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
    </div>
  );
}
