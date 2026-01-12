import json
import sys

def validate_report(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)

        if not isinstance(data, list):
            print("Error: Root element must be a list")
            return False

        for item in data:
            required_keys = ["title", "description", "deepLink", "filePath", "lineNumber", "confidence", "rationale", "context", "language"]
            for key in required_keys:
                if key not in item:
                    print(f"Error: Missing key '{key}' in item: {item}")
                    return False

            if not isinstance(item["confidence"], int) or not (1 <= item["confidence"] <= 3):
                print(f"Error: Invalid confidence value in item: {item}")
                return False

        print("Validation successful: Report is valid JSON and follows schema.")
        return True
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format - {e}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    if validate_report("todo_report.json"):
        sys.exit(0)
    else:
        sys.exit(1)
