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
URL = "https://developer.unico.io/pt-BR/developers/sdks-and-tools/web/web-sdk/resources/release-notes"
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

# Cada versão fica em um bloco: <h2>X.Y.Z</h2><p>Lançado em: DD/MM/YYYY</p><ul><li>...</li></ul>
# A primeira <h2> da página é sempre a versão mais recente.
header = soup.find("h2")

if header:
    site_version = header.get_text(strip=True)

    date_tag = header.find_next_sibling("p")
    if date_tag:
        match = re.search(r"(\d{2}/\d{2}/\d{4})", date_tag.get_text())
        if match:
            release_date = match.group(1)

    notes_tag = header.find_next_sibling("ul")
    if notes_tag:
        release_notes = [
            li.get_text(strip=True)
            for li in notes_tag.find_all("li")
            if li.get_text(strip=True)
        ]

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
