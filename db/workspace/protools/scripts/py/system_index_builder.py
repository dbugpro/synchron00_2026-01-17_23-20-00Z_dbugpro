import os
from datetime import datetime

"""
SYSTEM_INDEX_BUILDER v1.3
Library: protools (Shared Workspace)
Architecture: Synchron OS project A
Description: Generates a portal-style index.php in config/ that maps suffixes.
"""

def build_system_index(target_path="../../../../../config/index.php"):
    php_content = f"""<?php
/**
 * Synchron OS project A | Portal Hub
 * Generated: {datetime.now().isoformat()}
 * Suffix-less System Entry Point
 */

$system_name = "Synchron OS HUB";
$manifest_path = "tiangan_suffix_manifest.csv"; // Look in the same config/ folder
$active_suffix = isset($_GET['suffix']) ? $_GET['suffix'] : '0';

// Parse manifest to find active modules
$modules = [];
if (file_exists($manifest_path)) {{
    if (($handle = fopen($manifest_path, "r")) !== FALSE) {{
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {{
            if (empty($data) || strpos($data[0], '#') === 0 || $data[0] === 'suffix') continue;
            $modules[] = [
                'suffix' => $data[0],
                'repo' => $data[1],
                'dir' => $data[2],
                'status' => $data[3]
            ];
        }}
        fclose($handle);
    }}
}}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $system_name; ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {{ background-color: #020617; color: #f8fafc; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas; }}
        .glass {{ background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(51, 65, 85, 0.5); }}
        .active-ring {{ box-shadow: 0 0 20px rgba(6, 182, 212, 0.2); border-color: #06b6d4; }}
    </style>
</head>
<body class="min-h-screen p-8 flex flex-col items-center">
    <div class="max-w-6xl w-full">
        <header class="flex justify-between items-center mb-12">
            <div>
                <h1 class="text-3xl font-black italic tracking-tighter uppercase text-white">
                    Synchron <span class="text-cyan-500">Organization</span>
                </h1>
                <p class="text-[10px] text-slate-500 mono uppercase tracking-widest mt-1">Multi-Repo Architecture / Handshake v2.6</p>
            </div>
            <div class="glass px-4 py-2 rounded-xl flex items-center space-x-3">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span class="text-xs font-bold mono">ORG_STATE: STABLE</span>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="space-y-4">
                <h2 class="text-xs font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Detected_Nodes</h2>
                <?php foreach ($modules as $mod): ?>
                    <a href="?suffix=<?php echo $mod['suffix']; ?>" 
                       class="block p-4 rounded-2xl transition-all <?php echo $active_suffix === $mod['suffix'] ? 'glass active-ring' : 'hover:bg-slate-900/50 opacity-60 hover:opacity-100'; ?>">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-bold mono text-cyan-400">node_<?php echo $mod['suffix']; ?></span>
                            <span class="text-[8px] px-2 py-0.5 rounded border border-slate-700 uppercase"><?php echo $mod['status']; ?></span>
                        </div>
                        <p class="text-[10px] text-slate-500 mt-1"><?php echo $mod['repo']; ?></p>
                    </a>
                <?php endforeach; ?>
            </div>

            <div class="lg:col-span-2 space-y-8">
                <div class="glass p-10 rounded-[2.5rem] relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 text-[10px] mono text-slate-700">PRJ_631025771036</div>
                    <h2 class="text-4xl font-black italic mb-2 uppercase">Active_View: <span class="text-cyan-500"><?php echo $active_suffix; ?></span></h2>
                    <p class="text-slate-400 leading-relaxed mb-8 max-w-xl">
                        You are accessing the landing interface for the <b><?php echo $active_suffix; ?></b> suffix. 
                    </p>
                    
                    <div class="flex space-x-4">
                        <button class="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold mono transition-all">
                            ENTER_WORKSPACE
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <footer class="mt-20 pt-8 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-700 mono uppercase tracking-widest">
            <span>© 2026 SYNCHRON ORG</span>
            <span class="italic">bugsarefree</span>
        </footer>
    </div>
</body>
</html>
"""

    target_dir = os.path.dirname(target_path)
    if target_dir and not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

    try:
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(php_content)
        print(f"[+] Success: Portal Hub index.php built in config/.")
    except Exception as e:
        print(f"[X] Builder Error: {str(e)}")

if __name__ == "__main__":
    build_system_index()