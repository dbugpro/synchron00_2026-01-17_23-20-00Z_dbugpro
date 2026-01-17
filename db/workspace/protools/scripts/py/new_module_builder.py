import os
import shutil
import sys
from datetime import datetime

"""
NEW_MODULE_BUILDER v1.4 [RITUAL_ENFORCED]
Architecture: Synchronos OS
Description: CLI tool to spawn a new standalone module directory.
Enforcement: Requires 'command synchron module' ritual and SEED_IMMUTABILITY check.
"""

def parse_ritual_command(cmd_string):
    """
    Parses: command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>
    """
    parts = cmd_string.split()
    if len(parts) < 11:
        return None, None, False

    # Validation of the base command structure
    if parts[0] != "command" or parts[1] != "synchron" or parts[2] != "module":
        return None, None, False
    
    # Extracting credentials based on flag positions
    try:
        if parts[3] != "--init": return None, None, False
        
        suffix = parts[4].replace("--", "") if parts[4].startswith("--") else parts[4]
        username = parts[6]  # --dbugpro <U>
        secret = parts[10]   # --bugsarefree <S>
        
        if secret != "bugsarefree":
            print("[X] BIBR_ERROR: Invalid Secret Signature.")
            return None, None, False
            
        return suffix, username, True
    except IndexError:
        return None, None, False

def build_new_module():
    print("\n[!] AWAITING RITUAL INITIALIZATION...")
    print("[?] Format: command synchron module --init --<SUFFIX> <T> --<USERNAME> <U> --OFF <B> --bugsarefree <S>")
    
    ritual = input("adminp@synchronos:~$ ").strip()
    
    suffix, username, validated = parse_ritual_command(ritual)
    
    if not validated:
        print("[X] BIBA_VIOLATION: Protocol ritual failed. Spawning aborted.")
        return

    # --- SEED_IMMUTABILITY_PROTOCOL_ENFORCEMENT ---
    if suffix == "0" or suffix == "--0":
        print("\n[X] SEED_IMMUTABILITY_VIOLATION: Suffix '0' is the unique Seed Genesis.")
        print("[X] BABR_REFUSAL: You cannot create a new module with tiangan_suffix=0.")
        return
    # -----------------------------------------------

    # 1. Path Setup
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.abspath(os.path.join(script_dir, "../../../../../"))
    
    # Clean suffix string for folder creation
    clean_suffix = suffix.replace("--", "")
    module_dir = os.path.join(root_dir, f"db{clean_suffix}")
    manifest_path = os.path.join(root_dir, "config/tiangan_suffix_manifest.csv")

    print(f"[*] Ritual Accepted. Spawning Node db{clean_suffix} for @{username}...")

    # 2. Structure Creation
    os.makedirs(os.path.join(module_dir, "components"), exist_ok=True)
    os.makedirs(os.path.join(module_dir, "services"), exist_ok=True)
    
    now = datetime.now()
    repo_name = f"synchron{clean_suffix}_{now.strftime('%Y-%m-%d_%H-%M-%S')}Z_{username}"
    
    # 3. README Generation
    readme = f"# Module: {clean_suffix}\n## Repo: {repo_name}\n## Owner: {username}\n\nSpawning verified via module ritual."
    with open(os.path.join(module_dir, "README.md"), 'w') as f:
        f.write(readme)

    # 4. Update Manifest
    if os.path.exists(manifest_path):
        with open(manifest_path, 'a') as f:
            f.write(f"{clean_suffix},{repo_name},db{clean_suffix},SPAWNED,MODULE\n")

    print(f"\n[!] SUCCESS: Node db{clean_suffix} integrated into manifest.")

if __name__ == "__main__":
    build_new_module()