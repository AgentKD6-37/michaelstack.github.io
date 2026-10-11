# Michael John Stack — Personal Site

A static personal portfolio with a Victorian house visual theme: maroon and
royal navy, antique brass ornament, botanical wallpaper, and parchment panels.

## Preview

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. There is no build step.

## Structure

- `index.html` contains the portfolio, selected-work data, and contact integration.
- `Resume.html` embeds the existing résumé PDF and provides a download link.
- `styles.css` is the shared responsive theme for both pages. The primary colors
  are `--maroon: #582438` and `--navy: #1a3157`.
- `assets/victorian/` contains the original SVG wallpaper and botanical ornaments.
- `CNAME` retains the existing `michaeljohnstack.com` domain.

The inquiry form retains its Google Forms destination and field identifiers.
Avoid sending test submissions to the live form. Its iframe integration cannot
verify server-side acceptance of a submission.

This repository is public so others can inspect the code and offer comments.
Please do not reproduce the site wholesale.

— Michael
