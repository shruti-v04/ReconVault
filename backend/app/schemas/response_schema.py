from pydantic import BaseModel
from typing import List, Dict, Any


class ScanInfo(BaseModel):
    domain: str
    status: str
    scan_time: str


class Summary(BaseModel):
    modules_run: int
    findings: int
    risk_score: int


class Finding(BaseModel):
    severity: str
    title: str
    recommendation: str


class DNSResponse(BaseModel):
    a_records: List[str]
    aaaa_records: List[str]
    mx_records: List[str]
    ns_records: List[str]
    txt_records: List[str]


class ScanResults(BaseModel):
    dns: DNSResponse
    whois: Dict[str, Any]
    ssl: Dict[str, Any]
    security_headers: Dict[str, Any]
    technologies: Dict[str, Any]
    robots: Dict[str, Any]
    subdomains: list[str]


class ScanResponse(BaseModel):
    scan_info: ScanInfo
    summary: Summary
    findings: List[Finding]
    results: ScanResults