"""Kotaix - minimalist image organizer."""

import os
import shutil
from datetime import datetime
from pathlib import Path

SUPPORTED_FORMATS = (".jpg", ".jpeg", ".png", ".webp")


def get_creation_date(filepath: Path) -> datetime:
    stat = filepath.stat()
    return datetime.fromtimestamp(stat.st_mtime)


def organize(input_dir: str, output_dir: str) -> None:
    input_path = Path(input_dir)
    output_path = Path(output_dir)

    for file in input_path.iterdir():
        if file.suffix.lower() not in SUPPORTED_FORMATS:
            continue

        date = get_creation_date(file)
        dest_folder = output_path / f"{date.year}" / f"{date.month:02d}"
        dest_folder.mkdir(parents=True, exist_ok=True)

        new_name = f"{date.strftime('%Y%m%d_%H%M%S')}{file.suffix.lower()}"
        shutil.copy2(file, dest_folder / new_name)
        print(f"Copied {file.name} -> {dest_folder / new_name}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Organize images by date.")
    parser.add_argument("--input", required=True, help="Input directory")
    parser.add_argument("--output", required=True, help="Output directory")
    args = parser.parse_args()

    organize(args.input, args.output)
