import React from 'react';

const LIBRARIES = [
  {
    name: 'dbugtools',
    visibility: 'RESTRICTED',
    color: 'amber',
    functions: [
      { name: 'kernel_sync', desc: 'Synchronize core kernel parameters across nodes.' },
      { name: 'biba_audit', desc: 'Run integrity checks on protected kernel files.' },
      { name: 'bibr_lock', desc: 'Initiate core system lock on unauthorized requests.' }
    ]
  },
  {
    name: 'protools',
    visibility: 'PUBLIC',
    color: 'cyan',
    functions: [
      { name: 'ui_pulse', desc: 'Trigger a visual pulse on the system interface.' },
      { name: 'task_sort', desc: 'Reorganize tasks based on neural priority.' },
      { name: 'new_module_builder', desc: 'Spawn a new standalone Tiangan module directory (db{suffix}).' },
      { name: 'module_remover', desc: 'Ritual-enforced removal of a module and its manifest history.' },
      { name: 'session_closer', desc: 'Clean 5-step finalization and status locking of the active session.' },
      { name: 'system_index_builder', desc: 'Update root portal landing page logic.' }
    ]
  }
];

const LibraryView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <span className="w-1 h-3 bg-cyan-500 mr-2 rounded-full" /> SHARED_WORKSPACE_REGISTRY
        </h2>
        <span className="text-[9px] mono text-cyan-400 font-bold">Location: db/workspace/lib</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LIBRARIES.map(lib => (
          <div key={lib.name} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 hover:border-slate-700 transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 p-6 text-[8px] mono font-black uppercase tracking-widest ${lib.color === 'amber' ? 'text-amber-500' : 'text-cyan-500'}`}>
              [{lib.visibility}]
            </div>
            
            <h3 className={`text-2xl font-black italic uppercase mb-6 ${lib.color === 'amber' ? 'text-amber-500' : 'text-cyan-400'}`}>
              {lib.name}
            </h3>

            <div className="space-y-4">
              {lib.functions.map(fn => (
                <div key={fn.name} className="bg-slate-950/60 border border-slate-800/50 rounded-xl p-4 group-hover:bg-slate-950/80 transition-all">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`w-1 h-1 rounded-full ${lib.color === 'amber' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
                    <code className="text-[10px] font-bold text-slate-200">{fn.name}()</code>
                  </div>
                  <p className="text-[10px] text-slate-500 italic leading-relaxed">{fn.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[8px] mono text-slate-600 uppercase tracking-widest">v2.8_INTEGRATED</span>
              <button className="text-[9px] mono text-slate-400 hover:text-white transition-colors underline decoration-slate-800 underline-offset-4">
                [EXPORT_INDEX]
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-amber-950/10 border border-amber-900/30 rounded-3xl mt-10">
        <div className="flex items-center space-x-3 text-amber-500 mb-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[10px] mono font-black uppercase tracking-widest">SECURITY_ADVISORY</span>
        </div>
        <p className="text-[11px] text-amber-500/70 leading-relaxed italic">
          Function calls to the <b>dbugtools</b> library require direct AdminP consensus and are logged in the 
          <code>session_audit.json</code> trail. Unauthorized execution attempts will trigger a BIBR protocol restriction.
        </p>
      </div>
    </div>
  );
};

export default LibraryView;