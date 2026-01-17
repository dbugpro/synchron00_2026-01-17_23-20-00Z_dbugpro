import React from 'react';
import { ProjectManifest } from '../../../types';

interface ProjectManifestProps {
  manifest: ProjectManifest;
  onExport: () => void;
}

const ProjectManifestView: React.FC<ProjectManifestProps> = ({ manifest, onExport }) => {
  const targetSystemName = manifest.versionId.replace(/synchron[0A-Z0-9]+_/, 'synchron_');

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span className="text-[10px] font-bold mono text-amber-500 uppercase tracking-widest">TIANGAN_LEDGER</span>
        </div>
        <div className="flex items-center space-x-2">
           <span className="text-[8px] px-2 py-0.5 rounded mono border text-amber-400 border-amber-900/50">
             SEED_MODULE
           </span>
        </div>
      </div>
      
      <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#020617] p-4 rounded-xl border border-slate-800 group hover:border-cyan-500/30 transition-all">
            <label className="block text-[8px] text-slate-600 mono mb-1 uppercase tracking-widest">MODULE_REPO (WITH_SUFFIX)</label>
            <div className="text-[10px] text-cyan-400 mono font-bold break-all leading-tight italic">
              {manifest.versionId}
            </div>
          </div>
          
          <div className="bg-[#020617] p-4 rounded-xl border border-slate-800 group hover:border-emerald-500/30 transition-all">
            <label className="block text-[8px] text-slate-600 mono mb-1 uppercase tracking-widest">SYSTEM_REPO (SUFFIX-LESS_TARGET)</label>
            <div className="text-[10px] text-emerald-400 mono font-bold break-all leading-tight">
              {targetSystemName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="bg-[#020617] p-4 rounded-xl border border-slate-800">
                <label className="block text-[8px] text-slate-600 mono mb-1 uppercase tracking-widest">TIANGAN_SUFFIX</label>
                <div className="text-[10px] text-slate-300 mono font-bold">{manifest.suffix.toUpperCase()}</div>
              </div>
              <div className="bg-[#020617] p-4 rounded-xl border border-slate-800">
                <label className="block text-[8px] text-slate-600 mono mb-1 uppercase tracking-widest">SIGNATURE</label>
                <div className="text-[10px] text-slate-300 mono font-bold">@{manifest.username}</div>
              </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-[9px] text-slate-500 mono uppercase tracking-widest font-black">Architecture Notes</label>
          <div className="bg-[#020617] p-4 rounded-xl border border-slate-800 text-[10px] text-slate-500 leading-relaxed italic">
            This module serves as the functional "Seed" (synchron0). Upon passing dual-admin consensus, it is collected and merged into the suffix-less global system repository within the synchronorg organization.
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-[#020617] border-t border-slate-800 mt-auto">
        <button 
          onClick={onExport}
          className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-[9px] mono font-bold transition-all uppercase tracking-widest"
        >
          Generate_Sync_Manifest
        </button>
      </div>
    </div>
  );
};

export default ProjectManifestView;