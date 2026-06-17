"use client";

import { useState } from "react";
import { Plus, Search, AlertTriangle, ShieldAlert, Clock, CheckCircle2, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// Mock Data for Incidents
const mockIncidents = [
  { id: "INC-2023-001", title: "Unauthorized Access Attempt", severity: "Critical", status: "Open", location: "Sector 7G", reportedBy: "Sensor A", time: "10 mins ago" },
  { id: "INC-2023-002", title: "Perimeter Breach (Suspected animal)", severity: "Low", status: "Resolved", location: "North Fence", reportedBy: "Drone X", time: "2 hrs ago" },
  { id: "INC-2023-003", title: "Camera Offline Alert", severity: "Medium", status: "In Progress", location: "Main Gate", reportedBy: "System", time: "1 day ago" },
  { id: "INC-2023-004", title: "Suspicious Vehicle Loitering", severity: "High", status: "Open", location: "Parking Lot B", reportedBy: "Guard Post 2", time: "45 mins ago" },
];

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIncidents = mockIncidents.filter(inc => 
    inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inc.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-500/20 text-red-400 border border-red-500/30";
      case "High": return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "Low": return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "In Progress": return <Clock className="h-4 w-4 text-orange-400" />;
      case "Resolved": return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      default: return null;
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
            placeholder="Search incidents..." 
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
          <Button className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Kanban / Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="glass p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                {incident.severity}
              </span>
              <div className="flex items-center gap-1.5 text-sm font-medium bg-black-900 px-2.5 py-1 rounded-md border border-white/5">
                {getStatusIcon(incident.status)}
                <span className={incident.status === 'Resolved' ? 'text-green-400' : incident.status === 'Open' ? 'text-red-400' : 'text-orange-400'}>
                  {incident.status}
                </span>
              </div>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{incident.title}</h3>
              <p className="text-sm text-gold-500 font-mono mb-2">{incident.id}</p>
              <div className="text-sm text-gray-400 space-y-1 mt-4">
                <p><strong className="text-gray-300">Location:</strong> {incident.location}</p>
                <p><strong className="text-gray-300">Source:</strong> {incident.reportedBy}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {incident.time}
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">View Details</Button>
            </div>
          </div>
        ))}

        {filteredIncidents.length === 0 && (
          <div className="col-span-full p-12 text-center glass rounded-xl border-dashed border-white/10">
            <ShieldAlert className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Incidents Found</h3>
            <p className="text-gray-400">There are no incidents matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
