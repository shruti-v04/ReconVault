import requests


def get_robots(domain: str):

    try:

        response = requests.get(
            f"https://{domain}/robots.txt",
            timeout=5
        )

        if response.status_code != 200:
            return {
                "found": False,
                "disallow": [],
                "allow": []
            }

        disallow = []
        allow = []

        for line in response.text.splitlines():

            line = line.strip()

            if line.startswith("Disallow:"):
                disallow.append(line.replace("Disallow:", "").strip())

            elif line.startswith("Allow:"):
                allow.append(line.replace("Allow:", "").strip())

        return {
            "found": True,
            "disallow": disallow,
            "allow": allow
        }

    except Exception as e:

        return {
            "error": str(e)
        }