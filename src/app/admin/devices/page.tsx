"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Radio, Truck, Video, Activity, MoreVertical, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  location: string;
  lastPing: string;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "Camera",
    location: ""
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/devices");
      const data = await res.json();
      if (data.success) setDevices(data.devices);
    } catch (error) {
      console.error("Failed to fetch devices", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevices = devices.filter(dev => {
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) || dev.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || dev.status === statusFilter || (statusFilter === "Online" && dev.status === "Active");
    const matchesType = typeFilter === "All" || dev.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newDevice.name,
          type: newDevice.type,
          status: "Online",
          location: newDevice.location,
          lastPing: "Just now"
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewDevice({ name: "", type: "Camera", location: "" });
        fetchDevices();
      } else {
        alert("Failed to add asset");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding asset");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
      case "Active": return "bg-green-500/20 text-green-400";
      case "Offline": return "bg-red-500/20 text-red-400";
      case "Maintenance": return "bg-orange-500/20 text-orange-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Camera": return <Video className="h-4 w-4 text-gray-400" />;
      case "Vehicle": return <Truck className="h-4 w-4 text-gray-400" />;
      case "Sensor": return <Activity className="h-4 w-4 text-gray-400" />;
      default: return <Radio className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input 
            type="text" 
            placeholder="Search by ID or Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant={showFilters ? "primary" : "outline"} className="flex-1 sm:flex-none" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="flex-1 sm:flex-none" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="glass p-4 rounded-xl border border-white/5 flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black-900 border border-white/10 text-sm rounded-lg block w-full p-2.5 text-white focus:ring-gold-500 focus:border-gold-500 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Online">Online / Active</option>
              <option value="Offline">Offline</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Type</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-black-900 border border-white/10 text-sm rounded-lg block w-full p-2.5 text-white focus:ring-gold-500 focus:border-gold-500 outline-none"
            >
              <option value="All">All Types</option>
              <option value="Camera">Camera</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Sensor">Sensor</option>
              <option value="Drone">Drone</option>
            </select>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-black-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black-950/50 text-xs uppercase text-gray-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Device ID</th>
                <th className="px-6 py-4 font-medium">Name & Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Last Ping</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading assets...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No devices found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white font-mono text-xs">{device.id}</td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black-800 rounded-lg">
                        {getTypeIcon(device.type)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{device.name}</div>
                        <div className="text-xs text-gray-500">{device.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{device.location}</td>
                  <td className="px-6 py-4 text-gray-400">{device.lastPing}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => alert(`Actions menu for ${device.name} coming soon!`)}
                      className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-950/80 backdrop-blur-sm p-4">
          <div className="bg-black-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-gold-500" />
                Add New Asset
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddDevice} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Asset Name</label>
                <Input 
                  required
                  placeholder="e.g. Beta Camera 3"
                  value={newDevice.name}
                  onChange={e => setNewDevice({...newDevice, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Asset Type</label>
                <select 
                  value={newDevice.type}
                  onChange={e => setNewDevice({...newDevice, type: e.target.value})}
                  className="bg-black-950 border border-white/10 text-sm rounded-lg block w-full p-2.5 text-white focus:ring-gold-500 focus:border-gold-500 outline-none"
                >
                  <option value="Camera">Camera</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Sensor">Sensor</option>
                  <option value="Drone">Drone</option>
                  <option value="Radio">Radio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Location / Assignment</label>
                <Input 
                  required
                  placeholder="e.g. South Perimeter"
                  value={newDevice.location}
                  onChange={e => setNewDevice({...newDevice, location: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-6">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Add Asset</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
