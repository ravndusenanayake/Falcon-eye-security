"use client";

import { Users, ShieldAlert, CalendarClock, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: 'Active Deployments', value: '12', icon: ShieldAlert, trend: '+2 this week' },
    { name: 'Pending Inquiries', value: '5', icon: CalendarClock, trend: '3 require action' },
    { name: 'Available Staff', value: '28', icon: Users, trend: 'Out of 50 total' },
    { name: 'Monthly Revenue', value: 'LKR 2.4M', icon: TrendingUp, trend: '+15% from last month' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-lg text-gold-500">
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Recent Inquiries</h3>
          <div className="space-y-4">
            {[
              { client: "Mr. Rajapaksa", service: "VIP Protection", time: "2 hours ago", status: "New" },
              { client: "TechCorp Event", service: "Event Security", time: "5 hours ago", status: "Quoted" },
              { client: "Diplomat Transfer", service: "VIP Escort", time: "1 day ago", status: "Confirmed" },
            ].map((inquiry, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black-900/50 border border-white/5">
                <div>
                  <p className="font-medium text-white">{inquiry.client}</p>
                  <p className="text-sm text-gray-400">{inquiry.service}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    inquiry.status === 'New' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/30' :
                    inquiry.status === 'Quoted' ? 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30' :
                    'bg-green-400/10 text-green-400 ring-green-400/30'
                  }`}>
                    {inquiry.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{inquiry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/5 p-6">
          <h3 className="text-lg font-bold text-white mb-6">Active Deployments Today</h3>
          <div className="space-y-4">
             {[
              { location: "BMICH Colombo", team: "Alpha Team (8 Guards)", shift: "08:00 - 20:00" },
              { location: "Private Estate, C7", team: "VIP Detail 2 (3 Guards)", shift: "24/7 Cover" },
              { location: "Shangri-La Hotel", team: "Event Detail (12 Guards)", shift: "18:00 - 02:00" },
            ].map((deployment, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black-900/50 border border-white/5">
                <div>
                  <p className="font-medium text-white">{deployment.location}</p>
                  <p className="text-sm text-gray-400">{deployment.team}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gold-500 font-medium">{deployment.shift}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
