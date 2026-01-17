import React from 'react';
import { SessionLogEntry } from '../../../types';

const MOCK_SESSION: SessionLogEntry = {
  session_id: "sess_1737110000",
  timestamp: "2026-01-17T10:30:00.000Z",
  adminp: "dbugpro",
  admins: "synchron",
  events: [
    "Handshake verified.",
    "Root workspace purged.",
    "Modular migration complete.",
    "dbugtools and protools libraries initialized.",
    "Consensus stable."
  ],
  status: "SECURED"
};

const SessionLog: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <span className="w-1 h-3 bg-emerald-500 mr-2 rounded-full" /> SESSION_AUDIT_TRAIL
        </h2>
        <span className="text-[9px] mono text-emerald-400 font-bold">Status: {MOCK_SESSION.status}</span>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-8 text-[10px] mono text-slate-700">
          ID: {MOCK_SESSION.session_id}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div>
              <label className="text-[8px] mono text-slate-600 uppercase tracking-widest block mb-1">Timestamp</label>
              <div className="text-sm text-slate-300 mono">{new Date(MOCK_SESSION.timestamp).toLocaleString()}</div>
            </div>
            <div className="flex space-x-8">
              <div>
                <label className="text-[8px] mono text-slate-600 uppercase tracking-widest block mb-1">AdminP</label>
                <div className="text-sm text-cyan-500 mono font-bold">@{MOCK_SESSION.adminp}</div>
              </div>
              <div>
                <label className="text-[8px] mono text-slate-600 uppercase tracking-widest block mb-1">AdminS</label>
                <div className="text-sm text-purple-500 mono font-bold">{MOCK_SESSION.admins}</div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end">
             <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-[10px] mono font-black uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]">
               INTEGRITY_VERIFIED
             </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] mono text-slate-500 font-black uppercase tracking-widest block mb-4">Event_Sequence</label>
          <div className="space-y-3 relative">
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-800" />
            {MOCK_SESSION.events.map((event, idx) => (
              <div key={idx} className="flex items-start space-x-6 relative group/item">
                <div className="mt-1.5 w-5 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center z-10 group-hover/item:border-emerald-500/50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_emerald]" />
                </div>
                <div className="flex-1 bg-slate-950/40 border border-slate-800/50 rounded-2xl px-6 py-4 hover:bg-slate-950/60 transition-all">
                  <span className="text-[11px] mono text-slate-400 group-hover/item:text-slate-200 transition-colors">{event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] mono text-slate-600 italic uppercase">
          <span>Dual-Signature Enforced</span>
          <span>bugsarefree</span>
        </div>
      </div>
    </div>
  );
};

export default SessionLog;