# Upload all folders except the ones in the ignore list via FTP

import os
from ftplib import FTP, error_perm
import json

# Read credentials from json
with open("credentials.json") as f:
    credentials = json.load(f)

# FTP server details
ftp = FTP(credentials["host"])
ftp.login(credentials["username"], credentials["password"])

# Folder to upload to
ftp.cwd("/htdocs")

# List of folders to ignore
ignore = ["upload", "venv", ".git", ".idea", "__pycache__"]


def placeFiles(ftp, path):
    for name in os.listdir(path):

        # Ignore folders in the ignore list
        if name in ignore:
            continue

        localpath = os.path.join(path, name)
        if os.path.isfile(localpath):
            print("STOR", name, localpath)
            ftp.storbinary("STOR " + name, open(localpath, "rb"))
        elif os.path.isdir(localpath):
            print("MKD", name)

            try:
                ftp.mkd(name)

            # ignore "directory already exists"
            except error_perm as e:
                if not e.args[0].startswith("550"):
                    raise

            print("CWD", name)
            ftp.cwd(name)
            placeFiles(ftp, localpath)
            print("CWD", "..")
            ftp.cwd("..")


placeFiles(ftp, "..")

ftp.quit()
