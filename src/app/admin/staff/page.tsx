"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Filter, Shield, Award, Phone, Check, X, AlertCircle, Upload, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  contact: string;
  status: string;
  certifications: string[];
  imageUrl?: string;
}

const defaultCertifications = [
  "Weapons License",
  "VIP Close Protection",
  "Defensive Driving",
  "First Aid Certified",
  "Tactical Response"
];

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("Security Officer");
  const [experience, setExperience] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/staff");
      if (!response.ok) throw new Error("Failed to fetch staff");
      const data = await response.json();
      if (data.success) {
        setStaff(data.staff);
      } else {
        throw new Error(data.message || "Failed to load staff");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not load staff.");
    } finally {
      setLoading(false);
    }
  };

  const handleCertToggle = (cert: string) => {
    setSelectedCerts(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        setUploadingImage(true);
        
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "falcon eye");
        
        const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/de81b81yk/image/upload", {
          method: "POST",
          body: formData,
        });

        if (!cloudinaryRes.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const cloudinaryData = await cloudinaryRes.json();
        finalImageUrl = cloudinaryData.secure_url;
      }

      const url = editingId ? `/api/staff/${editingId}` : "/api/staff";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          experience,
          contact,
          status,
          imageUrl: finalImageUrl,
          certifications: selectedCerts
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        // Clear form
        setName("");
        setRole("Security Officer");
        setExperience("");
        setContact("");
        setStatus("Active");
        setImageUrl("");
        setImageFile(null);
        setSelectedCerts([]);
        setEditingId(null);
        // Re-fetch
        fetchStaff();
      } else {
        alert("Failed to save staff member.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving staff member.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (member: StaffMember) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setExperience(member.experience);
    setContact(member.contact);
    setStatus(member.status);
    setImageUrl(member.imageUrl || "");
    setSelectedCerts(member.certifications);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    
    try {
      const response = await fetch(`/api/staff/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchStaff();
      } else {
        alert("Failed to delete staff member.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting staff member.");
    }
  };

  // Seed data function to quickly populate database for review
  const handleSeedData = async () => {
    const mockStaff = [
      { name: "Suresh Silva", role: "VIP Bodyguard", experience: "8 years (Ex-Special Forces)", contact: "+94 77 123 4567", status: "Active", certifications: ["VIP Close Protection", "Weapons License", "First Aid Certified"], imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1776&auto=format&fit=crop" },
      { name: "Ajith Kumara", role: "Tactical Officer", experience: "6 years (Ex-STF)", contact: "+94 77 987 6543", status: "Active", certifications: ["Weapons License", "Tactical Response"], imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
      { name: "Kamal Perera", role: "Security Officer", experience: "4 years", contact: "+94 76 555 4444", status: "Active", certifications: ["First Aid Certified"], imageUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop" },
      { name: "Ranil Wickramasinghe", role: "Escort Driver", experience: "10 years (Defensive Driving Specialist)", contact: "+94 71 888 9999", status: "Active", certifications: ["Defensive Driving", "First Aid Certified"], imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop" },
    ];

    try {
      setLoading(true);
      for (const member of mockStaff) {
        await fetch("/api/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(member)
        });
      }
      fetchStaff();
    } catch (err) {
      console.error("Error seeding staff data:", err);
    }
  };

  const filteredStaff = staff.filter(member => {
    const term = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(term) ||
      member.role.toLowerCase().includes(term) ||
      member.certifications.some(c => c.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search staff, roles, or certifications..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" onClick={handleSeedData} className="flex-1 sm:flex-none">
            Seed Demo Squad
          </Button>
          <Button onClick={() => {
            setEditingId(null);
            setName("");
            setRole("Security Officer");
            setExperience("");
            setContact("");
            setStatus("Active");
            setImageUrl("");
            setImageFile(null);
            setSelectedCerts([]);
            setIsModalOpen(true);
          }} className="flex-1 sm:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Add Guard
          </Button>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black-900/80 text-xs uppercase text-gray-400 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-4">Squad Member</th>
                <th scope="col" className="px-6 py-4">Role & Experience</th>
                <th scope="col" className="px-6 py-4">Certifications</th>
                <th scope="col" className="px-6 py-4">Contact</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading squad roster...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No active staff in the database. Click 'Seed Demo Squad' to populate initial profiles.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-gold-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{member.name}</p>
                          <p className="text-xs text-gray-500">ID: {member.id.substring(0, 6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{member.role}</p>
                      <p className="text-xs text-gray-400">{member.experience}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {member.certifications.length === 0 ? (
                          <span className="text-xs text-gray-500">None</span>
                        ) : (
                          member.certifications.map((cert) => (
                            <span 
                              key={cert} 
                              className="inline-flex items-center gap-1 rounded bg-gold-500/10 text-gold-500 px-2 py-0.5 text-xs border border-gold-500/20"
                            >
                              <Award className="h-3 w-3" />
                              {cert}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`https://wa.me/${member.contact.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-gold-500 transition-colors"
                      >
                        <Phone className="h-4 w-4 text-gray-500" />
                        {member.contact || "N/A"}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                        member.status === 'Active' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                        member.status === 'On Deployment' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/30' :
                        'bg-gray-400/10 text-gray-400 ring-gray-400/30'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="p-1.5 text-gray-400 hover:text-gold-500 transition-colors rounded hover:bg-gold-500/10"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Add Guard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="glass w-full max-w-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50">
              <h3 className="font-bold text-white text-lg">{editingId ? "Edit Roster Guard" : "Add Roster Guard"}</h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Guard Name</label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                    placeholder="e.g. Ruwan Gunasekara" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Image Upload</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <div className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2 text-white flex items-center justify-between hover:border-gold-500/50 transition-colors">
                      <span className="text-sm truncate">
                        {imageFile ? imageFile.name : "Choose an image file..."}
                      </span>
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Role</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Security Officer">Security Officer</option>
                    <option value="VIP Bodyguard">VIP Bodyguard</option>
                    <option value="Tactical Officer">Tactical Officer</option>
                    <option value="Escort Driver">Escort Driver</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Active">Active / On Standby</option>
                    <option value="On Deployment">On Deployment</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Experience</label>
                  <input 
                    required 
                    type="text" 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                    placeholder="e.g. 5 years (Ex-Navy)" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">WhatsApp Contact</label>
                  <input 
                    required 
                    type="tel" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                    placeholder="e.g. +94 77 XXX XXXX" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-gray-400 uppercase">Certifications & Clearances</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {defaultCertifications.map((cert) => {
                    const isChecked = selectedCerts.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => handleCertToggle(cert)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm text-left transition-all ${
                          isChecked 
                            ? "bg-gold-500/10 border-gold-500/50 text-white" 
                            : "bg-black-950/40 border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <span>{cert}</span>
                        {isChecked && <Check className="h-4 w-4 text-gold-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} disabled={uploadingImage} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" disabled={uploadingImage} className="w-full sm:w-auto">
                {uploadingImage ? "Uploading Image..." : (editingId ? "Update Guard" : "Add Guard")}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
