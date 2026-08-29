# راهنمای اصلی نگهداری سایت

این فایل مرجع دائمی ساخت محتوا و نگهداری سایت است. اگر چیزی در چت گفته شد که برای انتشارهای بعدی لازم است، خلاصهٔ نهایی آن باید اینجا ثبت شود.

## شروع سریع

1. پوشهٔ `content` را به‌عنوان Vault در Obsidian باز کن.
2. از `content/_templates/` قالب مناسب را بردار.
3. تا پایان کار `draft: true` را نگه دار.
4. سایت را با `pnpm dev` روی `http://localhost:4321` ببین.
5. پیش از Push، `pnpm check` و سپس `git status` را اجرا کن.
6. برای انتشار، `draft: false` کن، Commit بزن و خودت Push کن.

## نقشهٔ محتوا

```text
content/
├── .obsidian/                 # تنظیمات مشترک Vault
├── _templates/                # قالب‌های آماده؛ روی سایت منتشر نمی‌شود
├── pages/{fa,en}/             # صفحه‌هایی مانند About
├── writing/{fa,en}/           # نوشته‌ها
├── projects/{fa,en}/          # پروژه‌ها
└── photography/               # دسته‌های مشترک فارسی و انگلیسی
    └── <category-slug>/
        ├── index.md
        └── images/
```

نوشته‌ها، پروژه‌ها و صفحه‌های ثابت برای فارسی و انگلیسی فایل جدا دارند. عکاسی تک‌منبعی است: هر دسته فقط یک `index.md` دارد و همان عکس‌ها در هر دو نسخهٔ سایت نمایش داده می‌شوند. این دسته‌ها فقط برای مدیریت و فیلتر هستند؛ صفحهٔ عمومی عکاسی همهٔ عکس‌ها را در یک Grid نشان می‌دهد.

## ساخت نوشته

### فارسی

فایل `content/writing/fa/my-article/index.md` بساز و قالب `content/_templates/writing-fa.md` را وارد کن:

```yaml
---
title: "عنوان نوشته"
description: "توضیح کوتاه و دقیق"
publishedAt: 2026-08-27
language: fa
category: spiritual
tags: [معنا, خودشناسی]
draft: true
# updatedAt: 2026-08-28
# translationKey: my-article
# cover:
#   src: ./cover.jpg
#   alt: "توضیح تصویر"
---
```

### English

فایل `content/writing/en/my-article/index.md` بساز و از `content/_templates/writing-en.md` استفاده کن. برای متصل‌شدن دو ترجمه، در هر دو فایل یک `translationKey` یکسان بگذار. وجود ترجمه اجباری نیست.

### Category و Tag

`category` با `tag` یکی نیست:

- `category` موضوع اصلی و اجباری نوشته است و فقط یک مقدار می‌گیرد.
- `tags` جزئی‌تر، اختیاری و چندتایی‌اند.

دسته‌های معتبر:

```text
technical | personal | spiritual | learning
```

برای متن‌های معنوی یا تأملی عمیق، `category: spiritual` انتخاب اصلی است. Tagهایی مانند `معنا`، `خودشناسی`، `ارزش‌ها` یا `آگاهی` جزئیات را مشخص می‌کنند. املای Tag را همیشه ثابت نگه دار؛ هر املای متفاوت صفحهٔ جدا می‌سازد.

## ساخت پروژه

در ساده‌ترین حالت، فقط یک فایل مثل `content/projects/fa/my-project.md` لازم است:

```yaml
---
name: "نام پروژه"
description: "توضیح کوتاه پروژه"
year: 2026
status: active
featured: false
language: fa
technologies: [Python, Django, Redis]
draft: true
# website: "https://example.com"
# repository: "https://github.com/username/project"
# translationKey: my-project
# cover:
#   src: ./cover.jpg
#   alt: "توضیح تصویر پروژه"
---
```

وضعیت‌های معتبر:

```text
active | experimental | maintained | archived
```

- متن بعد از Frontmatter بدنهٔ صفحهٔ پروژه است.
- `featured: true` پروژه را در خانه نشان می‌دهد.
- `website`، `repository`، `cover` و `translationKey` اختیاری‌اند.
- برای Cover از ساختار پوشه‌ای `my-project/index.md` استفاده کن و تصویر را کنار آن بگذار.
- برای نسخهٔ انگلیسی فایل جدا در `projects/en/` بساز و `translationKey` مشترک بده.

## ساخت دستهٔ عکس

نام پوشه همیشه Slug انگلیسی با حروف کوچک و خط تیره است؛ عنوان نمایشی فارسی و انگلیسی داخل Frontmatter قرار می‌گیرد:

```text
content/photography/places-to-visit/
├── index.md
├── images/
│   ├── 001.jpg
│   └── 002.webp
```

فایل `content/_templates/photography-category.md` را به `index.md` کپی کن. یک دستهٔ Draft می‌تواند فعلاً `photos: []` داشته باشد؛ دستهٔ منتشرشده باید دست‌کم یک عکس داشته باشد.

نمونهٔ مینیمال:

```yaml
---
title:
  fa: "اماکن دیدنی"
  en: "Places to Visit"
description:
  fa: "مکان‌هایی که ارزش دیدن دارند"
  en: "Places worth seeing"
publishedAt: 2026-08-27
draft: true
tags: []
photos: []
---
```

## افزودن عکس به دستهٔ موجود

1. نسخهٔ Web-ready را داخل `images/` همان دسته بگذار؛ Original یا RAW را بیرون Repository نگه دار.
2. یک آیتم به انتهای `photos` در `index.md` اضافه کن.
3. ابتدا با `draft: true` بررسی کن و سپس منتشر کن.

حداقل متادیتا:

```yaml
photos:
  - src: ./images/001.jpg
    slug: stable-photo-slug
    process: photograph
    access:
      type: display-only
```

همهٔ موارد زیر واقعاً اختیاری‌اند و اگر ننویسی روی سایت نمایش داده نمی‌شوند:

```yaml
- src: ./images/001.jpg
  slug: old-alley
  process: ai-assisted
  title:
    fa: "عنوان عکس"
    en: "Photograph title"
  alt:
    fa: "توضیح دقیق عکس"
    en: "Accurate photograph description"
  caption:
    fa: "یادداشت کوتاه"
    en: "A short note"
  tags: [yazd, architecture]
  access:
    type: request
    license:
      highResolution: paid
      commercialUse: free
```

`slug` عکس اجباری است و باید فقط از حروف کوچک انگلیسی، عدد و خط تیره ساخته شود. Slug را در کل بخش عکاسی یکتا و ثابت نگه دار؛ آدرس مستقیم عکس از همین مقدار ساخته می‌شود.

### منشأ عکس و هوش مصنوعی

```text
photograph   عکس مستقیم دوربین یا گوشی
ai-assisted  عکس خودت با پولیش سبک، حذف نویز، اصلاح نور یا Upscale
ai-derived   بازتولید، کارتونی‌سازی یا تغییر محسوس بر پایهٔ عکس خودت
ai-generated تصویر ساخته‌شده از ابتدا با هوش مصنوعی
```

موضوع، دسته را تعیین می‌کند و `process` منشأ را. مثلاً عکس یک بنای واقعی که با AI خوش‌رنگ یا کارتونی شده، تا وقتی مکان موضوع اصلی و قابل‌شناسایی است در «اماکن دیدنی» می‌ماند و `process: ai-assisted` یا `ai-derived` می‌گیرد. تصویر کاملاً تخیلی یا مولد در «آثار مولد» قرار می‌گیرد.

### ابعاد و نسبت تصویر

- نسبت افقی، عمودی و موبایلی همگی مجازند.
- Grid برای هماهنگی، Preview را داخل قاب ثابت Crop می‌کند؛ صفحهٔ خود عکس نسبت واقعی را نگه می‌دارد.
- ۲۴۰۰ پیکسل هدف پیشنهادی است، نه شرط. سایت تصویر کوچک را بزرگ‌نمایی نمی‌کند.
- برای Web معمولاً JPEG/WebP با فضای رنگی sRGB و حجم حدود ۲۰۰ تا ۵۰۰ کیلوبایت مناسب است.
- Original، RAW و فایل پولی را داخل `content/` یا `public/` نگذار؛ هر چیزی که Build به آن دسترسی دارد می‌تواند عمومی شود.

### ساختار مسیرهای عکاسی

```text
/{locale}/photography/                 همهٔ عکس‌ها + فیلتر دسته
/{locale}/photography/<photo-slug>/    صفحهٔ نهایی عکس
```

کلیک روی عکس مستقیماً صفحهٔ نهایی را باز می‌کند. کلیک روی نام دسته همان Grid را فیلتر می‌کند و مرحلهٔ میانی وجود ندارد. اگر صفحه‌ای رندر نشد، ابتدا یکتا بودن `slug`، وجود فایل `src`، درست‌بودن تورفتگی YAML و `draft` را بررسی کن؛ سپس سرور Dev را یک بار متوقف و دوباره با `pnpm dev` اجرا کن و `pnpm check` بزن.

## پرامپت آرشیوی ساخت Preview دسته

آیکن دسته دیگر در رابط عمومی سایت استفاده نمی‌شود؛ متن زیر برای حفظ زبان بصری و استفادهٔ احتمالی آینده نگه داشته شده است.

آیکن «اماکن دیدنی» را مرجع اصلی و آیکن «طبیعت» را مرجع دوم به مدل تصویر بده. فقط `{{SUBJECT}}` را عوض کن؛ مثلاً `a car`.

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

خروجی باید PNG شفاف واقعی یا SVG تمیز باشد. برای آیکن‌های هندسی آینده SVG انتخاب بهتر و سبک‌تری است، ولی تبدیل آیکن‌های فعلی به SVG فقط وقتی ارزش دارد که مسیرهای برداری واقعی در دسترس باشند؛ Trace خودکار PNG معمولاً کیفیت لبه‌ها را خراب می‌کند.

## تغییر صفحه‌های ثابت و بخش‌های خاص

همهٔ متن‌های سایت Markdown نیستند. قاعدهٔ ساده این است:

- محتوای بلند و مستقل مثل About در `content/` قرار دارد.
- متن‌های کوتاه رابط، عنوان بخش‌ها و ترجمه‌های ثابت در `src/i18n.ts` قرار دارند.
- ترتیب و ساختار صفحه‌ها در `src/pages/` تعریف می‌شود.
- Header، Footer، کارت‌ها و اجزای تکرارشونده در `src/components/` قرار دارند.
- نام سایت، منو، شبکه‌های اجتماعی و دامنه در `src/site.config.ts` قرار دارند.

### نقشهٔ دقیق محل تغییرها

| چیزی که می‌خواهی تغییر بدهی                             | فایل اصلی                                      |
| ------------------------------------------------------- | ---------------------------------------------- |
| متن صفحهٔ About فارسی                                   | `content/pages/fa/about.md`                    |
| متن صفحهٔ About انگلیسی                                 | `content/pages/en/about.md`                    |
| متن معرفی زیر «سلام!» و `Hello!`                        | `src/i18n.ts`، مقدار `intro` در زبان مربوطه    |
| خود عنوان «سلام!» و `Hello!`                            | `src/pages/[locale]/index.astro`               |
| ترتیب بخش‌های صفحهٔ خانه                                | `src/pages/[locale]/index.astro`               |
| عنوان‌های ثابت مثل «آخرین نوشته‌ها» و «پروژه‌های منتخب» | `src/i18n.ts`                                  |
| نام و لینک‌های منوی بالای سایت                          | `src/site.config.ts`، بخش `menuLinks`          |
| نام سایت، توضیح متا، دامنه و شبکه‌های اجتماعی           | `src/site.config.ts`، بخش `siteConfig`         |
| متن و لینک‌های Footer                                   | `src/components/layout/Footer.astro`           |
| ساختار Header، لوگو، زبان و منو                         | `src/components/layout/Header.astro`           |
| متادیتای عمومی، فونت، Favicon و Open Graph              | `src/components/BaseHead.astro`                |
| چیدمان مشترک همهٔ صفحات                                 | `src/layouts/Base.astro`                       |
| صفحهٔ فهرست نوشته‌ها                                    | `src/pages/[locale]/writing/index.astro`       |
| صفحهٔ فهرست پروژه‌ها                                    | `src/pages/[locale]/projects/index.astro`      |
| Grid همهٔ عکس‌ها و فیلتر دسته                           | `src/pages/[locale]/photography/index.astro`   |
| صفحهٔ مستقیم هر عکس                                     | `src/pages/[locale]/photography/[photo].astro` |
| کارت نوشته، پروژه یا عکس                                | فایل متناظر در `src/components/content/`       |
| رنگ‌ها، تایپوگرافی و حالت تاریک                         | `src/styles/global.css`                        |

### ویرایش About

برای About فقط فایل Markdown زبان مربوطه را باز کن:

```text
content/pages/fa/about.md
content/pages/en/about.md
```

نمونهٔ Frontmatter:

```yaml
---
title: "درباره من"
description: "توضیح کوتاه برای موتور جست‌وجو"
language: fa
translationKey: about
draft: false
---
```

متن بعد از Frontmatter محتوای صفحه است. `translationKey: about` باید در نسخهٔ فارسی و انگلیسی یکسان بماند تا تغییر زبان به صفحهٔ متناظر برود. عنوان و توضیح متا را هم متناسب با متن جدید اصلاح کن.

### ویرایش صفحهٔ خانه

صفحهٔ خانه دو بخش دارد:

1. متن ثابت معرفی از `src/i18n.ts` خوانده می‌شود:

```ts
fa: {
  intro: "متن فارسی",
},
en: {
  intro: "English text",
},
```

2. ساختار صفحه در `src/pages/[locale]/index.astro` است. عنوان «سلام!» و `Hello!`، جای متن معرفی، آخرین نوشته‌ها و پروژه‌های منتخب آنجا چیده شده‌اند.

فهرست آخرین نوشته‌ها را دستی داخل صفحهٔ خانه ننویس؛ سایت آن را از نوشته‌های منتشرشده می‌سازد. پروژه‌های خانه نیز از پروژه‌هایی می‌آیند که `featured: true` دارند. برای تغییر ترتیب کلی بخش‌ها یا تعداد آیتم‌ها، فایل `index.astro` را تغییر بده.

### تغییر متن‌های ثابت رابط

فایل `src/i18n.ts` فرهنگ لغت رابط سایت است. هر کلید معمولاً یک مقدار فارسی در `fa` و یک مقدار انگلیسی در `en` دارد؛ برای نمونه:

```ts
latestWriting: "آخرین نوشته‌ها",
photography: "عکس‌ها",
noItems: "هنوز چیزی اینجا منتشر نشده است.",
```

هنگام افزودن کلید جدید، آن را در هر دو زبان اضافه کن تا TypeScript نبودن ترجمه را تشخیص بدهد. متن‌های محتوایی بلند را وارد این فایل نکن؛ آن‌ها باید Markdown باشند.

### تغییر منو، نام سایت و لینک‌ها

در `src/site.config.ts`:

- `siteConfig.url`: دامنهٔ اصلی
- `siteConfig.languages.fa/en`: نام و توضیح سایت در هر زبان
- `siteConfig.socials`: لینک GitHub و LinkedIn
- `menuLinks.fa/en`: عنوان، ترتیب و آدرس گزینه‌های منو

اگر گزینه‌ای به منو اضافه می‌کنی، اول مطمئن شو Route آن واقعاً وجود دارد. تغییر نام یک گزینه فقط عنوان نمایشی را عوض می‌کند و نباید `path` را بی‌دلیل تغییر بدهی.

### افزودن یک صفحهٔ ثابت جدید

ساخت یک فایل Markdown به‌تنهایی Route تازه نمی‌سازد. برای صفحه‌ای مانند `contact`:

1. `content/pages/fa/contact.md` و در صورت نیاز `content/pages/en/contact.md` را بساز.
2. در هر دو نسخه `translationKey: contact` بگذار.
3. یک Route مانند `src/pages/[locale]/contact.astro` بساز که محتوای این فایل‌ها را بخواند. `src/pages/[locale]/about.astro` نمونهٔ مناسب است.
4. اگر باید در منو باشد، لینک فارسی و انگلیسی را به `menuLinks` اضافه کن.
5. Route فارسی و انگلیسی، عنوان صفحه، تغییر زبان و حالت Draft را آزمایش کن.

اگر فقط می‌خواهی یک بخش تازه به خانه، Footer یا Header اضافه کنی، فایل Markdown جدید لازم نیست؛ همان Component یا Page مربوطه را تغییر بده.

### بعد از تغییر فایل‌های ثابت

برای تغییر Markdown معمولاً Hot Reload کافی است. بعد از جابه‌جایی فایل، تغییر Schema، ساخت Route تازه یا تغییر مسیر تصویر، سرور Dev را یک بار از نو اجرا کن تا Cache قدیمی باقی نماند. در پایان `pnpm check` را اجرا کن.

## Draft، امنیت و فایل‌های خصوصی

```yaml
draft: true # در سایت نمایش داده نمی‌شود
draft: false # منتشر می‌شود
```

Draft فقط Route، RSS، Sitemap و Search سایت را پنهان می‌کند. اگر Repository عمومی باشد، فایل Markdown همچنان در GitHub دیده می‌شود؛ یادداشت محرمانه را داخل این Vault نگذار.

فایل‌های RAW، Master، نسخهٔ پولی، کلید API، Token و اطلاعات ورود نباید وارد Repository شوند. مسیر محلی Original را هم در Frontmatter ثبت نکن.

## Obsidian روی چند دستگاه

تنظیمات `content/.obsidian/` در Git ثبت می‌شوند تا Template folder، افزونه‌ها، ظاهر و تنظیمات Obsidian Git بین دستگاه‌ها یکسان بمانند. فقط `workspace.json`، `workspace-mobile.json` و Cache نادیده گرفته می‌شوند چون چیدمان پنجره‌ها وابسته به دستگاه است.

روی دستگاه جدید:

1. Repository را Clone کن.
2. پوشهٔ `content` را به‌عنوان Vault باز کن.
3. اگر Obsidian دربارهٔ Community plugins هشدار داد، بعد از بررسی نام افزونه‌ها آن‌ها را فعال کن.
4. مطمئن شو Template folder روی `_templates` است.
5. قبل از کار Pull و پس از پایان Commit/Push کن.

فایل‌های تنظیمات افزونه ممکن است در آینده حاوی Token شوند؛ قبل از نصب افزونهٔ جدید، `content/.obsidian/plugins/<plugin>/data.json` را بررسی کن.

## Git و انتشار

Codex تغییرها را Push یا Deploy نمی‌کند مگر صریحاً درخواست شود. گردش‌کار معمول:

```bash
pnpm check
git status
git add .
git commit -m "Update site content"
git push origin main
```

در `git status` نباید Original، RAW، فایل `.env` یا کلید دسترسی دیده شود. پوشهٔ `dist/` خروجی Build است و Commit نمی‌شود.

## دریافت و دانلود عکس

سه حالت `display-only`، `free` و `request` در `docs/PHOTOGRAPHY.md` ثبت شده‌اند. دکمهٔ عکس رایگان مستقیماً فایل `public/downloads/` را دانلود می‌کند و Popup ندارد. برای عکس `request`، دو مقدار `license.highResolution` و `license.commercialUse` وضعیت `free` یا `paid` می‌گیرند. اگر تجاری پولی باشد همان جمله اولویت دارد؛ در غیر این صورت فقط پولی‌بودن کیفیت بالا نمایش داده می‌شود.

ایمیل عمومی پنجرهٔ دریافت از `siteConfig.contactEmail` داخل `src/site.config.ts` خوانده می‌شود. دو متن کوتاه شرط نیز در `downloadRestrictions` داخل `src/i18n.ts` قرار دارند. اطلاعات کارت‌به‌کارت یا NOWPayments فقط در پاسخ خصوصی فرستاده می‌شود و Original، RAW و نسخهٔ پولی همیشه بیرون Repository می‌مانند.

## فایل‌های مرجع تکمیلی

- `docs/CONTENT.md`: نمونه‌های Frontmatter
- `docs/PHOTOGRAPHY.md`: آماده‌سازی، دسته‌بندی، دانلود و تحویل عکس
- `docs/COLLECTION-ICONS.md`: آرشیو پرامپت آیکن‌های دسته
- `content/_templates/`: قالب‌های قابل استفاده در Obsidian
