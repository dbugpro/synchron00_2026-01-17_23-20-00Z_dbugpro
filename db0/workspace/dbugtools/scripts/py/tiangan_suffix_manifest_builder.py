import csv
import os
from datetime import datetime

"""
TIANGAN_SUFFIX_MANIFEST_BUILDER v2.4
Architecture: Synchronos OS / Tiangan Kernel
Baseline detection logic restored.
"""

def build_tiangan_manifest(output_path="../../../../../config/tiangan_suffix_manifest.csv"):
    suffixes = ["0", "00", "X", "Alpha", "Beta", "Omega", "Prime", "Kernel"]
    username = "dbugpro"
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "../../../../../"))
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True) if os.path.dirname(output_path) else None

    try:
        with open(output_path, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["# TIANGAN_MANIFEST_V1"])
            writer.writerow(["# GENERATED_AT", datetime.now().isoformat()])
            writer.writerow(["# SIGNATURE", "Bugs are free !!!"])
            writer.writerow([])
            writer.writerow(["suffix", "repo_name", "work_directory", "status", "priority"])
            
            for suffix in suffixes:
                work_dir_name = f"db{suffix}"
                work_dir_path = os.path.join(root_dir, work_dir_name)
                
                repo_name = f"synchron{suffix.lower()}"
                status = "PENDING_SPAWN"
                priority = "CORE" if suffix == "0" else "MODULE"
                
                if os.path.exists(work_dir_path):
                    status = "STABLE" if suffix == "0" else "SPAWNED"
                
                writer.writerow([suffix, repo_name, work_dir_name, status, priority])
        print(f"[+] Success: Manifest synchronized.")

    except Exception as e:
        print(f"[X] Kernel Error: {str(e)}")

if __name__ == "__main__":
    build_tiangan_manifest()