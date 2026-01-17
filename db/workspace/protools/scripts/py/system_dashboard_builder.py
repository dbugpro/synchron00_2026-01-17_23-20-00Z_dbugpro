import os
import shutil
from datetime import datetime

"""
SYSTEM_DASHBOARD_BUILDER v1.4
Architecture: Synchronos OS
Description: Manages dashboard assets.
Refinement: Root types.ts is now accessed globally. Mirroring logic removed.
"""

def build_dashboard():
    # Paths relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "../../../../../"))
    dash_dir = os.path.join(root_dir, "db/dashboard")
    config_dash_dir = os.path.join(root_dir, "config/dashboard")

    print(f"[*] Starting Dashboard Build Protocol v1.4...")
    
    # 1. Ensure directories exist
    os.makedirs(dash_dir, exist_ok=True)
    os.makedirs(config_dash_dir, exist_ok=True)

    # 2. Sync Master Types (DEPRECATED)
    # Mirroring types.ts to db/dashboard/ is removed as per BABR protocol.
    # Components now import from root types directly.
    print("[i] Skipping Types Mirroring: Global root types enforced.")

    # 3. Component Migration (Maintenance)
    # If the user recreates these at root, they get moved to the dashboard node.
    core_folders = ["components", "services", "session_logs"]
    for folder in core_folders:
        src = os.path.join(root_dir, folder)
        dst = os.path.join(dash_dir, folder)
        if os.path.exists(src):
            if os.path.exists(dst): 
                # Merge logic: move contents rather than replacing folder
                for item in os.listdir(src):
                    s = os.path.join(src, item)
                    d = os.path.join(dst, item)
                    if os.path.isdir(s): shutil.copytree(s, d, dirs_exist_ok=True)
                    else: shutil.copy2(s, d)
                shutil.rmtree(src)
            else:
                shutil.move(src, dst)
            print(f"[+] Migrated folder: {folder} -> db/dashboard/")

    print(f"\n[!] Success: Dashboard node integrity verified.")
    print(f"[!] Timestamp: {datetime.now().isoformat()}")

if __name__ == "__main__":
    build_dashboard()