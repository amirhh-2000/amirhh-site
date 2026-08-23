# amirhh-site

راهنمای نگهداری وب‌سایت شخصی دوزبانهٔ امیرحسین، ساخته‌شده با Astro Cactus. سایت کاملاً استاتیک است و نوشته‌ها، پروژه‌ها و مجموعه‌های عکاسی از Markdown و YAML Frontmatter خوانده می‌شوند.

راهنمای عملی و نمونهٔ کامل Frontmatter در [`docs/CONTENT.md`](docs/CONTENT.md) قرار دارد.

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

هیچ افزونهٔ اختصاصی لازم نیست. از Markdown استاندارد، لینک‌های `[text](url)` و تصاویر `![alt](./image.jpg)` استفاده کن. پوشهٔ محلی `.obsidian/` عمداً در Git نادیده گرفته می‌شود تا وضعیت Workspace و تنظیمات وابسته به دستگاه وارد Commitها نشوند.

قالب‌ها در `content/_templates/` قرار دارند. در Obsidian افزونهٔ داخلی **Templates** را فعال کن و Template folder را `_templates` بگذار.

ساختار اصلی:

```text
content/
├── _templates/
├── writing/{fa,en}/
├── projects/{fa,en}/
├── photography/
│   ├── assets/<collection-slug>/
│   ├── fa/<collection-slug>/index.md
│   └── en/<collection-slug>/index.md
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

پروژه‌ها مستقل از نوشته‌ها و کاملاً Content-driven هستند. فایل را در `content/projects/fa/` یا `content/projects/en/` بساز. `featured: true` پروژه را در بخش پروژه‌های منتخب خانه نشان می‌دهد. وضعیت‌های معتبر:

```text
active | experimental | maintained | archived
```

فیلدهای `website`, `repository`, `cover` و `translationKey` اختیاری‌اند.

## Photography

فقط نسخه‌های Web-ready را در Repository قرار بده:

```text
content/photography/assets/<collection-slug>/
```

فایل مجموعه و متادیتای عکس‌ها در مسیر زبان قرار می‌گیرد. Astro از تصاویر Preview اندازه‌های Responsive تولید می‌کند؛ تصاویر فهرست و گالری Lazy-load می‌شوند و ابعاد از Metadata تصویر گرفته می‌شود تا جابه‌جایی Layout کم شود.

برای هر عکس این دو مقدار باید روشن باشند:

```yaml
commercialUse: free | paid
highRes: free | paid
```

- `commercialUse: free`: استفادهٔ شخصی و تجاری طبق مجوز سایت رایگان است.
- `commercialUse: paid`: استفادهٔ شخصی رایگان است؛ استفادهٔ تجاری مجوز پولی می‌خواهد.
- `highRes: free`: نسخهٔ اصلی/باکیفیت می‌تواند رایگان ارائه شود.
- `highRes: paid`: فایل باکیفیت نباید در Repository یا Build عمومی باشد و بعداً از مسیر درخواست/خرید ارائه می‌شود.

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

گردش‌کار روزانه پس از اتصال مخزن شخصی:

```bash
pnpm check
git status
git add content
git commit -m "Add new writing"
git push origin main
```

برای تغییرات کد یا مستندات به‌جای `git add content` از `git add .` استفاده کن. قبل از Commit مطمئن شو هیچ Original، فایل RAW یا وضعیت محلی Obsidian Stage نشده است.

Remote فعلی Clone به مخزن اصلی Astro Cactus اشاره می‌کند و باید به‌عنوان `upstream` نگه داشته شود. مخزن خصوصی شخصی هنوز به‌علت احراز هویت نامعتبر GitHub ساخته نشده است؛ دستورهای دقیق در تحویل نهایی ارائه می‌شوند.

## Domain

منبع اصلی URL تولید در `src/site.config.ts` و مقدار `siteConfig.url` است. Canonical، Sitemap، RSS و Open Graph از `Astro.site`/همین مقدار مشتق می‌شوند. مقدار فعلی عمداً `https://amirhh.site` است.

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
