/**
 * This script includes functions adapted from the APIWrapper.js by WildH0g.
 * Source: https://github.com/WildH0g/gas-api-wrapper/blob/main/gas/APIWrapper.js
 * Accessed on: 5/11/2024
 *
 * This script is used to enhance API interactions in Google Apps Script, providing a structured way to handle API requests.
 */

var APIWrapperBuilder;
(() => {
    var e = {
            98: (e, t, r) => {
                const s = r(620),
                    n = function() {
                        const e = new WeakMap,
                            t = new WeakMap,
                            r = new WeakMap,
                            n = new WeakMap,
                            a = new WeakMap;
                        class o {
                            getAuthUrl(e, t) {
                                return e.baseUrl + t.path
                            }
                            getAuthHeaders(e = {}) {
                                return e
                            }
                        }
                        return {
                            Token: class extends o {
                                constructor(s, n, a) {
                                    super(), ["headers", "query"].includes(s) || (s = "query"), e.set(this, s), t.set(this, n), r.set(this, a)
                                }
                                get addTo() {
                                    return e.get(this)
                                }
                                get token() {
                                    return t.get(this)
                                }
                                get secret() {
                                    return r.get(this)
                                }
                                get name() {
                                    return "KeyToken"
                                }
                                getAuthUrl(e, t) {
                                    const r = e.baseUrl + t.path;
                                    if ("query" !== this.addTo) return r;
                                    const s = this.token ? `${this.token.name}=${encodeURI(this.token.value)}` : "",
                                        n = this.secret ? `${this.secret.name}=${encodeURI(this.secret.value)}` : "";
                                    let a = "";
                                    return s && (a += "?" + s), n && (a += a ? "&" + n : "?" + n), r + a
                                }
                                getAuthHeaders(e = {}) {
                                    return "headers" !== this.addTo || (this.token && (e[this.token.name] = this.token.value), this.secret && (e[this.secret.name] = this.secret.value)), e
                                }
                            },
                            BasicAuth: class extends o {
                                constructor(e, t) {
                                    super(), n.set(this, e), a.set(this, t)
                                }
                                get username() {
                                    return n.get(this)
                                }
                                get password() {
                                    return a.get(this)
                                }
                                getAuthHeaders(e = {}) {
                                    return {
                                        ...e,
                                        Authorization: `Basic ${(0, { nodejs: e => Buffer.from(e, "utf8").toString("base64"), gas: e => Utilities.base64Encode(e), unknown() { throw new Error("Library can only run in Google Apps Script runtime environment") } }[s.runtime()])(this.username + ":" + this.password)}`
                                    }
                                }
                            },
                            BearerAuth: class extends o {
                                constructor(e) {
                                    super(), t.set(this, e)
                                }
                                getAuthHeaders(e = {}) {
                                    return {
                                        ...e,
                                        Authorization: `Bearer ${this.token}`
                                    }
                                }
                                get token() {
                                    return t.get(this)
                                }
                            }
                        }
                    }();
                e.exports = {
                    Token: n.Token,
                    BasicAuth: n.BasicAuth,
                    BearerAuth: n.BearerAuth
                }
            },
            658: (e, t, r) => {
                const {
                    Token: s,
                    BasicAuth: n,
                    BearerAuth: a
                } = r(98), o = function() {
                    const e = new WeakMap,
                        t = new WeakMap,
                        r = new WeakMap,
                        o = new WeakMap;
                    class h {
                        constructor(s, n) {
                            e.set(this, s), r.set(this, !1), t.set(this, n), o.set(this, {})
                        }
                        get baseUrl() {
                            return e.get(this)
                        }
                        get auth() {
                            return t.get(this)
                        }
                        get debugMode() {
                            return r.get(this)
                        }
                        debugModeOn() {
                            return r.set(this, !0), this
                        }
                        debugModeOff() {
                            return r.set(this, !1), this
                        }
                        getMethodData(e) {
                            return o.get(this)[e]
                        }
                    }
                    const u = new WeakMap,
                        i = (e, t) => t ? (Object.entries(t).forEach((([t, r]) => {
                            const s = new RegExp(`{{${t}}}`, "g");
                            e = e.replace(s, r)
                        })), e) : e;
                    class c {
                        constructor(e, t) {
                            var r;
                            this.name = e, this.path = t.path && (r = t.path).trim() ? (/^\//.test(r) || (r = "/" + r), /\/$/.test(r) && (r = r.replace(/\/$/, "")), r) : "/", this.method = t.method || "GET", this.headers = t.headers || {}, t.payload && (this.payload = t.payload), this.queryParams = t.queryParams || {}
                        }
                    }
                    return class {
                        constructor(e, t) {
                            const {
                                type: r,
                                token: o,
                                secret: i,
                                addTo: c,
                                username: p,
                                password: d
                            } = t, g = {
                                KeyToken: new s(c, o, i),
                                Basic: new n(p, d),
                                Bearer: new a(o)
                            };
                            if (!g[r]) throw new Error(`No auth of type "${r}" found`);
                            u.set(this, new h(e, g[r]))
                        }
                        addMethod(e, t) {
                            return u.get(this)[e] = function(r) {
                                const s = {
                                    ...new c(e, t)
                                };
                                s.path = i(s.path, r);
                                let n = this.auth.getAuthUrl(this, s);
                                const a = ((e, t) => Object.entries(e).reduce(((e, [r, s]) => `${e}${e ? "&" : ""}${r}=${i(s, t)}`.replace(/[^\{\{\}\}\?&]+=\{\{[^\{\{\}\}\?&]+\}\}/g, "").replace(/^&/g, "").replace(/&$/g, "")), ""))(s.queryParams, r);
                                a && (n += (/\?/.test(n) ? "&" : "?") + a), s.payload = ((e, t) => {
                                    if (!e) return;
                                    let r = JSON.stringify(e);
                                    return Object.entries(t).forEach((([e, t]) => {
                                        const s = new RegExp(`{{${e}}}`, "g");
                                        r = r.replace(s, t.replace(/"/g, '\\"'))
                                    })), r = r.replace(/"[^"]+":"?\{\{.*\}\}"?/g, "").replace(/,}$/g, "}"), r
                                })(s.payload, r), s.headers = this.auth.getAuthHeaders(s.headers);
                                const o = {
                                    ...s,
                                    url: n,
                                    queryString: a
                                };
                                return this.debugMode ? o : (e => {
                                    const {
                                        url: t,
                                        method: r = "GET",
                                        headers: s,
                                        payload: n,
                                        contentType: a = "application/json"
                                    } = e, o = {
                                        contentType: a,
                                        method: r
                                    };
                                    s && (o.headers = s), n && !["get", "delete"].includes(r.toLowerCase()) && (o.payload = n);
                                    let h = "";
                                    try {
                                        return h = UrlFetchApp.fetch(t, o), JSON.parse(h)
                                    } catch (e) {
                                        return {
                                            err: e,
                                            response: h
                                        }
                                    }
                                })(o)
                            }, this
                        }
                        build() {
                            return u.get(this)
                        }
                    }
                }();
                e.exports = o
            },
            620: e => {
                e.exports = {
                    runtime: () => "undefined" != typeof ScriptApp ? "gas" : "undefined" != typeof Buffer ? "nodejs" : "unknown"
                }
            }
        },
        t = {},
        r = function r(s) {
            var n = t[s];
            if (void 0 !== n) return n.exports;
            var a = t[s] = {
                exports: {}
            };
            return e[s](a, a.exports, r), a.exports
        }(658);
    APIWrapperBuilder = r
})();
