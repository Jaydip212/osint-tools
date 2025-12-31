"""
WHOIS & DNS Module - Domain and IP information
"""

import asyncio
import dns.resolver
import whois
from typing import List, Dict, Any
from datetime import datetime
import re

async def whois_dns_module(query_type: str, query_value: str) -> List[Dict[str, Any]]:
    """Gather WHOIS and DNS information"""
    results = []
    
    if query_type not in ["domain", "ip"]:
        return results
    
    try:
        # WHOIS lookup
        if query_type == "domain":
            domain = query_value.lower().replace("http://", "").replace("https://", "").replace("www.", "")
            domain = domain.split("/")[0]
            
            try:
                w = whois.whois(domain)
                
                whois_data = {
                    "domain": domain,
                    "registrar": w.registrar if hasattr(w, 'registrar') else None,
                    "creation_date": str(w.creation_date[0]) if isinstance(w.creation_date, list) else str(w.creation_date) if w.creation_date else None,
                    "expiration_date": str(w.expiration_date[0]) if isinstance(w.expiration_date, list) else str(w.expiration_date) if w.expiration_date else None,
                    "name_servers": list(w.name_servers) if w.name_servers else [],
                    "status": list(w.status) if isinstance(w.status, list) else [w.status] if w.status else []
                }
                
                results.append({
                    "source": "whois",
                    "data": whois_data,
                    "confidence": "HIGH",
                    "timestamp": datetime.utcnow().isoformat()
                })
            except Exception:
                pass
            
            # DNS records
            try:
                dns_results = {}
                
                # A record
                try:
                    answers = dns.resolver.resolve(domain, 'A')
                    dns_results["A"] = [str(rdata) for rdata in answers]
                except:
                    pass
                
                # MX record
                try:
                    answers = dns.resolver.resolve(domain, 'MX')
                    dns_results["MX"] = [str(rdata) for rdata in answers]
                except:
                    pass
                
                # NS record
                try:
                    answers = dns.resolver.resolve(domain, 'NS')
                    dns_results["NS"] = [str(rdata) for rdata in answers]
                except:
                    pass
                
                if dns_results:
                    results.append({
                        "source": "dns",
                        "data": {
                            "domain": domain,
                            "records": dns_results
                        },
                        "confidence": "HIGH",
                        "timestamp": datetime.utcnow().isoformat()
                    })
            except Exception:
                pass
        
        # IP information (basic)
        elif query_type == "ip":
            # Basic IP validation
            ip_pattern = re.compile(r'^(\d{1,3}\.){3}\d{1,3}$')
            if ip_pattern.match(query_value):
                results.append({
                    "source": "ip_lookup",
                    "data": {
                        "ip": query_value,
                        "note": "IP address detected. For detailed geolocation, use proper IP geolocation APIs."
                    },
                    "confidence": "MEDIUM",
                    "timestamp": datetime.utcnow().isoformat()
                })
    
    except Exception as e:
        pass
    
    return results

