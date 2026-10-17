# KeySprint — physical-keyboard typing tutor

A small, static desktop-first typing practice app for Week 03. It needs no build step, package manager, backend, or account.

## Run locally

From this directory, use any static file server, for example:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> in a desktop/laptop browser. Opening `index.html` directly also works in most browsers, but a local server is recommended for deployment parity.

## Levels and WPM goals

KeySprint has four levels, selected from the level bar at the top. Each level has a WPM goal shown in the level bar and in the stats card (the goal turns green when your live pace reaches it). Each level also uses punctuation scaled to its difficulty.

| Level | Goal | Focus |
|-------|------|-------|
| 入门 Beginner | 5-10 WPM | Keyboard layout, zone by zone (home row, top row, bottom row, whole keyboard); simple punctuation `. , ;` |
| 基础 Basic | 10-20 WPM | Whole-keyboard, cross-region movement for speed; common punctuation `. , ? ' ;` |
| 进阶 Advanced | 20-35 WPM | Blind touch typing and accuracy on uncommon vocabulary; heavier punctuation `. , ; : - ( ) " ?` |
| 挑战 Challenge | 35+ WPM (self-set target) | Timed display with numbers and symbols (`30`, `40`, `95%`, `98%`, `:`) |

- **入门 Beginner** — passages under 50 words, one keyboard zone at a time so beginners cover the whole keyboard; a home-row diagram shows where the hands rest.
- **基础 Basic** — passages around 100-200 characters spanning the whole keyboard; speed focus with relaxed accuracy pressure.
- **进阶 Advanced** — passages over 200 characters with uncommon vocabulary and heavier punctuation.
- **挑战 Challenge** — the learner sets a target WPM and a text length (Short / Medium / Long), and the passage stays on screen only for the time that speed allows (`length / 5 / target WPM` minutes). A live countdown shows time left; finishing early beats the clock, and running out reports the pace actually reached.

All practice text is plain ASCII: dashes use `-`, quotes and apostrophes are straight, so nothing in a passage needs an input method beyond a normal keyboard.

`New passage`, `Reset session`, and `Esc` reset or change the practice round (Esc works from anywhere on the page, even after a round ends). The intended input is a physical computer keyboard; the layout is responsive but not optimized as a touchscreen typing experience.

## General tips and final feedback

The tip strip under the passage cycles through general technique advice rather than live performance commentary: finding the home position on F/J, holding Shift with the opposite hand for capitals, how to reach symbols, keeping your eyes on the screen, returning to the home row after each key, and keeping a relaxed, light touch.

When a round ends, the Live Feedback card shows a personal improvement suggestion that names the specific weak keys for that round (for example `q (4x), z (3x)`) together with WPM against the level goal, accuracy, and correction count.

## Long-term memory and Focus practice

KeySprint keeps a per-key record of correct and wrong keystrokes in the browser's `localStorage` (key `keysprint_stats_v1`), so habitual errors are tracked across sessions. The final feedback also lists your recurring weak keys from that long-term record.

The **Focus practice** button builds a short drill that repeats your habitual weak keys, so you can practise exactly the keys that cost you time. If there is not enough history yet, it asks you to finish a few rounds first.

## WPM definition

The app calculates English WPM as:

```text
(correctly typed English characters / 5) / elapsed minutes
```

Correct spaces and punctuation are included as characters. A correct character is any inserted character that matches the target at that position; mistyped characters do not count toward WPM. The live WPM is rounded down for display; during the first second, the app uses a one-second minimum to avoid an artificially huge value.

## Mistakes and corrections

Mistakes are counted in real time, not from the final text. Every inserted character that does not match the target at its position adds one to `mistakes`, and this total never decreases - so a wrong key you later fix is still recorded as a mistake. `corrections` counts removed characters (backspace/delete presses). Accuracy is `correct keystrokes / (correct keystrokes + mistakes)`, so it reflects how cleanly you typed, including mistakes you corrected.

## Deploy

Upload `index.html`, `style.css`, and `app.js` to any static host (GitHub Pages, Netlify, Vercel static hosting, or a school server). Keep the three files in the same folder. The Google Fonts import is optional decoration; if it is unavailable, the system fallback fonts still make the app usable.

## Feedback collection

The 💬 button opens a friendly suggestion form. To collect suggestions automatically, run the included `serve.py` (`python3 serve.py`), which serves the static files and saves each `POST /suggestions` entry to `suggestions.md`. On a plain static host without that endpoint, the form falls back to copying the message so the user can send it to the author.

## Known limits

Passages are built in, but weak-key drills are generated from the local history. The long-term record lives in `localStorage`, so it is per-browser and can be cleared by the user; there is no server-side account or history. WPM is a live estimate based on the current passage and timer, not a certified typing test. A user can paste text unless the browser or instructor prevents it; the app is designed for honest physical-keyboard practice rather than cheating prevention.
