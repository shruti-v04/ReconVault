import requests


SECURITY_HEADERS = [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy"
]


def get_security_headers(domain: str):

    try:

        response = requests.get(
            f"https://{domain}",
            timeout=5
        )

        headers = {}

        for header in SECURITY_HEADERS:

            headers[header] = response.headers.get(
                header,
                "Missing"
            )

        return headers

    except Exception as e:

        return {
            "error": str(e)
        }