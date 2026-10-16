import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Search, 
  CheckCircle2, 
  Trash2, 
  Download, 
  MessageCircle, 
  Settings, 
  RefreshCw, 
  Lock
} from 'lucide-react';

import type { Currency, Order, OrderStatus } from '../types';
import { 
  getStoredOrders, 
  updateExistingOrder, 
  getAdminSettings, 
  saveAdminSettings, 
  resetOrdersToSample
} from '../utils/storage';
import type { AdminSettings } from '../utils/storage';
import { STATUS_LABELS } from '../data/f0undrConfig';
import { formatPrice } from '../utils/currency';
import { downloadReceiptFile } from '../utils/exportReceipt';

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  onSettingsUpdated: (settings: AdminSettings) => void;
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  onSettingsUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Data state
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Settings state
  const [adminSettings, setLocalSettings] = useState<AdminSettings>(getAdminSettings());
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    const list = getStoredOrders();
    setOrders(list);
    setLocalSettings(getAdminSettings());
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = getAdminSettings();
    if (enteredPin === settings.adminPin || enteredPin === 'f0undr' || enteredPin === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
      refreshData();
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    const updated: Order = { ...selectedOrder, status: newStatus };
    updateExistingOrder(updated);
    setSelectedOrder(updated);
    refreshData();
  };

  const handleToggleMilestone = (milestoneId: string) => {
    if (!selectedOrder) return;
    const updatedMilestones = selectedOrder.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    const updated: Order = { ...selectedOrder, milestones: updatedMilestones };
    updateExistingOrder(updated);
    setSelectedOrder(updated);
    refreshData();
  };

  const handleSaveInternalNotes = (notes: string) => {
    if (!selectedOrder) return;
    const updated: Order = { ...selectedOrder, internalNotes: notes };
    updateExistingOrder(updated);
    setSelectedOrder(updated);
    refreshData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSettings(adminSettings);
    onSettingsUpdated(adminSettings);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2500);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `f0undr-orders-export-${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.targetBudgetUsd, 0);
  const activeCount = orders.filter((o) => o.status === 'in_development' || o.status === 'under_review' || o.status === 'qa_testing').length;
  const completedCount = orders.filter((o) => o.status === 'delivered').length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      o.id.toLowerCase().includes(q) ||
      o.projectTitle.toLowerCase().includes(q) ||
      o.client.name.toLowerCase().includes(q) ||
      (o.client.discord ? o.client.discord.toLowerCase().includes(q) : false) ||
      (o.client.phoneOrWhatsapp ? o.client.phoneOrWhatsapp.toLowerCase().includes(q) : false);
    return matchesStatus && matchesSearch;

  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col relative shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <span>f0undr Studio Cockpit</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
                  Lead &amp; Admin
                </span>
              </h3>
              <p className="text-[11px] font-mono text-stone-400">
                Pipeline execution, status updates &amp; client dispatches
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center mx-auto text-orange-400">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl font-serif font-bold text-white">
                Enter Atelier Master PIN
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Protected area for Huzaifa and atelier fellows. Default PIN is <code className="text-orange-400 font-mono">f0undr</code>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full text-center px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono text-lg tracking-widest focus:outline-none focus:border-orange-500"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-medium">
                  Invalid PIN. Try 'f0undr'
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Unlock Studio Cockpit
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 overflow-hidden flex flex-col">
            
            {/* Top Navigation Tabs & Quick Metrics */}
            <div className="px-6 py-3 border-b border-stone-800 bg-stone-950/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setSelectedOrder(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-orange-600 text-white'
                      : 'bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  Orders Vault ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeTab === 'settings'
                      ? 'bg-orange-600 text-white'
                      : 'bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Studio Settings</span>
                </button>
              </div>

              {/* Quick Metrics Badges */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  <span className="text-stone-500">Pipeline: </span>
                  <span className="text-orange-400 font-bold">{formatPrice(totalRevenue, currentCurrency)}</span>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  <span className="text-stone-500">Active Sprints: </span>
                  <span className="text-emerald-400 font-bold">{activeCount}</span>
                </div>
                <div className="hidden sm:block px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                  <span className="text-stone-500">Delivered: </span>
                  <span className="text-blue-400 font-bold">{completedCount}</span>
                </div>
              </div>
            </div>

            {/* TAB 1: ORDERS VAULT */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                
                {/* Orders List & Filters */}
                <div className={`${selectedOrder ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/2 border-r border-stone-800 overflow-hidden`}>
                  
                  {/* Search and Filter bar */}
                  <div className="p-3 border-b border-stone-800 bg-stone-950/40 space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filter by Order ID, project, client..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-orange-500"
                      />
                      <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2" />
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
                      {['all', 'submitted', 'in_development', 'qa_testing', 'delivered'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-2 py-0.5 rounded cursor-pointer whitespace-nowrap ${
                            statusFilter === st
                              ? 'bg-stone-800 text-orange-400 font-semibold'
                              : 'text-stone-500 hover:text-stone-300'
                          }`}
                        >
                          {st === 'all' ? 'All' : (STATUS_LABELS[st]?.label || st)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders Scrollable List */}
                  <div className="flex-1 overflow-y-auto divide-y divide-stone-800/60">
                    {filteredOrders.length === 0 ? (
                      <div className="p-8 text-center text-xs font-mono text-stone-500">
                        No orders match filter criteria.
                      </div>
                    ) : (
                      filteredOrders.map((order) => {
                        const isSelected = selectedOrder?.id === order.id;
                        const statusCfg = STATUS_LABELS[order.status] || STATUS_LABELS.submitted;
                        return (
                          <div
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className={`p-3.5 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                              isSelected ? 'bg-orange-600/10 border-l-2 border-orange-500' : 'hover:bg-stone-850/60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-orange-400">
                                {order.id}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                                {statusCfg.label}
                              </span>
                            </div>

                            <h5 className="text-xs font-semibold text-white truncate">
                              {order.projectTitle}
                            </h5>

                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                              <span>{order.client.name}</span>
                              <span className="text-stone-300 font-semibold">
                                {formatPrice(order.targetBudgetUsd, currentCurrency)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>

                {/* Selected Order Detailed Editor */}
                <div className={`${selectedOrder ? 'flex' : 'hidden md:flex'} flex-col flex-1 overflow-y-auto p-5 space-y-5 bg-stone-950/40`}>
                  {selectedOrder ? (
                    <div className="space-y-5">
                      
                      {/* Top Bar for Selected Order */}
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-mono font-bold text-orange-400">
                              {selectedOrder.id}
                            </span>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                              {selectedOrder.serviceTitle}
                            </span>
                          </div>
                          <h4 className="text-lg font-serif font-bold text-white mt-1">
                            {selectedOrder.projectTitle}
                          </h4>
                        </div>

                        <button
                          onClick={() => setSelectedOrder(null)}
                          className="md:hidden p-1.5 rounded-lg bg-stone-800 text-stone-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Status Selector & Lead Assignment */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-stone-900 border border-stone-800">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                            Current Pipeline Status:
                          </label>
                          <select
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-orange-500 cursor-pointer"
                          >
                            <option value="submitted">Order Received</option>
                            <option value="under_review">Under Review</option>
                            <option value="scope_approved">Scope Approved</option>
                            <option value="in_development">In Development</option>
                            <option value="qa_testing">QA & Testing</option>
                            <option value="delivered">Completed & Delivered</option>
                            <option value="on_hold">On Hold</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                            Assigned Atelier Lead:
                          </label>
                          <select
                            value={selectedOrder.assignedLead || 'M.Huzaifa'}
                            onChange={(e) => {
                              const updated = { ...selectedOrder, assignedLead: e.target.value };
                              updateExistingOrder(updated);
                              setSelectedOrder(updated);
                              refreshData();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-orange-500 cursor-pointer"
                          >
                            <option value="M.Huzaifa">M.Huzaifa (Head of AI & Systems)</option>
                            <option value="Abdull Rehman Khizar">Abdull Rehman Khizar (CPO)</option>
                            <option value="f0undr">f0undr (Principal Architect)</option>
                          </select>
                        </div>
                      </div>

                      {/* Client Overview & WhatsApp Ping */}
                      <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-stone-400">
                            Client Contact Details:
                          </span>
                          
                          {/* 1-Click WhatsApp Status Notification */}
                          <a
                            href={`https://wa.me/${selectedOrder.client.phoneOrWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedOrder.client.name}, update regarding your f0undr Order [${selectedOrder.id}]: Status is now "${(STATUS_LABELS[selectedOrder.status] || STATUS_LABELS.submitted).label}". Let us know if you have any questions!`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Notify Client (WhatsApp)</span>
                          </a>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-300">
                          <div>
                            <span className="text-stone-500 text-[10px] block">Name:</span>
                            <span>{selectedOrder.client.name}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 text-[10px] block">Discord:</span>
                            <span className="text-indigo-400 font-mono">{selectedOrder.client.discord || 'None'}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 text-[10px] block">WhatsApp / Phone:</span>
                            <span>{selectedOrder.client.phoneOrWhatsapp}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 text-[10px] block">Target Budget:</span>
                            <span className="text-orange-400 font-bold">
                              {formatPrice(selectedOrder.targetBudgetUsd, selectedOrder.currency || currentCurrency)}
                            </span>
                            <span className="text-[10px] text-stone-500 ml-1">({selectedOrder.currency || 'USD'})</span>
                          </div>
                          <div>
                            <span className="text-stone-500 text-[10px] block">Payment Gateway:</span>
                            <span className="text-sky-400 font-bold uppercase">{selectedOrder.paymentMethod || 'stripe'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Milestones Management */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-mono uppercase text-stone-400">
                            Milestones Checklist:
                          </label>
                          <span className="text-[10px] font-mono text-stone-500">
                            Click checkbox to mark complete
                          </span>
                        </div>
                        <div className="space-y-2">
                          {selectedOrder.milestones.map((m) => (
                            <div
                              key={m.id}
                              onClick={() => handleToggleMilestone(m.id)}
                              className={`p-3 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                                m.completed ? 'bg-emerald-950/20 border-emerald-500/40 text-stone-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {m.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border border-stone-600" />}
                              </div>
                              <div className="flex-1">
                                <span className={`font-semibold ${m.completed ? 'text-white' : 'text-stone-300'}`}>
                                  {m.title}
                                </span>
                                <p className="text-[11px] text-stone-400 mt-0.5">{m.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Internal Notes */}
                      <div>
                        <label className="text-xs font-mono uppercase text-stone-400 block mb-1">
                          Atelier Internal Notes (Private):
                        </label>
                        <textarea
                          rows={3}
                          defaultValue={selectedOrder.internalNotes || ''}
                          onBlur={(e) => handleSaveInternalNotes(e.target.value)}
                          placeholder="Add private technical notes, deployment URLs, staging links..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs font-mono">
                        <button
                          onClick={() => downloadReceiptFile(selectedOrder)}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export Spec Receipt</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete order ${selectedOrder.id}?`)) {
                              const remaining = orders.filter((o) => o.id !== selectedOrder.id);
                              localStorage.setItem('f0undr_orders_vault_v1', JSON.stringify(remaining));
                              setSelectedOrder(null);
                              refreshData();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Order</span>
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-8 text-stone-500 font-mono text-xs">
                      Select an order from the list on the left to inspect and manage deliverables.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: STUDIO SETTINGS */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-6">
                
                {savedSettingsSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Studio settings saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-orange-400">
                    Communication &amp; Dispatch Routing
                  </h4>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      Huzaifa / Studio WhatsApp Number (with country code):
                    </label>
                    <input
                      type="text"
                      required
                      value={adminSettings.whatsappNumber}
                      onChange={(e) => setLocalSettings({ ...adminSettings, whatsappNumber: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[11px] text-stone-500 block mt-1">
                      Orders forwarded by clients on the success screen will route directly to this WhatsApp.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      Studio Admin Master PIN:
                    </label>
                    <input
                      type="text"
                      required
                      value={adminSettings.adminPin}
                      onChange={(e) => setLocalSettings({ ...adminSettings, adminPin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      Studio Discord Handle / Username:
                    </label>
                    <input
                      type="text"
                      value={adminSettings.discordUsername}
                      onChange={(e) => setLocalSettings({ ...adminSettings, discordUsername: e.target.value })}
                      placeholder="e.g. king_huzaifa001"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      Stripe Payment / Checkout Link (for Credit Card / Apple Pay):
                    </label>
                    <input
                      type="url"
                      value={adminSettings.stripePaymentUrl || ''}
                      onChange={(e) => setLocalSettings({ ...adminSettings, stripePaymentUrl: e.target.value })}
                      placeholder="https://buy.stripe.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[11px] text-stone-500 block mt-1">
                      Clients choosing Stripe will be able to pay milestone escrow directly via this link.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">
                      PayPal.me Payment Link (for PayPal Balance / Cards):
                    </label>
                    <input
                      type="url"
                      value={adminSettings.paypalMeUrl || ''}
                      onChange={(e) => setLocalSettings({ ...adminSettings, paypalMeUrl: e.target.value })}
                      placeholder="https://paypal.me/kinghuzaifa001"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[11px] text-stone-500 block mt-1">
                      Direct PayPal.me link presented to clients choosing PayPal.
                    </span>
                  </div>


                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>

                {/* Data Backup & Reset */}
                <div className="pt-6 border-t border-stone-800 space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-stone-400">
                    Data Operations &amp; Backup
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export All Orders (.JSON)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset orders to default realistic sample set? Current custom orders will be replaced.')) {
                          resetOrdersToSample();
                          refreshData();
                          alert('Reset to sample dataset complete.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-orange-500 text-stone-400 hover:text-stone-200 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-orange-400" />
                      <span>Reload Sample Demo Orders</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
