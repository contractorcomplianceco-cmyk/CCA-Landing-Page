---
name: Image-gen placeholder text
description: AI image generation bakes placeholder words into backgrounds unless the prompt itself forbids text
---

# Generated backgrounds get placeholder text baked in

When using `generateImage` for hero/banner BACKGROUND plates, the model frequently
renders placeholder words ("HEADLINE TEXT", "CALL-TO ACTION BACKGROUND", "SUPER FEEB")
into the empty space — **even when "text" is in the negativePrompt**.

**Why:** the model treats a "hero/banner/slide" prompt as needing a headline, so it
invents one. A negative prompt alone is not enough to suppress it.

**How to apply:** put the constraint in the positive prompt, e.g.
"Pure background plate, absolutely no text or lettering anywhere, no captions, no UI,
no placeholder words." Then also pile text/letters/words/captions/ui/button into
negativePrompt. Always visually inspect generated backgrounds and regenerate the ones
with baked-in text before delivering.
