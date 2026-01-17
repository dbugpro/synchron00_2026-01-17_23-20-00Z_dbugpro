import React from 'react';
import { TianganModule } from '../../../types';

interface ModuleRegistryProps {
  modules: TianganModule[];
  onMerge: (id: string) => void;
}

const ModuleRegistry: React.FC<ModuleRegistryProps> = ({ modules, onMerge }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
          <span className="w-1 h-3 bg-purple-500 mr-2 rounded-full" /> TIANGAN_ARCHITECTURE
        </h2>
        <span className="text-[9px] mono text-purple-400">v0.1.0-alpha</span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {modules.map(module => (
          <div 
            key={module.id} 
            className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-200 mono">{module.name}</h3>
                <div className="flex items-center space-x-2">
                   <span className="text-[8px] text-slate-500 mono uppercase tracking-tighter">{module.id}</span>
                   <span className="text-[8px] text-emerald-600 mono truncate max-w-[80px]">{module.workFolder}</span>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded text-[8px] mono font-bold uppercase ${
                module.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                module.status === 'merging' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse' :
                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              }`}>
                {module.status}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-1000" 
                  style={{ width: `${module.complexity}%` }} 
                />
              </div>
              <button 
                onClick={() => onMerge(module.id)}
                className="text-[9px] mono text-slate-400 hover:text-purple-400 transition-colors whitespace-nowrap"
              >
                [INIT_MERGE]
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleRegistry;