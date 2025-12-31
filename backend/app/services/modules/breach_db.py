"""
Breach Database Module - Public breach metadata (no passwords)
"""

import asyncio
import httpx
from typing import List, Dict, Any
from datetime import datetime
from urllib.parse import quote

async def breach_db_module(query_type: str, query_value: str) -> List[Dict[str, Any]]:
    """Check public breach databases (metadata only)"""
    results = []
    
    if query_type not in ["email", "username"]:
        return results
    
    # Rate limiting
    await asyncio.sleep(0.5)
    
    # Using Have I Been Pwned API (public, metadata only, no passwords)
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            if query_type == "email":
                # HIBP API - breach check (no passwords, only breach names)
                url = f"https://haveibeenpwned.com/api/v3/breachedaccount/{quote(query_value)}"
                headers = {
                    "hibp-api-key": "",  # Optional, but recommended for higher rate limits
                    "User-Agent": "OSINT-Tool-Educational"
                }
                
                try:
                    response = await client.get(url, headers=headers)
                    
                    if response.status_code == 200:
                        breaches = response.json()
                        breach_names = [b.get("Name", "") for b in breaches]
                        
                        results.append({
                            "source": "breach_database",
                            "data": {
                                "email": query_value,
                                "breaches_found": len(breaches),
                                "breach_names": breach_names,
                                "note": "Metadata only. No passwords or sensitive data accessed."
                            },
                            "confidence": "HIGH",
                            "timestamp": datetime.utcnow().isoformat(),
                            "url": f"https://haveibeenpwned.com/account/{quote(query_value)}"
                        })
                    elif response.status_code == 404:
                        results.append({
                            "source": "breach_database",
                            "data": {
                                "email": query_value,
                                "breaches_found": 0,
                                "status": "No breaches found"
                            },
                            "confidence": "HIGH",
                            "timestamp": datetime.utcnow().isoformat()
                        })
                except Exception:
                    pass
    
    except Exception:
        pass
    
    return results

