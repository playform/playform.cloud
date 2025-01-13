import { i as q } from "./index.BqqcOND9.js";
const y = "data-astro-transition-persist";
function B(t) {
	for (const e of document.scripts)
		for (const n of t.scripts)
			if (
				!n.hasAttribute("data-astro-rerun") &&
				((!e.src && e.textContent === n.textContent) ||
					(e.src && e.type === n.type && e.src === n.src))
			) {
				n.dataset.astroExec = "";
				break;
			}
}
function U(t) {
	const e = document.documentElement,
		n = [...e.attributes].filter(
			({ name: o }) => (
				e.removeAttribute(o), o.startsWith("data-astro-")
			),
		);
	[...t.documentElement.attributes, ...n].forEach(({ name: o, value: r }) =>
		e.setAttribute(o, r),
	);
}
function W(t) {
	for (const e of Array.from(document.head.children)) {
		const n = j(e, t);
		n ? n.remove() : e.remove();
	}
	document.head.append(...t.head.children);
}
function V(t, e) {
	e.replaceWith(t);
	for (const n of e.querySelectorAll(`[${y}]`)) {
		const o = n.getAttribute(y),
			r = t.querySelector(`[${y}="${o}"]`);
		r &&
			(r.replaceWith(n),
			r.localName === "astro-island" &&
				G(n) &&
				!z(n, r) &&
				(n.setAttribute("ssr", ""),
				n.setAttribute("props", r.getAttribute("props"))));
	}
}
const K = () => {
		const t = document.activeElement;
		if (t?.closest(`[${y}]`)) {
			if (
				t instanceof HTMLInputElement ||
				t instanceof HTMLTextAreaElement
			) {
				const e = t.selectionStart,
					n = t.selectionEnd;
				return () => v({ activeElement: t, start: e, end: n });
			}
			return () => v({ activeElement: t });
		} else return () => v({ activeElement: null });
	},
	v = ({ activeElement: t, start: e, end: n }) => {
		t &&
			(t.focus(),
			(t instanceof HTMLInputElement ||
				t instanceof HTMLTextAreaElement) &&
				(typeof e == "number" && (t.selectionStart = e),
				typeof n == "number" && (t.selectionEnd = n)));
	},
	j = (t, e) => {
		const n = t.getAttribute(y),
			o = n && e.head.querySelector(`[${y}="${n}"]`);
		if (o) return o;
		if (t.matches("link[rel=stylesheet]")) {
			const r = t.getAttribute("href");
			return e.head.querySelector(`link[rel=stylesheet][href="${r}"]`);
		}
		return null;
	},
	G = (t) => {
		const e = t.dataset.astroTransitionPersistProps;
		return e == null || e === "false";
	},
	z = (t, e) => t.getAttribute("props") === e.getAttribute("props"),
	J = (t) => {
		B(t), U(t), W(t);
		const e = K();
		V(t.body, document.body), e();
	},
	Q = "astro:before-preparation",
	Z = "astro:after-preparation",
	tt = "astro:before-swap",
	et = "astro:after-swap",
	nt = (t) => document.dispatchEvent(new Event(t));
class H extends Event {
	from;
	to;
	direction;
	navigationType;
	sourceElement;
	info;
	newDocument;
	signal;
	constructor(e, n, o, r, s, u, a, l, d, c) {
		super(e, n),
			(this.from = o),
			(this.to = r),
			(this.direction = s),
			(this.navigationType = u),
			(this.sourceElement = a),
			(this.info = l),
			(this.newDocument = d),
			(this.signal = c),
			Object.defineProperties(this, {
				from: { enumerable: !0 },
				to: { enumerable: !0, writable: !0 },
				direction: { enumerable: !0, writable: !0 },
				navigationType: { enumerable: !0 },
				sourceElement: { enumerable: !0 },
				info: { enumerable: !0 },
				newDocument: { enumerable: !0, writable: !0 },
				signal: { enumerable: !0 },
			});
	}
}
class ot extends H {
	formData;
	loader;
	constructor(e, n, o, r, s, u, a, l, d, c) {
		super(Q, { cancelable: !0 }, e, n, o, r, s, u, a, l),
			(this.formData = d),
			(this.loader = c.bind(this, this)),
			Object.defineProperties(this, {
				formData: { enumerable: !0 },
				loader: { enumerable: !0, writable: !0 },
			});
	}
}
class rt extends H {
	direction;
	viewTransition;
	swap;
	constructor(e, n) {
		super(
			tt,
			void 0,
			e.from,
			e.to,
			e.direction,
			e.navigationType,
			e.sourceElement,
			e.info,
			e.newDocument,
			e.signal,
		),
			(this.direction = e.direction),
			(this.viewTransition = n),
			(this.swap = () => J(this.newDocument)),
			Object.defineProperties(this, {
				direction: { enumerable: !0 },
				viewTransition: { enumerable: !0 },
				swap: { enumerable: !0, writable: !0 },
			});
	}
}
async function it(t, e, n, o, r, s, u, a, l) {
	const d = new ot(t, e, n, o, r, s, window.document, u, a, l);
	return (
		document.dispatchEvent(d) &&
			(await d.loader(),
			d.defaultPrevented ||
				(nt(Z),
				d.navigationType !== "traverse" && R({ scrollX, scrollY }))),
		d
	);
}
function st(t, e) {
	const n = new rt(t, e);
	return document.dispatchEvent(n), n.swap(), n;
}
const at = history.pushState.bind(history),
	T = history.replaceState.bind(history),
	R = (t) => {
		history.state &&
			((history.scrollRestoration = "manual"),
			T({ ...history.state, ...t }, ""));
	},
	P = !!document.startViewTransition,
	x = () =>
		!!document.querySelector('[name="astro-view-transitions-enabled"]'),
	O = (t, e) => t.pathname === e.pathname && t.search === e.search;
let f, b, A;
const X = (t) => document.dispatchEvent(new Event(t)),
	Y = () => X("astro:page-load"),
	ct = () => {
		let t = document.createElement("div");
		t.setAttribute("aria-live", "assertive"),
			t.setAttribute("aria-atomic", "true"),
			(t.className = "astro-route-announcer"),
			document.body.append(t),
			setTimeout(() => {
				let e =
					document.title ||
					document.querySelector("h1")?.textContent ||
					location.pathname;
				t.textContent = e;
			}, 60);
	},
	D = "data-astro-transition-persist",
	L = "data-astro-transition",
	S = "data-astro-transition-fallback";
let k,
	g = 0;
history.state
	? ((g = history.state.index),
		scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
	: x() &&
		(T({ index: g, scrollX, scrollY }, ""),
		(history.scrollRestoration = "manual"));
async function lt(t, e) {
	try {
		const n = await fetch(t, e),
			r = (n.headers.get("content-type") ?? "").split(";", 1)[0].trim();
		return r !== "text/html" && r !== "application/xhtml+xml"
			? null
			: {
					html: await n.text(),
					redirected: n.redirected ? n.url : void 0,
					mediaType: r,
				};
	} catch {
		return null;
	}
}
function _() {
	const t = document.querySelector(
		'[name="astro-view-transitions-fallback"]',
	);
	return t ? t.getAttribute("content") : "animate";
}
function ut() {
	let t = Promise.resolve();
	for (const e of document.getElementsByTagName("script")) {
		if (e.dataset.astroExec === "") continue;
		const n = e.getAttribute("type");
		if (n && n !== "module" && n !== "text/javascript") continue;
		const o = document.createElement("script");
		o.innerHTML = e.innerHTML;
		for (const r of e.attributes) {
			if (r.name === "src") {
				const s = new Promise((u) => {
					o.onload = o.onerror = u;
				});
				t = t.then(() => s);
			}
			o.setAttribute(r.name, r.value);
		}
		(o.dataset.astroExec = ""), e.replaceWith(o);
	}
	return t;
}
const C = (t, e, n, o, r) => {
	const s = O(e, t),
		u = document.title;
	document.title = o;
	let a = !1;
	if (t.href !== location.href && !r)
		if (n.history === "replace") {
			const l = history.state;
			T(
				{
					...n.state,
					index: l.index,
					scrollX: l.scrollX,
					scrollY: l.scrollY,
				},
				"",
				t.href,
			);
		} else
			at({ ...n.state, index: ++g, scrollX: 0, scrollY: 0 }, "", t.href);
	if (
		((document.title = u),
		(A = t),
		s || (scrollTo({ left: 0, top: 0, behavior: "instant" }), (a = !0)),
		r)
	)
		scrollTo(r.scrollX, r.scrollY);
	else {
		if (t.hash) {
			history.scrollRestoration = "auto";
			const l = history.state;
			(location.href = t.href),
				history.state ||
					(T(l, ""),
					s && window.dispatchEvent(new PopStateEvent("popstate")));
		} else a || scrollTo({ left: 0, top: 0, behavior: "instant" });
		history.scrollRestoration = "manual";
	}
};
function dt(t) {
	const e = [];
	for (const n of t.querySelectorAll("head link[rel=stylesheet]"))
		if (
			!document.querySelector(
				`[${D}="${n.getAttribute(D)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`,
			)
		) {
			const o = document.createElement("link");
			o.setAttribute("rel", "preload"),
				o.setAttribute("as", "style"),
				o.setAttribute("href", n.getAttribute("href")),
				e.push(
					new Promise((r) => {
						["load", "error"].forEach((s) =>
							o.addEventListener(s, r),
						),
							document.head.append(o);
					}),
				);
		}
	return e;
}
async function I(t, e, n, o, r) {
	async function s(l) {
		function d(h) {
			const m = h.effect;
			return !m || !(m instanceof KeyframeEffect) || !m.target
				? !1
				: window.getComputedStyle(m.target, m.pseudoElement)
						.animationIterationCount === "infinite";
		}
		const c = document.getAnimations();
		document.documentElement.setAttribute(S, l);
		const w = document
			.getAnimations()
			.filter((h) => !c.includes(h) && !d(h));
		return Promise.allSettled(w.map((h) => h.finished));
	}
	if (r === "animate" && !n.transitionSkipped && !t.signal.aborted)
		try {
			await s("old");
		} catch {}
	const u = document.title,
		a = st(t, n.viewTransition);
	C(a.to, a.from, e, u, o),
		X(et),
		r === "animate" &&
			(!n.transitionSkipped && !a.signal.aborted
				? s("new").finally(() => n.viewTransitionFinished())
				: n.viewTransitionFinished());
}
function ft() {
	return f?.controller.abort(), (f = { controller: new AbortController() });
}
async function $(t, e, n, o, r) {
	const s = ft();
	if (!x() || location.origin !== n.origin) {
		s === f && (f = void 0), (location.href = n.href);
		return;
	}
	const u = r ? "traverse" : o.history === "replace" ? "replace" : "push";
	if (
		(u !== "traverse" && R({ scrollX, scrollY }),
		O(e, n) && ((t !== "back" && n.hash) || (t === "back" && e.hash)))
	) {
		C(n, e, o, document.title, r), s === f && (f = void 0);
		return;
	}
	const a = await it(
		e,
		n,
		t,
		u,
		o.sourceElement,
		o.info,
		s.controller.signal,
		o.formData,
		l,
	);
	if (a.defaultPrevented || a.signal.aborted) {
		s === f && (f = void 0), a.signal.aborted || (location.href = n.href);
		return;
	}
	async function l(i) {
		const w = i.to.href,
			h = { signal: i.signal };
		if (i.formData) {
			h.method = "POST";
			const p =
				i.sourceElement instanceof HTMLFormElement
					? i.sourceElement
					: i.sourceElement instanceof HTMLElement &&
							"form" in i.sourceElement
						? i.sourceElement.form
						: i.sourceElement?.closest("form");
			h.body =
				p?.attributes.getNamedItem("enctype")?.value ===
				"application/x-www-form-urlencoded"
					? new URLSearchParams(i.formData)
					: i.formData;
		}
		const m = await lt(w, h);
		if (m === null) {
			i.preventDefault();
			return;
		}
		if (m.redirected) {
			const p = new URL(m.redirected);
			if (p.origin !== i.to.origin) {
				i.preventDefault();
				return;
			}
			i.to = p;
		}
		if (
			((k ??= new DOMParser()),
			(i.newDocument = k.parseFromString(m.html, m.mediaType)),
			i.newDocument
				.querySelectorAll("noscript")
				.forEach((p) => p.remove()),
			!i.newDocument.querySelector(
				'[name="astro-view-transitions-enabled"]',
			) && !i.formData)
		) {
			i.preventDefault();
			return;
		}
		const E = dt(i.newDocument);
		E.length && !i.signal.aborted && (await Promise.all(E));
	}
	async function d() {
		if (b && b.viewTransition) {
			try {
				b.viewTransition.skipTransition();
			} catch {}
			try {
				await b.viewTransition.updateCallbackDone;
			} catch {}
		}
		return (b = { transitionSkipped: !1 });
	}
	const c = await d();
	if (a.signal.aborted) {
		s === f && (f = void 0);
		return;
	}
	if ((document.documentElement.setAttribute(L, a.direction), P))
		c.viewTransition = document.startViewTransition(
			async () => await I(a, o, c, r),
		);
	else {
		const i = (async () => {
			await Promise.resolve(), await I(a, o, c, r, _());
		})();
		c.viewTransition = {
			updateCallbackDone: i,
			ready: i,
			finished: new Promise((w) => (c.viewTransitionFinished = w)),
			skipTransition: () => {
				(c.transitionSkipped = !0),
					document.documentElement.removeAttribute(S);
			},
		};
	}
	c.viewTransition?.updateCallbackDone.finally(async () => {
		await ut(), Y(), ct();
	}),
		c.viewTransition?.finished.finally(() => {
			(c.viewTransition = void 0),
				c === b && (b = void 0),
				s === f && (f = void 0),
				document.documentElement.removeAttribute(L),
				document.documentElement.removeAttribute(S);
		});
	try {
		await c.viewTransition?.updateCallbackDone;
	} catch (i) {
		const w = i;
		console.log("[astro]", w.name, w.message, w.stack);
	}
}
async function N(t, e) {
	await $("forward", A, new URL(t, location.href), e ?? {});
}
function mt(t) {
	if (!x() && t.state) {
		location.reload();
		return;
	}
	if (t.state === null) return;
	const e = history.state,
		n = e.index,
		o = n > g ? "forward" : "back";
	(g = n), $(o, A, new URL(location.href), {}, e);
}
const M = () => {
	history.state &&
		(scrollX !== history.state.scrollX ||
			scrollY !== history.state.scrollY) &&
		R({ scrollX, scrollY });
};
{
	if (P || _() !== "none")
		if (
			((A = new URL(location.href)),
			addEventListener("popstate", mt),
			addEventListener("load", Y),
			"onscrollend" in window)
		)
			addEventListener("scrollend", M);
		else {
			let t, e, n, o;
			const r = () => {
				if (o !== history.state?.index) {
					clearInterval(t), (t = void 0);
					return;
				}
				if (e === scrollY && n === scrollX) {
					clearInterval(t), (t = void 0), M();
					return;
				} else (e = scrollY), (n = scrollX);
			};
			addEventListener(
				"scroll",
				() => {
					t === void 0 &&
						((o = history.state?.index),
						(e = scrollY),
						(n = scrollX),
						(t = window.setInterval(r, 50)));
				},
				{ passive: !0 },
			);
		}
	for (const t of document.getElementsByTagName("script"))
		t.dataset.astroExec = "";
}
function ht() {
	const t = document.querySelector(
		'[name="astro-view-transitions-fallback"]',
	);
	return t ? t.getAttribute("content") : "animate";
}
function F(t) {
	return t.dataset.astroReload !== void 0;
}
(P || ht() !== "none") &&
	(document.addEventListener("click", (t) => {
		let e = t.target;
		if (
			(t.composed && (e = t.composedPath()[0]),
			e instanceof Element && (e = e.closest("a, area")),
			!(e instanceof HTMLAnchorElement) &&
				!(e instanceof SVGAElement) &&
				!(e instanceof HTMLAreaElement))
		)
			return;
		const n = e instanceof HTMLElement ? e.target : e.target.baseVal,
			o = e instanceof HTMLElement ? e.href : e.href.baseVal,
			r = new URL(o, location.href).origin;
		F(e) ||
			e.hasAttribute("download") ||
			!e.href ||
			(n && n !== "_self") ||
			r !== location.origin ||
			t.button !== 0 ||
			t.metaKey ||
			t.ctrlKey ||
			t.altKey ||
			t.shiftKey ||
			t.defaultPrevented ||
			(t.preventDefault(),
			N(o, {
				history:
					e.dataset.astroHistory === "replace" ? "replace" : "auto",
				sourceElement: e,
			}));
	}),
	document.addEventListener("submit", (t) => {
		let e = t.target;
		if (e.tagName !== "FORM" || t.defaultPrevented || F(e)) return;
		const n = e,
			o = t.submitter,
			r = new FormData(n, o),
			s =
				typeof n.action == "string"
					? n.action
					: n.getAttribute("action"),
			u =
				typeof n.method == "string"
					? n.method
					: n.getAttribute("method");
		let a = o?.getAttribute("formaction") ?? s ?? location.pathname;
		const l = o?.getAttribute("formmethod") ?? u ?? "get";
		if (
			l === "dialog" ||
			location.origin !== new URL(a, location.href).origin
		)
			return;
		const d = { sourceElement: o ?? n };
		if (l === "get") {
			const c = new URLSearchParams(r),
				i = new URL(a);
			(i.search = c.toString()), (a = i.toString());
		} else d.formData = r;
		t.preventDefault(), N(a, d);
	}),
	q({ prefetchAll: !0 }));
//# sourceMappingURL=ClientRouter.astro_astro_type_script_index_0_lang.ZAtydGN1.js.map
