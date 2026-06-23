"use client";

import { useState, useEffect } from "react";
import { Plus, DollarSign, Calendar, FileText, Printer, Check, X, Shield, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  serviceType: string;
  amount: number;
  date: string;
  status: string;
  dueDate: string;
}

export default function FinancePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Form states
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState("Personal Protection");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/finance");
      if (!response.ok) throw new Error("Failed to fetch financials");
      const data = await response.json();
      if (data.success) {
        setInvoices(data.invoices);
      } else {
        throw new Error(data.message || "Failed to load financials");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load financial records.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          serviceType,
          amount: Number(amount),
          date,
          dueDate,
          status
        })
      });

      if (response.ok) {
        setIsModalOpen(false);
        // Clear form
        setClientName("");
        setServiceType("Personal Protection");
        setAmount("");
        setDate("");
        setDueDate("");
        setStatus("Pending");
        // Refresh
        fetchInvoices();
      } else {
        alert("Failed to create invoice.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving invoice.");
    }
  };

  const handleSeedInvoices = async () => {
    const demoInvoices = [
      { clientName: "Mr. Rajapaksa", serviceType: "VIP Close Protection", amount: 450000, date: "2026-06-10", dueDate: "2026-06-24", status: "Paid" },
      { clientName: "TechCorp Event", serviceType: "Corporate Security", amount: 280000, date: "2026-06-15", dueDate: "2026-06-29", status: "Pending" },
      { clientName: "Diplomat Transfer", serviceType: "Diplomatic Escort", amount: 150000, date: "2026-06-16", dueDate: "2026-06-30", status: "Pending" }
    ];

    try {
      setLoading(true);
      for (const inv of demoInvoices) {
        await fetch("/api/finance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inv)
        });
      }
      fetchInvoices();
    } catch (err) {
      console.error("Error seeding invoices:", err);
    }
  };

  // Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCollected = invoices.reduce((sum, inv) => inv.status === 'Paid' ? sum + inv.amount : sum, 0);
  const totalOutstanding = totalInvoiced - totalCollected;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Financial metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-400">Total Billed</span>
            <div className="p-2 bg-white/5 rounded-lg text-gold-500">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">LKR {totalInvoiced.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">All issued invoices</p>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-400">Revenue Collected</span>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">LKR {totalCollected.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">Settled payments</p>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-400">Outstanding Balances</span>
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white">LKR {totalOutstanding.toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">Pending client payments</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <p className="text-sm text-gray-400">Review corporate statements, issue invoices, and track outstanding VIP accounts.</p>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" onClick={handleSeedInvoices} className="flex-1 sm:flex-none whitespace-nowrap">
            Seed Demo
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="flex-1 sm:flex-none whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-black-900/80 text-xs uppercase text-gray-400 border-b border-white/5">
              <tr>
                <th scope="col" className="px-6 py-4">Invoice No</th>
                <th scope="col" className="px-6 py-4">Client</th>
                <th scope="col" className="px-6 py-4">Required Service</th>
                <th scope="col" className="px-6 py-4">Amount</th>
                <th scope="col" className="px-6 py-4">Issue Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-6 w-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading secure accounts ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No invoices recorded. Click 'Seed Demo Invoices' to populate records.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4">{inv.clientName}</td>
                    <td className="px-6 py-4">{inv.serviceType}</td>
                    <td className="px-6 py-4 font-semibold text-white">LKR {inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">{inv.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                        inv.status === 'Paid' ? 'bg-green-400/10 text-green-400 ring-green-400/30' :
                        'bg-yellow-400/10 text-yellow-400 ring-yellow-400/30'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-1.5 text-gray-400 hover:text-white rounded bg-white/5 hover:bg-white/10 transition-colors"
                        title="View & Print Invoice"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="glass w-full max-w-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50">
              <h3 className="font-bold text-white text-lg">Create Professional Invoice</h3>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs text-gray-400 uppercase">Client Name</label>
                <input 
                  required 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  placeholder="e.g. Mr. Rajapaksa" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Billing Amount (LKR)</label>
                  <input 
                    required 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                    placeholder="e.g. 350000" 
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Billing Date</label>
                  <input 
                    required 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-gray-400 uppercase">Due Date</label>
                  <input 
                    required 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-black-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-gray-400 uppercase">Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-black-950 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="Pending">Pending Payment</option>
                  <option value="Paid">Settled / Paid</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Create Invoice
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:bg-white print:p-0">
          <div className="glass w-full max-w-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black animate-in fade-in zoom-in duration-200">
            {/* Header / Non-printable buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black-900/50 print:hidden">
              <h3 className="font-bold text-white text-lg">Billing Statement</h3>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print / Save PDF
                </Button>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Invoice Printable Sheet */}
            <div className="p-8 bg-black-950 text-white space-y-8 print:bg-white print:text-black print:p-8">
              {/* Brand logo & Invoice details */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white print:text-black">
                    <Shield className="h-6 w-6 text-gold-500 print:text-black" />
                    <span className="text-xl font-bold tracking-wider uppercase">Falcon Eye Security</span>
                  </div>
                  <p className="text-xs text-gray-400 print:text-gray-600">Colombo, Sri Lanka</p>
                  <p className="text-xs text-gray-400 print:text-gray-600">info@falconeyesecurity.lk</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-gold-500 print:text-black">INVOICE</h2>
                  <p className="text-sm font-semibold text-gray-300 print:text-black">{selectedInvoice.invoiceNumber}</p>
                  <p className="text-xs text-gray-500 print:text-gray-600">Date: {selectedInvoice.date}</p>
                </div>
              </div>

              {/* Bill to */}
              <div className="border-t border-white/10 pt-6 print:border-black/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs uppercase text-gray-500 tracking-wider">Bill To</h5>
                    <p className="font-bold text-white print:text-black text-lg mt-1">{selectedInvoice.clientName}</p>
                    <p className="text-sm text-gray-400 print:text-gray-600">Corporate Account</p>
                  </div>
                  <div className="text-right">
                    <h5 className="text-xs uppercase text-gray-500 tracking-wider">Terms</h5>
                    <p className="text-sm font-semibold mt-1">Due Date: {selectedInvoice.dueDate}</p>
                    <p className="text-xs text-gray-400 print:text-gray-600 mt-1">
                      Status: <span className="font-semibold">{selectedInvoice.status}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border-t border-white/10 pt-6 print:border-black/10">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-xs uppercase text-gray-400 print:border-black/10 print:text-gray-600">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Total (LKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 print:divide-black/10">
                    <tr>
                      <td className="py-4 font-medium">
                        {selectedInvoice.serviceType}
                        <span className="block text-xs text-gray-400 print:text-gray-600 mt-0.5">Professional Elite Security Deployment services</span>
                      </td>
                      <td className="py-4 text-right font-bold text-white print:text-black">LKR {selectedInvoice.amount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="border-t border-white/10 pt-6 flex justify-end print:border-black/10">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm text-gray-400 print:text-gray-600">
                    <span>Subtotal:</span>
                    <span>LKR {selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 print:text-gray-600">
                    <span>Tax (0%):</span>
                    <span>LKR 0</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 text-base font-bold text-gold-500 print:border-black/10 print:text-black">
                    <span>Total Due:</span>
                    <span>LKR {selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-center text-xs text-gray-500 pt-8 border-t border-white/5 print:border-black/10 print:text-gray-600 leading-relaxed">
                Thank you for choosing Falcon Eye Security. Payments are due within 14 days of invoice date.<br />
                All VIP operations are handled under strict confidentiality agreements.
              </div>
            </div>

            {/* Footer / Non-printable cancel */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-white/5 bg-black-900/30 print:hidden">
              <Button variant="secondary" onClick={() => setSelectedInvoice(null)} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
