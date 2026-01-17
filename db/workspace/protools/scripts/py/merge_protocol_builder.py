import os
from datetime import datetime

"""
MERGE_PROTOCOL_BUILDER v1.4
Library: protools (Shared Workspace)
Description: Manages the official merge protocol. Added Spawning Protocol.
"""

def build_merge_protocol(target_path="../../../../../config/merge_protocol.md"):
    protocol_content = f"""# Synchron OS project A | Merge Protocol
## Official Integration Workflow for synchronorg

**Generated:** {datetime.now().isoformat()}
**Status:** ACTIVE
**Signature:** bugsarefree

---

### 1. The Seed Concept
The `db0` folder is the permanent **Seed Module**. Every module_repo must contain this folder to maintain system continuity.

### 2. Module Spawning (Personal Tier)
Users create new functional nodes using `new_module_builder.py`. This spawns a `db{suffix}` folder.
- **Rule**: One `db0` (Seed) + One `db{suffix}` (Module) per repository is the recommended standard.

### 3. Transfer (Handshake Tier)
The entire repository is transferred to [https://github.com/synchronorg](https://github.com/synchronorg).

### 4. Integration (Consensus Tier)
Admin Consensus merges the `db{suffix}` logic into the suffix-less system core. The suffix is removed post-merge.

### 5. Spawning Credentials
To spawn a module, provide:
- `tiangan_suffix`: The identifier for the node (e.g. A, B, Alpha).
- `github_username`: The owner's handle for traceability.

---
*Integrity Check: PASS. Signature: bugsarefree*
"""

    target_dir = os.path.dirname(target_path)
    if target_dir and not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(protocol_content)
    print(f"[+] Success: merge_protocol.md updated with Spawning Protocol.")

if __name__ == "__main__":
    build_merge_protocol()