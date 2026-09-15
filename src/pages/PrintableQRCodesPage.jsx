import React, { useState } from 'react';
import { Printer, Search, Sparkles, Shield, Download, ArrowLeft, QrCode, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHECKPOINT_THREE_DATA } from '../data/checkpointThreeData';
import { soundEffects } from '../utils/soundEffects';

export default function PrintableQRCodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');

  const monumentsList = Object.values(CHECKPOINT_THREE_DATA);
  const states = ['ALL', ...new Set(monumentsList.map(m => m.state))];

  const filteredMonuments = monumentsList.filter((m) => {
    const matchesSearch = m.monumentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.checkpointName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'ALL' || m.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header Bar (Hidden on Print) */}
      <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-800">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <QrCode className="w-3.5 h-3.5" />
            <span>Official On-Site Archaeological Artifacts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-serif">
            Printable Monument QR Cards
          </h1>
          <p className="text-xs sm:text-sm text-stone-400">
            Print these official QR code badges on A4 paper for classroom expeditions or SIH jury live camera demonstrations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-stone-950 font-black text-sm rounded-2xl shadow-xl transition-all flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ Print All Cards (A4 PDF)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar (Hidden on Print) */}
      <div className="print:hidden flex flex-col sm:flex-row items-center gap-3 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search monument or checkpoint..."
            className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* State Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {states.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedState === st
                  ? 'bg-amber-500 text-stone-950 shadow'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Printable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
        {filteredMonuments.map((item) => (
          <div
            key={item.id}
            className="bg-white text-stone-900 rounded-3xl p-6 border-4 border-amber-600 shadow-xl flex flex-col justify-between space-y-4 print:border-2 print:p-4 print:rounded-2xl print:break-inside-avoid"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center text-amber-800 font-bold text-xs">
                  🏛️
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                    Archaeological Survey of India (ASI)
                  </div>
                  <h3 className="font-serif font-black text-stone-900 text-base leading-tight">
                    {item.monumentName}
                  </h3>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {item.state}
              </span>
            </div>

            {/* Checkpoint Title & Seal */}
            <div className="text-center space-y-1">
              <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                Checkpoint #3 Secret Gateway
              </div>
              <div className="font-serif font-bold text-sm text-stone-800">
                {item.checkpointName}
              </div>
            </div>

            {/* Center QR Code Image */}
            <div className="flex flex-col items-center justify-center p-3 bg-stone-50 rounded-2xl border-2 border-stone-300">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=0f172a&bgcolor=ffffff&data=${encodeURIComponent(item.qrCodeString)}`}
                alt={`QR Code for ${item.monumentName}`}
                className="w-44 h-44 object-contain shadow-sm"
                loading="lazy"
              />
              <code className="text-[10px] font-mono font-bold text-stone-600 mt-2 bg-stone-200/80 px-2 py-0.5 rounded">
                {item.qrCodeString}
              </code>
            </div>

            {/* Card Instructions Footer */}
            <div className="text-center space-y-1 text-[11px] text-stone-600 border-t border-stone-200 pt-3">
              <p className="font-semibold text-stone-800">
                🔍 Scan with <strong>Bharat Heritage Quest</strong> Camera
              </p>
              <p className="text-[10px] text-stone-500">
                Unlocks the Royal Riddle & King's Strategic Decision Question
              </p>
            </div>

            {/* Test Link (Hidden on Print) */}
            <div className="print:hidden pt-2">
              <Link
                to={`/play/${item.id}`}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>🎮 Test in Hunt Expedition</span>
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
