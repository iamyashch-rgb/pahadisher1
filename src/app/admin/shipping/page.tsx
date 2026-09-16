'use client';

import React, { useState } from 'react';
import { 
  Truck, ShieldCheck, MapPin, Plus, Trash2, Edit, Save, 
  CheckCircle2, XCircle, AlertTriangle, Clock, Layers, Package, DollarSign, Settings, X, Sparkles 
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { PincodeZoneRule, ProductShippingRule } from '@/types';

export default function AdminShippingPage() {
  const { 
    shippingConfig, 
    updateShippingConfig, 
    addPincodeZone, 
    updatePincodeZone, 
    deletePincodeZone,
    updateProductShippingRule,
    deleteProductShippingRule,
    updateCodConfig,
    products
  } = useAdmin();

  // General Fee State
  const [freeThresholdInput, setFreeThresholdInput] = useState<number>(shippingConfig.freeShippingThreshold);
  const [flatFeeInput, setFlatFeeInput] = useState<number>(shippingConfig.flatShippingFee);
  const [generalFeeSaved, setGeneralFeeSaved] = useState<boolean>(false);

  // Zone Modal State
  const [zoneModalOpen, setZoneModalOpen] = useState(false);
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  const [zoneName, setZoneName] = useState('');
  const [zonePrefixes, setZonePrefixes] = useState('');
  const [zoneFee, setZoneFee] = useState<number>(49);
  const [zoneEstDays, setZoneEstDays] = useState('2 - 3 Business Days');
  const [zoneCodSupported, setZoneCodSupported] = useState(true);

  // Product Rule Modal State
  const [productRuleModalOpen, setProductRuleModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productExtraFee, setProductExtraFee] = useState<number>(49);
  const [productColdChain, setProductColdChain] = useState(false);
  const [productHeavy, setProductHeavy] = useState(false);

  // COD Config State
  const [codEnabled, setCodEnabled] = useState(shippingConfig.codConfig.enabled);
  const [codMinOrder, setCodMinOrder] = useState(shippingConfig.codConfig.minOrderAmount);
  const [codMaxOrder, setCodMaxOrder] = useState(shippingConfig.codConfig.maxOrderAmount);
  const [codHandlingFee, setCodHandlingFee] = useState(shippingConfig.codConfig.handlingFee);
  const [codDisabledPrefixes, setCodDisabledPrefixes] = useState(shippingConfig.codConfig.disabledPincodePrefixes?.join(', ') || '');
  const [codSaved, setCodSaved] = useState(false);

  const handleSaveGeneralFees = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingConfig({
      freeShippingThreshold: Number(freeThresholdInput),
      flatShippingFee: Number(flatFeeInput)
    });
    setGeneralFeeSaved(true);
    setTimeout(() => setGeneralFeeSaved(false), 2000);
  };

  const handleOpenCreateZone = () => {
    setEditingZoneId(null);
    setZoneName('');
    setZonePrefixes('');
    setZoneFee(49);
    setZoneEstDays('2 - 3 Business Days');
    setZoneCodSupported(true);
    setZoneModalOpen(true);
  };

  const handleOpenEditZone = (zone: PincodeZoneRule) => {
    setEditingZoneId(zone.id);
    setZoneName(zone.name);
    setZonePrefixes(zone.pincodePrefixes.join(', '));
    setZoneFee(zone.shippingFee);
    setZoneEstDays(zone.estDeliveryDays);
    setZoneCodSupported(zone.codSupported);
    setZoneModalOpen(true);
  };

  const handleSubmitZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName.trim()) return;

    const prefixes = zonePrefixes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const zoneObj: PincodeZoneRule = {
      id: editingZoneId || `zone-${Date.now()}`,
      name: zoneName.trim(),
      pincodePrefixes: prefixes,
      shippingFee: Number(zoneFee),
      estDeliveryDays: zoneEstDays.trim(),
      codSupported: zoneCodSupported
    };

    if (editingZoneId) {
      updatePincodeZone(zoneObj);
    } else {
      addPincodeZone(zoneObj);
    }
    setZoneModalOpen(false);
  };

  const handleOpenCreateProductRule = () => {
    setSelectedProductId(products[0]?.id || '');
    setProductExtraFee(49);
    setProductColdChain(false);
    setProductHeavy(false);
    setProductRuleModalOpen(true);
  };

  const handleSubmitProductRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;

    const prod = products.find(p => p.id === selectedProductId);
    const ruleObj: ProductShippingRule = {
      productId: selectedProductId,
      productName: prod ? prod.name : 'Targeted Himalayan Product',
      extraShippingFee: Number(productExtraFee),
      requiresColdChain: productColdChain,
      isHeavyItem: productHeavy
    };

    updateProductShippingRule(ruleObj);
    setProductRuleModalOpen(false);
  };

  const handleSaveCodConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const disabledArr = codDisabledPrefixes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateCodConfig({
      enabled: codEnabled,
      minOrderAmount: Number(codMinOrder),
      maxOrderAmount: Number(codMaxOrder),
      handlingFee: Number(codHandlingFee),
      disabledPincodePrefixes: disabledArr
    });

    setCodSaved(true);
    setTimeout(() => setCodSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pahadi-sand pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-pahadi-gold block">Logistics & Fulfilment</span>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-pahadi-green">Shipping & COD Management</h1>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Free Shipping Threshold</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">₹{shippingConfig.freeShippingThreshold}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">Standard Flat Rate</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">₹{shippingConfig.flatShippingFee}</span>
        </div>

        <div className="bg-pahadi-paper p-4 rounded-2xl border border-pahadi-border shadow-xs">
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">PIN Code Zones</span>
          <span className="font-playfair text-2xl font-bold text-pahadi-green">{shippingConfig.pincodeZones.length} Configured</span>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${shippingConfig.codConfig.enabled ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase text-pahadi-brown block">COD Availability</span>
          <span className={`font-playfair text-xl font-bold ${shippingConfig.codConfig.enabled ? 'text-emerald-800' : 'text-rose-800'}`}>
            {shippingConfig.codConfig.enabled ? `Active (+₹${shippingConfig.codConfig.handlingFee})` : 'Disabled'}
          </span>
        </div>
      </div>

      {/* SECTION 1: General Free Shipping & Flat Fee Configuration */}
      <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-pahadi-sand pb-3">
          <Truck className="w-5 h-5 text-pahadi-gold" />
          <h2 className="font-playfair text-xl font-bold text-pahadi-green">Global Store Shipping Thresholds</h2>
        </div>

        <form onSubmit={handleSaveGeneralFees} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
              Free Shipping Threshold (Subtotal ₹) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={freeThresholdInput}
              onChange={(e) => setFreeThresholdInput(Number(e.target.value))}
              className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
            />
            <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">Orders above this subtotal get 100% free delivery</span>
          </div>

          <div>
            <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
              Standard Flat Shipping Fee (₹) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={flatFeeInput}
              onChange={(e) => setFlatFeeInput(Number(e.target.value))}
              className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
            />
            <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">Default fee when PIN code does not match custom zones</span>
          </div>

          <button
            type="submit"
            className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{generalFeeSaved ? 'Saved!' : 'Save Global Rates'}</span>
          </button>
        </form>
      </div>

      {/* SECTION 2: PIN-Code Based Regional Shipping Zones */}
      <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pahadi-sand pb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-pahadi-gold" />
            <div>
              <h2 className="font-playfair text-xl font-bold text-pahadi-green">PIN-Code Regional Shipping Zones</h2>
              <p className="text-xs text-pahadi-charcoal-muted">Configure custom shipping fees & estimated delivery windows by PIN code prefix</p>
            </div>
          </div>

          <button
            onClick={handleOpenCreateZone}
            className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pincode Zone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shippingConfig.pincodeZones.map((zone) => (
            <div key={zone.id} className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-3 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-playfair font-bold text-pahadi-green text-base">{zone.name}</h3>
                  <span className="font-mono text-sm font-bold text-pahadi-green bg-pahadi-gold/15 px-2.5 py-0.5 rounded-lg border border-pahadi-gold/30">
                    ₹{zone.shippingFee}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                  <span className="text-pahadi-brown font-bold mr-1">Prefixes:</span>
                  {zone.pincodePrefixes.map((p, idx) => (
                    <span key={idx} className="bg-pahadi-paper border border-pahadi-sand px-1.5 py-0.5 rounded text-pahadi-green font-bold">
                      {p}*
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-pahadi-charcoal-muted flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-pahadi-brown" />
                    <span>Est: {zone.estDeliveryDays}</span>
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${zone.codSupported ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {zone.codSupported ? 'COD Available' : 'No COD'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-pahadi-sand/50 flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenEditZone(zone)}
                  className="px-3 py-1 bg-pahadi-green/10 hover:bg-pahadi-green/20 text-pahadi-green rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Zone</span>
                </button>
                <button
                  onClick={() => deletePincodeZone(zone.id)}
                  className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Product-Specific Shipping Surcharges & Cold Chain */}
      <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pahadi-sand pb-3">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-pahadi-gold" />
            <div>
              <h2 className="font-playfair text-xl font-bold text-pahadi-green">Product-Specific Shipping Surcharges</h2>
              <p className="text-xs text-pahadi-charcoal-muted">Configure additional shipping fees for heavy gift boxes or cold-chain insulated items</p>
            </div>
          </div>

          <button
            onClick={handleOpenCreateProductRule}
            className="bg-pahadi-green text-pahadi-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product Rule</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shippingConfig.productRules.map((rule) => (
            <div key={rule.productId} className="bg-white p-5 rounded-2xl border border-pahadi-sand space-y-3 flex flex-col justify-between shadow-xs">
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-playfair font-bold text-pahadi-green text-sm">{rule.productName}</h3>
                  <span className="font-mono text-xs font-bold text-pahadi-brown bg-pahadi-sand/40 px-2 py-0.5 rounded">
                    +₹{rule.extraShippingFee} Surcharge
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-[10px] pt-1">
                  {rule.requiresColdChain && (
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full font-bold">
                      ❄️ Mandatory Cold Chain
                    </span>
                  )}
                  {rule.isHeavyItem && (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                      📦 Heavy Wooden Box
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => deleteProductShippingRule(rule.productId)}
                  className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Rule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: COD (Cash on Delivery) Management Panel */}
      <div className="bg-pahadi-paper p-6 rounded-3xl border border-pahadi-border space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 border-b border-pahadi-sand pb-3">
          <ShieldCheck className="w-5 h-5 text-pahadi-gold" />
          <div>
            <h2 className="font-playfair text-xl font-bold text-pahadi-green">Cash on Delivery (COD) Rules</h2>
            <p className="text-xs text-pahadi-charcoal-muted">Control global COD availability, minimum/maximum thresholds, and handling fees</p>
          </div>
        </div>

        <form onSubmit={handleSaveCodConfig} className="space-y-4 text-xs font-sans">
          <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-pahadi-sand">
            <input
              type="checkbox"
              id="codEnabledCheck"
              checked={codEnabled}
              onChange={(e) => setCodEnabled(e.target.checked)}
              className="w-4 h-4 accent-pahadi-green rounded"
            />
            <label htmlFor="codEnabledCheck" className="font-bold text-pahadi-green text-sm cursor-pointer">
              Enable Cash on Delivery (COD) Payment Option on Storefront
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">COD Minimum Order Subtotal (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={codMinOrder}
                onChange={(e) => setCodMinOrder(Number(e.target.value))}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
              />
            </div>

            <div>
              <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">COD Maximum Order Limit (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={codMaxOrder}
                onChange={(e) => setCodMaxOrder(Number(e.target.value))}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
              />
            </div>

            <div>
              <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">COD Courier Collection Handling Fee (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={codHandlingFee}
                onChange={(e) => setCodHandlingFee(Number(e.target.value))}
                className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
              Restricted / Disabled COD PIN Code Prefixes (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. 78, 79, 19"
              value={codDisabledPrefixes}
              onChange={(e) => setCodDisabledPrefixes(e.target.value)}
              className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green font-mono"
            />
            <span className="text-[10px] text-pahadi-charcoal-muted mt-1 block">PIN codes starting with these prefixes will be restricted from using COD</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-pahadi-green hover:bg-pahadi-green-light text-pahadi-gold font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{codSaved ? 'COD Settings Saved!' : 'Save COD Configuration'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Pincode Zone Modal */}
      {zoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-pahadi-paper border border-pahadi-gold/30 rounded-3xl shadow-pahadi-lg overflow-hidden flex flex-col">
            <div className="bg-pahadi-green text-pahadi-paper p-5 flex items-center justify-between border-b border-pahadi-gold/20">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-pahadi-gold" />
                <h3 className="font-playfair text-xl font-bold text-pahadi-gold">
                  {editingZoneId ? 'Edit Pincode Zone' : 'Create Pincode Shipping Zone'}
                </h3>
              </div>
              <button onClick={() => setZoneModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-pahadi-sand">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitZone} className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Zone Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South India Tech Corridor"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">
                  Matching PIN Code Prefixes (Comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 56, 57, 60, 64"
                  value={zonePrefixes}
                  onChange={(e) => setZonePrefixes(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-mono focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Zone Shipping Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={zoneFee}
                    onChange={(e) => setZoneFee(Number(e.target.value))}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>

                <div>
                  <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Estimated Delivery Days *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 - 3 Business Days"
                    value={zoneEstDays}
                    onChange={(e) => setZoneEstDays(e.target.value)}
                    className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-pahadi-green"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="zoneCodCheck"
                  checked={zoneCodSupported}
                  onChange={(e) => setZoneCodSupported(e.target.checked)}
                  className="w-4 h-4 accent-pahadi-green rounded"
                />
                <label htmlFor="zoneCodCheck" className="font-bold text-pahadi-charcoal text-xs cursor-pointer">
                  Allow Cash on Delivery (COD) for this PIN Code Zone
                </label>
              </div>

              <div className="pt-3 border-t border-pahadi-sand flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setZoneModalOpen(false)}
                  className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pahadi-green text-pahadi-gold hover:bg-pahadi-green-light font-bold text-xs uppercase tracking-wider rounded-xl shadow-pahadi-md flex items-center space-x-2"
                >
                  <Save className="w-4 h-4 text-pahadi-gold" />
                  <span>{editingZoneId ? 'Update Zone' : 'Save Zone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Shipping Rule Modal */}
      {productRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-pahadi-paper border border-pahadi-gold/30 rounded-3xl shadow-pahadi-lg overflow-hidden flex flex-col">
            <div className="bg-pahadi-green text-pahadi-paper p-5 flex items-center justify-between border-b border-pahadi-gold/20">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-pahadi-gold" />
                <h3 className="font-playfair text-xl font-bold text-pahadi-gold">Add Product Shipping Surcharge</h3>
              </div>
              <button onClick={() => setProductRuleModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-pahadi-sand">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProductRule} className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Select Product *</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold text-pahadi-green focus:ring-1 focus:ring-pahadi-green"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-pahadi-brown uppercase text-[10px] block mb-1">Extra Shipping Surcharge (₹) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={productExtraFee}
                  onChange={(e) => setProductExtraFee(Number(e.target.value))}
                  className="w-full bg-white border border-pahadi-border rounded-xl p-3 text-xs font-bold focus:ring-1 focus:ring-pahadi-green"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productColdChain}
                    onChange={(e) => setProductColdChain(e.target.checked)}
                    className="accent-pahadi-green rounded"
                  />
                  <span className="font-bold text-pahadi-charcoal">Requires Insulated Cold-Chain Packaging</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productHeavy}
                    onChange={(e) => setProductHeavy(e.target.checked)}
                    className="accent-pahadi-green rounded"
                  />
                  <span className="font-bold text-pahadi-charcoal">Heavy / Large Wooden Gift Box Item</span>
                </label>
              </div>

              <div className="pt-3 border-t border-pahadi-sand flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setProductRuleModalOpen(false)}
                  className="px-5 py-3 text-pahadi-charcoal hover:bg-pahadi-sand rounded-xl text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-pahadi-green text-pahadi-gold font-bold text-xs uppercase tracking-wider rounded-xl shadow-pahadi-md flex items-center space-x-2"
                >
                  <Save className="w-4 h-4 text-pahadi-gold" />
                  <span>Save Product Rule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
