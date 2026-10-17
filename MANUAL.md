# KeySprint - User Manual

KeySprint is a typing tutor for a physical computer keyboard. It has four difficulty levels, live feedback, and it remembers your weak keys so you can practise them on purpose.

## Quick start

1. Open `index.html` in a desktop browser (or serve the folder with `python3 -m http.server 8000`).
2. Pick a level from the four buttons at the top. Each button shows its WPM goal.
3. Click the input box and type the passage with a physical keyboard.

As you type, correct characters turn blue and mistakes turn orange. The card on the right shows your live WPM, accuracy, mistakes, corrections, elapsed time, and a session score.

## What each level is for

- **入门 Beginner (5-10 WPM)** - learn where the keys are, one zone at a time: home row, top row, bottom row, then the whole keyboard.
- **基础 Basic (10-20 WPM)** - longer passages that make your fingers move across rows and regions to build speed.
- **进阶 Advanced (20-35 WPM)** - long passages with uncommon words to practise blind touch typing and accuracy.
- **挑战 Challenge (35+ WPM)** - set a target speed and a length; the text stays visible only for the time your target speed allows.

## Everyday actions

- **Want a new text?** Try **New passage**.
- **Want to start over?** Press **Esc** or click **Reset session** (Esc works even after a round ends).
- **Struggling with the same keys?** Try **Focus practice**. It builds a short, randomized drill that features your weak keys more often, mixed into normal letters, so you practise them without a fixed pattern.
- **In Challenge mode:** set a **Target speed** (WPM) and a **Length** (Short / Medium / Long). Finish before the countdown ends to "beat the clock".
- The tip under the passage rotates through general technique advice (finding F/J, using Shift for capitals, typing symbols, and more).

## How results are measured (statistics disclosure)

- **WPM** = (correctly typed English characters / 5) / elapsed minutes. Correct spaces and punctuation count; wrong characters do not. Live WPM is rounded down, with a one-second minimum at the start.
- **Mistakes** = every wrong keystroke, counted in real time. A mistake stays counted even after you correct it. **Corrections** = the number of backspace/delete presses.
- **Accuracy** = correct keystrokes / (correct keystrokes + mistakes).
- **Session score** = 70% accuracy + 30% speed, where the speed part is capped at 60 WPM, scaled to 0-100.
- **Weak keys** = the letters you miss most often, ranked by error rate (wrong / attempts) and then by raw error count. KeySprint stores a per-key correct/wrong record in your browser's localStorage (key `keysprint_stats_v1`), so habitual errors persist across sessions. Clear your browser's site data to reset this memory.

## Share your feedback

Tap the **💬** button next to the "?" help button. A short form lets you send a suggestion and, if you like, tell us what you enjoyed. When KeySprint is served by `serve.py`, your message is saved to `suggestions.md`; on a plain static host, the app asks you to copy the message and send it to the author.

## Known limits

The app works offline from three static files (`index.html`, `style.css`, `app.js`). It stores no history on a server; the weak-key memory is per browser. WPM is a live estimate for practice, not a certified typing test.
