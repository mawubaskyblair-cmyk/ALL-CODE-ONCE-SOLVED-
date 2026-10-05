import json
import urllib.request

def fetch_and_save_json(url: str, output_filename: str) -> None:
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(url, headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
        with open(output_filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
            
        print(f"Data successfully saved to {output_filename}")
    except Exception as e:
        print(f"Error fetching data: {e}")

# How to run:
if __name__ == "__main__":
    fetch_and_save_json("https://api.github.com/users/octocat", "github_user.json")