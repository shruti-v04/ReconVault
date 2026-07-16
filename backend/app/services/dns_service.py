import dns.resolver


def resolve_records(domain: str, record_type: str):
    try:
        answers = dns.resolver.resolve(domain, record_type)
        return [str(r) for r in answers]
    except Exception:
        return []


def get_dns_info(domain: str):

    return {

        "a_records": resolve_records(domain, "A"),

        "aaaa_records": resolve_records(domain, "AAAA"),

        "mx_records": resolve_records(domain, "MX"),

        "ns_records": resolve_records(domain, "NS"),

        "txt_records": resolve_records(domain, "TXT")

    }