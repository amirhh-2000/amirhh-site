import type { Locale } from "@/types";

export const locales: Locale[] = ["fa", "en"];
export const isLocale = (value: string | undefined): value is Locale =>
	value === "fa" || value === "en";
export const otherLocale = (locale: Locale): Locale => (locale === "fa" ? "en" : "fa");
export const localePath = (locale: Locale, path = "") => `/${locale}/${path.replace(/^\//, "")}`;
export const switchLocalePath = (pathname: string, locale: Locale) =>
	pathname.replace(/^\/(fa|en)(?=\/|$)/, `/${otherLocale(locale)}`);

export const ui = {
	fa: {
		skip: "رفتن به محتوا",
		language: "EN",
		theme: "تغییر پوسته",
		search: "جست‌وجو",
		searchPlaceholder: "جست‌وجو در سایت…",
		latestWriting: "آخرین نوشته‌ها",
		featuredProjects: "پروژه‌های منتخب",
		photography: "عکس‌ها",
		viewAll: "مشاهده همه",
		writing: "نوشته‌ها",
		projects: "پروژه‌ها",
		about: "درباره من",
		intro:
			"من امیرحسینم. اینجا خانهٔ شخصی من برای نوشته‌ها، پروژه‌ها و عکس‌هایی است که انتخاب می‌کنم نگه دارم.",
		noItems: "هنوز چیزی اینجا منتشر نشده است.",
		published: "منتشرشده در",
		updated: "به‌روزرسانی",
		technologies: "فناوری‌ها",
		website: "وب‌سایت",
		repository: "مخزن کد",
		commercialUse: "استفاده تجاری",
		highRes: "نسخهٔ باکیفیت",
		free: "رایگان",
		paid: "با هماهنگی / پولی",
		photoPrice: "قیمت نسخهٔ باکیفیت",
		toman: "تومان",
		payIran: "پرداخت ریالی",
		payCrypto: "پرداخت رمزارزی",
		contactTelegram: "هماهنگی تحویل در تلگرام",
		paymentDeliveryNote:
			"پس از پرداخت، رسید یا شناسهٔ تراکنش را نگه دارید. فایل از طریق راه تماس ثبت‌شده در درگاه تحویل می‌شود.",
		rss: "خوراک RSS",
		back: "بازگشت",
		categories: {
			technical: "فنی",
			personal: "مشاهده",
			spiritual: "درنگ",
			learning: "یادگیری",
		},
		statuses: {
			active: "فعال",
			experimental: "آزمایشی",
			maintained: "در حال نگهداری",
			archived: "بایگانی‌شده",
		},
	},
	en: {
		skip: "Skip to content",
		language: "FA",
		theme: "Change theme",
		search: "Search",
		searchPlaceholder: "Search this site…",
		latestWriting: "Latest writing",
		featuredProjects: "Featured projects",
		photography: "Photography",
		viewAll: "View all",
		writing: "Writing",
		projects: "Projects",
		about: "About",
		intro:
			"I’m Amir Hossein. This is my personal home for writing, projects, and photographs I choose to keep.",
		noItems: "Nothing has been published here yet.",
		published: "Published",
		updated: "Updated",
		technologies: "Technologies",
		website: "Website",
		repository: "Source code",
		commercialUse: "Commercial use",
		highRes: "High-resolution file",
		free: "Free",
		paid: "Paid / by arrangement",
		photoPrice: "High-resolution price",
		toman: "toman",
		payIran: "Pay in Iran",
		payCrypto: "Pay with crypto",
		contactTelegram: "Arrange delivery on Telegram",
		paymentDeliveryNote:
			"Keep your receipt or transaction ID. The file is delivered through the contact method entered at checkout.",
		rss: "RSS feed",
		back: "Back",
		categories: {
			technical: "Technical",
			personal: "Observations",
			spiritual: "Reflections",
			learning: "Learning",
		},
		statuses: {
			active: "Active",
			experimental: "Experimental",
			maintained: "Maintained",
			archived: "Archived",
		},
	},
} as const;
