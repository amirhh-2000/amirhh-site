const { Plugin, Modal, Notice, TFile, stringifyYaml } = require('obsidian');

module.exports = class PhotoManager extends Plugin {
  onload() {
    this.addRibbonIcon('image-plus', 'افزودن عکس به سایت', () => this.openForm());
    this.addCommand({ id: 'add-photo', name: 'افزودن عکس به سایت', callback: () => this.openForm() });
    this.addCommand({ id: 'edit-photo', name: 'ویرایش عکس بازشده', callback: () => {
      const file = this.app.workspace.getActiveFile();
      if (!file || !/^photography\/[^/]+\.md$/.test(file.path)) return new Notice('ابتدا یادداشت عکس را باز کن.');
      this.openForm(file);
    }});
  }
  async openForm(file) {
    try {
      const raw = await this.app.vault.adapter.read('photography-categories.json');
      const categories = JSON.parse(raw);
      const frontmatter = file ? this.app.metadataCache.getFileCache(file)?.frontmatter : null;
      if (file && !frontmatter) throw new Error('مشخصات یادداشت خوانده نشد.');
      new PhotoModal(this.app, categories, file, frontmatter || {}).open();
    } catch (error) { new Notice(`فرم باز نشد: ${error.message}`); }
  }
};

class PhotoModal extends Modal {
  constructor(app, categories, file, data) { super(app); this.categories = categories; this.file = file; this.data = data; }
  onOpen() {
    const root = this.contentEl;
    root.empty(); root.addClass('site-photo-modal'); root.setAttribute('dir', 'rtl');
    root.createEl('h2', { text: this.file ? 'ویرایش عکس' : 'افزودن عکس' });
    const form = root.createEl('form');
    const section = (title, description) => {
      const el = form.createEl('section', { cls: 'site-photo-section' });
      el.createEl('h3', { text: title });
      if (description) el.createEl('p', { text: description, cls: 'site-photo-section-description' });
      return el;
    };
    const field = (parent, label, type, value = '', hint) => {
      const wrap = parent.createEl('label', { cls: 'site-photo-field' });
      wrap.createSpan({ text: label });
      const input = wrap.createEl('input', { attr: { type } });
      if (type !== 'file') input.value = value;
      if (hint) wrap.createEl('small', { text: hint, cls: 'site-photo-hint' });
      return input;
    };
    const select = (parent, label, options, value) => {
      const wrap = parent.createEl('label', { cls: 'site-photo-field' });
      wrap.createSpan({ text: label });
      const input = wrap.createEl('select');
      for (const [id, text] of options) { const option = input.createEl('option', { text }); option.value = id; }
      input.value = value;
      return input;
    };
    const basic = section('عکس و دسته');
    let image;
    if (!this.file) {
      image = field(basic, 'انتخاب تصویر', 'file'); image.accept = 'image/jpeg,image/png,image/webp,image/avif,image/gif'; image.required = true;
    } else basic.createEl('p', { text: `تصویر: ${this.data.image || 'نامشخص'}`, cls: 'site-photo-hint' });
    const slug = field(basic, 'نام انگلیسی آدرس', 'text', this.file?.basename || '', 'با حروف کوچک انگلیسی، عدد و خط تیره؛ بعد از انتشار بهتر است تغییر نکند.');
    slug.dir = 'ltr'; slug.required = true; slug.pattern = '[a-z0-9]+(?:-[a-z0-9]+)*'; slug.disabled = !!this.file; slug.placeholder = 'dream-sky';
    if (image) image.addEventListener('change', () => {
      if (!slug.value && image.files?.[0]) slug.value = image.files[0].name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    });
    const category = select(basic, 'دسته', Object.entries(this.categories).map(([id, value]) => [id, value.title.fa]), this.data.category || Object.keys(this.categories)[0]);
    const addCategory = basic.createEl('button', { text: '＋ افزودن دستهٔ جدید', cls: 'site-photo-secondary', attr: { type: 'button' } });
    addCategory.addEventListener('click', () => new CategoryModal(this.app, (key, value) => {
      this.categories[key] = value;
      const option = category.createEl('option', { text: value.title.fa }); option.value = key; category.value = key;
    }).open());
    const titles = basic.createEl('div', { cls: 'site-photo-grid' });
    const title = field(titles, 'عنوان فارسی (اختیاری)', 'text', this.data.title || '');
    const titleEn = field(titles, 'عنوان انگلیسی (اختیاری)', 'text', this.data.titleEn || ''); titleEn.dir = 'ltr';

    const accessSection = section('دریافت تصویر', 'انتخاب کن مخاطب چطور به فایل دسترسی داشته باشد.');
    const existing = this.data.access || {};
    const accessType = select(accessSection, 'روش دسترسی', [
      ['display-only', 'فقط نمایش'], ['free', 'دانلود رایگان'], ['request', 'دریافت با هماهنگی ایمیلی'],
    ], existing.type || 'display-only');
    const displayInfo = accessSection.createEl('p', { cls: 'site-photo-callout', text: 'تصویر در سایت دیده می‌شود و دکمهٔ دانلود ندارد.' });
    const freePanel = accessSection.createEl('div', { cls: 'site-photo-panel' });
    freePanel.createEl('p', { cls: 'site-photo-callout', text: 'فایل دانلود رایگان عمومی است. فایل اصلی یا پولی را اینجا انتخاب نکن.' });
    const freeUpload = field(freePanel, this.file && existing.file ? 'جایگزینی فایل دانلود (اختیاری)' : 'انتخاب فایل دانلود رایگان', 'file');
    const Platform = require('obsidian').Platform;
    const canUpload = !!(Platform?.isDesktopApp && typeof this.app.vault.adapter.getBasePath === 'function');
    if (!canUpload) { freeUpload.disabled = true; freePanel.createEl('p', { text: 'انتخاب فایل دانلود در نسخهٔ دسکتاپ Obsidian در دسترس است؛ یا مسیر فایل موجود را وارد کن.', cls: 'site-photo-hint' }); }
    const filePath = field(freePanel, 'مسیر فایل موجود (در صورت انتخاب‌نکردن فایل جدید)', 'text', existing.file || '', 'مثال: /downloads/photo.jpg'); filePath.dir = 'ltr';
    const freeMeta = freePanel.createEl('div', { cls: 'site-photo-grid' });
    const format = field(freeMeta, 'فرمت فایل (اختیاری)', 'text', existing.format || ''); format.placeholder = 'JPEG'; format.dir = 'ltr';
    const dimensions = field(freeMeta, 'ابعاد فایل (اختیاری)', 'text', existing.dimensions || ''); dimensions.placeholder = '2400 × 1600'; dimensions.dir = 'ltr';
    const requestPanel = accessSection.createEl('div', { cls: 'site-photo-panel' });
    requestPanel.createEl('p', { cls: 'site-photo-callout', text: 'مخاطب درخواست را با ایمیل می‌فرستد و پرداخت و تحویل را جداگانه هماهنگ می‌کنی.' });
    const check = (parent, text, checked) => {
      const label = parent.createEl('label', { cls: 'site-photo-check' });
      const input = label.createEl('input', { attr: { type: 'checkbox' } }); input.checked = checked;
      label.createSpan({ text }); return input;
    };
    const highRes = check(requestPanel, 'نسخهٔ باکیفیت پولی است', existing.license?.highResolution === 'paid');
    const commercial = check(requestPanel, 'استفادهٔ تجاری پولی است', existing.license?.commercialUse === 'paid');
    requestPanel.createEl('p', { text: 'حداقل یکی را انتخاب کن. اگر هر دو فعال باشند، پیام استفادهٔ تجاری نمایش داده می‌شود.', cls: 'site-photo-hint' });
    const updateAccess = () => {
      displayInfo.hidden = accessType.value !== 'display-only';
      freePanel.hidden = accessType.value !== 'free';
      requestPanel.hidden = accessType.value !== 'request';
    };
    accessType.addEventListener('change', updateAccess); updateAccess();

    const details = form.createEl('details', { cls: 'site-photo-details' });
    details.createEl('summary', { text: 'توضیحات و منشأ تصویر' });
    const detailBody = details.createEl('div', { cls: 'site-photo-detail-body' });
    const alts = detailBody.createEl('div', { cls: 'site-photo-grid' });
    const alt = field(alts, 'شرح تصویر برای صفحه‌خوان (فارسی)', 'text', this.data.alt || '');
    const altEn = field(alts, 'شرح تصویر برای صفحه‌خوان (انگلیسی)', 'text', this.data.altEn || ''); altEn.dir = 'ltr';
    detailBody.createEl('p', { text: 'شرح کوتاه چیزی که در عکس دیده می‌شود؛ صفحه‌خوان آن را می‌خواند.', cls: 'site-photo-hint' });
    const captions = detailBody.createEl('div', { cls: 'site-photo-grid' });
    const caption = field(captions, 'توضیح زیر عکس (فارسی)', 'text', this.data.caption || '');
    const captionEn = field(captions, 'توضیح زیر عکس (انگلیسی)', 'text', this.data.captionEn || ''); captionEn.dir = 'ltr';
    const process = select(detailBody, 'منشأ تصویر', [['photograph','عکس'],['ai-assisted','عکس ویرایش‌شده با هوش مصنوعی'],['ai-derived','بازآفرینی با هوش مصنوعی'],['ai-generated','ساخته‌شده با هوش مصنوعی']], this.data.process || 'photograph');
    const publish = check(form, 'آمادهٔ انتشار', this.file ? this.data.draft === false : false);
    const error = form.createEl('p', { cls: 'site-photo-error', attr: { role: 'alert', tabindex: '-1' } });
    const actions = form.createEl('div', { cls: 'site-photo-actions' });
    const cancel = actions.createEl('button', { text: 'انصراف', attr: { type: 'button' } }); cancel.addEventListener('click', () => this.close());
    const save = actions.createEl('button', { text: 'ذخیرهٔ عکس', cls: 'mod-cta', attr: { type: 'submit' } });
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); error.setText(''); save.disabled = true;
      let createdImage = null, createdDownload = null;
      try {
        const values = { category: category.value, draft: !publish.checked };
        for (const [key, input] of Object.entries({ title, titleEn, alt, altEn, caption, captionEn })) values[key] = input.value.trim() || undefined;
        values.process = process.value === 'photograph' ? undefined : process.value;
        let notePath, imagePath, chosen;
        if (!this.file) {
          chosen = image.files?.[0];
          if (!chosen) throw new Error('یک تصویر انتخاب کن.');
          const extension = chosen.name.split('.').pop().toLowerCase();
          if (!['jpg','jpeg','png','webp','avif','gif'].includes(extension)) throw new Error('فرمت تصویر پشتیبانی نمی‌شود.');
          imagePath = `photography/${slug.value}.${extension}`; notePath = `photography/${slug.value}.md`;
          if (await this.app.vault.adapter.exists(notePath) || await this.app.vault.adapter.exists(imagePath)) throw new Error('فایلی با این نام وجود دارد؛ نام دیگری انتخاب کن.');
        }
        if (accessType.value === 'request') {
          if (!highRes.checked && !commercial.checked) throw new Error('برای دریافت ایمیلی حداقل یکی از دو شرط پولی را انتخاب کن.');
          values.access = { type: 'request', license: { highResolution: highRes.checked ? 'paid' : 'free', commercialUse: commercial.checked ? 'paid' : 'free' } };
        } else if (accessType.value === 'free') {
          const selected = freeUpload.files?.[0];
          let target = filePath.value.trim();
          if (selected) {
            if (!canUpload) throw new Error('انتخاب فایل دانلود فقط در Obsidian دسکتاپ در دسترس است.');
            const ext = selected.name.includes('.') ? selected.name.split('.').pop().toLowerCase() : '';
            if (!/^[a-z0-9]{1,10}$/.test(ext)) throw new Error('پسوند فایل دانلود معتبر نیست.');
            target = `/downloads/${slug.value}-download.${ext}`;
          }
          if (!/^\/downloads\/[^?#\\]+$/.test(target) || target.slice('/downloads/'.length).split('/').some((part) => !part || part === '.' || part === '..')) throw new Error('فایل رایگان انتخاب کن یا مسیر معتبر زیر /downloads/ وارد کن.');
          if (!selected && canUpload) {
            const fs = require('node:fs/promises'), path = require('node:path');
            const folder = path.resolve(this.app.vault.adapter.getBasePath(), '..', 'public', 'downloads');
            try { if (!(await fs.stat(path.join(folder, target.slice('/downloads/'.length)))).isFile()) throw new Error(); }
            catch (_) { throw new Error('فایل دانلود پیدا نشد. فایل موجود را بررسی کن یا فایل جدید انتخاب کن.'); }
          }
          values.access = { type: 'free', file: target };
          if (format.value.trim()) values.access.format = format.value.trim();
          if (dimensions.value.trim()) values.access.dimensions = dimensions.value.trim();
          if (selected) {
            const fs = require('node:fs/promises'), path = require('node:path');
            const folder = path.resolve(this.app.vault.adapter.getBasePath(), '..', 'public', 'downloads');
            await fs.mkdir(folder, { recursive: true });
            const destination = path.join(folder, `${slug.value}-download.${selected.name.split('.').pop().toLowerCase()}`);
            try { await fs.writeFile(destination, Buffer.from(await selected.arrayBuffer()), { flag: 'wx' }); }
            catch (err) { if (err.code === 'EEXIST') throw new Error('فایل دانلودی با این نام وجود دارد. مسیر فایل موجود را وارد کن یا نام دیگری برای عکس انتخاب کن.'); throw err; }
            createdDownload = destination;
          }
        } else values.access = { type: 'display-only' };
        if (this.file) {
          await this.app.fileManager.processFrontMatter(this.file, (fm) => {
            for (const [key, value] of Object.entries(values)) if (value === undefined) delete fm[key]; else fm[key] = value;
          });
        } else {
          createdImage = await this.app.vault.createBinary(imagePath, await chosen.arrayBuffer());
          const data = { image: `./${slug.value}.${chosen.name.split('.').pop().toLowerCase()}` };
          for (const [key, value] of Object.entries(values)) if (value !== undefined) data[key] = value;
          const note = await this.app.vault.create(notePath, `---\n${stringifyYaml(data)}---\n`);
          createdImage = null; createdDownload = null;
          this.close(); new Notice('عکس ذخیره شد.');
          await this.app.workspace.getLeaf().openFile(note);
          return;
        }
        createdDownload = null; this.close(); new Notice('تغییرات عکس ذخیره شد.');
      } catch (err) {
        if (createdImage instanceof TFile) await this.app.vault.delete(createdImage).catch(() => {});
        if (createdDownload) await require('node:fs/promises').unlink(createdDownload).catch(() => {});
        error.setText(err.message || 'ذخیره انجام نشد.'); error.focus();
      } finally { save.disabled = false; }
    });
  }
  onClose() { this.contentEl.empty(); }
}


class CategoryModal extends Modal {
  constructor(app, onAdded) { super(app); this.onAdded = onAdded; }
  onOpen() {
    const root = this.contentEl;
    root.empty(); root.addClass('site-photo-modal'); root.setAttribute('dir', 'rtl');
    root.createEl('h2', { text: 'دستهٔ جدید' });
    const form = root.createEl('form');
    const input = (label, placeholder) => {
      const wrapper = form.createEl('label', { cls: 'site-photo-field' });
      wrapper.createSpan({ text: label });
      const el = wrapper.createEl('input', { attr: { type: 'text', placeholder } });
      el.required = true;
      return el;
    };
    const fa = input('نام فارسی', 'مثلاً طبیعت');
    const en = input('نام انگلیسی', 'Nature'); en.dir = 'ltr';
    const slug = input('نام انگلیسی کوتاه برای آدرس', 'nature'); slug.dir = 'ltr';
    slug.pattern = '[a-z0-9]+(?:-[a-z0-9]+)*';
    form.createEl('p', { text: 'نام کوتاه را می‌توانی تغییر بدهی؛ فقط حروف کوچک انگلیسی، عدد و خط تیره.', cls: 'site-photo-hint' });
    let slugEdited = false;
    slug.addEventListener('input', () => { slugEdited = true; });
    en.addEventListener('input', () => {
      if (!slugEdited) slug.value = en.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    });
    const error = form.createEl('p', { cls: 'site-photo-error', attr: { role: 'alert' } });
    const actions = form.createEl('div', { cls: 'site-photo-actions' });
    const cancel = actions.createEl('button', { text: 'انصراف', attr: { type: 'button' } });
    cancel.addEventListener('click', () => this.close());
    const save = actions.createEl('button', { text: 'افزودن دسته', cls: 'mod-cta', attr: { type: 'submit' } });
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); error.setText(''); save.disabled = true;
      try {
        const nameFa = fa.value.trim(), nameEn = en.value.trim(), key = slug.value.trim();
        if (!nameFa || !nameEn || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) throw new Error('نام فارسی و انگلیسی و نام کوتاه معتبر را وارد کن.');
        const path = 'photography-categories.json';
        const categories = JSON.parse(await this.app.vault.adapter.read(path));
        if (Object.prototype.hasOwnProperty.call(categories, key) || ['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('این نام کوتاه قبلاً استفاده شده است.');
        const value = { title: { fa: nameFa, en: nameEn }, description: { fa: nameFa, en: nameEn } };
        categories[key] = value;
        await this.app.vault.adapter.write(path, `${JSON.stringify(categories, null, '\t')}\n`);
        this.onAdded(key, value); this.close(); new Notice('دسته اضافه شد.');
      } catch (err) { error.setText(err.message || 'افزودن دسته انجام نشد.'); }
      finally { save.disabled = false; }
    });
  }
  onClose() { this.contentEl.empty(); }
}
