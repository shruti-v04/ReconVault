from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf(scan):

    filename = f"{scan['scan_info']['domain']}_report.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    story = []

    # Title
    story.append(Paragraph("<b>ReconVault Report</b>", styles["Title"]))

    # Executive Summary
    story.append(Paragraph("<b>Executive Summary</b>", styles["Heading2"]))

    story.append(
        Paragraph(
            f"""
            Target: {scan['scan_info']['domain']}<br/>
            Status: {scan['scan_info']['status']}<br/>
            Risk Score: {scan['summary']['risk_score']} / 100<br/>
            Findings: {scan['summary']['findings']}<br/>
            Scan Time: {scan['scan_info']['scan_time']}
            """,
            styles["BodyText"]
        )
    )

    # Findings
    story.append(Paragraph("<b>Findings</b>", styles["Heading2"]))

    for finding in scan["findings"]:
        story.append(
            Paragraph(
                f"""
                <b>{finding['severity']}</b> - {finding['title']}<br/>
                Recommendation: {finding['recommendation']}
                """,
                styles["BodyText"]
            )
        )

    # DNS
    story.append(Paragraph("<b>DNS Records</b>", styles["Heading2"]))

    dns = scan["results"]["dns"]

    story.append(
        Paragraph(
            "<br/>".join(dns["a_records"]),
            styles["BodyText"]
        )
    )

    # SSL
    story.append(Paragraph("<b>SSL Information</b>", styles["Heading2"]))

    ssl = scan["results"]["ssl"]

    story.append(
        Paragraph(
            f"""
            Issuer: {ssl['issuer']['organizationName']}<br/>
            Valid Until: {ssl['valid_until']}
            """,
            styles["BodyText"]
        )
    )

    # Security Headers
    story.append(Paragraph("<b>Security Headers</b>", styles["Heading2"]))

    headers = scan["results"]["security_headers"]

    for header, value in headers.items():
        story.append(
            Paragraph(
                f"{header}: {value}",
                styles["BodyText"]
            )
        )

    # Build PDF
    doc.build(story)

    return filename