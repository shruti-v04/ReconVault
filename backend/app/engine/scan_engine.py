from datetime import datetime
from app.logger import logger
from app.services.dns_service import get_dns_info
from app.services.whois_service import get_whois_info
from app.services.ssl_service import get_ssl_info
from app.services.header_service import get_security_headers
from app.services.tech_service import detect_technology
from app.services.robots_service import get_robots
from app.services.subdomain_service import get_subdomains
from app.database import SessionLocal
from app.models.scan_history import ScanHistory

from app.analyzer.findings import analyze_headers
from app.analyzer.risk_engine import calculate_risk

def run_scan(domain: str):
    logger.info(f"Starting scan for {domain}")

    dns_info = get_dns_info(domain)

    whois = get_whois_info(domain)

    ssl_info = get_ssl_info(domain)

    security_headers = get_security_headers(domain)
 

    findings = analyze_headers(security_headers)

    risk_score = calculate_risk(findings)

    tech = detect_technology(domain)

    robots = get_robots(domain)

    subdomains = get_subdomains(domain)
    db = SessionLocal()

    scan = ScanHistory(
        domain=domain,
        risk_score=risk_score,
        status="completed"
    )

    db.add(scan)
    db.commit()
    db.close()


    logger.info(f"Completed scan for {domain}")

    return {

        "scan_info": {
            "domain": domain,
            "status": "completed",
            "scan_time": datetime.utcnow().isoformat() + "Z"
        },

        "summary": {
        "modules_run": 6,
        "findings": len(findings),
        "risk_score": risk_score
    },

    "findings": findings,

        "results": {

            "dns": dns_info,

            "whois": whois,
            "ssl":ssl_info,
            "security_headers": security_headers,
            "technologies": tech,
            "subdomains": subdomains,
            "robots": robots

        }
    }