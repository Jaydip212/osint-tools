"""
OSINT Engine - Core intelligence gathering service
"""

from typing import Dict, List, Any
from datetime import datetime
import asyncio

from app.services.modules import (
    search_engine_module,
    social_media_module,
    whois_dns_module,
    breach_db_module,
    github_module,
    paste_sites_module,
    news_forum_module
)

class OSINTEngine:
    """Main OSINT analysis engine"""
    
    def __init__(self):
        self.modules = {
            "search": search_engine_module,
            "social": social_media_module,
            "whois_dns": whois_dns_module,
            "breach": breach_db_module,
            "github": github_module,
            "paste": paste_sites_module,
            "news": news_forum_module
        }
    
    async def analyze(self, query_type: str, query_value: str) -> Dict[str, Any]:
        """
        Main analysis function
        Returns structured results with risk scoring
        """
        results = []
        
        # Run all modules in parallel
        tasks = []
        for module_name, module_func in self.modules.items():
            task = module_func(query_type, query_value)
            tasks.append(task)
        
        module_results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Process results
        for module_name, module_result in zip(self.modules.keys(), module_results):
            if isinstance(module_result, Exception):
                continue
            if module_result:
                results.extend(module_result)
        
        # Analyze and correlate
        analysis = self._analyze_results(results, query_type, query_value)
        
        return {
            "results": results,
            "analysis": analysis,
            "risk_score": analysis.get("risk_score", "LOW"),
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def _analyze_results(
        self, 
        results: List[Dict[str, Any]], 
        query_type: str, 
        query_value: str
    ) -> Dict[str, Any]:
        """Analyze and correlate results"""
        analysis = {
            "total_sources": len(set(r.get("source") for r in results)),
            "total_findings": len(results),
            "patterns": [],
            "timeline": [],
            "risk_score": "LOW"
        }
        
        # Pattern detection
        usernames = set()
        emails = set()
        domains = set()
        
        for result in results:
            data = result.get("data", {})
            if "username" in data:
                usernames.add(data["username"])
            if "email" in data:
                emails.add(data["email"])
            if "domain" in data:
                domains.add(data["domain"])
        
        if len(usernames) > 1:
            analysis["patterns"].append({
                "type": "username_reuse",
                "description": f"Username found across {len(usernames)} different platforms",
                "usernames": list(usernames)
            })
        
        # Timeline creation
        for result in results:
            if "timestamp" in result:
                analysis["timeline"].append({
                    "date": result["timestamp"],
                    "source": result.get("source"),
                    "event": result.get("data", {}).get("description", "Activity detected")
                })
        
        analysis["timeline"].sort(key=lambda x: x["date"])
        
        # Risk scoring (informational only)
        risk_factors = 0
        if len(results) > 10:
            risk_factors += 1
        if len(emails) > 0:
            risk_factors += 1
        if len(domains) > 1:
            risk_factors += 1
        
        if risk_factors >= 2:
            analysis["risk_score"] = "HIGH"
        elif risk_factors == 1:
            analysis["risk_score"] = "MEDIUM"
        else:
            analysis["risk_score"] = "LOW"
        
        return analysis

# Global instance
osint_engine = OSINTEngine()

