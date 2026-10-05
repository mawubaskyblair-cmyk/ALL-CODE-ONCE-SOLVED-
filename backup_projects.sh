#!/bin/bash

# Configuration
SOURCE_DIR="$HOME/Documents/Projects"
BACKUP_DIR="$HOME/Backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# Ensure backup folder exists
mkdir -p "$BACKUP_DIR"

# Create compressed archive
tar -czf "$BACKUP_FILE" "$SOURCE_DIR" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_FILE"
else
    echo "Backup failed!"
fi

# How to run in terminal:
# chmod +x backup_projects.sh
# ./backup_projects.sh