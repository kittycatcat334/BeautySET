import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  MessageCircle,
  Instagram,
  Settings,
  ShieldCheck,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  PhoneCall,
  Sparkles,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { BrandConfig } from '../types';
import { cleanPhone, cleanInstagram } from '../utils/orderLinks';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  onSaveConfig: (newConfig: BrandConfig) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  // Login form state
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin tabs: 'whatsapp' | 'instagram' | 'store' | 'security'
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram' | 'store' | 'security'>('whatsapp');

  // Edit form state
  const [form, setForm] = useState<BrandConfig>(config);
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

  // Sync config when opened
  React.useEffect(() => {
    setForm(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPasscode.trim() === config.adminPasscode) {
      setLoginError('');
      setEnteredPasscode('');
      onLogin();
    } else {
      setLoginError('Incorrect passcode. Please check and try again.');
    }
  };

  const handleFillDefault = () => {
    setEnteredPasscode(config.adminPasscode);
    setLoginError('');
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedNumber = cleanPhone(form.whatsappNumber);
    const cleanedHandle = cleanInstagram(form.instagramHandle);

    const updated: BrandConfig = {
      ...form,
      whatsappNumber: cleanedNumber || form.whatsappNumber,
      instagramHandle: cleanedHandle || form.instagramHandle,
    };

    onSaveConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');
    if (!newPasscode.trim()) {
      setPasscodeError('Please enter a new passcode.');
      return;
    }
    if (newPasscode !== confirmPasscode) {
      setPasscodeError('Passcodes do not match.');
      return;
    }
    const updated: BrandConfig = {
      ...form,
      adminPasscode: newPasscode.trim(),
    };
    setForm(updated);
    onSaveConfig(updated);
    setNewPasscode('');
    setConfirmPasscode('');
    setPasscodeSuccess(true);
    setTimeout(() => setPasscodeSuccess(false), 3000);
  };

  const handleTestWhatsApp = () => {
    const num = cleanPhone(form.whatsappNumber);
    const prefix = form.whatsappMessagePrefix || `Hello ${form.brandName}! ✨`;
    const text = encodeURIComponent(`${prefix}\n\n[Test Order from Store Owner]`);
    window.open(`https://wa.me/${num}?text=${text}`, '_blank');
  };

  const handleTestInstagramProfile = () => {
    const handle = cleanInstagram(form.instagramHandle);
    window.open(`https://instagram.com/${handle}`, '_blank');
  };

  const handleTestInstagramDm = () => {
    const handle = cleanInstagram(form.instagramHandle);
    window.open(`https://ig.me/m/${handle}`, '_blank');
  };

  const quickCountryCodes = [
    { label: 'US/CA (+1)', code: '1' },
    { label: 'UK (+44)', code: '44' },
    { label: 'UAE (+971)', code: '971' },
    { label: 'IN (+91)', code: '91' },
    { label: 'AU (+61)', code: '61' },
    { label: 'FR (+33)', code: '33' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#DDD7CC] shadow-2xl rounded-sm overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:px-6 border-b border-[#E8E4DC] flex items-center justify-between bg-[#F4F1EA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#1C1A17] text-[#FAF9F5] flex items-center justify-center">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl text-[#1C1A17]">
                  Brand Owner Administration
                </h3>
                {isAuthenticated && (
                  <span className="text-[10px] bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] px-2 py-0.5 rounded-xs uppercase tracking-wider font-semibold">
                    Authenticated
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#736B60]">
                {isAuthenticated
                  ? 'Link your business WhatsApp, Instagram handle, and store preferences'
                  : 'Enter owner credentials to access store configuration'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={onLogout}
                className="p-1.5 text-xs text-[#736B60] hover:text-[#B71C1C] flex items-center gap-1 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium">
                  Log Out
                </span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#736B60] hover:text-[#1C1A17] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-md mx-auto text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#EAE5DA] text-[#1C1A17] mx-auto flex items-center justify-center">
                <KeyRound className="w-6 h-6 stroke-[1.5]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-[#1C1A17]">Owner Sign In</h4>
                <p className="text-xs text-[#5A554E] mt-1.5 leading-relaxed font-light">
                  Please enter your admin passcode to configure WhatsApp ordering, Instagram DM links, and store branding.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
                <div className="relative text-left">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={enteredPasscode}
                      onChange={(e) => {
                        setEnteredPasscode(e.target.value);
                        setLoginError('');
                      }}
                      placeholder="Enter store passcode"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736B60] hover:text-[#1C1A17]"
                      aria-label="Toggle password view"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs text-[#B71C1C] text-left">{loginError}</p>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={handleFillDefault}
                    className="text-[#736B60] hover:text-[#1C1A17] underline text-[11px]"
                  >
                    Quick fill default ({config.adminPasscode})
                  </button>
                  <span className="text-[11px] text-[#8C8477]">Passcode protected</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Admin Dashboard</span>
                </button>
              </form>

              <div className="p-3 bg-[#F2EFE9] border border-[#E4DFD5] rounded-xs text-[11px] text-[#736B60] text-left leading-relaxed">
                <span className="font-semibold text-[#1C1A17] block mb-0.5">Quick Note for Owner:</span>
                Default passcode is <code className="font-mono bg-white px-1 py-0.5 border border-[#DDD7CC] rounded text-[#1C1A17]">{config.adminPasscode}</code>. You can change this to any custom passcode in the Security tab after signing in.
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="px-6 border-b border-[#E8E4DC] flex items-center gap-1 sm:gap-2 overflow-x-auto bg-[#FAF9F5]">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`py-3 px-3 text-xs tracking-wider uppercase font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'whatsapp'
                    ? 'border-[#1C1A17] text-[#1C1A17]'
                    : 'border-transparent text-[#736B60] hover:text-[#1C1A17]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Setup</span>
              </button>

              <button
                onClick={() => setActiveTab('instagram')}
                className={`py-3 px-3 text-xs tracking-wider uppercase font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'instagram'
                    ? 'border-[#1C1A17] text-[#1C1A17]'
                    : 'border-transparent text-[#736B60] hover:text-[#1C1A17]'
                }`}
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram Setup</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`py-3 px-3 text-xs tracking-wider uppercase font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'store'
                    ? 'border-[#1C1A17] text-[#1C1A17]'
                    : 'border-transparent text-[#736B60] hover:text-[#1C1A17]'
                }`}
              >
                <Settings className="w-3.5 h-3.5 text-[#736B60]" />
                <span>Store & Currency</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-3 text-xs tracking-wider uppercase font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'security'
                    ? 'border-[#1C1A17] text-[#1C1A17]'
                    : 'border-transparent text-[#736B60] hover:text-[#1C1A17]'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-[#736B60]" />
                <span>Passcode</span>
              </button>
            </div>

            {/* Scrollable Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7">
              {/* TAB 1: WHATSAPP SETUP */}
              {activeTab === 'whatsapp' && (
                <form onSubmit={handleSaveAll} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-xl text-[#1C1A17]">Link Business WhatsApp</h4>
                      <button
                        type="button"
                        onClick={handleTestWhatsApp}
                        className="text-xs text-[#25D366] hover:underline font-medium flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Test WhatsApp Connection</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#5A554E] mt-1 font-light">
                      When customers click "Order Now" or "Send Order via WhatsApp", they are directed to this number with their chosen set details pre-filled.
                    </p>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                      WhatsApp Phone Number (with Country Dial Code)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={form.whatsappNumber}
                        onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                        placeholder="e.g. 15552345678"
                        className="flex-1 px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] font-mono"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#736B60]">
                      <span className="font-medium">Common country prefixes:</span>
                      {quickCountryCodes.map((item) => (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => {
                            const withoutOldCode = form.whatsappNumber.replace(/^[0-9]{1,3}/, '');
                            setForm({ ...form, whatsappNumber: `${item.code}${withoutOldCode}` });
                          }}
                          className="px-1.5 py-0.5 bg-[#EFECE4] hover:bg-[#E5E0D5] text-[#1C1A17] rounded-xs border border-[#DDD7CC]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#736B60]">
                      Enter without plus (+), dashes, or spaces. Example: US/CA: <code className="text-[#1C1A17]">12125550198</code>, UK: <code className="text-[#1C1A17]">447911123456</code>.
                    </p>
                  </div>

                  {/* Custom Order Prefix Greeting */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                      Order Opening Greeting Template
                    </label>
                    <textarea
                      rows={2}
                      value={form.whatsappMessagePrefix || ''}
                      onChange={(e) => setForm({ ...form, whatsappMessagePrefix: e.target.value })}
                      placeholder="Hello ÉPURE! ✨ I would like to order:"
                      className="w-full px-3.5 py-2 bg-white border border-[#DDD7CC] rounded-xs text-xs text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                    />
                    <p className="text-[11px] text-[#736B60]">
                      This introductory line appears at the beginning of every customer's WhatsApp order message.
                    </p>
                  </div>

                  {/* Live Link & Message Preview */}
                  <div className="p-4 bg-[#F2EFE9] border border-[#E4DFD5] rounded-xs space-y-2">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#736B60] block">
                      Live Customer WhatsApp Message Preview
                    </span>
                    <div className="bg-white p-3 rounded-xs border border-[#DDD7CC] text-xs text-[#1C1A17] font-mono whitespace-pre-wrap leading-relaxed">
                      {form.whatsappMessagePrefix || `Hello ${form.brandName}! ✨ I would like to order:`}
                      {'\n• 1x Hydra-Barrier Revival Ritual ($68)'}
                      {'\nCategory: Moisturizer Set (Unisex / All Skin Types)'}
                      {'\n\nPlease confirm availability and payment/shipping options. Thank you!'}
                    </div>
                    <div className="text-[11px] text-[#5A554E] flex items-center justify-between pt-1">
                      <span>Destination URL: <code className="font-mono text-[#1C1A17]">https://wa.me/{cleanPhone(form.whatsappNumber)}</code></span>
                      <button
                        type="button"
                        onClick={handleTestWhatsApp}
                        className="text-[#25D366] font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Launch & Test</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Save WhatsApp Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: INSTAGRAM SETUP */}
              {activeTab === 'instagram' && (
                <form onSubmit={handleSaveAll} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-xl text-[#1C1A17]">Link Instagram Profile & DM</h4>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleTestInstagramProfile}
                          className="text-xs text-[#E1306C] hover:underline font-medium flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleTestInstagramDm}
                          className="text-xs text-[#1C1A17] hover:underline font-medium flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test DM Link</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-[#5A554E] mt-1 font-light">
                      Connect your brand's Instagram. Customers clicking "Order on Instagram" will have their order copied and be redirected straight to your Instagram account or Direct Messages.
                    </p>
                  </div>

                  {/* Handle Field */}
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                      Instagram Username / Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#736B60] font-mono">
                        @
                      </span>
                      <input
                        type="text"
                        value={form.instagramHandle}
                        onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                        placeholder="epure.cosmetics"
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] font-mono"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-[#736B60]">
                      Enter your handle without spaces (e.g. <code className="text-[#1C1A17]">epure.cosmetics</code>).
                    </p>
                  </div>

                  {/* Instagram Custom Message Template */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17]">
                      Instagram DM Order Copied Message Intro
                    </label>
                    <textarea
                      rows={2}
                      value={form.instagramCustomMessage || ''}
                      onChange={(e) => setForm({ ...form, instagramCustomMessage: e.target.value })}
                      placeholder="Hello ÉPURE! I would like to place an order for:"
                      className="w-full px-3.5 py-2 bg-white border border-[#DDD7CC] rounded-xs text-xs text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                    />
                    <p className="text-[11px] text-[#736B60]">
                      This text gets copied to the customer's clipboard with itemized pricing so they can paste it directly into your Instagram Direct Messages.
                    </p>
                  </div>

                  {/* Links Display */}
                  <div className="p-4 bg-[#F2EFE9] border border-[#E4DFD5] rounded-xs space-y-2 text-xs">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-[#736B60] block">
                      Generated Customer Links
                    </span>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between items-center bg-white p-2 border border-[#DDD7CC] rounded-xs">
                        <span>Profile: https://instagram.com/{cleanInstagram(form.instagramHandle)}</span>
                        <a
                          href={`https://instagram.com/${cleanInstagram(form.instagramHandle)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#E1306C] hover:underline"
                        >
                          Open ↗
                        </a>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 border border-[#DDD7CC] rounded-xs">
                        <span>Direct Chat: https://ig.me/m/{cleanInstagram(form.instagramHandle)}</span>
                        <a
                          href={`https://ig.me/m/${cleanInstagram(form.instagramHandle)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#1C1A17] hover:underline"
                        >
                          Open ↗
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Save Instagram Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: STORE & GENERAL SETTINGS */}
              {activeTab === 'store' && (
                <form onSubmit={handleSaveAll} className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl text-[#1C1A17]">Store Branding & Pricing</h4>
                    <p className="text-xs text-[#5A554E] mt-1 font-light">
                      Customize how your brand name, currency symbol, and shipping thresholds appear to visitors.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={form.brandName}
                        onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                        Currency Symbol
                      </label>
                      <input
                        type="text"
                        value={form.currencySymbol}
                        onChange={(e) => setForm({ ...form, currencySymbol: e.target.value })}
                        placeholder="$"
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                        Free Shipping Order Threshold ({form.currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={form.freeShippingThreshold}
                        onChange={(e) =>
                          setForm({ ...form, freeShippingThreshold: Number(e.target.value) || 0 })
                        }
                        min={0}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] tabular-nums"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                        Concierge Working Hours Note
                      </label>
                      <input
                        type="text"
                        value={form.businessHours || ''}
                        onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
                        placeholder="Mon - Sun · 9:00 AM - 9:00 PM"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Save Store Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: SECURITY & PASSCODE */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl text-[#1C1A17]">Admin Security & Passcode</h4>
                    <p className="text-xs text-[#5A554E] mt-1 font-light">
                      Manage the password required to access this administration panel.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F2EFE9] border border-[#E4DFD5] rounded-xs flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#736B60] block text-[11px] uppercase tracking-wider">
                        Current Passcode
                      </span>
                      <code className="text-sm font-mono font-semibold text-[#1C1A17] mt-0.5 block">
                        {form.adminPasscode}
                      </code>
                    </div>
                    <span className="text-[11px] text-[#256029] bg-[#E8F5E9] border border-[#C8E6C9] px-2 py-0.5 rounded-xs font-medium">
                      Active
                    </span>
                  </div>

                  <form onSubmit={handleChangePasscode} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                          New Passcode
                        </label>
                        <input
                          type="text"
                          value={newPasscode}
                          onChange={(e) => setNewPasscode(e.target.value)}
                          placeholder="e.g. secret2026"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1A17] mb-1.5">
                          Confirm New Passcode
                        </label>
                        <input
                          type="text"
                          value={confirmPasscode}
                          onChange={(e) => setConfirmPasscode(e.target.value)}
                          placeholder="Repeat new passcode"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DDD7CC] rounded-xs text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17] font-mono"
                          required
                        />
                      </div>
                    </div>

                    {passcodeError && (
                      <p className="text-xs text-[#B71C1C]">{passcodeError}</p>
                    )}

                    {passcodeSuccess && (
                      <div className="p-2.5 bg-[#E8F5E9] text-[#1B5E20] text-xs flex items-center gap-1.5 rounded-xs border border-[#C8E6C9]">
                        <Check className="w-4 h-4" />
                        <span>Passcode updated successfully! Remember to note it down.</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#1C1A17] hover:bg-[#33302B] text-white text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center gap-2"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Update Passcode</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-3 bg-[#F4F1EA] border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#736B60]">
              <div className="flex items-center gap-2">
                {saveSuccess ? (
                  <span className="text-[#1B5E20] font-medium flex items-center gap-1.5 animate-in fade-in">
                    <Check className="w-4 h-4" />
                    <span>All changes applied to store!</span>
                  </span>
                ) : (
                  <span>Settings auto-saved in your browser storage</span>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-white border border-[#DDD7CC] hover:bg-[#EFECE4] text-[#1C1A17] text-xs uppercase tracking-wider rounded-xs font-medium"
              >
                Close Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
