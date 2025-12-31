"""
GitHub Module - Public repository and profile information
"""

import asyncio
import httpx
from typing import List, Dict, Any
from datetime import datetime
from urllib.parse import quote

async def github_module(query_type: str, query_value: str) -> List[Dict[str, Any]]:
    """Gather public GitHub information"""
    results = []
    
    if query_type not in ["username", "email"]:
        return results
    
    # Rate limiting
    await asyncio.sleep(0.3)
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            # GitHub Public API (no auth required for public data)
            if query_type == "username":
                url = f"https://api.github.com/users/{quote(query_value)}"
                
                try:
                    response = await client.get(url, headers={"Accept": "application/vnd.github.v3+json"})
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        results.append({
                            "source": "github",
                            "data": {
                                "username": data.get("login"),
                                "name": data.get("name"),
                                "bio": data.get("bio"),
                                "public_repos": data.get("public_repos", 0),
                                "followers": data.get("followers", 0),
                                "following": data.get("following", 0),
                                "created_at": data.get("created_at"),
                                "profile_url": data.get("html_url"),
                                "note": "Public profile information only"
                            },
                            "confidence": "HIGH",
                            "timestamp": datetime.utcnow().isoformat(),
                            "url": data.get("html_url")
                        })
                        
                        # Get public repositories
                        repos_url = data.get("repos_url")
                        if repos_url:
                            repos_response = await client.get(
                                repos_url, 
                                headers={"Accept": "application/vnd.github.v3+json"},
                                params={"per_page": 5, "sort": "updated"}
                            )
                            
                            if repos_response.status_code == 200:
                                repos = repos_response.json()
                                repo_names = [r.get("name") for r in repos[:5]]
                                
                                results.append({
                                    "source": "github",
                                    "data": {
                                        "type": "repositories",
                                        "username": query_value,
                                        "recent_repos": repo_names,
                                        "total_repos": data.get("public_repos", 0)
                                    },
                                    "confidence": "HIGH",
                                    "timestamp": datetime.utcnow().isoformat()
                                })
                
                except Exception:
                    pass
    
    except Exception:
        pass
    
    return results

