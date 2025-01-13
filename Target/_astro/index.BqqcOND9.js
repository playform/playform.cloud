const d = new Set(),
	c = new WeakSet();
let f = !0,
	h = "hover",
	l = !1;
function L(e) {
	l ||
		((l = !0),
		(f ??= e?.prefetchAll ?? !1),
		(h ??= e?.defaultStrategy ?? "hover"),
		m(),
		g(),
		v(),
		S());
}
function m() {
	for (const e of ["touchstart", "mousedown"])
		document.body.addEventListener(
			e,
			(t) => {
				i(t.target, "tap") &&
					s(t.target.href, { ignoreSlowConnection: !0 });
			},
			{ passive: !0 },
		);
}
function g() {
	let e;
	document.body.addEventListener(
		"focusin",
		(n) => {
			i(n.target, "hover") && t(n);
		},
		{ passive: !0 },
	),
		document.body.addEventListener("focusout", r, { passive: !0 }),
		u(() => {
			for (const n of document.getElementsByTagName("a"))
				c.has(n) ||
					(i(n, "hover") &&
						(c.add(n),
						n.addEventListener("mouseenter", t, { passive: !0 }),
						n.addEventListener("mouseleave", r, { passive: !0 })));
		});
	function t(n) {
		const o = n.target.href;
		e && clearTimeout(e),
			(e = setTimeout(() => {
				s(o);
			}, 80));
	}
	function r() {
		e && (clearTimeout(e), (e = 0));
	}
}
function v() {
	let e;
	u(() => {
		for (const t of document.getElementsByTagName("a"))
			c.has(t) ||
				(i(t, "viewport") && (c.add(t), (e ??= y()), e.observe(t)));
	});
}
function y() {
	const e = new WeakMap();
	return new IntersectionObserver((t, r) => {
		for (const n of t) {
			const o = n.target,
				a = e.get(o);
			n.isIntersecting
				? (a && clearTimeout(a),
					e.set(
						o,
						setTimeout(() => {
							r.unobserve(o), e.delete(o), s(o.href);
						}, 300),
					))
				: a && (clearTimeout(a), e.delete(o));
		}
	});
}
function S() {
	u(() => {
		for (const e of document.getElementsByTagName("a"))
			i(e, "load") && s(e.href);
	});
}
function s(e, t) {
	e = e.replace(/#.*/, "");
	const r = t?.ignoreSlowConnection ?? !1;
	if (w(e, r))
		if ((d.add(e), HTMLScriptElement.supports?.("speculationrules"))) E(e);
		else if (
			document.createElement("link").relList?.supports?.("prefetch") &&
			t?.with !== "fetch"
		) {
			const n = document.createElement("link");
			(n.rel = "prefetch"),
				n.setAttribute("href", e),
				document.head.append(n);
		} else fetch(e, { priority: "low" });
}
function w(e, t) {
	if (!navigator.onLine || (!t && p())) return !1;
	try {
		const r = new URL(e, location.href);
		return (
			location.origin === r.origin &&
			(location.pathname !== r.pathname ||
				location.search !== r.search) &&
			!d.has(e)
		);
	} catch {}
	return !1;
}
function i(e, t) {
	if (e?.tagName !== "A") return !1;
	const r = e.dataset.astroPrefetch;
	return r === "false"
		? !1
		: t === "tap" && (r != null || f) && p()
			? !0
			: (r == null && f) || r === ""
				? t === h
				: r === t;
}
function p() {
	if ("connection" in navigator) {
		const e = navigator.connection;
		return e.saveData || /2g/.test(e.effectiveType);
	}
	return !1;
}
function u(e) {
	e();
	let t = !1;
	document.addEventListener("astro:page-load", () => {
		if (!t) {
			t = !0;
			return;
		}
		e();
	});
}
function E(e) {
	const t = document.createElement("script");
	(t.type = "speculationrules"),
		(t.textContent = JSON.stringify({
			prerender: [{ source: "list", urls: [e] }],
			prefetch: [{ source: "list", urls: [e] }],
		})),
		document.head.append(t);
}
export { L as i };
//# sourceMappingURL=index.BqqcOND9.js.map
