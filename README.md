# amirhh-site

راهنمای نگهداری وب‌سایت شخصی دوزبانهٔ امیرحسین، ساخته‌شده با Astro Cactus. سایت کاملاً استاتیک است و نوشته‌ها، پروژه‌ها و عکس‌ها از Markdown و YAML Frontmatter خوانده می‌شوند.

مرجع اصلی ساخت نوشته، پروژه، دسته و عکس در [`docs/HANDBOOK.md`](docs/HANDBOOK.md) است. نمونه‌های تخصصی‌تر در [`docs/CONTENT.md`](docs/CONTENT.md) و [`docs/PHOTOGRAPHY.md`](docs/PHOTOGRAPHY.md) نگهداری می‌شوند؛ [`docs/COLLECTION-ICONS.md`](docs/COLLECTION-ICONS.md) آرشیو زبان بصری آیکن‌های قدیمی است.

## Development

نیازمندی‌ها: Node.js 22 یا جدیدتر و pnpm.

```bash
pnpm install
pnpm dev
```

پیش از انتشار فقط این فرمان را اجرا کن:

```bash
pnpm check
```

این فرمان TypeScript/Astro، قالب‌بندی و Production Build را بررسی می‌کند و Pagefind را نیز می‌سازد. برای مشاهدهٔ خروجی نهایی:

```bash
pnpm preview
```

خروجی استاتیک در `dist/` ساخته می‌شود و نباید Commit شود.

## Content and Obsidian

این پوشه را مستقیماً به‌عنوان Vault در Obsidian باز کن:

```text
C:\Users\Amir Hossein\Documents\ChatGPT\Personal website\amirhh-site\content
```

از Markdown استاندارد، لینک‌های `[text](url)` و تصاویر `![alt](./image.jpg)` استفاده کن. تنظیمات `content/.obsidian/` در Git ثبت می‌شوند تا Vault روی دستگاه‌های مختلف یکسان باشد؛ فقط فایل‌های Workspace و Cache که وابسته به دستگاه‌اند Ignore می‌مانند.

قالب‌ها در `content/_templates/` قرار دارند. در Obsidian افزونهٔ داخلی **Templates** را فعال کن و Template folder را `_templates` بگذار.

ساختار اصلی:

```text
content/
├── _templates/
├── writing/{fa,en}/
├── projects/{fa,en}/
├── photography/
│   └── <category-slug>/
│       ├── index.md
│       └── images/
│           ├── 001.jpg
│           └── 002.jpg
└── pages/{fa,en}/
```

## Publishing safety

محتوای جدید به‌طور پیش‌فرض Draft است. هنگام نوشتن این مقدار را نگه دار:

```yaml
draft: true
```

فقط وقتی محتوا آماده شد آن را به `false` تغییر بده. Draftها مسیر عمومی ندارند و وارد صفحهٔ خانه، فهرست‌ها، برچسب‌ها، RSS، Sitemap یا Pagefind نمی‌شوند.

## Writing

- فارسی: `content/writing/fa/`
- انگلیسی: `content/writing/en/`
- دسته‌ها: `technical`, `personal`, `spiritual`, `learning`
- ترجمه‌ها: مقدار یکسان `translationKey` در دو فایل
- تصویر جلد اختیاری: کنار فایل Markdown یا داخل پوشهٔ همان نوشته

برای نوشتهٔ دارای تصویر، ساختار پوشه‌ای خواناتر است:

```text
content/writing/fa/my-article/
├── index.md
└── cover.jpg
```

## Projects

پروژه‌ها مستقل از نوشته‌ها و کاملاً Content-driven هستند. برای هر زبان یک فایل Markdown در `content/projects/fa/` یا `content/projects/en/` کافی است؛ مثلاً `content/projects/fa/my-project.md`. اگر Cover یا فایل جانبی داری، ساختار پوشه‌ای `my-project/index.md` خواناتر است. برای پروژهٔ دوزبانه دو فایل با `translationKey` یکسان بساز. `featured: true` پروژه را در بخش پروژه‌های منتخب خانه نشان می‌دهد. وضعیت‌های معتبر:

```text
active | experimental | maintained | archived
```

فیلدهای `website`, `repository`, `cover` و `translationKey` اختیاری‌اند.

## Photography

فقط نسخه‌های Web-ready را در Repository قرار بده:

```text
content/photography/<collection-slug>/
```

هر دسته فقط یک فایل متادیتا با نام `index.md` و یک نام پوشهٔ انگلیسی دارد، اما پوشهٔ `images/` آن می‌تواند هر تعداد عکس داشته باشد. برای افزودن عکس، فایل را داخل `images/` بگذار و یک آیتم با `slug` یکتا به آرایهٔ `photos` اضافه کن. صفحهٔ Photography همهٔ عکس‌ها را در یک Grid سه‌ستونه نشان می‌دهد؛ نام دسته روی کارت همان Grid را فیلتر می‌کند و کلیک روی عکس مستقیماً صفحهٔ مستقل آن را باز می‌کند.

روش دسترسی هر عکس با `access.type` مشخص می‌شود:

```yaml
access:
  type: display-only | request | free
```

- `display-only`: فقط نمایش Preview.
- `request`: دکمهٔ دانلود، شرط پولی ثبت‌شده در `license` را نشان می‌دهد و تحویل Original با ایمیل هماهنگ می‌شود.
- `free`: دانلود مستقیم از فایلی داخل `public/downloads/`.

برای `request`، دو مقدار `license.highResolution` و `license.commercialUse` می‌توانند `free` یا `paid` باشند. اگر استفادهٔ تجاری پولی باشد همان شرط در Popup اولویت دارد؛ در غیر این صورت شرط کیفیت بالا نمایش داده می‌شود.

هیچ قیمت، شماره کارت، لینک پرداخت یا Telegram در رابط عمومی نمایش داده نمی‌شود. ایمیل عمومی از `siteConfig.contactEmail` خوانده و همراه شرایط مجوز داخل پنجرهٔ دریافت نمایش داده می‌شود. جزئیات کامل و نمونهٔ Frontmatter در [`docs/PHOTOGRAPHY.md`](docs/PHOTOGRAPHY.md) آمده است.

### Originals must stay outside this repository

فایل‌های RAW، Master و نسخه‌های پولی را بیرون از پوشهٔ پروژه نگه دار؛ برای مثال:

```text
E:\Photography Originals\
├── Yazd at Night\
├── Streets\
└── Sky\
```

مسیر محلی Original را در Frontmatter ننویس. یک فایل داخل `public/`، `content/` یا هر Import استفاده‌شده توسط Astro می‌تواند در خروجی عمومی قرار بگیرد. `.gitignore` فرمت‌های رایج RAW و پوشه‌های `originals` را به‌عنوان دفاع دوم مسدود می‌کند، اما قاعدهٔ اصلی نگهداری Originals بیرون از Repository است.

## Git

### Obsidian Git (بدون پیام دستی)

افزونهٔ Community با نام **Obsidian Git** را نصب و فعال کن. چون Vault داخل پوشهٔ `content` است و Git Repository یک سطح بالاتر قرار دارد، افزونه همان Repository سایت را پیدا می‌کند. تنظیمات پیشنهادی:

- `Pull on startup`: روشن
- `Auto commit-and-sync after stopping file edits`: روشن
- فاصلهٔ Auto backup: حدود ۱۰ دقیقه
- `Push on commit-and-sync`: روشن
- Commit message: `content: automatic Obsidian sync`
- Branch: `main`

بعد از تنظیم، یک بار از Command Palette فرمان **Obsidian Git: Commit-and-sync** را اجرا کن. از آن پس افزونه تغییرها را Stage، Commit، Pull و Push می‌کند و نیازی نیست برای هر تغییر پیام Commit بنویسی. تنظیمات مشترک Vault نیز همراه Repository همگام می‌شوند؛ چیدمان Workspace هر دستگاه محلی می‌ماند.

> `draft: true` محتوا را از سایت، RSS، Sitemap و Search پنهان می‌کند، اما فایل Markdown داخل یک Repository عمومی همچنان در GitHub قابل دیدن است. هیچ یادداشت محرمانه یا پیش‌نویس خصوصی را در این Repository عمومی ذخیره نکن.

گردش‌کار دستی جایگزین:

```bash
pnpm check
git status
git add content
git commit -m "Add new writing"
git push origin main
```

برای تغییرات کد یا مستندات به‌جای `git add content` از `git add .` استفاده کن. قبل از Commit مطمئن شو هیچ Original، فایل RAW، Workspace محلی یا اطلاعات حساس افزونه‌ها Stage نشده است.

مخزن اصلی Astro Cactus با نام `upstream` نگه داشته می‌شود و مخزن سایت با نام `origin` استفاده می‌شود.

## Domain

منبع اصلی URL تولید در `src/site.config.ts` و مقدار `siteConfig.url` است. Canonical، Sitemap، RSS و Open Graph از `Astro.site`/همین مقدار مشتق می‌شوند. مقدار فعلی `https://artsnet.ir` است.

برای مهاجرت دامنه:

1. `siteConfig.url` را به دامنهٔ جدید تغییر بده.
2. دامنهٔ Custom را در سرویس Hosting تغییر بده.
3. Build و سپس Canonical، Sitemap و RSS را بررسی کن.
4. روی دامنهٔ قبلی Redirect دائمی 301 به مسیر معادل تنظیم کن.

نام دامنه را در Componentها تکرار نکن. لینک `website` داخل محتوای پروژه یک لینک محتوایی مستقل است و در صورت تغییر دامنه باید مثل هر محتوای دیگر بررسی شود.

## Deployment

دو Workflow وجود دارد:

- `.github/workflows/ci.yml`: روی Push/PR به `main` فرمان `pnpm check` را اجرا می‌کند.
- `.github/workflows/deploy.yml`: خروجی استاتیک را برای GitHub Pages می‌سازد و منتشر می‌کند.

Deployment هنوز فعال نیست، چون مخزن خصوصی شخصی و Remote آن ساخته نشده‌اند و GitHub Pages نیز باید در Settings روی **GitHub Actions** تنظیم شود. دامنه و DNS در این Repository به‌صورت خودکار تغییر داده نمی‌شوند.

اگر Repository خصوصی بماند، پیش از انتخاب GitHub Pages بررسی کن پلن GitHub حسابت انتشار Pages از مخزن خصوصی را پشتیبانی می‌کند؛ در غیر این صورت می‌توان همین Build استاتیک را روی میزبانی‌ای که Repository خصوصی را می‌پذیرد منتشر کرد.
