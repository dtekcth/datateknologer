# Event assets

Reusable placeholder assets for events — used when a host company has
no logo yet (or for test events).

## The placeholder company logo

| File            | Use it when…                                        |
| --------------- | --------------------------------------------------- |
| `exempel-ab.svg`| you want to **change the company name** (template)  |
| `exempel-ab.png`| you just need something to upload right away        |

Both upload fine on the event's edit form in `/en/admin` (the
"Company logo" field). The card renders logos grayscaled, so the
colors are just for the file itself.

### Changing the name

1. Open `exempel-ab.svg` in any **text editor** (not an image editor).
2. Find the line marked `CHANGE THE COMPANY NAME` and replace
   `Exempel AB` inside the `<text>` element.
3. Save as a new file (e.g. `acme-ab.svg`) and upload the `.svg`
   directly — browsers render it fine on the card.

Keep names roughly under ~14 characters so they fit the 600×160
canvas; for longer names, lower the `font-size` in the same element.
