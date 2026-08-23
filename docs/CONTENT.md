# راهنمای عملی محتوا

## شروع سریع

1. پوشهٔ `content` را در Obsidian به‌عنوان Vault باز کن.
2. از `_templates` قالب مناسب را وارد یک فایل جدید کن.
3. تا زمان آماده‌شدن محتوا `draft: true` را نگه دار.
4. `pnpm dev` را برای پیش‌نمایش و `pnpm check` را پیش از Push اجرا کن.
5. برای انتشار مقدار Draft را `false` کن؛ Obsidian Git تغییر را خودکار Commit و Push می‌کند.

## همگام‌سازی خودکار با Obsidian Git

افزونهٔ Community با نام **Obsidian Git** را نصب کن و این گزینه‌ها را فعال کن:

- Pull هنگام اجرای Obsidian
- Auto commit-and-sync پس از توقف ویرایش یا هر ۱۰ دقیقه
- Push هنگام commit-and-sync
- Branch برابر `main`
- پیام خودکار برابر `content: automatic Obsidian sync`

برای اولین اجرا از Command Palette فرمان **Obsidian Git: Commit-and-sync** را بزن. بعد از آن نوشتن پیام Commit لازم نیست. اگر می‌خواهی قبل از Push خروجی سایت را هم ببینی، `pnpm dev` را جداگانه اجرا کن؛ بررسی نهایی روی GitHub نیز با CI انجام می‌شود.

> Repository عمومی است؛ بنابراین `draft: true` فقط انتشار در سایت را متوقف می‌کند و فایل منبع را در GitHub مخفی نمی‌کند. محتوای محرمانه را داخل این Vault قرار نده.

## نوشتهٔ فارسی

فایل: `content/writing/fa/my-article/index.md`

```yaml
---
title: "عنوان نوشته"
description: "توضیح کوتاه"
publishedAt: 2026-08-23
language: fa
category: personal
tags: [روزمره, تجربه]
draft: true
# updatedAt: 2026-08-24
# translationKey: my-article
# cover:
#   src: ./cover.jpg
#   alt: "توضیح تصویر"
---
```

## English writing

File: `content/writing/en/my-article/index.md`

```yaml
---
title: "Article title"
description: "A short description"
publishedAt: 2026-08-23
language: en
category: technical
tags: [astro, web]
draft: true
# updatedAt: 2026-08-24
# translationKey: my-article
---
```

دستهٔ نوشته فقط یکی از این مقادیر است:

```text
technical | personal | spiritual | learning
```

در برچسب انگلیسی از حروف کوچک و در فارسی از یک املای ثابت استفاده کن. تغییر املا یک صفحهٔ Tag جدا می‌سازد.

## پروژه

فایل: `content/projects/fa/project-slug/index.md`

```yaml
---
name: "نام پروژه"
description: "توضیح کوتاه"
year: 2026
status: active
featured: false
language: fa
technologies: [Astro, TypeScript]
draft: true
# website: "https://example.com"
# repository: "https://github.com/username/project"
# translationKey: project-key
# cover:
#   src: ./cover.jpg
#   alt: "توضیح تصویر پروژه"
---
```

- `featured: true` پروژه را در خانه نشان می‌دهد.
- `website` و `repository` باید URL کامل باشند.
- وضعیت معتبر: `active`, `experimental`, `maintained`, `archived`.
- ترجمهٔ پروژه همان `translationKey` را می‌گیرد؛ نام فایل/Slug می‌تواند متفاوت باشد.

## مجموعهٔ عکاسی

ساختار پیشنهادی:

```text
content/photography/
├── assets/yazd-at-night/
│   ├── cover.jpg
│   ├── 001.jpg
│   └── 002.jpg
└── fa/yazd-at-night/index.md
```

فایل مجموعه:

```yaml
---
title: "یزد در شب"
description: "مجموعه‌ای از خیابان‌ها و نور شب"
publishedAt: 2026-08-23
language: fa
draft: true
tags: [یزد, شب, معماری]
# translationKey: yazd-at-night
cover:
  src: ../../assets/yazd-at-night/cover.jpg
  alt: "کوچه‌ای در یزد در شب"
photos:
  - src: ../../assets/yazd-at-night/001.jpg
    title: "کوچه"
    alt: "کوچهٔ خشتی زیر نور شب"
    caption: "توضیح اختیاری عکس"
    tags: [کوچه, نور]
    commercialUse: paid
    highRes: paid
  - src: ../../assets/yazd-at-night/002.jpg
    alt: "نمای یک بادگیر در شب"
    tags: [بادگیر, معماری]
    commercialUse: free
    highRes: free
---
```

فرایند افزودن عکس:

1. مجموعه و پوشهٔ `assets/<collection-slug>` را بساز.
2. فقط JPEG/WebP/AVIFهای Web-ready را داخل Assets بگذار؛ ترجیحاً sRGB و با ضلع بلند حدود ۲۰۰۰ تا ۲۴۰۰ پیکسل.
3. Cover و هر Photo را با مسیر نسبی وارد Frontmatter کن.
4. برای هر عکس Alt، Tag و دو وضعیت مجوز را تعیین کن.
5. `pnpm dev` و سپس `pnpm check` را اجرا کن.
6. در پایان `draft: false` و سپس Commit/Push کن.

### مجوز عکس

- `commercialUse: free`: استفادهٔ شخصی و تجاری رایگان طبق شرایط سایت.
- `commercialUse: paid`: استفادهٔ شخصی رایگان؛ استفادهٔ تجاری نیازمند مجوز پولی.
- `highRes: free`: نسخهٔ باکیفیت قابل ارائهٔ رایگان است.
- `highRes: paid`: نسخهٔ باکیفیت فقط از مسیر درخواست/خرید آینده ارائه می‌شود.

هیچ مسیر فایل Original یا RAW را در YAML ننویس. Originalها باید بیرون از Repository باشند؛ برای نمونه `E:\Photography Originals\<collection>\`. قرار ندادن دکمهٔ Download امنیت ایجاد نمی‌کند: هر فایلی که وارد Build شود عمومی است.

## Draft و انتشار

Draft پیش‌فرض Schema برابر `true` است. Draftها از Route، Home، List، Tags، RSS، Sitemap و Search حذف می‌شوند.

```yaml
draft: true  # در حال نوشتن
draft: false # آمادهٔ انتشار
```

## ترجمه

دو فایل ترجمه‌شده یک کلید مشترک و پایدار می‌گیرند:

```yaml
translationKey: shared-key
```

وجود ترجمه اجباری نیست. وقتی نسخهٔ دوم وجود نداشته باشد، سایت لینک `hreflang` جعلی تولید نمی‌کند.

## بررسی پیش از انتشار

```bash
pnpm check
git status
```

در `git status` نباید `.obsidian`, فایل RAW، پوشهٔ Originals یا تصویر Master دیده شود.
