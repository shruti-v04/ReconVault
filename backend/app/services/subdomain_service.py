import requests


def get_subdomains(domain: str):
    try:
        url = f"https://crt.sh/?q=%25.{domain}&output=json"

        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "ReconVault"
            }
        )

        if response.status_code != 200:
            return []

        data = response.json()

        subdomains = set()

        for item in data:

            name = item.get("name_value", "")

            for sub in name.split("\n"):

                sub = sub.replace("*.", "").strip()

                if sub.endswith(domain):
                    subdomains.add(sub)

        return sorted(subdomains)

    except Exception:
        return []