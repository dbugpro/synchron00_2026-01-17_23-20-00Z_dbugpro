import json
import os
from datetime import datetime

"""
SYNCHRON_GLOSSARY_BUILDER v2.9
Added official 'seed_repo' definition and multiplicity rules.
"""

def build_glossary():
    glossary = {
        "system": "Synchron OS project A",
        "terms": {
            "adminp": "The primary human administrator (dbugpro).",
            "admins": "The primary AI orchestration administrator (synchron).",
            "seed_module": "The db0 directory, the permanent genesis of every repository.",
            "seed_repo": "A repository with the 'synchron0_' prefix. Multi-seed merges are forbidden.",
            "credential_injection": "The forbidden act of programmatically inserting AdminP signatures.",
            "manual_handshake": "The required human-verified entry of the command ritual.",
            "new_module": "A standalone functional node (db{suffix}) created by a user.",
            "spawning": "The process of generating a new module directory using the builder.",
            "consensus": "The dual-signature requirement for kernel-level tasks.",
            "bugsarefree": "The core protocol signature.",
            "BIBA": "Banned Actions By Intuition - Forbidden to perform even by impulse (e.g., merging two seeds).",
            "BABR": "Banned Actions By Request - Forbidden to perform even if requested (e.g., integrating deprecated seeds)."
        },
        "version": "1.10",
        "last_update": datetime.now().isoformat()
    }
    
    path = "../../../../../config/synchron_glossary.json"
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        json.dump(glossary, f, indent=2)
    print("[+] synchron_glossary.json updated with seed_repo multiplicity rules.")

if __name__ == "__main__":
    build_glossary()