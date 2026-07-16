def analyze_headers(headers):

    findings = []

    if headers.get("Content-Security-Policy") == "Missing":
        findings.append({
            "severity": "Medium",
            "title": "Missing Content Security Policy",
            "recommendation": "Implement a Content-Security-Policy header."
        })

    if headers.get("Strict-Transport-Security") == "Missing":
        findings.append({
            "severity": "Medium",
            "title": "Missing HSTS",
            "recommendation": "Enable HTTP Strict Transport Security."
        })

    if headers.get("X-Content-Type-Options") == "Missing":
        findings.append({
            "severity": "Low",
            "title": "Missing X-Content-Type-Options",
            "recommendation": "Set X-Content-Type-Options: nosniff."
        })

    return findings