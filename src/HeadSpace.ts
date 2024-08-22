export default class HeadSpace {
  private parent: HeadSpace | null;
  private children: HeadSpace[];
  private title: string;
  private metaTags: Map<string, string>;
  private linkTags: Map<string, Record<string, string>>;
  private scriptTags: Map<string, Record<string, string>>;
  private baseTag: { href: string; target?: string } | null;

  constructor(parent: HeadSpace | null = null) {
    this.parent = parent;
    this.children = [];
    this.title = '';
    this.metaTags = new Map();
    this.linkTags = new Map();
    this.scriptTags = new Map();
    this.baseTag = null;

    if (this.isRoot) {
      this._initializeDOMObserver();
    }
  }

  get isRoot(): boolean {
    return this.parent === null;
  }

  createChild(): HeadSpace {
    const child = new HeadSpace(this);
    this.children.push(child);
    return child;
  }

  removeChild(child: HeadSpace): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      this._updateHead();
    }
  }

  setTitle(title: string): void {
    this.title = title;
    this._updateHead();
  }

  setMeta(name: string, content: string): void {
    this.metaTags.set(name, content);
    this._updateHead();
  }

  setLink(rel: string, href: string, attributes: Record<string, string> = {}): void {
    this.linkTags.set(rel, { href, ...attributes });
    this._updateHead();
  }

  setScript(src: string, attributes: Record<string, string> = {}): void {
    this.scriptTags.set(src, attributes);
    this._updateHead();
  }

  setBase(href: string, target?: string): void {
    this.baseTag = { href, target };
    this._updateHead();
  }

  private _updateHead(): void {
    if (this.isRoot) {
      this._applyHeadChanges();
    } else {
      this.parent!._updateHead();
    }
  }

  private _applyHeadChanges(): void {
    this._updateTitle();
    this._updateTags('meta', this._getMetaTags());
    this._updateTags('link', this._getLinkTags());
    this._updateTags('script', this._getScriptTags());
    this._updateBaseTag();
  }

  private _updateTitle(): void {
    document.title = this._getTitle();
  }

  private _updateTags(tagName: string, tagsMap: Map<string, Record<string, string>>): void {
    const existingTags = document.head.querySelectorAll(`${tagName}:not([data-head-space="false"])`);
    const newTags = new Map(tagsMap);

    existingTags.forEach(tag => {
      const key = this._getTagKey(tag as HTMLElement);
      if (!newTags.has(key)) {
        document.head.removeChild(tag);
      } else {
        newTags.delete(key);
      }
    });

    newTags.forEach((attributes, key) => {
      const tag = document.createElement(tagName);
      Object.entries(attributes).forEach(([attr, value]) => tag.setAttribute(attr, value));
      document.head.appendChild(tag);
    });
  }

  private _updateBaseTag(): void {
    const baseTag = document.head.querySelector('base');
    const newBase = this._getBaseTag();

    if (newBase) {
      if (baseTag) {
        baseTag.href = newBase.href;
        if (newBase.target) baseTag.setAttribute('target', newBase.target);
      } else {
        const newBaseTag = document.createElement('base');
        newBaseTag.href = newBase.href;
        if (newBase.target) newBaseTag.setAttribute('target', newBase.target);
        document.head.insertBefore(newBaseTag, document.head.firstChild);
      }
    } else if (baseTag) {
      document.head.removeChild(baseTag);
    }
  }

  private _getTitle(): string {
    return this.title || (this.parent ? this.parent._getTitle() : '');
  }

  private _getMetaTags(): Map<string, Record<string, string>> {
    const tags = new Map(this.parent ? this.parent._getMetaTags() : []);
    for (const [name, content] of this.metaTags) {
      tags.set(name, { name, content });
    }
    return tags;
  }

  private _getLinkTags(): Map<string, Record<string, string>> {
    const tags = new Map(this.parent ? this.parent._getLinkTags() : []);
    for (const [rel, attributes] of this.linkTags) {
      tags.set(rel, attributes);
    }
    return tags;
  }

  private _getScriptTags(): Map<string, Record<string, string>> {
    const tags = new Map(this.parent ? this.parent._getScriptTags() : []);
    for (const [src, attributes] of this.scriptTags) {
      tags.set(src, attributes);
    }
    return tags;
  }

  private _getBaseTag(): { href: string; target?: string } | null {
    return this.baseTag || (this.parent ? this.parent._getBaseTag() : null);
  }

  private _getTagKey(tag: HTMLElement): string {
    if (tag.tagName === 'META') return `meta-${tag.getAttribute('name') || tag.getAttribute('property')}`;
    if (tag.tagName === 'LINK') return `link-${tag.getAttribute('rel')}`;
    if (tag.tagName === 'SCRIPT') return `script-${tag.getAttribute('src')}`;
    return '';
  }

  private _initializeDOMObserver(): void {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && ['META', 'LINK', 'SCRIPT', 'BASE'].includes((node as Element).tagName)) {
              (node as Element).setAttribute('data-head-space', 'false');
            }
          });
        }
      });
    });
    observer.observe(document.head, { childList: true, subtree: true });
  }

  generateSSRTags(): string {
    const title = this._getTitle();
    const metaTags = this._getMetaTags();
    const linkTags = this._getLinkTags();
    const scriptTags = this._getScriptTags();
    const baseTag = this._getBaseTag();

    let html = '';
    if (title) html += `<title>${this._escapeHTML(title)}</title>`;
    if (baseTag) html += `<base href="${this._escapeHTML(baseTag.href)}"${baseTag.target ? ` target="${this._escapeHTML(baseTag.target)}"` : ''}>`;
    metaTags.forEach((attributes) => html += `<meta ${Object.entries(attributes).map(([key, value]) => `${key}="${this._escapeHTML(value)}"`).join(' ')}>`);
    linkTags.forEach((attributes) => html += `<link ${Object.entries(attributes).map(([key, value]) => `${key}="${this._escapeHTML(value)}"`).join(' ')}>`);
    scriptTags.forEach((attributes) => html += `<script ${Object.entries(attributes).map(([key, value]) => `${key}="${this._escapeHTML(value)}"`).join(' ')}></script>`);

    return html;
  }

  getState(): HeadSpaceState {
    return {
      title: this._getTitle(),
      metaTags: Object.fromEntries(this._getMetaTags()),
      linkTags: Object.fromEntries(this._getLinkTags()),
      scriptTags: Object.fromEntries(this._getScriptTags()),
      baseTag: this._getBaseTag()
    };
  }

  static createFromState(state: HeadSpaceState): HeadSpace {
    const headSpace = new HeadSpace();
    if (state.title) headSpace.setTitle(state.title);
    if (state.baseTag) headSpace.setBase(state.baseTag.href, state.baseTag.target);
    Object.entries(state.metaTags).forEach(([name, content]) => headSpace.setMeta(name, content));
    Object.entries(state.linkTags).forEach(([rel, attributes]) => headSpace.setLink(rel, attributes.href, attributes));
    Object.entries(state.scriptTags).forEach(([src, attributes]) => headSpace.setScript(src, attributes));
    return headSpace;
  }

  private _escapeHTML(str: string): string {
    return str.replace(/[&<>"']/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[tag] || tag));
  }
}

interface HeadSpaceState {
  title: string;
  metaTags: Record<string, Record<string, string>>;
  linkTags: Record<string, Record<string, string>>;
  scriptTags: Record<string, Record<string, string>>;
  baseTag: { href: string; target?: string } | null;
}
