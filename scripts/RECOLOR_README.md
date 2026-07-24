Recolor Hair Script
===================

This folder contains a simple OpenCV-based script to perform a best-effort hair recolor.

Usage
-----

Install dependencies:

```bash
pip install opencv-python numpy pillow
```

Run the script:

```bash
python scripts/recolor_hair.py src/assets/team-collaboration.jpg src/assets/team-collaboration-darkhair.jpg
```

Notes
-----
- The script uses simple color heuristics (dark non-skin regions) and may not be perfect.
- Tweak parameters in `recolor_hair.py` (`color_rgb`, `strength`, `v_thresh`) for better results.
- For high-quality edits, consider using a hair-segmentation model (U2Net/MODNet) or manual editing in Photoshop/GIMP.
