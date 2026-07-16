import ssl
import socket


def get_ssl_info(domain: str):

    try:
        context = ssl.create_default_context()

        with socket.create_connection((domain, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as secure_sock:

                cert = secure_sock.getpeercert()

                return {
                    "issuer": dict(x[0] for x in cert["issuer"]),
                    "subject": dict(x[0] for x in cert["subject"]),
                    "valid_from": cert["notBefore"],
                    "valid_until": cert["notAfter"],
                }

    except Exception as e:

        return {
            "error": str(e)
        }