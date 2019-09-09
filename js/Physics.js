/**
 * Original Code (PhysicsJS) (c) 2013 Jasper Palfree <jasper@wellcaffeinated.net>
 * Licensed MIT (http://wellcaffeinated.net/PhysicsJS)
 *
 * Modifications by the Pantsmo.de Team
 * https://pantsmo.de/
 * 
 * IMPORTED FROM http://wellcaffeinated.net/PhysicsJS/examples/physicsjs-full.js
 */

! function(t, e) {
    "object" == typeof exports ? module.exports = e.call(t) : "function" == typeof define && define.amd ? define(function() {
        return e.call(t)
    }) : t.Physics = e.call(t)
}(this, function() {
    "use strict";
    var t = function t() {
        return t.world.apply(t, arguments)
    };
    t.util = {},
        function(e) {
            function n(t) {
                return "function" != typeof t.toString && "string" == typeof(t + "")
            }

            function i() {}

            function o(t) {
                t.length = 0, A.length < P && A.push(t)
            }

            function r() {}

            function s(t, e, i, r, a) {
                if (i) {
                    var c = i(t);
                    if (void 0 !== c) return c
                }
                if (!v(t)) return t;
                var l = rt.call(t);
                if (!R[l] || !mt.nodeClass && n(t)) return t;
                var u = bt[l];
                switch (l) {
                    case O:
                    case T:
                        return new u(+t);
                    case W:
                    case H:
                        return new u(t);
                    case z:
                        return (c = u(t.source, j.exec(t))).lastIndex = t.lastIndex, c
                }
                if (l = xt(t), e) {
                    var h = !r;
                    r || (r = A.pop() || []), a || (a = A.pop() || []);
                    for (var d = r.length; d--;)
                        if (r[d] == t) return a[d];
                    c = l ? u(t.length) : {}
                } else c = l ? function(t, e, n) {
                    e || (e = 0), void 0 === n && (n = t ? t.length : 0);
                    var i = -1;
                    n = n - e || 0;
                    for (var o = Array(0 > n ? 0 : n); ++i < n;) o[i] = t[e + i];
                    return o
                }(t) : kt({}, t);
                return l && (et.call(t, "index") && (c.index = t.index), et.call(t, "input") && (c.input = t.input)), e ? (r.push(t), a.push(c), (l ? Bt : jt)(t, function(t, n) {
                    c[n] = s(t, e, i, r, a)
                }), h && (o(r), o(a)), c) : c
            }

            function a(t, e, n) {
                if ("function" != typeof t) return _;
                if (void 0 === e) return t;
                var i = t.__bindData__ || mt.funcNames && !t.name;
                if (void 0 === i) {
                    var o = S && Z.call(t);
                    mt.funcNames || !o || I.test(o) || (i = !0), (mt.funcNames || !i) && (i = !mt.funcDecomp || S.test(o), _t(t, i))
                }
                if (!0 !== i && i && 1 & i[1]) return t;
                switch (n) {
                    case 1:
                        return function(n) {
                            return t.call(e, n)
                        };
                    case 2:
                        return function(n, i) {
                            return t.call(e, n, i)
                        };
                    case 3:
                        return function(n, i, o) {
                            return t.call(e, n, i, o)
                        };
                    case 4:
                        return function(n, i, o, r) {
                            return t.call(e, n, i, o, r)
                        }
                }
                return y(t, e)
            }

            function c(t, e, i, r, s, a) {
                if (i && void 0 !== (v = i(t, e))) return !!v;
                if (t === e) return 0 !== t || 1 / t == 1 / e;
                if (t == t && !(t && $[typeof t] || e && $[typeof e])) return !1;
                if (null == t || null == e) return t === e;
                var l = rt.call(t),
                    u = rt.call(e);
                if (l == E && (l = L), u == E && (u = L), l != u) return !1;
                switch (l) {
                    case O:
                    case T:
                        return +t == +e;
                    case W:
                        return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
                    case z:
                    case H:
                        return t == e + ""
                }
                if (!(u = l == F)) {
                    if (et.call(t, "__wrapped__") || et.call(e, "__wrapped__")) return c(t.__wrapped__ || t, e.__wrapped__ || e, i, r, s, a);
                    if (l != L || !mt.nodeClass && (n(t) || n(e))) return !1;
                    l = !mt.argsObject && f(t) ? Object : t.constructor;
                    var h = !mt.argsObject && f(e) ? Object : e.constructor;
                    if (l != h && !(p(l) && l instanceof l && p(h) && h instanceof h)) return !1
                }
                for (h = !s, s || (s = A.pop() || []), a || (a = A.pop() || []), l = s.length; l--;)
                    if (s[l] == t) return a[l] == e;
                var d = 0,
                    v = !0;
                if (s.push(t), a.push(e), u) {
                    if (l = t.length, d = e.length, !(v = d == t.length) && !r) return v;
                    for (; d--;)
                        if (u = l, h = e[d], r)
                            for (; u-- && !(v = c(t[u], h, i, r, s, a)););
                        else if (!(v = c(t[d], h, i, r, s, a))) break;
                    return v
                }
                return Pt(e, function(e, n, o) {
                    return et.call(o, n) ? (d++, v = et.call(t, n) && c(t[n], e, i, r, s, a)) : void 0
                }), v && !r && Pt(t, function(t, e, n) {
                    return et.call(n, e) ? v = -1 < --d : void 0
                }), h && (o(s), o(a)), v
            }

            function l(t, e, n, i, o, r) {
                var s = 1 & e,
                    a = 2 & e,
                    c = 4 & e,
                    u = 8 & e,
                    d = 16 & e,
                    f = 32 & e,
                    g = t;
                if (!a && !p(t)) throw new TypeError;
                d && !n.length && (e &= -17, d = n = !1), f && !i.length && (e &= -33, f = i = !1);
                var b = t && t.__bindData__;
                if (b) return !s || 1 & b[1] || (b[4] = o), !s && 1 & b[1] && (e |= 8), !c || 4 & b[1] || (b[5] = r), d && it.apply(b[2] || (b[2] = []), n), f && it.apply(b[3] || (b[3] = []), i), b[1] |= e, l.apply(null, b);
                if (!s || a || c || f || !(mt.fastBind || ct && d)) m = function() {
                    var p = arguments,
                        b = s ? o : this;
                    return (c || d || f) && (p = vt.call(p), d && st.apply(p, n), f && it.apply(p, i), c && p.length < r) ? (e |= 16, l(t, u ? e : -4 & e, p, null, o, r)) : (a && (t = b[g]), this instanceof m ? (b = h(t.prototype), v(p = t.apply(b, p)) ? p : b) : t.apply(b, p))
                };
                else {
                    if (d) {
                        var y = [o];
                        it.apply(y, n)
                    }
                    var m = d ? ct.apply(t, y) : ct.call(t, o)
                }
                return _t(m, vt.call(arguments)), m
            }

            function u() {
                V.h = M, V.b = V.c = V.g = V.i = "", V.e = "t", V.j = !0;
                for (var t, e = 0; t = arguments[e]; e++)
                    for (var n in t) V[n] = t[n];
                e = V.a, V.d = /^[^,]+/.exec(e)[0], t = Function, e = "return function(" + e + "){";
                var i = "var n,t=" + (n = V).d + ",E=" + n.e + ";if(!t)return E;" + n.i + ";";
                n.b ? (i += "var u=t.length;n=-1;if(" + n.b + "){", mt.unindexedChars && (i += "if(s(t)){t=t.split('')}"), i += "while(++n<u){" + n.g + ";}}else{") : mt.nonEnumArgs && (i += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + n.g + ";}}else{"), mt.enumPrototypes && (i += "var G=typeof t=='function';"), mt.enumErrorProps && (i += "var F=t===k||t instanceof Error;");
                var o = [];
                if (mt.enumPrototypes && o.push('!(G&&n=="prototype")'), mt.enumErrorProps && o.push('!(F&&(n=="message"||n=="name"))'), n.j && n.f) i += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];", o.length && (i += "if(" + o.join("&&") + "){"), i += n.g + ";", o.length && (i += "}"), i += "}";
                else if (i += "for(n in t){", n.j && o.push("m.call(t, n)"), o.length && (i += "if(" + o.join("&&") + "){"), i += n.g + ";", o.length && (i += "}"), i += "}", mt.nonEnumShadows) {
                    for (i += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];", k = 0; 7 > k; k++) i += "n='" + n.h[k] + "';if((!(r&&x[n])&&m.call(t,n))", n.j || (i += "||(!x[n]&&t[n]!==A[n])"), i += "){" + n.g + "}";
                    i += "}"
                }
                return (n.b || mt.nonEnumArgs) && (i += "}"), t("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", e + (i += n.c + ";return E") + "}")(a, q, U, et, B, f, xt, g, V.f, Y, $, yt, H, G, rt)
            }

            function h(t) {
                return v(t) ? lt(t) : {}
            }

            function d(t) {
                var e, i;
                return !(!(t && rt.call(t) == L && (e = t.constructor, !p(e) || e instanceof e)) || !mt.argsClass && f(t) || !mt.nodeClass && n(t)) && (mt.ownLast ? (Pt(t, function(t, e, n) {
                    return i = et.call(n, e), !1
                }), !1 !== i) : (Pt(t, function(t, e) {
                    i = e
                }), void 0 === i || et.call(t, i)))
            }

            function f(t) {
                return t && "object" == typeof t && "number" == typeof t.length && rt.call(t) == E || !1
            }

            function p(t) {
                return "function" == typeof t
            }

            function v(t) {
                return !(!t || !$[typeof t])
            }

            function g(t) {
                return "string" == typeof t || rt.call(t) == H
            }

            function b(t, e, n) {
                if (e && void 0 === n && xt(t)) {
                    n = -1;
                    for (var i = t.length; ++n < i && !1 !== e(t[n], n, t););
                } else Bt(t, e, n);
                return t
            }

            function y(t, e) {
                return 2 < arguments.length ? l(t, 17, vt.call(arguments, 2), null, e) : l(t, 1, null, null, e)
            }

            function m(t, e, n) {
                var i, o, r, s, a, c, l, u = 0,
                    h = !1,
                    d = !0;
                if (!p(t)) throw new TypeError;
                if (e = dt(0, e) || 0, !0 === n) {
                    var f = !0;
                    d = !1
                } else v(n) && (f = n.leading, h = "maxWait" in n && (dt(e, n.maxWait) || 0), d = "trailing" in n ? n.trailing : d);
                var g = function() {
                        var n = e - (nt() - s);
                        0 < n ? c = setTimeout(g, n) : (o && clearTimeout(o), n = l, o = c = l = w, n && (u = nt(), r = t.apply(a, i)))
                    },
                    b = function() {
                        c && clearTimeout(c), o = c = l = w, (d || h !== e) && (u = nt(), r = t.apply(a, i))
                    };
                return function() {
                    if (i = arguments, s = nt(), a = this, l = d && (c || !f), !1 === h) var n = f && !c;
                    else {
                        o || f || (u = s);
                        var p = h - (s - u);
                        0 < p ? o || (o = setTimeout(b, p)) : (o && (o = clearTimeout(o)), u = s, r = t.apply(a, i))
                    }
                    return c || e === h || (c = setTimeout(g, e)), n && (r = t.apply(a, i)), r
                }
            }

            function _(t) {
                return t
            }

            function x(t, e, n) {
                var i = null == t,
                    o = null == e;
                return null == n && ("boolean" == typeof t && o ? (n = t, t = 1) : o || "boolean" != typeof e || (n = e, o = !0)), i && o && (e = 1), t = +t || 0, o ? (e = t, t = 0) : e = +e || 0, i = pt(), n || t % 1 || e % 1 ? ft(t + i * (e - t + parseFloat("1e-" + ((i + "").length - 1))), e) : t + X(i * (e - t + 1))
            }
            var w, A = [],
                C = 0,
                B = {},
                P = 40,
                j = /\w*$/,
                I = /^function[ \n\r\t]+\w/,
                S = /\bthis\b/,
                M = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
                E = "[object Arguments]",
                F = "[object Array]",
                O = "[object Boolean]",
                T = "[object Date]",
                q = "[object Error]",
                W = "[object Number]",
                L = "[object Object]",
                z = "[object RegExp]",
                H = "[object String]",
                R = {
                    "[object Function]": !1
                };
            R[E] = R[F] = R[O] = R[T] = R[W] = R[L] = R[z] = R[H] = !0;
            var D = {
                    leading: !1,
                    maxWait: 0,
                    trailing: !1
                },
                N = {
                    configurable: !1,
                    enumerable: !1,
                    value: null,
                    writable: !1
                },
                V = {
                    a: "",
                    b: null,
                    c: "",
                    d: "",
                    e: "",
                    v: null,
                    g: "",
                    h: null,
                    support: null,
                    i: "",
                    j: !1
                },
                $ = {
                    boolean: !1,
                    function: !0,
                    object: !0,
                    number: !1,
                    string: !1,
                    undefined: !1
                },
                J = $[typeof e] && e || this,
                K = [],
                U = Error.prototype,
                Y = Object.prototype,
                G = String.prototype,
                Q = RegExp("^" + (Y.valueOf + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
                X = Math.floor,
                Z = Function.prototype.toString,
                tt = Q.test(tt = Object.getPrototypeOf) && tt,
                et = Y.hasOwnProperty,
                nt = Q.test(nt = Date.now) && nt || function() {
                    return +new Date
                },
                it = K.push,
                ot = Y.propertyIsEnumerable,
                rt = Y.toString,
                st = K.unshift,
                at = function() {
                    try {
                        var t = {},
                            e = Q.test(e = Object.defineProperty) && e,
                            n = e(t, t, t) && e
                    } catch (t) {}
                    return n
                }(),
                ct = Q.test(ct = rt.bind) && ct,
                lt = Q.test(lt = Object.create) && lt,
                ut = Q.test(ut = Array.isArray) && ut,
                ht = Q.test(ht = Object.keys) && ht,
                dt = Math.max,
                ft = Math.min,
                pt = Math.random,
                vt = K.slice;
            e = Q.test(J.attachEvent);
            var gt = ct && !/\n|true/.test(ct + e),
                bt = {};
            bt[F] = Array, bt[O] = Boolean, bt[T] = Date, bt["[object Function]"] = Function, bt[L] = Object, bt[W] = Number, bt[z] = RegExp, bt[H] = String;
            var yt = {};
            yt[F] = yt[T] = yt[W] = {
                    constructor: !0,
                    toLocaleString: !0,
                    toString: !0,
                    valueOf: !0
                }, yt[O] = yt[H] = {
                    constructor: !0,
                    toString: !0,
                    valueOf: !0
                }, yt[q] = yt["[object Function]"] = yt[z] = {
                    constructor: !0,
                    toString: !0
                }, yt[L] = {
                    constructor: !0
                },
                function() {
                    for (var t = M.length; t--;) {
                        var e, n = M[t];
                        for (e in yt) et.call(yt, e) && !et.call(yt[e], n) && (yt[e][n] = !1)
                    }
                }();
            var mt = r.support = {};
            ! function() {
                var t = function() {
                        this.x = 1
                    },
                    e = {
                        0: 1,
                        length: 1
                    },
                    n = [];
                for (var i in t.prototype = {
                        valueOf: 1,
                        y: 1
                    }, new t) n.push(i);
                for (i in arguments);
                mt.argsClass = rt.call(arguments) == E, mt.argsObject = arguments.constructor == Object && !(arguments instanceof Array), mt.enumErrorProps = ot.call(U, "message") || ot.call(U, "name"), mt.enumPrototypes = ot.call(t, "prototype"), mt.fastBind = ct && !gt, mt.funcDecomp = !Q.test(J.WinRTError) && S.test(function() {
                    return this
                }), mt.funcNames = "string" == typeof Function.name, mt.nonEnumArgs = 0 != i, mt.nonEnumShadows = !/valueOf/.test(n), mt.ownLast = "x" != n[0], mt.spliceObjects = (K.splice.call(e, 0, 1), !e[0]), mt.unindexedChars = "xx" != "x" [0] + Object("x")[0];
                try {
                    mt.nodeClass = !(rt.call(document) == L && !({
                        toString: 0
                    } + ""))
                } catch (t) {
                    mt.nodeClass = !0
                }
            }(1), lt || (h = function(t) {
                if (v(t)) {
                    i.prototype = t;
                    var e = new i;
                    i.prototype = null
                }
                return e || {}
            });
            var _t = at ? function(t, e) {
                N.value = e, at(t, "__bindData__", N)
            } : i;
            mt.argsClass || (f = function(t) {
                return t && "object" == typeof t && "number" == typeof t.length && et.call(t, "callee") || !1
            });
            var xt = ut || function(t) {
                    return t && "object" == typeof t && "number" == typeof t.length && rt.call(t) == F || !1
                },
                wt = u({
                    a: "z",
                    e: "[]",
                    i: "if(!(B[typeof z]))return E",
                    g: "E.push(n)"
                }),
                At = ht ? function(t) {
                    return v(t) ? mt.enumPrototypes && "function" == typeof t || mt.nonEnumArgs && t.length && f(t) ? wt(t) : ht(t) : []
                } : wt;
            e = {
                a: "z,H,l",
                i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
                v: At,
                g: "if(typeof E[n]=='undefined')E[n]=t[n]",
                c: "}}"
            };
            var Ct = {
                    i: "if(!B[typeof t])return E;" + (ut = {
                        a: "g,e,K",
                        i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
                        b: "typeof u=='number'",
                        v: At,
                        g: "if(e(t[n],n,g)===false)return E"
                    }).i,
                    b: !1
                },
                Bt = u(ut),
                kt = u(e, {
                    i: e.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
                    g: "E[n]=e?e(E[n],t[n]):t[n]"
                }),
                Pt = u(ut, Ct, {
                    j: !1
                }),
                jt = u(ut, Ct);
            p(/x/) && (p = function(t) {
                return "function" == typeof t && "[object Function]" == rt.call(t)
            }), ut = tt ? function(t) {
                if (!t || rt.call(t) != L || !mt.argsClass && f(t)) return !1;
                var e = t.valueOf,
                    n = "function" == typeof e && (n = tt(e)) && tt(n);
                return n ? t == n || tt(t) == n : d(t)
            } : d, r.assign = kt, r.bind = y, r.createCallback = function(t, e, n) {
                var i = typeof t;
                if (null == t || "function" == i) return a(t, e, n);
                if ("object" != i) return function(e) {
                    return e[t]
                };
                var o = At(t),
                    r = o[0],
                    s = t[r];
                return 1 != o.length || s != s || v(s) ? function(e) {
                    for (var n = o.length, i = !1; n-- && (i = c(e[o[n]], t[o[n]], null, !0)););
                    return i
                } : function(t) {
                    return t = t[r], s === t && (0 !== s || 1 / s == 1 / t)
                }
            }, r.debounce = m, r.forEach = b, r.forIn = Pt, r.forOwn = jt, r.keys = At, r.shuffle = function(t) {
                var e = -1,
                    n = t ? t.length : 0,
                    i = Array("number" == typeof n ? n : 0);
                return b(t, function(t) {
                    var n = x(++e);
                    i[e] = i[n], i[n] = t
                }), i
            }, r.throttle = function(t, e, n) {
                var i = !0,
                    o = !0;
                if (!p(t)) throw new TypeError;
                return !1 === n ? i = !1 : v(n) && (i = "leading" in n ? n.leading : i, o = "trailing" in n ? n.trailing : o), D.leading = i, D.maxWait = e, D.trailing = o, m(t, e, D)
            }, r.each = b, r.extend = kt, r.clone = function(t, e, n, i) {
                return "boolean" != typeof e && null != e && (i = n, n = e, e = !1), s(t, e, "function" == typeof n && a(n, i, 1))
            }, r.identity = _, r.isArguments = f, r.isArray = xt, r.isFunction = p, r.isObject = v, r.isPlainObject = ut, r.isString = g, r.random = x, r.sortedIndex = function(t, e, n, i) {
                var o = 0,
                    s = t ? t.length : o;
                for (e = (n = n ? r.createCallback(n, i, 1) : _)(e); o < s;) n(t[i = o + s >>> 1]) < e ? o = i + 1 : s = i;
                return o
            }, r.uniqueId = function(t) {
                return (null == t ? "" : t) + "" + ++C
            }, r.VERSION = "2.2.1", r.extend(t.util, r)
        }(this);
    var e, n, i, o, r, s, a, c, l, u, h, d, f = t.util.decorator = function(e, n) {
        var i = {},
            o = {},
            r = function(e, n) {
                return t.util.isFunction(n) ? n : e
            },
            s = Object.getPrototypeOf;
        "function" != typeof s && (s = "object" == typeof "test".__proto__ ? function(t) {
            return t.__proto__
        } : function(t) {
            return t.constructor.prototype
        });
        var a = Object.create;
        "function" != typeof a && (a = function(t) {
            function e() {}
            return e.prototype = t, new e
        });
        var c = function(n, i) {
            "object" != typeof n ? "type" !== n && t.util.isFunction(i) && (o[n] = i) : (o = t.util.extend(o, n, r)).type = e
        };
        c(n);
        var l = function(n, c, l, u) {
            var h, d = o;
            if ("string" != typeof c) u = l, l = c;
            else {
                if (!(d = i[c])) throw 'Error: "' + c + '" ' + e + " not defined";
                d = d.prototype
            }
            if ("function" == typeof l)(h = i[n]) ? h.prototype = t.util.extend(h.prototype, l(s(h.prototype)), r) : ((h = i[n] = function(t) {
                this.init && this.init(t)
            }).prototype = a(d), h.prototype = t.util.extend(h.prototype, l(d), r)), h.prototype.type = e, h.prototype.name = n;
            else if (u = l || {}, !(h = i[n])) throw 'Error: "' + n + '" ' + e + " not defined";
            if (u) return new h(u)
        };
        return l.mixin = c, l
    };
    return n = (e = this).Physics, t.noConflict = function() {
            return e.Physics === t && (e.Physics = n), t
        }, (i = function t(e) {
            if (!(this instanceof t)) return new t(e);
            this.initPubsub(e)
        }).prototype = {
            initPubsub: function(t) {
                this._topics = {}, this._defaultScope = t || this
            },
            subscribe: function(e, n, i, o) {
                var r, s = this._topics[e] || (this._topics[e] = []),
                    a = n;
                if (t.util.isObject(e)) {
                    for (var c in e) this.subscribe(c, e[c], n, i);
                    return this
                }
                return t.util.isObject(i) ? (n = t.util.bind(n, i))._bindfn_ = a : o || (o = i), n._priority_ = o, r = t.util.sortedIndex(s, n, "_priority_"), s.splice(r, 0, n), this
            },
            unsubscribe: function(t, e) {
                if (!0 === t) return this._topics = {}, this;
                var n, i = this._topics[t];
                if (!i) return this;
                if (!0 === e) return this._topics[t] = [], this;
                for (var o = 0, r = i.length; o < r; o++)
                    if ((n = i[o])._bindfn_ === e || n === e) {
                        i.splice(o, 1);
                        break
                    } return this
            },
            publish: function(t, e) {
                "object" != typeof t && (t = {
                    topic: t
                });
                var n = t.topic,
                    i = this._topics[n],
                    o = i && i.length;
                if (!n) throw "Error: No topic specified in call to world.publish()";
                if (!o) return this;
                for (t.scope = t.scope || this._defaultScope; o--;) t.handler = i[o], t.handler(t);
                return this
            }
        }, t.util.pubsub = i,
        function(t) {
            for (var e = 0, n = ["ms", "moz", "webkit", "o"], i = 0; i < n.length && !t.requestAnimationFrame; ++i) t.requestAnimationFrame = t[n[i] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[n[i] + "CancelAnimationFrame"] || t[n[i] + "CancelRequestAnimationFrame"];
            t.requestAnimationFrame || (t.requestAnimationFrame = function(n, i) {
                var o = (new Date).getTime(),
                    r = Math.max(0, 16 - (o - e)),
                    s = t.setTimeout(function() {
                        n(o + r)
                    }, r);
                return e = o + r, s
            }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }(this), o = "Error: Scratchpad used after .done() called. (Could it be unintentionally scoped?)", r = "Error: Scratchpad usage space out of bounds. (Did you forget to call .done()?)", s = [], a = 0, (c = function() {
            if (this.objIndex = 0, this.arrayIndex = 0, this.vectorIndex = 0, this.aabbIndex = 0, this.transformIndex = 0, this.objectStack = [], this.arrayStack = [], this.vectorStack = [], this.aabbStack = [], this.transformStack = [], ++a >= 100) throw "Error: Too many scratchpads created. (Did you forget to call .done()?)"
        }).prototype = {
            done: function() {
                this._active = !1, this.objIndex = this.arrayIndex = this.vectorIndex = this.aabbIndex = this.transformIndex = 0, s.push(this)
            },
            object: function() {
                var t = this.objectStack;
                if (!this._active) throw o;
                if (this.objIndex >= 10) throw r;
                return t[this.objIndex++] || t[t.push({}) - 1]
            },
            array: function() {
                var t = this.arrayStack;
                if (!this._active) throw o;
                if (this.arrIndex >= 10) throw r;
                return t[this.arrIndex++] || t[t.push([]) - 1]
            },
            vector: function() {
                var e = this.vectorStack;
                if (!this._active) throw o;
                if (this.vectorIndex >= 10) throw r;
                return e[this.vectorIndex++] || e[e.push(t.vector()) - 1]
            },
            aabb: function() {
                var e = this.aabbStack;
                if (!this._active) throw o;
                if (this.aabbIndex >= 10) throw r;
                return e[this.aabbIndex++] || e[e.push(t.aabb()) - 1]
            },
            transform: function() {
                var e = this.transformStack;
                if (!this._active) throw o;
                if (this.transformIndex >= 10) throw r;
                return e[this.transformIndex++] || e[e.push(t.transform()) - 1]
            }
        }, t.scratchpad = function() {
            var t = s.pop() || new c;
            return t._active = !0, t
        },
        function(e) {
            var n = 0,
                i = !1,
                o = [];

            function r(t) {
                var s = o;
                if (i) {
                    e.requestAnimationFrame(r);
                    for (var a = 0, c = s.length; a < c; ++a) s[a](t, t - n);
                    n = t
                }
            }
            t.util.ticker = {
                start: function() {
                    return n = (new Date).getTime(), i = !0, r(), this
                },
                stop: function() {
                    return i = !1, this
                },
                subscribe: function(t) {
                    if ("function" == typeof t) {
                        for (var e = 0, n = o.length; e < n; ++e)
                            if (t === o[e]) return this;
                        o.push(t)
                    }
                    return this
                },
                unsubscribe: function(t) {
                    for (var e = o, n = 0, i = e.length; n < i; ++n)
                        if (e[n] === t) return e.splice(n, 1), this;
                    return this
                },
                isActive: function() {
                    return !!i
                }
            }
        }(this), (l = function e(n, i, o, r) {
            if (!(this instanceof e)) return new e(n, i, o, r);
            this._pos = t.vector(), this.set(n, i, o, r)
        }).prototype.set = function(e, n, i, o) {
            return t.util.isObject(e) ? (this._pos.clone(e.pos), this._hw = e.halfWidth, this._hh = e.halfHeight, this) : (this._pos.set(.5 * (i + e), .5 * (o + n)), this._hw = .5 * (i - e), this._hh = .5 * (o - n), this)
        }, l.prototype.get = function() {
            var t = this.halfWidth(),
                e = this.halfHeight();
            return {
                pos: this._pos.values(),
                halfWidth: t,
                halfHeight: e,
                x: t,
                y: e
            }
        }, l.prototype.halfWidth = function() {
            return this._hw
        }, l.prototype.halfHeight = function() {
            return this._hh
        }, l.prototype.contains = function(t) {
            var e = void 0 !== t.x ? t.x : t.get(0),
                n = void 0 !== t.y ? t.y : t.get(1);
            return e > this._pos.get(0) - this._hw && e < this._pos.get(0) + this._hw && n > this._pos.get(1) - this._hh && n < this._pos.get(1) + this._hh
        }, l.prototype.transform = function(e) {
            var n = this._hw,
                i = this._hh,
                o = t.scratchpad(),
                r = o.vector().set(n, i),
                s = o.vector().set(n, -i);
            return this._pos.translate(e), r.rotate(e), s.rotate(e), this._hw = Math.max(Math.abs(r.get(0)), Math.abs(s.get(0))), this._hh = Math.max(Math.abs(r.get(1)), Math.abs(s.get(1))), o.done(), this
        }, l.contains = function(t, e) {
            var n = void 0 !== e.x ? e.x : e.get(0),
                i = void 0 !== e.y ? e.y : e.get(1);
            return n > (t = t.get ? t.get() : t).pos.x - t.halfWidth && n < t.pos.x + t.halfWidth && i > t.pos.y - t.halfHeight && i < t.pos.y + t.halfHeight
        }, t.aabb = l, u = function(t, e, n) {
            var i = e.normSq() - e.dot(t),
                o = e.dot(t) - t.normSq();
            return i < 0 ? n.clone(e).negate() : o > 0 ? n.clone(t).negate() : (n.clone(e).vsub(t), n.perp(t.cross(n) < 0))
        }, t.gjk = function(e, n, i, o) {
            var r, s, a, c, l = !1,
                h = !1,
                d = !1,
                f = [],
                p = 1,
                v = t.scratchpad(),
                g = v.vector().clone(n || t.vector.axis[0]),
                b = v.vector(),
                y = v.vector(),
                m = v.vector(),
                _ = v.vector(),
                x = 0;
            for (c = e(g), p = f.push(c), b.clone(c.pt), g.negate(); ++x;) {
                if (b.swap(y), c = e(g), p = f.push(c), b.clone(c.pt), o && o(f), b.equals(t.vector.zero)) {
                    l = !0;
                    break
                }
                if (!h && b.dot(g) <= 0) {
                    if (i) break;
                    h = !0
                }
                if (2 === p) g = u(b, y, g);
                else if (h) {
                    if (g.normalize(), c = y.dot(g), Math.abs(c - b.dot(g)) < 1e-4) {
                        d = -c;
                        break
                    }
                    y.normSq() < m.clone(f[0].pt).normSq() ? f.shift() : f.splice(1, 1), g = u(m.clone(f[1].pt), _.clone(f[0].pt), g)
                } else if (r = r || v.vector(), s = s || v.vector(), r.clone(y).vsub(b), s.clone(f[0].pt).vsub(b), (a = r.cross(s) > 0) ^ b.cross(r) > 0) f.shift(), r.perp(a), g.swap(r);
                else {
                    if (!(a ^ s.cross(b) > 0)) {
                        l = !0;
                        break
                    }
                    f.splice(1, 1), s.perp(!a), g.swap(r)
                }
                if (x > 100) return v.done(), {
                    simplex: f,
                    iterations: x,
                    distance: 0,
                    maxIterationsReached: !0
                }
            }
            return v.done(), c = {
                overlap: l,
                simplex: f,
                iterations: x
            }, !1 !== d && (c.distance = d, c.closest = function(e) {
                var n, i, o = e.length,
                    r = e[o - 2],
                    s = e[o - 3],
                    a = t.scratchpad(),
                    c = a.vector().clone(r.pt),
                    l = a.vector().clone(s.pt).vsub(c);
                if (l.equals(t.vector.zero)) return a.done(), {
                    a: r.a,
                    b: r.b
                };
                if ((i = 1 - (n = -l.dot(c) / l.normSq())) <= 0) return a.done(), {
                    a: s.a,
                    b: s.b
                };
                if (n <= 0) return a.done(), {
                    a: r.a,
                    b: r.b
                };
                var u = {
                    a: c.clone(r.a).mult(i).vadd(l.clone(s.a).mult(n)).values(),
                    b: c.clone(r.b).mult(i).vadd(l.clone(s.b).mult(n)).values()
                };
                return a.done(), u
            }(f)), c
        }, (h = function e(n, i, o) {
            if (!(this instanceof e)) return new e(n, i);
            this.v = t.vector(), this.o = t.vector(o), n instanceof e && this.clone(n), n && this.setTranslation(n), this.setRotation(i || 0)
        }).prototype.setTranslation = function(t) {
            return this.v.clone(t), this
        }, h.prototype.setRotation = function(t, e) {
            return this.cosA = Math.cos(t), this.sinA = Math.sin(t), e && this.o.clone(e), this
        }, h.prototype.clone = function(t) {
            return t ? (this.setTranslation(t.v), this.cosA = t.cosA, this.sinA = t.sinA, this.o.clone(t.o), this) : new h(this)
        }, t.transform = h,
        function(e) {
            var n = Math.sqrt,
                i = Math.min,
                o = Math.max,
                r = (Math.acos, Math.atan2),
                s = 2 * Math.PI,
                a = !!e.Float64Array,
                c = function t(e, n) {
                    if (!(this instanceof t)) return new t(e, n);
                    this._ = a ? new Float64Array(5) : [], e && (void 0 !== e.x || e._ && e._.length) ? this.clone(e) : (this.recalc = !0, this.set(e || 0, n || 0))
                };
            c.prototype.set = function(t, e) {
                return this.recalc = !0, this._[0] = t || 0, this._[1] = e || 0, this
            }, c.prototype.get = function(t) {
                return this._[t]
            }, c.prototype.vadd = function(t) {
                return this.recalc = !0, this._[0] += t._[0], this._[1] += t._[1], this
            }, c.prototype.vsub = function(t) {
                return this.recalc = !0, this._[0] -= t._[0], this._[1] -= t._[1], this
            }, c.prototype.add = function(t, e) {
                return this.recalc = !0, this._[0] += t, this._[1] += void 0 === e ? t : e, this
            }, c.prototype.sub = function(t, e) {
                return this.recalc = !0, this._[0] -= t, this._[1] -= void 0 === e ? t : e, this
            }, c.prototype.mult = function(t) {
                return this.recalc || (this._[4] *= t * t, this._[3] *= t), this._[0] *= t, this._[1] *= t, this
            }, c.prototype.dot = function(t) {
                return this._[0] * t._[0] + this._[1] * t._[1]
            }, c.prototype.cross = function(t) {
                return -this._[0] * t._[1] + this._[1] * t._[0]
            }, c.prototype.proj = function(t) {
                return this.dot(t) / t.norm()
            }, c.prototype.vproj = function(t) {
                var e = this.dot(t) / t.normSq();
                return this.clone(t).mult(e)
            }, c.prototype.angle = function(t) {
                var e;
                if (this.equals(c.zero)) return t ? t.angle() : NaN;
                for (e = t && !t.equals(c.zero) ? r(this._[1] * t._[0] - this._[0] * t._[1], this._[0] * t._[0] + this._[1] * t._[1]) : r(this._[1], this._[0]); e > Math.PI;) e -= s;
                for (; e < -Math.PI;) e += s;
                return e
            }, c.prototype.angle2 = function(t, e) {
                for (var n = t._[0] - this._[0], i = t._[1] - this._[1], o = e._[0] - this._[0], a = e._[1] - this._[1], c = r(i * o - n * a, n * o + i * a); c > Math.PI;) c -= s;
                for (; c < -Math.PI;) c += s;
                return c
            }, c.prototype.norm = function() {
                return this.recalc && (this.recalc = !1, this._[4] = this._[0] * this._[0] + this._[1] * this._[1], this._[3] = n(this._[4])), this._[3]
            }, c.prototype.normSq = function() {
                return this.recalc && (this.recalc = !1, this._[4] = this._[0] * this._[0] + this._[1] * this._[1], this._[3] = n(this._[4])), this._[4]
            }, c.prototype.dist = function(t) {
                var e, i;
                return n((e = t._[0] - this._[0]) * e + (i = t._[1] - this._[1]) * i)
            }, c.prototype.distSq = function(t) {
                var e, n;
                return (e = t._[0] - this._[0]) * e + (n = t._[1] - this._[1]) * n
            }, c.prototype.perp = function(t) {
                var e = this._[0];
                return t ? (this._[0] = -this._[1], this._[1] = e) : (this._[0] = this._[1], this._[1] = -e), this
            }, c.prototype.normalize = function() {
                var t = this.norm();
                return 0 === t ? this : (this._[0] /= t, this._[1] /= t, this._[3] = 1, this._[4] = 1, this)
            }, c.prototype.transform = function(t) {
                return this.set((this._[0] - t.o._[0]) * t.cosA - (this._[1] - t.o._[1]) * t.sinA + t.v._[0] + t.o._[0], (this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.v._[1] + t.o._[1])
            }, c.prototype.transformInv = function(t) {
                return this.set((this._[0] - t.o._[0]) * t.cosA + (this._[1] - t.o._[1]) * t.sinA - t.v._[0] + t.o._[0], -(this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA - t.v._[1] + t.o._[1])
            }, c.prototype.rotate = function(t) {
                return this.set((this._[0] - t.o._[0]) * t.cosA - (this._[1] - t.o._[1]) * t.sinA + t.o._[0], (this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.o._[1])
            }, c.prototype.rotateInv = function(t) {
                return this.set((this._[0] - t.o._[0]) * t.cosA + (this._[1] - t.o._[1]) * t.sinA + t.o._[0], -(this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.o._[1])
            }, c.prototype.translate = function(t) {
                return this.vadd(t.v)
            }, c.prototype.translateInv = function(t) {
                return this.vsub(t.v)
            }, c.prototype.clone = function(t) {
                return t ? t._ ? (this.recalc = t.recalc, t.recalc || (this._[3] = t._[3], this._[4] = t._[4]), this._[0] = t._[0], this._[1] = t._[1], this) : this.set(t.x, t.y) : new c(this)
            }, c.prototype.swap = function(t) {
                var e = this._;
                return this._ = t._, t._ = e, e = this.recalc, this.recalc = t.recalc, t.recalc = e, this
            }, c.prototype.values = function() {
                return {
                    x: this._[0],
                    y: this._[1]
                }
            }, c.prototype.zero = function() {
                return this._[3] = 0, this._[4] = 0, this._[0] = 0, this._[1] = 0, this
            }, c.prototype.negate = function(t) {
                return void 0 !== t ? (this._[t] = -this._[t], this) : (this._[0] = -this._[0], this._[1] = -this._[1], this)
            }, c.prototype.clamp = function(t, e) {
                return t = t.values ? t.values() : t, e = e.values ? e.values() : e, this._[0] = i(o(this._[0], t.x), e.x), this._[1] = i(o(this._[1], t.y), e.y), this.recalc = !0, this
            }, c.prototype.toString = function() {
                return "(" + this._[0] + ", " + this._[1] + ")"
            }, c.prototype.equals = function(t) {
                return this._[0] === t._[0] && this._[1] === t._[1] && this._[2] === t._[2]
            }, c.vadd = function(t, e) {
                return new c(t._[0] + e._[0], t._[1] + e._[1])
            }, c.vsub = function(t, e) {
                return new c(t._[0] - e._[0], t._[1] - e._[1])
            }, c.mult = function(t, e) {
                return new c(e._[0] * t, e._[1] * t)
            }, c.vproj = function(t, e) {
                return c.mult(t.dot(e) / e.normSq(), e)
            }, c.axis = [new c(1, 0), new c(0, 1)], c.zero = new c(0, 0), t.vector = c
        }(this), t.behavior = t.behaviour = f("behavior", {
            priority: 0,
            init: function() {
                this.options = {}
            },
            connect: function(t) {
                this.behave && t.subscribe("integrate:positions", this.behave, this, this.priority)
            },
            disconnect: function(t) {
                this.behave && t.unsubscribe("integrate:positions", this.behave)
            },
            behave: null
        }), d = {
            fixed: !1,
            mass: 1,
            restitution: 1,
            cof: .8,
            view: null
        }, t.body = f("body", {
            init: function(e) {
                var n = t.vector;
                if (this.options = t.util.extend({}, d, e), this.fixed = this.options.fixed, this.hidden = this.options.hidden, this.mass = this.options.mass, this.restitution = this.options.restitution, this.cof = this.options.cof, this.view = this.options.view, this.state = {
                        pos: n(e.x, e.y),
                        vel: n(e.vx, e.vy),
                        acc: n(),
                        angular: {
                            pos: e.angle || 0,
                            vel: e.angularVelocity || 0,
                            acc: 0
                        },
                        old: {
                            pos: n(),
                            vel: n(),
                            acc: n(),
                            angular: {
                                pos: 0,
                                vel: 0,
                                acc: 0
                            }
                        }
                    }, 0 === this.mass) throw "Error: Bodies must have non-zero mass";
                this.geometry = t.geometry("point")
            },
            accelerate: function(t) {
                return this.state.acc.vadd(t), this
            },
            applyForce: function(e, n) {
                var i = t.scratchpad(),
                    o = i.vector();
                return n ? this.moi && (this.state, o.clone(n), this.state.angular.acc -= o.cross(e) / this.moi, this.applyForce(e)) : this.accelerate(o.clone(e).mult(1 / this.mass)), i.done(), this
            },
            aabb: function() {
                var e = t.scratchpad(),
                    n = e.transform(),
                    i = this.state.angular.pos,
                    o = e.aabb().set(this.geometry.aabb(i));
                return n.setRotation(0).setTranslation(this.state.pos), o.transform(n), o = o.get(), e.done(), o
            },
            recalc: function() {}
        }), (t.geometry = f("geometry", {
            init: function(e) {
                this._aabb = new t.aabb
            },
            aabb: function(t) {
                return this._aabb.get()
            },
            getFarthestHullPoint: function(e, n) {
                return (n = n || t.vector()).set(0, 0)
            },
            getFarthestCorePoint: function(e, n, i) {
                return (n = n || t.vector()).set(0, 0)
            }
        })).isPolygonConvex = function(e) {
            var n = t.scratchpad(),
                i = n.vector(),
                o = n.vector(),
                r = n.vector(),
                s = !0,
                a = !1,
                c = e.length;
            if (!e || !c) return !1;
            if (c < 3) return n.done(), s;
            i.clone(e[0]).vsub(r.clone(e[c - 1]));
            for (var l = 1; l <= c; ++l) {
                if (o.clone(e[l % c]).vsub(r.clone(e[(l - 1) % c])), !1 === a) a = i.cross(o);
                else if (a > 0 ^ i.cross(o) > 0) {
                    s = !1;
                    break
                }
                o.swap(i)
            }
            return n.done(), s
        }, t.geometry.getPolygonMOI = function(e) {
            var n, i = t.scratchpad(),
                o = i.vector(),
                r = i.vector(),
                s = 0,
                a = 0,
                c = e.length;
            if (c < 2) return i.done(), 0;
            if (2 === c) return n = r.clone(e[1]).distSq(o.clone(e[0])), i.done(), n / 12;
            o.clone(e[0]);
            for (var l = 1; l < c; ++l) r.clone(e[l]), s += (n = Math.abs(r.cross(o))) * (r.normSq() + r.dot(o) + o.normSq()), a += n, o.swap(r);
            return i.done(), s / (6 * a)
        }, t.geometry.isPointInPolygon = function(e, n) {
            var i = t.scratchpad(),
                o = i.vector().clone(e),
                r = i.vector(),
                s = i.vector(),
                a = 0,
                c = n.length;
            if (c < 2) return a = o.equals(r.clone(n[0])), i.done(), a;
            if (2 === c) return a = o.angle(r.clone(n[0])), a += o.angle(r.clone(n[1])), i.done(), Math.abs(a) === Math.PI;
            r.clone(n[0]).vsub(o);
            for (var l = 1; l <= c; ++l) s.clone(n[l % c]).vsub(o), a += s.angle(r), r.swap(s);
            return i.done(), Math.abs(a) > 0
        }, t.geometry.getPolygonArea = function(e) {
            var n = t.scratchpad(),
                i = n.vector(),
                o = n.vector(),
                r = 0,
                s = e.length;
            if (s < 3) return n.done(), 0;
            i.clone(e[s - 1]);
            for (var a = 0; a < s; ++a) o.clone(e[a]), r += i.cross(o), i.swap(o);
            return n.done(), r / 2
        }, t.geometry.getPolygonCentroid = function(e) {
            var n, i = t.scratchpad(),
                o = i.vector(),
                r = i.vector(),
                s = t.vector(),
                a = e.length;
            if (a < 2) return i.done(), t.vector(e[0]);
            if (2 === a) return i.done(), t.vector((e[1].x + e[0].x) / 2, (e[1].y + e[0].y) / 2);
            o.clone(e[a - 1]);
            for (var c = 0; c < a; ++c) r.clone(e[c]), n = o.cross(r), o.vadd(r).mult(n), s.vadd(o), o.swap(r);
            return n = 1 / (6 * t.geometry.getPolygonArea(e)), i.done(), s.mult(n)
        }, t.geometry.nearestPointOnLine = function(e, n, i) {
            var o, r, s = t.scratchpad(),
                a = s.vector().clone(e),
                c = s.vector().clone(n).vsub(a),
                l = s.vector().clone(i).vsub(a).vsub(c);
            return l.equals(t.vector.zero) ? (s.done(), t.vector(n)) : (r = 1 - (o = -l.dot(c) / l.normSq())) <= 0 ? (s.done(), t.vector(i)) : o <= 0 ? (s.done(), t.vector(n)) : (a = t.vector(i).mult(o).vadd(c.clone(n).mult(r)), s.done(), a)
        },
        function() {
            var e = {
                drag: 0
            };
            t.integrator = f("integrator", {
                init: function(n) {
                    this.options = t.util.extend({}, e, n)
                },
                integrate: function(t, e) {
                    var n = this._world;
                    return this.integrateVelocities(t, e), n && n.publish({
                        topic: "integrate:velocities",
                        bodies: t,
                        dt: e
                    }), this.integratePositions(t, e), n && n.publish({
                        topic: "integrate:positions",
                        bodies: t,
                        dt: e
                    }), this
                },
                integrateVelocities: function(t, e) {
                    throw "The integrator.integrateVelocities() method must be overriden"
                },
                integratePositions: function(t, e) {
                    throw "The integrator.integratePositions() method must be overriden"
                }
            })
        }(),
        function() {
            var e = {
                meta: !1,
                metaRefresh: 200,
                width: 600,
                height: 600
            };
            t.renderer = f("renderer", {
                init: function(n) {
                    var i = "string" == typeof n.el ? document.getElementById(n.el) : n.el;
                    this.options = t.util.extend({}, e, n), this.el = i || document.body, this.drawMeta = t.util.throttle(t.util.bind(this.drawMeta, this), this.options.metaRefresh)
                },
                render: function(t, e) {
                    var n, i;
                    this.beforeRender && this.beforeRender(), this._world.publish({
                        topic: "beforeRender",
                        renderer: this,
                        bodies: t,
                        stats: e
                    }), this.options.meta && this.drawMeta(e);
                    for (var o = 0, r = t.length; o < r; ++o) i = (n = t[o]).view || (n.view = this.createView(n.geometry)), n.hidden || this.drawBody(n, i);
                    return this
                },
                createView: function(t) {
                    throw "You must overried the renderer.createView() method."
                },
                drawMeta: function(t) {
                    throw "You must overried the renderer.drawMeta() method."
                },
                drawBody: function(t, e) {
                    throw "You must overried the renderer.drawBody() method."
                }
            })
        }(),
        function() {
            var e = function(t) {
                this.disconnect && this._world && this.disconnect(this._world), this._world = t, this.connect && t && this.connect(t)
            };
            t.util.each("body,behavior,integrator,renderer".split(","), function(n, i) {
                t[n].mixin("setWorld", e)
            });
            var n = {
                    timestep: 6.25,
                    maxIPF: 16,
                    webworker: !1,
                    integrator: "verlet"
                },
                i = function t(e, n) {
                    if (!(this instanceof t)) return new t(e, n);
                    this.init(e, n)
                };
            i.prototype = t.util.extend({}, t.util.pubsub.prototype, {
                init: function(e, n) {
                    t.util.isFunction(e) && (n = e, e = {}), this._stats = {
                        fps: 0,
                        ipf: 0
                    }, this._bodies = [], this._behaviors = [], this._integrator = null, this._renderer = null, this._paused = !1, this._opts = {}, this.initPubsub(this), this.options(e || {}), t.util.isFunction(n) && n.call(this, this, t)
                },
                options: function(e) {
                    return e ? (t.util.extend(this._opts, n, e), this.timeStep(this._opts.timestep), this.add(t.integrator(this._opts.integrator)), this) : t.util.clone(this._opts)
                },
                add: function(t) {
                    var e, n = 0,
                        i = t && t.length || 0,
                        o = i ? t[0] : t;
                    if (!o) return this;
                    do {
                        switch (o.type) {
                            case "behavior":
                                this.addBehavior(o);
                                break;
                            case "integrator":
                                this.integrator(o);
                                break;
                            case "renderer":
                                this.renderer(o);
                                break;
                            case "body":
                                this.addBody(o);
                                break;
                            default:
                                throw 'Error: failed to add item of unknown type "' + o.type + '" to world'
                        }(e = {
                            topic: "add:" + o.type
                        })[o.type] = o, this.publish(e)
                    } while (++n < i && (o = t[n]));
                    return this
                },
                remove: function(t) {
                    var e, n = 0,
                        i = t && t.length || 0,
                        o = i ? t[0] : t;
                    if (!o) return this;
                    do {
                        switch (o.type) {
                            case "behavior":
                                this.removeBehavior(o);
                                break;
                            case "integrator":
                                o === this._integrator && this.integrator(null);
                                break;
                            case "renderer":
                                o === this._renderer && this.renderer(null);
                                break;
                            case "body":
                                this.removeBody(o);
                                break;
                            default:
                                throw 'Error: failed to remove item of unknown type "' + o.type + '" from world'
                        }(e = {
                            topic: "add:" + o.type
                        })[o.type] = o, this.publish(e)
                    } while (++n < i && (o = t[n]));
                    return this
                },
                integrator: function(t) {
                    return void 0 === t ? this._integrator : (this._integrator && this._integrator.setWorld(null), t && (this._integrator = t, this._integrator.setWorld(this)), this)
                },
                renderer: function(t) {
                    return void 0 === t ? this._renderer : (this._renderer && this._renderer.setWorld(null), t && (this._renderer = t, this._renderer.setWorld(this)), this)
                },
                timeStep: function(t) {
                    return t ? (this._dt = t, this._maxJump = t * this._opts.maxIPF, this) : this._dt
                },
                addBehavior: function(t) {
                    return t.setWorld(this), this._behaviors.push(t), this
                },
                getBehaviors: function() {
                    return [].concat(this._behaviors)
                },
                removeBehavior: function(t) {
                    var e, n = this._behaviors;
                    if (t) {
                        for (var i = 0, o = n.length; i < o; ++i)
                            if (t === n[i]) {
                                n.splice(i, 1);
                                break
                            }(e = {
                                topic: "remove:behavior"
                            }). behavior = t, this.publish(e)
                    }
                    return this
                },
                addBody: function(t) {
                    return t.setWorld(this), this._bodies.push(t), this
                },
                getBodies: function() {
                    return [].concat(this._bodies)
                },
                removeBody: function(t) {
                    var e, n = this._bodies;
                    if (t) {
                        for (var i = 0, o = n.length; i < o; ++i)
                            if (t === n[i]) {
                                n.splice(i, 1);
                                break
                            }(e = {
                                topic: "remove:body"
                            }). body = t, this.publish(e)
                    }
                    return this
                },
                findOne: function(e) {
                    var n = {
                            check: function(t) {
                                for (var e = this; e = e.next;)
                                    if (e(t)) return !0;
                                return !1
                            }
                        },
                        i = n,
                        o = this._bodies;
                    e.$within, e.$at && (i.next = function(n) {
                        var i = n.aabb();
                        return t.aabb.contains(i, e.$at)
                    });
                    for (var r = 0, s = o.length; r < s; ++r)
                        if (n.check(o[r])) return o[r];
                    return !1
                },
                iterate: function(t) {
                    this._integrator.integrate(this._bodies, t)
                },
                step: function(t) {
                    if (this._paused) return this._time = !1, this;
                    var e = t - (this._time || (this._time = t)),
                        n = this._stats,
                        i = this._dt;
                    if (!e) return this;
                    for (e > this._maxJump && (this._time = t - this._maxJump, e = this._maxJump), n.fps = 1e3 / e, n.ipf = Math.ceil(e / this._dt); this._time < t;) this._time += i, this.iterate(i);
                    return this.publish({
                        topic: "step"
                    }), this
                },
                render: function() {
                    if (!this._renderer) throw "No renderer added to world";
                    return this._renderer.render(this._bodies, this._stats), this.publish({
                        topic: "render",
                        bodies: this._bodies,
                        stats: this._stats,
                        renderer: this._renderer
                    }), this
                },
                pause: function() {
                    return this._paused = !0, this.publish({
                        topic: "pause"
                    }), this
                },
                unpause: function() {
                    return this._paused = !1, this.publish({
                        topic: "unpause"
                    }), this
                },
                isPaused: function() {
                    return !!this._paused
                },
                destroy: function() {
                    this.pause(), this.unsubscribe(!0), this.remove(this.getBodies()), this.remove(this.getBehaviors()), this.integrator(null), this.renderer(null)
                }
            }), t.world = i
        }(), t.integrator("verlet", function(e) {
            return t.body.mixin({
                started: function(t) {
                    return void 0 !== t && (this._started = !0), !!this._started
                }
            }), {
                init: function(t) {
                    e.init.call(this, t)
                },
                integrateVelocities: function(t, e) {
                    for (var n, i = e * e, o = 1 - this.options.drag, r = null, s = 0, a = t.length; s < a; ++s) n = (r = t[s]).state, r.fixed ? (n.vel.zero(), n.acc.zero(), n.angular.vel = 0, n.angular.acc = 0) : (n.vel.equals(n.old.vel) && r.started() ? n.vel.clone(n.pos).vsub(n.old.pos) : (n.old.pos.clone(n.pos).vsub(n.vel), n.vel.mult(e)), o && n.vel.mult(o), n.vel.vadd(n.acc.mult(i)), n.vel.mult(1 / e), n.old.vel.clone(n.vel), n.acc.zero(), n.angular.vel === n.old.angular.vel && r.started() ? n.angular.vel = n.angular.pos - n.old.angular.pos : (n.old.angular.pos = n.angular.pos - n.angular.vel, n.angular.vel *= e), n.angular.vel += n.angular.acc * i, n.angular.vel /= e, n.old.angular.vel = n.angular.vel, n.angular.acc = 0, r.started(!0))
                },
                integratePositions: function(t, e) {
                    for (var n, i = null, o = 0, r = t.length; o < r; ++o) n = (i = t[o]).state, i.fixed || (n.vel.mult(e), n.old.pos.clone(n.pos), n.pos.vadd(n.vel), n.vel.mult(1 / e), n.old.vel.clone(n.vel), n.angular.vel *= e, n.old.angular.pos = n.angular.pos, n.angular.pos += n.angular.vel, n.angular.vel /= e, n.old.angular.vel = n.angular.vel)
                }
            }
        }), t.geometry("point", function(t) {}), t.geometry("circle", function(e) {
            var n = {
                radius: 1
            };
            return {
                init: function(i) {
                    e.init.call(this, i), i = t.util.extend({}, n, i), this.radius = i.radius, this._aabb = t.aabb()
                },
                aabb: function(t) {
                    var e = this.radius,
                        n = this._aabb;
                    return n.halfWidth() === e ? n.get() : n.set(-e, -e, e, e).get()
                },
                getFarthestHullPoint: function(e, n) {
                    return (n = n || t.vector()).clone(e).normalize().mult(this.radius)
                },
                getFarthestCorePoint: function(e, n, i) {
                    return (n = n || t.vector()).clone(e).normalize().mult(this.radius - i)
                }
            }
        }), t.geometry("convex-polygon", function(e) {
            var n = {};
            return {
                init: function(i) {
                    e.init.call(this, i), i = t.util.extend({}, n, i), this.setVertices(i.vertices || [])
                },
                setVertices: function(e) {
                    var n = t.scratchpad(),
                        i = n.transform(),
                        o = this.vertices = [];
                    if (!t.geometry.isPolygonConvex(e)) throw "Error: The vertices specified do not match that of a _convex_ polygon.";
                    i.setRotation(0), i.setTranslation(t.geometry.getPolygonCentroid(e).negate());
                    for (var r = 0, s = e.length; r < s; ++r) o.push(t.vector(e[r]).translate(i));
                    return this._area = t.geometry.getPolygonArea(o), this._aabb = !1, n.done(), this
                },
                aabb: function(e) {
                    if (!e && this._aabb) return this._aabb.get();
                    var n, i = t.scratchpad(),
                        o = i.vector(),
                        r = i.transform().setRotation(e || 0),
                        s = i.vector().clone(t.vector.axis[0]).rotateInv(r),
                        a = i.vector().clone(t.vector.axis[1]).rotateInv(r),
                        c = this.getFarthestHullPoint(s, o).proj(s),
                        l = -this.getFarthestHullPoint(s.negate(), o).proj(s),
                        u = this.getFarthestHullPoint(a, o).proj(a),
                        h = -this.getFarthestHullPoint(a.negate(), o).proj(a);
                    return n = new t.aabb(l, h, c, u), e || (this._aabb = n), i.done(), n.get()
                },
                getFarthestHullPoint: function(e, n, i) {
                    var o, r, s, a = this.vertices,
                        c = a.length,
                        l = 2;
                    if (n = n || t.vector(), c < 2) return i && (i.idx = 0), n.clone(a[0]);
                    if (r = a[0].dot(e), o = a[1].dot(e), 2 === c) return s = o >= r ? 1 : 0, i && (i.idx = s), n.clone(a[s]);
                    if (o >= r) {
                        for (; l < c && o >= r;) r = o, o = a[l].dot(e), l++;
                        return o >= r && l++, s = l - 2, i && (i.idx = l - 2), n.clone(a[s])
                    }
                    for (l = c; l > 2 && r >= o;) o = r, r = a[--l].dot(e);
                    return s = (l + 1) % c, i && (i.idx = s), n.clone(a[s])
                },
                getFarthestCorePoint: function(e, n, i) {
                    var o, r = t.scratchpad(),
                        s = r.vector(),
                        a = r.vector(),
                        c = this.vertices,
                        l = c.length,
                        u = this._area > 0,
                        h = {};
                    return n = this.getFarthestHullPoint(e, n, h), s.clone(c[(h.idx + 1) % l]).vsub(n).normalize().perp(!u), a.clone(c[(h.idx - 1 + l) % l]).vsub(n).normalize().perp(u), o = i / (1 + s.dot(a)), n.vadd(s.vadd(a).mult(o)), r.done(), n
                }
            }
        }), t.body("circle", function(e) {
            var n = {
                radius: 1
            };
            return {
                init: function(i) {
                    e.init.call(this, i), i = t.util.extend({}, n, i), this.geometry = t.geometry("circle", {
                        radius: i.radius
                    }), this.recalc()
                },
                recalc: function() {
                    e.recalc.call(this), this.moi = this.mass * this.geometry.radius * this.geometry.radius / 2
                }
            }
        }), t.body("convex-polygon", function(e) {
            var n = {};
            return {
                init: function(i) {
                    e.init.call(this, i), i = t.util.extend({}, n, i), this.geometry = t.geometry("convex-polygon", {
                        vertices: i.vertices
                    }), this.recalc()
                },
                recalc: function() {
                    e.recalc.call(this), this.moi = t.geometry.getPolygonMOI(this.geometry.vertices)
                }
            }
        }), t.body("point", function() {}), t.behavior("body-collision-detection", function(e) {
            var n = function(e, n) {
                    var i, o, r, s = t.scratchpad(),
                        a = s.vector(),
                        c = s.vector(),
                        l = !1,
                        u = e.aabb(),
                        h = Math.min(u.halfWidth, u.halfHeight),
                        d = n.aabb(),
                        f = Math.min(d.halfWidth, d.halfHeight);
                    if (r = function(e, n) {
                            var i;
                            return (i = function(o) {
                                var r, s = t.scratchpad(),
                                    a = s.transform().setTranslation(e.state.pos).setRotation(e.state.angular.pos),
                                    c = s.transform().setTranslation(n.state.pos).setRotation(n.state.angular.pos),
                                    l = s.vector(),
                                    u = s.vector(),
                                    h = i.useCore ? "getFarthestCorePoint" : "getFarthestHullPoint",
                                    d = i.marginA,
                                    f = i.marginB;
                                return l = e.geometry[h](o.rotateInv(a), l, d).transform(a), u = n.geometry[h](o.rotate(a).rotateInv(c).negate(), u, f).transform(c), o.negate().rotate(c), r = {
                                    a: l.values(),
                                    b: u.values(),
                                    pt: l.vsub(u).values()
                                }, s.done(), r
                            }).useCore = !1, i.margin = 0, i
                        }(e, n), a.clone(e.state.pos).vsub(n.state.pos), (o = t.gjk(r, a, !0)).overlap) {
                        for (l = {
                                bodyA: e,
                                bodyB: n
                            }, r.useCore = !0, r.marginA = 0, r.marginB = 0; o.overlap && (r.marginA < h || r.marginB < f);) r.marginA < h && (r.marginA += 1), r.marginB < f && (r.marginB += 1), o = t.gjk(r, a);
                        if (o.overlap || o.maxIterationsReached) return s.done(), !1;
                        i = Math.max(0, r.marginA + r.marginB - o.distance), l.overlap = i, l.norm = a.clone(o.closest.b).vsub(c.clone(o.closest.a)).normalize().values(), l.mtv = a.mult(i).values(), l.pos = a.clone(l.norm).mult(r.margin).vadd(c.clone(o.closest.a)).vsub(e.state.pos).values()
                    }
                    return s.done(), l
                },
                i = function(e, i) {
                    return "circle" === e.geometry.name && "circle" === i.geometry.name ? function(e, n) {
                        var i, o = t.scratchpad(),
                            r = o.vector(),
                            s = (o.vector(), !1);
                        return r.clone(n.state.pos).vsub(e.state.pos), i = r.norm() - (e.geometry.radius + n.geometry.radius), r.equals(t.vector.zero) && r.set(1, 0), i <= 0 && (s = {
                            bodyA: e,
                            bodyB: n,
                            norm: r.normalize().values(),
                            mtv: r.mult(-i).values(),
                            pos: r.normalize().mult(e.geometry.radius).values(),
                            overlap: -i
                        }), o.done(), s
                    }(e, i) : n(e, i)
                },
                o = {
                    checkAll: !1
                };
            return {
                init: function(n) {
                    e.init.call(this, n), this.options = t.util.extend({}, this.options, o, n)
                },
                connect: function(t) {
                    this.options.checkAll ? t.subscribe("integrate:velocities", this.checkAll, this) : t.subscribe("collisions:candidates", this.check, this)
                },
                disconnect: function(t) {
                    this.options.checkAll ? t.unsubscribe("integrate:velocities", this.checkAll) : t.unsubscribe("collisions:candidates", this.check)
                },
                check: function(t) {
                    for (var e, n, o = t.candidates, r = [], s = 0, a = o.length; s < a; ++s) e = o[s], (n = i(e.bodyA, e.bodyB)) && r.push(n);
                    r.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: r
                    })
                },
                checkAll: function(t) {
                    for (var e, n, o, r = t.bodies, s = (t.dt, []), a = 0, c = r.length; a < c; a++) {
                        e = r[a];
                        for (var l = a + 1; l < c; l++) n = r[l], e.fixed && n.fixed || (o = i(e, n)) && s.push(o)
                    }
                    s.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: s
                    })
                }
            }
        }), t.behavior("body-impulse-response", function(e) {
            return {
                connect: function(t) {
                    t.subscribe("collisions:detected", this.respond, this)
                },
                disconnect: function(t) {
                    t.unsubscribe("collisions:detected", this.respond)
                },
                collideBodies: function(e, n, i, o, r, s) {
                    var a = e.fixed,
                        c = n.fixed,
                        l = t.scratchpad(),
                        u = l.vector().clone(r);
                    if (a && c) l.done();
                    else {
                        a ? n.state.pos.vadd(u) : c ? e.state.pos.vsub(u) : (u.mult(.5), e.state.pos.vsub(u), n.state.pos.vadd(u));
                        var h, d, f, p = a ? 0 : 1 / e.moi,
                            v = c ? 0 : 1 / n.moi,
                            g = a ? 0 : 1 / e.mass,
                            b = c ? 0 : 1 / n.mass,
                            y = s ? 0 : e.restitution * n.restitution,
                            m = e.cof * n.cof,
                            _ = l.vector().clone(i),
                            x = l.vector().clone(_).perp(!0),
                            w = l.vector().clone(o),
                            A = l.vector().clone(o).vadd(e.state.pos).vsub(n.state.pos),
                            C = l.vector(),
                            B = e.state.angular.vel,
                            k = n.state.angular.vel,
                            P = l.vector().clone(n.state.vel).vadd(C.clone(A).perp(!0).mult(k)).vsub(e.state.vel).vsub(C.clone(w).perp(!0).mult(B)),
                            j = w.proj(_),
                            I = w.proj(x),
                            S = A.proj(_),
                            M = A.proj(x),
                            E = P.proj(_),
                            F = P.proj(x);
                        E >= 0 ? l.done() : (h = -(1 + y) * E / (g + b + p * I * I + v * M * M), a ? (n.state.vel.vadd(_.mult(h * b)), n.state.angular.vel -= h * v * M) : c ? (e.state.vel.vsub(_.mult(h * g)), e.state.angular.vel += h * p * I) : (n.state.vel.vadd(_.mult(h * b)), n.state.angular.vel -= h * v * M, e.state.vel.vsub(_.mult(g * n.mass)), e.state.angular.vel += h * p * I), m && F && (f = F / (g + b + p * j * j + v * S * S), h *= (d = F < 0 ? -1 : 1) * m, h = 1 === d ? Math.min(h, f) : Math.max(h, f), a ? (n.state.vel.vsub(x.mult(h * b)), n.state.angular.vel -= h * v * S) : c ? (e.state.vel.vadd(x.mult(h * g)), e.state.angular.vel += h * p * j) : (n.state.vel.vsub(x.mult(h * b)), n.state.angular.vel -= h * v * S, e.state.vel.vadd(x.mult(g * n.mass)), e.state.angular.vel += h * p * j)), l.done())
                    }
                },
                respond: function(e) {
                    for (var n, i = t.util.shuffle(e.collisions), o = 0, r = i.length; o < r; ++o) n = i[o], this.collideBodies(n.bodyA, n.bodyB, n.norm, n.pos, n.mtv)
                }
            }
        }), t.behavior("constant-acceleration", function(e) {
            var n = {
                acc: {
                    x: 0,
                    y: 4e-4
                }
            };
            return {
                init: function(i) {
                    e.init.call(this, i), this.options = t.util.extend(this.options, n, i), this._acc = t.vector(), this.setAcceleration(this.options.acc)
                },
                setAcceleration: function(t) {
                    return this._acc.clone(t), this
                },
                behave: function(t) {
                    for (var e = t.bodies, n = 0, i = e.length; n < i; ++n) e[n].accelerate(this._acc)
                }
            }
        }), t.behavior("edge-collision-detection", function(e) {
            var n = function(e, n, i) {
                    return function(e, n, i) {
                        var o, r = e.aabb(),
                            s = t.scratchpad(),
                            a = s.transform(),
                            c = s.vector(),
                            l = s.vector(),
                            u = !1,
                            h = [];
                        return (o = r.pos.x + r.x - n.max.x) >= 0 && (c.set(1, 0).rotateInv(a.setRotation(e.state.angular.pos)), u = {
                            bodyA: e,
                            bodyB: i,
                            overlap: o,
                            norm: {
                                x: 1,
                                y: 0
                            },
                            mtv: {
                                x: o,
                                y: 0
                            },
                            pos: e.geometry.getFarthestHullPoint(c, l).rotate(a).values()
                        }, h.push(u)), (o = r.pos.y + r.y - n.max.y) >= 0 && (c.set(0, 1).rotateInv(a.setRotation(e.state.angular.pos)), u = {
                            bodyA: e,
                            bodyB: i,
                            overlap: o,
                            norm: {
                                x: 0,
                                y: 1
                            },
                            mtv: {
                                x: 0,
                                y: o
                            },
                            pos: e.geometry.getFarthestHullPoint(c, l).rotate(a).values()
                        }, h.push(u)), (o = n.min.x - (r.pos.x - r.x)) >= 0 && (c.set(-1, 0).rotateInv(a.setRotation(e.state.angular.pos)), u = {
                            bodyA: e,
                            bodyB: i,
                            overlap: o,
                            norm: {
                                x: -1,
                                y: 0
                            },
                            mtv: {
                                x: -o,
                                y: 0
                            },
                            pos: e.geometry.getFarthestHullPoint(c, l).rotate(a).values()
                        }, h.push(u)), (o = n.min.y - (r.pos.y - r.y)) >= 0 && (c.set(0, -1).rotateInv(a.setRotation(e.state.angular.pos)), u = {
                            bodyA: e,
                            bodyB: i,
                            overlap: o,
                            norm: {
                                x: 0,
                                y: -1
                            },
                            mtv: {
                                x: 0,
                                y: -o
                            },
                            pos: e.geometry.getFarthestHullPoint(c, l).rotate(a).values()
                        }, h.push(u)), s.done(), h
                    }(e, n, i)
                },
                i = {
                    aabb: null,
                    restitution: .99,
                    cof: 1
                };
            return {
                init: function(n) {
                    e.init.call(this, n), this.options = t.util.extend({}, this.options, i, n), this.setAABB(n.aabb), this.restitution = n.restitution, this._dummy = t.body("_dummy", function() {}, {
                        fixed: !0,
                        restitution: this.options.restitution,
                        cof: this.options.cof
                    })
                },
                setAABB: function(t) {
                    if (!t) throw "Error: aabb not set";
                    t = t.get && t.get() || t, this._edges = {
                        min: {
                            x: t.pos.x - t.x,
                            y: t.pos.y - t.y
                        },
                        max: {
                            x: t.pos.x + t.x,
                            y: t.pos.y + t.y
                        }
                    }
                },
                connect: function(t) {
                    t.subscribe("integrate:velocities", this.checkAll, this)
                },
                disconnect: function(t) {
                    t.unsubscribe("integrate:velocities", this.checkAll)
                },
                checkAll: function(t) {
                    for (var e, i, o = t.bodies, r = (t.dt, []), s = this._edges, a = this._dummy, c = 0, l = o.length; c < l; c++)(e = o[c]).fixed || (i = n(e, s, a)) && r.push.apply(r, i);
                    r.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: r
                    })
                }
            }
        }), t.behavior("newtonian", function(e) {
            var n = {
                strength: 1
            };
            return {
                init: function(i) {
                    e.init.call(this, i), i = t.util.extend({}, n, i), this.strength = i.strength, this.tolerance = i.tolerance || 100 * this.strength
                },
                behave: function(e) {
                    for (var n, i, o, r, s = e.bodies, a = this.strength, c = this.tolerance, l = t.scratchpad(), u = l.vector(), h = 0, d = s.length; h < d; h++) {
                        n = s[h];
                        for (var f = h + 1; f < d; f++) i = s[f], u.clone(i.state.pos), u.vsub(n.state.pos), (o = u.normSq()) > c && (r = a / o, n.accelerate(u.normalize().mult(r * i.mass)), i.accelerate(u.mult(n.mass / i.mass).negate()))
                    }
                    l.done()
                }
            }
        }), t.behavior("rigid-constraint-manager", function(e) {
            var n = {
                targetLength: 20
            };
            return {
                init: function(i) {
                    e.init.call(this, i), t.util.extend(this.options, n, i), this._constraints = []
                },
                connect: function(t) {
                    var e = t.integrator();
                    if (e && e.name.indexOf("verlet") < 0) throw 'The rigid constraint manager needs a world with a "verlet" compatible integrator.';
                    t.subscribe("integrate:positions", this.resolve, this)
                },
                disconnect: function(t) {
                    t.unsubscribe("integrate:positions", this.resolve)
                },
                drop: function() {
                    return this._constraints = [], this
                },
                constrain: function(e, n, i) {
                    var o;
                    return !(!e || !n) && (this._constraints.push(o = {
                        id: t.util.uniqueId("rigid-constraint"),
                        bodyA: e,
                        bodyB: n,
                        targetLength: i || this.options.targetLength
                    }), o)
                },
                remove: function(e) {
                    var n, i = this._constraints;
                    if ("number" == typeof e) return i.splice(e, 1), this;
                    n = t.util.isObject(e);
                    for (var o = 0, r = i.length; o < r; ++o)
                        if (n && i[o] === e || !n && i[o].id === e) return i.splice(o, 1), this;
                    return this
                },
                resolve: function() {
                    for (var e, n, i, o, r = this._constraints, s = t.scratchpad(), a = s.vector(), c = s.vector(), l = 0, u = r.length; l < u; ++l) e = r[l], a.clone(e.bodyA.state.pos), c.clone(e.bodyB.state.pos).vsub(a), i = ((n = c.norm()) - e.targetLength) / n, c.mult(i), o = e.bodyB.mass / (e.bodyA.mass + e.bodyB.mass), e.bodyA.fixed || (c.mult(o), e.bodyA.state.pos.vadd(c), c.mult(1 / o)), e.bodyB.fixed || (c.mult(1 - o), e.bodyB.state.pos.vsub(c));
                    s.done()
                },
                getConstraints: function() {
                    return [].concat(this._constraints)
                }
            }
        }), t.behavior("sweep-prune", function(e) {
            var n = 1,
                i = {
                    x: 0,
                    y: 1
                };
            return {
                init: function(t) {
                    e.init.call(this, t), this.clear()
                },
                clear: function() {
                    for (var t in this.tracked = [], this.pairs = [], this.intervalLists = {}, i) this.intervalLists[t] = []
                },
                connect: function(t) {
                    t.subscribe("add:body", this.trackBody, this), t.subscribe("remove:body", this.untrackBody, this), t.subscribe("integrate:velocities", this.sweep, this);
                    for (var e = t.getBodies(), n = 0, i = e.length; n < i; ++n) this.trackBody({
                        body: e[n]
                    })
                },
                disconnect: function(t) {
                    t.unsubscribe("add:body", this.trackBody), t.unsubscribe("remove:body", this.untrackBody), t.unsubscribe("integrate:velocities", this.sweep), this.clear()
                },
                broadPhase: function() {
                    return this.updateIntervals(), this.sortIntervalLists(), this.checkOverlaps()
                },
                sortIntervalLists: function() {
                    var t, e, n, o, r, s, a, c, l;
                    for (var u in i)
                        for (n = 0, e = (t = this.intervalLists[u]).length, l = i[u]; ++n < e;) {
                            for (s = (r = t[n]).val.get(l), c = (a = t[(o = n) - 1]) && a.val.get(l); o > 0 && (c > s || c === s && a.type && !r.type);) t[o] = a, c = (a = t[--o - 1]) && a.val.get(l);
                            t[o] = r
                        }
                },
                getPair: function(t, e, n) {
                    var i, o, r = (i = t.id, o = e.id, i !== o && (i > o ? i << 16 | 65535 & o : o << 16 | 65535 & i));
                    if (!1 === r) return null;
                    var s = this.pairs[r];
                    if (!s) {
                        if (!n) return null;
                        s = this.pairs[r] = {
                            bodyA: t.body,
                            bodyB: e.body,
                            flag: 0
                        }
                    }
                    return s
                },
                checkOverlaps: function() {
                    var t, e, n, o, r, s, a, c, l, u = i.z || i.y || i.x,
                        h = [],
                        d = 0,
                        f = [];
                    for (var p in i)
                        for (t = "x" === p, a = -1, s = (r = this.intervalLists[p]).length; ++a < s;)
                            if (e = (o = r[a]).tracker, o.type)
                                for (c = d; --c >= 0;)(n = h[c]) === e ? (c < d - 1 ? h[c] = h.pop() : h.pop(), d--) : (l = this.getPair(e, n, t)) && (l.flag = t ? 0 : l.flag + 1, l.flag === u && f.push(l));
                            else d = h.push(e);
                    return f
                },
                updateIntervals: function() {
                    for (var e, n, i = t.scratchpad(), o = i.vector(), r = i.vector(), s = this.tracked, a = s.length; --a >= 0;) n = (e = s[a]).interval, o.clone(e.body.state.pos), r.clone(e.body.aabb()), n.min.val.clone(o).vsub(r), n.max.val.clone(o).vadd(r);
                    i.done()
                },
                trackBody: function(e) {
                    var o = e.body,
                        r = {
                            id: n++,
                            body: o
                        },
                        s = {
                            min: {
                                type: !1,
                                val: t.vector(),
                                tracker: r
                            },
                            max: {
                                type: !0,
                                val: t.vector(),
                                tracker: r
                            }
                        };
                    for (var a in r.interval = s, this.tracked.push(r), i) this.intervalLists[a].push(s.min, s.max)
                },
                untrackBody: function(t) {
                    for (var e, n, o, r, s = t.body, a = this.tracked, c = 0, l = a.length; c < l; ++c)
                        if ((o = a[c]).body === s) {
                            for (var u in a.splice(c, 1), i) {
                                r = 0;
                                for (var h = 0, d = (e = this.intervalLists[u]).length; h < d; ++h)
                                    if ((n = e[h]) === o.interval.min || n === o.interval.max) {
                                        if (e.splice(h, 1), h--, l--, r > 0) break;
                                        r++
                                    }
                            }
                            break
                        }
                },
                sweep: function(t) {
                    var e;
                    t.bodies, t.dt;
                    (e = this.broadPhase()).length && this._world.publish({
                        topic: "collisions:candidates",
                        candidates: e
                    })
                }
            }
        }), t.behavior("verlet-constraints", function(e) {
            var n = 2 * Math.PI,
                i = {
                    iterations: 2
                };
            return {
                init: function(n) {
                    e.init.call(this, n), t.util.extend(this.options, i, n), this._distanceConstraints = [], this._angleConstraints = []
                },
                connect: function(t) {
                    var e = t.integrator();
                    if (e && e.name.indexOf("verlet") < 0) throw 'The rigid constraint manager needs a world with a "verlet" compatible integrator.';
                    t.subscribe("integrate:positions", this.resolve, this)
                },
                disconnect: function(t) {
                    t.unsubscribe("integrate:positions", this.resolve)
                },
                drop: function() {
                    return this._distanceConstraints = [], this._angleConstraints = [], this
                },
                distanceConstraint: function(e, n, i, o) {
                    var r;
                    return !(!e || !n) && ((r = {
                        id: t.util.uniqueId("dis-constraint"),
                        type: "dis",
                        bodyA: e,
                        bodyB: n,
                        stiffness: i || .5,
                        targetLength: o || n.state.pos.dist(e.state.pos)
                    }).targetLengthSq = r.targetLength * r.targetLength, this._distanceConstraints.push(r), r)
                },
                angleConstraint: function(e, n, i, o, r) {
                    var s;
                    return !(!e || !n) && (s = {
                        id: t.util.uniqueId("ang-constraint"),
                        type: "ang",
                        bodyA: e,
                        bodyB: n,
                        bodyC: i,
                        stiffness: o || .5,
                        targetAngle: r || n.state.pos.angle2(e.state.pos, i.state.pos)
                    }, this._angleConstraints.push(s), s)
                },
                remove: function(e) {
                    var n, i, o, r;
                    if (n = "ang" === ((i = t.util.isObject(e)) ? e.type : e.substr(0, 3)) ? this._angleConstraints : this._distanceConstraints, i) {
                        for (o = 0, r = n.length; o < r; ++o)
                            if (n[o] === e) return n.splice(o, 1), this
                    } else
                        for (o = 0, r = n.length; o < r; ++o)
                            if (n[o].id === e) return n.splice(o, 1), this;
                    return this
                },
                resolveAngleConstraints: function(e) {
                    for (var i, o, r, s, a = this._angleConstraints, c = t.scratchpad(), l = c.transform(), u = 0, h = a.length; u < h; ++u)(r = (o = (i = a[u]).bodyB.state.pos.angle2(i.bodyA.state.pos, i.bodyC.state.pos)) - i.targetAngle) && (r <= -Math.PI ? r += n : r >= Math.PI && (r -= n), l.setTranslation(i.bodyB.state.pos), r *= -e * i.stiffness, i.bodyA.fixed || i.bodyB.fixed || i.bodyC.fixed || (s = 1 / (i.bodyA.mass + i.bodyB.mass + i.bodyC.mass)), i.bodyA.fixed || (o = i.bodyB.fixed || i.bodyC.fixed ? i.bodyB.fixed ? r * i.bodyC.mass / (i.bodyC.mass + i.bodyA.mass) : r * i.bodyB.mass / (i.bodyB.mass + i.bodyA.mass) : r * (i.bodyB.mass + i.bodyC.mass) * s, l.setRotation(o), i.bodyA.state.pos.translateInv(l), i.bodyA.state.pos.rotate(l), i.bodyA.state.pos.translate(l)), i.bodyC.fixed || (o = i.bodyA.fixed || i.bodyB.fixed ? i.bodyB.fixed ? -r * i.bodyA.mass / (i.bodyC.mass + i.bodyA.mass) : -r * i.bodyB.mass / (i.bodyB.mass + i.bodyC.mass) : -r * (i.bodyB.mass + i.bodyA.mass) * s, l.setRotation(o), i.bodyC.state.pos.translateInv(l), i.bodyC.state.pos.rotate(l), i.bodyC.state.pos.translate(l)), i.bodyB.fixed || (o = i.bodyA.fixed || i.bodyC.fixed ? i.bodyA.fixed ? r * i.bodyC.mass / (i.bodyC.mass + i.bodyB.mass) : r * i.bodyA.mass / (i.bodyA.mass + i.bodyC.mass) : r * (i.bodyA.mass + i.bodyC.mass) * s, l.setRotation(o).setTranslation(i.bodyA.state.pos), i.bodyB.state.pos.translateInv(l), i.bodyB.state.pos.rotate(l), i.bodyB.state.pos.translate(l), l.setTranslation(i.bodyC.state.pos), i.bodyB.state.pos.translateInv(l), i.bodyB.state.pos.rotateInv(l), i.bodyB.state.pos.translate(l)));
                    c.done()
                },
                resolveDistanceConstraints: function(e) {
                    for (var n, i, o, r, s = this._distanceConstraints, a = t.scratchpad(), c = a.vector(), l = 0, u = s.length; l < u; ++l) n = s[l], c.clone(n.bodyB.state.pos).vsub(n.bodyA.state.pos), i = c.normSq() || 1e-4 * Math.random(), o = e * n.stiffness * (i - n.targetLengthSq) / i, c.mult(o), r = n.bodyA.fixed || n.bodyB.fixed ? 1 : n.bodyB.mass / (n.bodyA.mass + n.bodyB.mass), n.bodyA.fixed || (n.bodyB.fixed || c.mult(r), n.bodyA.state.pos.vadd(c), n.bodyB.fixed || c.mult(1 / r)), n.bodyB.fixed || (n.bodyA.fixed || c.mult(1 - r), n.bodyB.state.pos.vsub(c));
                    a.done()
                },
                shuffleConstraints: function() {
                    this._distanceConstraints = t.util.shuffle(this._distanceConstraints), this._angleConstraints = t.util.shuffle(this._angleConstraints)
                },
                resolve: function() {
                    for (var t = this.options.iterations, e = 1 / t, n = 0; n < t; n++) this.resolveDistanceConstraints(e), this.resolveAngleConstraints(e)
                },
                getConstraints: function() {
                    return {
                        distanceConstraints: [].concat(this._distanceConstraints),
                        angleConstraints: [].concat(this._angleConstraints)
                    }
                }
            }
        }), t.integrator("improved-euler", function(e) {
            return {
                init: function(t) {
                    e.init.call(this, t)
                },
                integrateVelocities: function(t, e) {
                    for (var n, i = 1 - this.options.drag, o = null, r = 0, s = t.length; r < s; ++r) n = (o = t[r]).state, o.fixed ? (n.vel.zero(), n.acc.zero(), n.angular.vel = 0, n.angular.acc = 0) : (n.old.vel.clone(n.vel), n.old.acc.clone(n.acc), n.vel.vadd(n.acc.mult(e)), i && n.vel.mult(i), n.acc.zero(), n.old.angular.vel = n.angular.vel, n.angular.vel += n.angular.acc * e, n.angular.acc = 0)
                },
                integratePositions: function(e, n) {
                    for (var i, o = .5 * n * n, r = null, s = t.scratchpad(), a = s.vector(), c = 0, l = e.length; c < l; ++c) i = (r = e[c]).state, r.fixed || (i.old.pos.clone(i.pos), a.clone(i.old.vel), i.pos.vadd(a.mult(n)).vadd(i.old.acc.mult(o)), i.old.acc.zero(), i.old.angular.pos = i.angular.pos, i.angular.pos += i.old.angular.vel * n + i.old.angular.acc * o, i.old.angular.acc = 0);
                    s.done()
                }
            }
        }), t.renderer("canvas", function(e) {
            var n = 2 * Math.PI,
                i = function(t, e) {
                    var n = document.createElement(t || "div");
                    return e && (n.innerHTML = e), n
                },
                o = {
                    debug: !1,
                    metaEl: null,
                    styles: {
                        point: "rgba(80, 50, 100, 0.7)",
                        circle: {
                            strokeStyle: "rgba(70, 50, 100, 0.7)",
                            lineWidth: 1,
                            fillStyle: "rgba(44, 105, 44, 0.7)",
                            angleIndicator: "rgba(69, 51, 78, 0.7)"
                        },
                        "convex-polygon": {
                            strokeStyle: "rgba(80, 50, 100, 0.7)",
                            lineWidth: 1,
                            fillStyle: "rgba(114, 105, 124, 0.7)",
                            angleIndicator: "rgba(69, 51, 78, 0.7)"
                        }
                    },
                    offset: {
                        x: 0,
                        y: 0
                    }
                },
                r = function(e, n) {
                    return t.util.isPlainObject(n) ? t.util.extend({}, e, n, r) : void 0 !== n ? n : e
                };
            return {
                init: function(n) {
                    if (e.init.call(this, n), this.options = t.util.extend({}, o, this.options, r), this.options.offset = t.vector(this.options.offset), this.hiddenCanvas = document.createElement("canvas"), this.hiddenCanvas.width = this.hiddenCanvas.height = 100, !this.hiddenCanvas.getContext) throw "Canvas not supported";
                    this.hiddenCtx = this.hiddenCanvas.getContext("2d");
                    var s = this.el;
                    if ("CANVAS" !== s.nodeName.toUpperCase() && (s = document.createElement("canvas"), this.el.appendChild(s), this.el = s), s.width = this.options.width, s.height = this.options.height, this.ctx = s.getContext("2d"), this.els = {}, this.options.meta) {
                        var a = this.options.metaEl || i();
                        a.className = "pjs-meta", this.els.fps = i("span"), this.els.ipf = i("span"), a.appendChild(i("span", "fps: ")), a.appendChild(this.els.fps), a.appendChild(i("br")), a.appendChild(i("span", "ipf: ")), a.appendChild(this.els.ipf), s.parentNode.insertBefore(a, s)
                    }
                },
                setStyle: function(e, n) {
                    n = n || this.ctx, t.util.isObject(e) ? (n.strokeStyle = e.strokeStyle, n.fillStyle = e.fillStyle, n.lineWidth = e.lineWidth) : (n.fillStyle = n.strokeStyle = e, n.lineWidth = 1)
                },
                drawCircle: function(t, e, i, o, r) {
                    (r = r || this.ctx).beginPath(), this.setStyle(o, r), r.arc(t, e, i, 0, n, !1), r.closePath(), r.stroke(), r.fill()
                },
                drawPolygon: function(t, e, n) {
                    var i = t[0],
                        o = void 0 === i.x ? i.get(0) : i.x,
                        r = void 0 === i.y ? i.get(1) : i.y,
                        s = t.length;
                    (n = n || this.ctx).beginPath(), this.setStyle(e, n), n.moveTo(o, r);
                    for (var a = 1; a < s; ++a) o = void 0 === (i = t[a]).x ? i.get(0) : i.x, r = void 0 === i.y ? i.get(1) : i.y, n.lineTo(o, r);
                    s > 2 && n.closePath(), n.stroke(), n.fill()
                },
                drawLine: function(t, e, n, i) {
                    var o = void 0 === t.x ? t.get(0) : t.x,
                        r = void 0 === t.y ? t.get(1) : t.y;
                    (i = i || this.ctx).beginPath(), this.setStyle(n, i), i.moveTo(o, r), o = void 0 === e.x ? e.get(0) : e.x, r = void 0 === e.y ? e.get(1) : e.y, i.lineTo(o, r), i.stroke(), i.fill()
                },
                createView: function(t, e) {
                    var n = new Image,
                        i = t.aabb(),
                        o = i.halfWidth + Math.abs(i.pos.x),
                        r = i.halfHeight + Math.abs(i.pos.y),
                        s = o + 1,
                        a = r + 1,
                        c = this.hiddenCtx,
                        l = this.hiddenCanvas,
                        u = t.name;
                    return s += 0 | (e = e || this.options.styles[u]).lineWidth, a += 0 | e.lineWidth, l.width = 2 * o + 2 + (2 * e.lineWidth | 0), l.height = 2 * r + 2 + (2 * e.lineWidth | 0), c.save(), c.translate(s, a), "circle" === u ? this.drawCircle(0, 0, t.radius, e, c) : "convex-polygon" === u && this.drawPolygon(t.vertices, e, c), e.angleIndicator && (c.beginPath(), this.setStyle(e.angleIndicator, c), c.moveTo(0, 0), c.lineTo(o, 0), c.closePath(), c.stroke()), c.restore(), n.src = l.toDataURL("image/png"), n.width = l.width, n.height = l.height, n
                },
                drawMeta: function(t) {
                    this.els.fps.innerHTML = t.fps.toFixed(2), this.els.ipf.innerHTML = t.ipf
                },
                beforeRender: function() {
                    this.el.width = this.el.width
                },
                drawBody: function(t, e) {
                    var n = this.ctx,
                        i = t.state.pos,
                        o = this.options.offset,
                        r = t.aabb();
                    n.save(), n.translate(i.get(0) + o.get(0), i.get(1) + o.get(1)), n.rotate(t.state.angular.pos), n.drawImage(e, -e.width / 2, -e.height / 2), n.restore(), this.options.debug && (n.save(), n.translate(o.get(0), o.get(1)), this.drawPolygon([{
                        x: r.pos.x - r.x,
                        y: r.pos.y - r.y
                    }, {
                        x: r.pos.x + r.x,
                        y: r.pos.y - r.y
                    }, {
                        x: r.pos.x + r.x,
                        y: r.pos.y + r.y
                    }, {
                        x: r.pos.x - r.x,
                        y: r.pos.y + r.y
                    }], "rgba(100, 255, 100, 0.3)"), n.restore())
                }
            }
        }), t.renderer("dom", function(t) {
            var e = {},
                n = document.createElement("div"),
                i = "px",
                o = function(t) {
                    if (e[t]) return e[t];
                    for (var i, o = ["Webkit", "Moz", "Ms", "O"], r = 0, s = o.length; r < s; ++r)
                        if ((i = o[r] + t.replace(/(?:^|\s)\w/g, function(t) {
                                return t.toUpperCase()
                            })) in n.style) return e[t] = i;
                    return i in n.style && (e[t] = t)
                }("transform"),
                r = function(t, e) {
                    var n = document.createElement(t || "div");
                    return e && (n.innerHTML = e), n
                };
            return {
                init: function(e) {
                    t.init.call(this, e);
                    var n = this.el;
                    if (n.style.position = "relative", n.style.overflow = "hidden", n.style.width = this.options.width + i, n.style.height = this.options.height + i, this.els = {}, e.meta) {
                        var o = r();
                        o.className = "pjs-meta", this.els.fps = r("span"), this.els.ipf = r("span"), o.appendChild(r("span", "fps: ")), o.appendChild(this.els.fps), o.appendChild(r("br")), o.appendChild(r("span", "ipf: ")), o.appendChild(this.els.ipf), n.appendChild(o)
                    }
                },
                circleProperties: function(t, e) {
                    var n = e.aabb();
                    t.style.width = 2 * n.halfWidth + i, t.style.height = 2 * n.halfHeight + i, t.style.marginLeft = -n.halfWidth + i, t.style.marginTop = -n.halfHeight + i
                },
                createView: function(t) {
                    var e = r(),
                        n = t.name + "Properties";
                    return e.className = "pjs-" + t.name, e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", this[n] && this[n](e, t), this.el.appendChild(e), e
                },
                drawMeta: function(t) {
                    this.els.fps.innerHTML = t.fps.toFixed(2), this.els.ipf.innerHTML = t.ipf
                },
                drawBody: o ? function(t, e) {
                    var n = t.state.pos;
                    e.style[o] = "translate(" + n.get(0) + "px," + n.get(1) + "px) rotate(" + t.state.angular.pos + "rad)"
                } : function(t, e) {
                    var n = t.state.pos;
                    e.style.left = n.get(0) + i, e.style.top = n.get(1) + i
                }
            }
        }), t
});

/*
/// JSON stuff
{
  "indent_size": "4",
  "indent_char": " ",
  "max_preserve_newlines": "5",
  "preserve_newlines": true,
  "keep_array_indentation": false,
  "break_chained_methods": false,
  "indent_scripts": "normal",
  "brace_style": "collapse",
  "space_before_conditional": true,
  "unescape_strings": false,
  "jslint_happy": false,
  "end_with_newline": false,
  "wrap_line_length": "0",
  "indent_inner_html": false,
  "comma_first": false,
  "e4x": false,
  "indent_empty_lines": false
}
*/