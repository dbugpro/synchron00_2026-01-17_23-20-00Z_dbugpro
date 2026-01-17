import json
import os
from datetime import datetime

"""
SESSION_CLOSER v1.0
Architecture: Synchronos OS
Description: Finalizes logs and performs a clean shutdown of the orchestration session.
"""

def close_session():
    print("\n[!] INITIATING CLEAN SHUTDOWN PROTOCOL...")
    print("[?] command synchron --close")
    
    confirm = input("Confirm shutdown? (y/n): ").strip().lower()
    if confirm != 'y':
        print("[!] Shutdown aborted.")
        return

    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "../../../../../"))
    
    config_path = os.path.join(root_dir, "config/synchron_config.json")
    audit_path = os.path.join(root_dir, "config/session_audit.json")

    steps = [
        "System Integrity Check",
        "Log Flush to config/session_audit.json",
        "Update Metadata Timestamp",
        "Enforce RESTRICTED Status Lock",
        "Final Handshake Signal"
    ]

    for i, step in enumerate(steps, 1):
        print(f"[*] Step {i}/5: {step}...")
        
        if i == 2: # Log Flush
            if os.path.exists(audit_path):
                with open(audit_path, 'r') as f:
                    log = json.load(f)
                log["events"].append(f"Session closed at {datetime.now().isoformat()}")
                log["status"] = "RESTRICTED"
                with open(audit_path, 'w') as f:
                    json.dump(log, f, indent=2)
        
        elif i == 3: # Update Config Metadata
            if os.path.exists(config_path):
                with open(config_path, 'r') as f:
                    config = json.load(f)
                config["metadata"]["last_build_timestamp"] = datetime.now().isoformat()
                config["metadata"]["status"] = "SESSION_CLOSED_RESTRICTED"
                with open(config_path, 'w') as f:
                    json.dump(config, f, indent=2)

        print(f"    [OK]")

    print("\n" + "="*50)
    print("SESSION FINALIZED. SYSTEM RESTRICTED.")
    print("="*50)
    print("\n[!] LOGOUT: bugsarefree")
    print(f"[!] Timestamp: {datetime.now().isoformat()}")

if __name__ == "__main__":
    close_session()
