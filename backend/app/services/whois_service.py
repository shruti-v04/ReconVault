import whois


def normalize(value):
    if isinstance(value, list):
        return str(value[0])

    if value is None:
        return None

    return str(value)


def get_whois_info(domain: str):

    try:

        data = whois.whois(domain)

        return {
            "registrar": normalize(data.registrar),
            "created": normalize(data.creation_date),
            "expires": normalize(data.expiration_date),
            "updated": normalize(data.updated_date),
            "name_servers": data.name_servers or []
        }

    except Exception as e:

        return {
            "error": str(e)
        }