"""
OSINT data collection modules
"""

from .search_engine import search_engine_module
from .social_media import social_media_module
from .whois_dns import whois_dns_module
from .breach_db import breach_db_module
from .github import github_module
from .paste_sites import paste_sites_module
from .news_forum import news_forum_module

__all__ = [
    "search_engine_module",
    "social_media_module",
    "whois_dns_module",
    "breach_db_module",
    "github_module",
    "paste_sites_module",
    "news_forum_module"
]

