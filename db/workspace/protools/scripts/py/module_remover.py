import os
import shutil
import csv
import sys
from datetime import datetime

"""
MODULE_REMOVER v1.0 [RITUAL_ENFORCED]
Architecture: Synchronos OS
Description: CLI tool to safely delete a Tiangan module and scrub the manifest.
Enforcement: Requires 'command synchron remove' ritual.
"""

def parse_ritual_command(cmd_string):
    parts = cmd_string.split()
    if len(parts) < 11:
        return None, None, False

    if parts[0] != "command" or parts[1] != "synchron" or parts[2] != "remove":
        return None, None, False
    
    try:
        if parts[3] != "--init": return None, None, False
        suffix = parts[4].replace("--", "") if parts[4].startswith("--") else parts[4]
        username = parts[6]
        secret = parts[10]
        
        if secret != "bugsarefree":
            return None, None, False
            
        return suffix, username, True
    except IndexError:
        return None, None, False

def remove_module():
    print("\n[!] AWAITING REMOVAL RITUAL...")
    print("[?] Format: command synchron remove --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>")
    
    ritual = input("adminp@synchronos:~$ ").strip()
    suffix, username, validated = parse_ritual_command(ritual)
    
    if not validated:
        print("[X] BIBA_VIOLATION: Protocol ritual failed. Removal aborted.")
        return

    if suffix == "0":
        print("\n[X] SEED_IMMUTABILITY_VIOLATION: Suffix '0' is the unique Seed Genesis.")
        print("[X] BABR_REFUSAL: Removal of the Seed Node is prohibited by kernel logic.")
        return

    # 1. Path Setup
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "../../../../../"))
    module_dir = os.path.join(root_dir, f"db{suffix}")
    manifest_path = os.path.join(root_dir, "config/tiangan_suffix_manifest.csv")

    print(f"[*] Ritual Accepted. De-synchronizing Node db{suffix}...")

    # 2. Delete Folder
    removed_files = False
    if os.path.exists(module_dir):
        try:
            shutil.rmtree(module_dir)
            print(f"[+] Directory db{suffix} purged from local storage.")
            removed_files = True
        except Exception as e:
            print(f"[X] Error purging directory: {str(e)}")
    else:
        print(f"[!] Warning: Directory db{suffix} not found.")

    # 3. Scrub Manifest
    updated_rows = []
    found_in_manifest = False
    if os.path.exists(manifest_path):
        with open(manifest_path, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                if row and row[0] == suffix:
                    found_in_manifest = True
                    continue
                updated_rows.append(row)
        
        with open(manifest_path, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(updated_rows)
        print(f"[+] Suffix '{suffix}' scrubbed from tiangan_suffix_manifest.csv.")

    # 4. Final Report
    print("\n" + "="*50)
    print("MODULE REMOVAL PROTOCOL: COMPLETE")
    print("="*50)
    print("\n[!] MANUAL TO-DO LIST FOR ADMINP:")
    print(f"1. Delete GitHub repository 'synchron{suffix}' if it exists in synchronorg.")
    print(f"2. Remove local git branches associated with node_{suffix}.")
    print(f"3. Clear any custom environment variables specifically for db{suffix}.")
    print(f"4. Verify that no pending pull requests remain for this suffix.")
    print("\n[!] CONSENSUS STABLE. bugsarefree.")

if __name__ == "__main__":
    remove_module()
