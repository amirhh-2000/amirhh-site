# راهنمای ساخت آیکن کالکشن

برای اینکه آیکن‌های جدید واقعاً یک خانوادهٔ بصری باقی بمانند، این دو تصویر را همیشه همراه پرامپت بارگذاری کن:

1. [آیکن اماکن دیدنی](../content/photography/places-to-visit/icon.png) به‌عنوان مرجع اصلی جرم بصری، توازن و نامتقارن‌بودن کنترل‌شده
2. [آیکن طبیعت](../content/photography/nature/icon-v3.png) به‌عنوان نمونهٔ دوم همان سیستم

فقط مقدار `{{SUBJECT}}` را تغییر بده. برای نمونه:

```text
{{SUBJECT}} = a car
```

## پرامپت ثابت

```text
Use case: logo-brand
Asset type: square collection icon for a personal photography website

Subject variable: "{{SUBJECT}}"

Input images:
- Image 1 is the strict master reference for the icon system.
- Image 2 is a sibling-icon reference showing how the same system adapts to another subject.
- Use both images only to learn the shared visual language. Do not copy their subjects or exact silhouettes.

Primary request:
Create one original minimalist icon representing "{{SUBJECT}}".
Choose the smallest number of recognizable visual features needed to communicate the subject clearly.
Translate those features into the exact geometric language established by the reference images.

Visual system — match strictly:
- crisp vector-like isometric block construction
- identical isometric camera angle and facet orientation
- one compact connected silhouette
- controlled asymmetry rather than mirror symmetry
- unequal heights, offsets, extensions, or negative spaces
- approximately 3–5 connected geometric masses
- balanced overall composition despite the irregular structure
- precise flat facets with restrained, understated depth
- no outlines unless a nearly invisible edge is essential
- same approximate visual weight, scale, and padding as the references
- clearly readable at small card-thumbnail size

Color and facet rules:
- dusty pink #d482ab only on upward-facing top planes
- pale green #cdffb8 on illuminated side planes
- mint green #2abc89 on primary and front-facing planes
- preserve the same color balance and face-color logic as the references
- no additional colors

Composition:
- 1:1 square canvas
- single centered icon
- generous transparent padding
- asymmetrical diagonal or branching rhythm
- strong recognizable silhouette
- do not fill the entire canvas

Background:
- genuine transparent alpha
- do not draw or simulate a checkerboard
- no white, black, colored, or textured background

Constraints:
- the variable "{{SUBJECT}}" describes the concept only; never render it as text
- no text, letters, numbers, labels, or captions
- no bilateral symmetry
- no perfectly centered formal composition
- no repetitive equal-sized blocks
- no enclosing circle, square, badge, or border
- no card mockup
- no scenery or environmental background
- no glow, bloom, aura, shadow, reflection, haze, or lighting effects
- no photorealism
- no gradients except an extremely subtle variation inside a single facet
- no logos, trademarks, or watermarks
- do not recreate the Nature or Places icons
- preserve the visual grammar of the references while inventing a new subject-specific silhouette
```

پس از تولید، مطمئن شو فایل واقعاً کانال Alpha دارد؛ نمایش شطرنجی نباید داخل خود PNG ذخیره شده باشد. فایل تأییدشده را کنار `index.md` کالکشن قرار بده و نام دقیقش را در فیلد `icon` ثبت کن.
