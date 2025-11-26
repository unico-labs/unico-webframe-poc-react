import requests
from bs4 import BeautifulSoup
import re
import json
import subprocess
import os
import time

# ===============================
# Settings
# ===============================
URL = "https://devcenter.unico.io/unico-idcloud/by-client-integration/pt/sdk/sdks-disponiveis/sdk-web/release-notes"
DEPENDENCY = "unico-webframe"
REPO_PATH = "."  # Path to the local repository

# ===============================
# Step 1: Fetch version, release date and notes from the website
# ===============================
response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")

site_version = None
release_date = None
release_notes = []

# Find the most recent version header (h2/h3/h4 containing "Versão")
header = soup.find(
    lambda tag: tag.name in ["h2", "h3", "h4"] and "Versão" in tag.get_text()
)

if header:
    # Extract version number and release date using regex
    match = re.search(r"Versão\s+([\d.]+)\s*-\s*(\d{2}/\d{2}/\d{4})", header.get_text())
    if match:
        site_version = match.group(1)
        release_date = match.group(2)

    # Collect subsequent elements until another version header is found
    for sib in header.find_next_siblings():
        # Stop if another version header is reached
        if sib.name in ["h2", "h3", "h4"] and "Versão" in sib.get_text():
            break
        # If it's a list, extract all <li> items
        if sib.name in ["ul", "ol"]:
            for li in sib.find_all("li"):
                note_text = li.get_text(strip=True)
                if note_text:
                    release_notes.append(note_text)
        # If it's a paragraph or div, extract its text
        elif sib.name in ["p", "div"]:
            note_text = sib.get_text(strip=True)
            if note_text:
                release_notes.append(note_text)

if not site_version:
    print("❌ Could not capture the version from the website")
    exit(0)

print(f"📦 Latest version on the website: {site_version}")
print(f"🗓️ Release date: {release_date}")

if release_notes:
    print("\n📝 Release notes found:")
    for note in release_notes:
        print(f"- {note}")
else:
    print("⚠️ No release notes were found.")

# ===============================
# Step 2: Read package.json from the target repository
# ===============================
package_json_path = os.path.join(REPO_PATH, "package.json")
with open(package_json_path, "r", encoding="utf-8") as f:
    package_json = json.load(f)

current_version = package_json["dependencies"].get(DEPENDENCY)
print(f"📂 Current version in package.json: {current_version}")

# ===============================
# Step 3: Update dependency if necessary
# ===============================
if current_version != site_version:
    # Update the dependency version in package.json
    package_json["dependencies"][DEPENDENCY] = site_version
    with open(package_json_path, "w", encoding="utf-8") as f:
        json.dump(package_json, f, indent=2, ensure_ascii=False)

    print(f"✅ Updated {DEPENDENCY} to version {site_version}")

    timestamp = int(time.time())

    branch = f"update-{DEPENDENCY}-v{site_version}-{timestamp}"
    tag = f"{DEPENDENCY}-v{site_version}-{timestamp}"

    # Create branch, commit, and push changes
    subprocess.run(["git", "checkout", "-b", branch], check=True)
    subprocess.run(["git", "config", "user.name", "github-actions"], check=True)
    subprocess.run(["git", "config", "user.email", "github-actions@github.com"], check=True)
    subprocess.run(["git", "add", "package.json"], check=True)
    subprocess.run(["git", "commit", "-m", f"chore: bump {DEPENDENCY} to v{site_version}"], check=True)
    subprocess.run(["git", "push", "origin", branch], check=True)

    # Create git tag and push it
    subprocess.run(["git", "tag", "-a", tag, "-m", f"Release {DEPENDENCY} {site_version} ({release_date})"], check=True)
    subprocess.run(["git", "push", "origin", tag], check=True)

    # Create Pull Request using GitHub CLI
    body = f"""
    Automatic update of `{DEPENDENCY}` to version **{site_version}** 📅 Release date: **{release_date}** 🔗 [Official Release Notes]({URL})

    📝 Release notes:
    {chr(10).join(f"- {note}" for note in release_notes)}
    """

    pr_process = subprocess.run([
        "gh", "pr", "create",
        "--title", f"Update {DEPENDENCY} to v{site_version}",
        "--body", body,
        "--head", branch
    ], check=True, capture_output=True, text=True)

    # Extract the PR URL from stdout
    pr_url = pr_process.stdout.strip()
    print(f"✅ Pull Request created: {pr_url}")

    # Export output variables for GitHub Actions
    if "GITHUB_OUTPUT" in os.environ:
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            print(f"updated=true", file=f)
            print(f"new_version={site_version}", file=f)
            print(f"release_date={release_date}", file=f)
            print(f"pr_url={pr_url}", file=f)
            # Join release notes with real line breaks for Slack
            formatted_notes = "\n".join(release_notes).rstrip() if release_notes else "No release notes provided."
            with open(os.environ["GITHUB_OUTPUT"], "a") as f:
                f.write(f"release_notes<<EOF\n{formatted_notes}\nEOF\n")

else:
    print("🔄 Already at the latest version, nothing to do.")
    if "GITHUB_OUTPUT" in os.environ:
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            print(f"updated=false", file=f)
