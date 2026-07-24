#!/usr/bin/env python3
"""Recolor hair in an image using a simple heuristic mask.

This is a best-effort script (OpenCV-based). It detects dark, non-skin
regions and overlays a brown color. For best results, run locally and tweak
parameters like `v_thresh` and `strength`.

Usage:
  python scripts/recolor_hair.py path/to/input.jpg path/to/output.jpg

Dependencies:
  pip install opencv-python numpy pillow
"""
import sys
import os
import cv2
import numpy as np


def recolor_hair(input_path, output_path, color_rgb=(101, 67, 33), strength=0.75, v_thresh=85):
    # color_rgb: (R,G,B) for desired hair color; strength: 0..1 blend
    img = cv2.imread(input_path)
    if img is None:
        raise RuntimeError(f"Cannot read image: {input_path}")

    # convert to HSV and YCrCb for simple heuristics
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

    # skin mask (to avoid recoloring skin). YCrCb skin range heuristic
    skin_mask = cv2.inRange(ycrcb, np.array([0, 133, 77]), np.array([255, 173, 127]))

    # hair candidate: darker pixels (value <= v_thresh) with some saturation
    lower_hair = np.array([0, 30, 0])
    upper_hair = np.array([180, 255, v_thresh])
    hair_mask = cv2.inRange(hsv, lower_hair, upper_hair)

    # remove skin areas from hair mask
    hair_mask = cv2.bitwise_and(hair_mask, cv2.bitwise_not(skin_mask))

    # morphological clean-up
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    hair_mask = cv2.morphologyEx(hair_mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    hair_mask = cv2.morphologyEx(hair_mask, cv2.MORPH_OPEN, kernel, iterations=1)
    hair_mask = cv2.GaussianBlur(hair_mask, (7, 7), 0)

    # prepare overlay color in BGR
    r, g, b = color_rgb
    overlay = np.full_like(img, (b, g, r))

    # normalize mask to 0..1 float
    mask_f = (hair_mask.astype(np.float32) / 255.0)[:, :, None]

    # blend overlay onto original image using strength
    out = img.copy().astype(np.float32)
    out = out * (1 - mask_f * strength) + overlay.astype(np.float32) * (mask_f * strength)
    out = np.clip(out, 0, 255).astype(np.uint8)

    # write output
    cv2.imwrite(output_path, out)
    print(f"Wrote recolored image to: {output_path}")


def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/recolor_hair.py input.jpg output.jpg")
        sys.exit(1)

    inp = sys.argv[1]
    out = sys.argv[2]
    # defaults: warm dark brown
    try:
        recolor_hair(inp, out, color_rgb=(101, 67, 33), strength=0.75, v_thresh=85)
    except Exception as e:
        print("Error:", e)
        sys.exit(2)


if __name__ == '__main__':
    main()
