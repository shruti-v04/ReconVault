import requests


def detect_technology(domain: str):

    try:

        response = requests.get(
            f"https://{domain}",
            timeout=5
        )

        headers = response.headers

        technologies = {}

        technologies["server"] = headers.get(
            "Server",
            "Unknown"
        )

        technologies["powered_by"] = headers.get(
            "X-Powered-By",
            "Unknown"
        )

        return technologies

    except Exception as e:

        return {
            "error": str(e)
        }