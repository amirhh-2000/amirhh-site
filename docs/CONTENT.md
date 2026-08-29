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

ساده‌ترین حالت: `content/projects/fa/project-slug.md`

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

- برای یک پروژهٔ فارسی فقط همین یک فایل Markdown کافی است؛ متن بعد از Frontmatter محتوای صفحهٔ پروژه می‌شود.
- برای نسخهٔ انگلیسی یک فایل جدا در `content/projects/en/` بساز و در هر دو فایل `translationKey` یکسان بگذار.
- اگر پروژه Cover یا فایل جانبی دارد، به‌جای فایل تکی از ساختار `content/projects/fa/project-slug/index.md` استفاده کن و تصویر را کنار آن بگذار.
- `featured: true` پروژه را در خانه نشان می‌دهد.
- `website` و `repository` باید URL کامل باشند.
- وضعیت معتبر: `active`, `experimental`, `maintained`, `archived`.
- ترجمهٔ پروژه همان `translationKey` را می‌گیرد؛ نام فایل/Slug می‌تواند متفاوت باشد.

## عکاسی

عکاسی برخلاف نوشته‌ها و پروژه‌ها تک‌منبعی است. هر دسته یک فایل دارد و همان عکس‌ها با متن دوزبانه در هر دو نسخهٔ سایت ساخته می‌شوند:

```text
content/photography/yazd-at-night/
├── index.md
└── images/
    ├── old-alley.jpg
    └── blue-door.jpg
```

نمونهٔ مینیمال:

```yaml
---
title:
  fa: "یزد در شب"
  en: "Yazd at Night"
description:
  fa: "مجموعه‌ای از خیابان‌ها و نور شب"
  en: "Streets and light after dark"
publishedAt: 2026-08-23
draft: true
tags: [yazd, night]
photos:
  - src: ./images/old-alley.jpg
    slug: old-alley
    process: photograph
    access:
      type: display-only
---
```

برای هر عکس `src` و `slug` لازم‌اند. `process` منشأ تصویر و `access` روش دسترسی را مشخص می‌کنند. مقدارهای معتبر منشأ `photograph`، `ai-assisted`، `ai-derived` و `ai-generated` هستند. عنوان، Alt، Caption و Tag فقط وقتی مقدار واقعی داری اضافه کن؛ نبودنشان هیچ Placeholder نمایشی نمی‌سازد.

برای عکس دوم و بعدی، فایل را در همان پوشهٔ `images/` بگذار و آیتم تازه‌ای به انتهای `photos` اضافه کن. `slug` باید انگلیسی، ثابت و در کل عکاسی یکتا باشد. صفحهٔ «عکس‌ها» همهٔ تصاویر را در یک Grid نشان می‌دهد؛ دسته روی کارت نقش فیلتر دارد و کلیک روی خود عکس مستقیماً صفحهٔ آن را باز می‌کند.

هر نسبت تصویری پذیرفته می‌شود. Grid برای نظم ظاهری Preview مربعی می‌سازد و صفحهٔ عکس نسبت واقعی را نگه می‌دارد. ۲۴۰۰ پیکسل فقط هدف پیشنهادی برای Preview باکیفیت است، نه الزام؛ سایت از فایل کوچک‌تر نسخهٔ بزرگ‌تر تولید نمی‌کند. دستهٔ Draft می‌تواند با `photos: []` برای آینده آماده بماند، اما دستهٔ منتشرشده باید حداقل یک عکس داشته باشد.

برای عکس یک مکان، دسته را بر اساس موضوع انتخاب کن: پولیش سبک هوش مصنوعی `ai-assisted` و بازتولید یا کارتونی‌سازی مبتنی بر عکس خودت `ai-derived` است و تا وقتی مکان موضوع اصلی و قابل‌شناسایی است، هر دو داخل «اماکن دیدنی» می‌مانند. وقتی تصویر عمدتاً تخیلی شده یا از ابتدا بدون عکس مبنا ساخته شده است، آن را در «آثار مولد» قرار بده.

حالت‌های دسترسی:

```yaml
# فقط نمایش
access:
  type: display-only

# دریافت با هماهنگی ایمیلی
access:
  type: request
  license:
    highResolution: paid
    commercialUse: free

# دانلود رایگان
access:
  type: free
  file: /downloads/old-alley.jpg
  format: JPEG
  dimensions: 2400 × 1600
```

فایل رایگان باید داخل `public/downloads/` باشد و بدون Popup دانلود می‌شود. برای `request`، هرکدام از `highResolution` و `commercialUse` می‌توانند `free` یا `paid` باشند. شرط تجاری پولی بر شرط کیفیت بالا اولویت دارد و فقط یک جمله در Popup نمایش داده می‌شود. ایمیل عمومی `siteConfig.contactEmail` نیز همان‌جا دیده می‌شود. راهنمای کامل در [`PHOTOGRAPHY.md`](PHOTOGRAPHY.md) قرار دارد.

## Draft و انتشار

Draft پیش‌فرض Schema برابر `true` است. Draftها از Route، Home، List، Tags، RSS، Sitemap و Search حذف می‌شوند.

```yaml
draft: true # در حال نوشتن
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

در `git status` دیده‌شدن تنظیمات مشترک `content/.obsidian/` طبیعی است، اما Workspace محلی، فایل RAW، پوشهٔ Originals، تصویر Master یا اطلاعات حساس افزونه‌ها نباید Stage شوند.
