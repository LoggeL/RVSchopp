# Upload all folders except the ones in the ignore list via FTP

import os
from ftplib import FTP
import json

# Read credentials from json
with open("credentials.json") as f:
    credentials = json.load(f)

# FTP server details
ftp = FTP(credentials["host"])
ftp.login(credentials["username"], credentials["password"])
ftp.cwd("/public_html")

# List of folders to ignore
ignore = ["upload"]

# List of folders to upload
folders = [f for f in os.listdir(".") if os.path.isdir(f) and f not in ignore]

# Upload all folders
for folder in folders:
    print("Uploading " + folder + "...")
    for root, dirs, files in os.walk(folder):
        for file in files:
            ftp.storbinary(
                "STOR " + os.path.join(root, file), open(os.path.join(root, file), "rb")
            )
    print("Done")
