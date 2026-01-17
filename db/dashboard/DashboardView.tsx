
import React from 'react';

const DashboardView: React.FC = () => {
  const stats = [
    { label: 'Active Nodes', value: '2', status: 'STABLE', color: 'text-cyan-500' },
    { label: 'Sync Strength', value: '94%', status: 'HIGH', color: 'text-emerald-500' },
    { label: 'Consensus Latency', value: '12ms', status: 'OPTIMAL', color: 'text-purple-500' },
    { label: 'Org Repos', value: '2', status: 'VERIFIED', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[1.5rem] relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex flex-col">
              <span className="text-[8px] mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span>
              <span className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</span>
              <span className="text-[7px] mono text-slate-600 mt-2 uppercase tracking-tighter">Status: {stat.status}</span>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center">
            <span className="w-1 h-3 bg-cyan-500 mr-2 rounded-full" /> NODE_HEALTH_DISTRIBUTION
          </h3>
          <div className="space-y-6">
             {[
               { name: 'Node Alpha (0_17)', val: 98, color: 'bg-cyan-500' },
               { name: 'Node Beta (0_16)', val: 92, color: 'bg-emerald-500' },
               { name: 'System Core', val: 100, color: 'bg-purple-500' }
             ].map(node => (
               <div key={node.name} className="space-y-2">
                 <div className="flex justify-between text-[9px] mono uppercase">
                   <span className="text-slate-400">{node.name}</span>
                   <span className="text-slate-200">{node.val}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className={`h-full ${node.color}`} style={{ width: `${node.val}%` }} />
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center">
            <span className="w-1 h-3 bg-blue-500 mr-2 rounded-full" /> ORG_RESOURCE_ALLOCATION
          </h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/50">
                <span className="text-[8px] mono text-slate-600 block mb-1">CPU_UTILIZATION</span>
                <span className="text-sm mono text-blue-400 font-bold">LOW (12%)</span>
             </div>
             <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/50">
                <span className="text-[8px] mono text-slate-600 block mb-1">MEM_FOOTPRINT</span>
                <span className="text-sm mono text-blue-400 font-bold">STABLE (2.4GB)</span>
             </div>
             <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/50">
                <span className="text-[8px] mono text-slate-600 block mb-1">BANDWIDTH_SYNC</span>
                <span className="text-sm mono text-blue-400 font-bold">PEAK (45MB/s)</span>
             </div>
             <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/50">
                <span className="text-[8px] mono text-slate-600 block mb-1">HANDSHAKE_TOKENS</span>
                <span className="text-sm mono text-blue-400 font-bold">UNLIMITED</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
