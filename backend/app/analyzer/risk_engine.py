def calculate_risk(findings):

    score = 0

    for finding in findings:

        if finding["severity"] == "Critical":
            score += 40

        elif finding["severity"] == "High":
            score += 25

        elif finding["severity"] == "Medium":
            score += 15

        elif finding["severity"] == "Low":
            score += 5

    return min(score, 100)