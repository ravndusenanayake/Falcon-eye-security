"use client";

import { useState } from "react";
import { Plus, Search, Radio, Truck, Video, Activity, MoreVertical, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Mock Data for Devices
const mockDevices = [
  { id: "DEV-1001", name: "Alpha Camera 1", type: "Camera", status: "Online", location: "Sector 4, Main Gate", lastPing: "2 mins ago" },
  { id: "DEV-1002", name: "Alpha Camera 2", type: "Camera", status: "Offline", location: "Sector 4, Back Gate", lastPing: "2 hrs ago" },
  { id: "DEV-1003", name: "Patrol Vehicle 1", type: "Vehicle", status: "Active", location: "Route B", lastPing: "1 min ago" },
  { id: "DEV-1004", name: "Motion Sensor A", type: "Sensor", status: "Maintenance", location: "Server Room", lastPing: "1 day ago" },
  { id: "DEV-1005", name: "Patrol Drone X", type: "Drone", status: "Online", location: "Perimeter", lastPing: "Just now" },
];

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDevices = mockDevices.filter(dev => 
    dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

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
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{device.id}</td>
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
              ))}
              
              {filteredDevices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No devices found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
