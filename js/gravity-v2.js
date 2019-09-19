var delta = [0, 0],
    stage = [window.screenX, window.screenY, window.innerWidth, window.innerHeight];
getBrowserDimensions();
var worldAABB, world, edgeBounce, constraints, mouseJoint, query, gravityBehavior, isRunning = !1,
    isMouseDown = !1,
    iterations = 16,
    timeStep = 1e3 / 260,
    mouse = {
        x: 0,
        y: 0
    },
    mouseOnClick = [],
    elements = [],
    bodies = [],
    properties = [],
    page = 0,
    gravity = {
        x: 0,
        y: 1
    };
if (init(), "" != location.search)
    for (var params = location.search.substr(1).split("&"), i = 0; i < params.length; i++) {
        var param = params[i].split("=");
        if ("q" == param[0]) {
            document.getElementById("q").value = param[1], run();
            break
        }
    }

function init() {
    document.addEventListener("mousedown", onDocumentMouseDown, !1), document.addEventListener("mouseup", onDocumentMouseUp, !1), document.addEventListener("mousemove", onDocumentMouseMove, !1), document.addEventListener("keyup", onDocumentKeyUp, !1), document.addEventListener("touchstart", onDocumentTouchStart, !1), document.addEventListener("touchmove", onDocumentTouchMove, !1), document.addEventListener("touchend", onDocumentTouchEnd, !1), window.addEventListener("deviceorientation", onWindowDeviceOrientation, !1), worldAABB = Physics.aabb.apply(null, stage), world = Physics({
        timestep: timeStep,
        maxIPF: iterations
    }), edgeBounce = Physics.behavior("edge-collision-detection", {
        aabb: worldAABB,
        restitution: .4,
        cof: .5
    }), world.add(edgeBounce), world.add(Physics.behavior("body-collision-detection", {
        checkAll: !1
    })), world.add(Physics.behavior("sweep-prune")), world.add(Physics.behavior("body-impulse-response")), constraints = Physics.behavior("verlet-constraints", {
        iterations: 2
    }), world.add(constraints), gravityBehavior = Physics.behavior("constant-acceleration", {
        acc: gravity
    }), world.add(gravityBehavior), elements = getElementsByClass("physics-element");
    for (var t = 0; t < elements.length; t++) properties[t] = getElementProperties(elements[t]);
    for (t = 0; t < elements.length; t++) {
        var e = elements[t];
        for (e.style.position = "absolute", e.style.left = -properties[t][2] / 2 + "px", e.style.top = -properties[t][3] / 2 + "px", e.style.width = properties[t][2] + "px", e.addEventListener("mousedown", onElementMouseDown, !1), e.addEventListener("mouseup", onElementMouseUp, !1), e.addEventListener("click", onElementClick, !1), bodies[t] = Physics.body("convex-polygon", {
                x: properties[t][0] + properties[t][2] / 2,
                y: properties[t][1] + properties[t][3] / 2,
                vertices: [{
                    x: 0,
                    y: 0
                }, {
                    x: properties[t][2],
                    y: 0
                }, {
                    x: properties[t][2],
                    y: properties[t][3]
                }, {
                    x: 0,
                    y: properties[t][3]
                }]
            }), bodies[t].view = e; e.offsetParent;)(e = e.offsetParent).style.position = "static"
    }
    world.add(bodies);
    var n = Physics.renderer("dom", {
        el: document.body,
        width: window.innerWidth,
        height: window.innerHeight
    });
    world.add(n), world.render(), world.pause(), Physics.util.ticker.subscribe(loop), Physics.util.ticker.start(), world.subscribe("render", function(t) {
        for (var e, n = 0, i = t.bodies.length; n < i; ++n)(e = t.bodies[n].view.style).WebkitTransform += " translateZ(0)", e.MozTransform += " translateZ(0)", e.MsTransform += " translateZ(0)", e.transform += " translateZ(0)"
    })
}

function run() {
    world.unpause()
}

function onDocumentMouseDown(t) {
    isMouseDown = !0
}

function onDocumentMouseUp(t) {
    isMouseDown = !1
}

function onDocumentMouseMove(t) {
    world.isPaused() && run(), mouse.x = t.clientX, mouse.y = t.clientY
}

function onDocumentKeyUp(t) {
    13 == t.keyCode && search()
}

function onDocumentTouchStart(t) {
    1 == t.touches.length && (isRunning || run(), mouse.x = t.touches[0].pageX, mouse.y = t.touches[0].pageY, isMouseDown = !0)
}

function onDocumentTouchMove(t) {
    1 == t.touches.length && (t.preventDefault(), mouse.x = t.touches[0].pageX, mouse.y = t.touches[0].pageY)
}

function onDocumentTouchEnd(t) {
    0 == t.touches.length && (isMouseDown = !1)
}

function onWindowDeviceOrientation(t) {
    t.beta && (gravity.x = Math.sin(t.gamma * Math.PI / 180), gravity.y = Math.sin(Math.PI / 4 + t.beta * Math.PI / 180))
}

function onElementMouseDown(t) {
    t.preventDefault(), mouseOnClick[0] = t.clientX, mouseOnClick[1] = t.clientY
}

function onElementMouseUp(t) {
    t.preventDefault()
}

function onElementClick(t) {
    (mouseOnClick[0] > t.clientX + 5 || mouseOnClick[0] < t.clientX - 5 && mouseOnClick[1] > t.clientY + 5 || mouseOnClick[1] < t.clientY - 5) && t.preventDefault(), t.target == document.getElementById("btnG") && search(), t.target == document.getElementById("btnI") && imFeelingLucky(), t.target == document.getElementById("q") && document.getElementById("q").focus()
}

function loop(t) {
    getBrowserDimensions() && setWalls(), delta[0] += .5 * (0 - delta[0]), delta[1] += .5 * (0 - delta[1]), gravityBehavior.setAcceleration({
        x: 5e-4 * gravity.x + delta[0],
        y: 5e-4 * gravity.y + delta[1]
    }), mouseDrag(), world.step(t), world.isPaused() || world.render()
}

function mouseDrag() {
    if (isMouseDown && !mouseJoint) {
        var t = getBodyAtMouse();
        if (t) {
            var e = Physics.body("point", {
                x: mouse.x,
                y: mouse.y
            });
            mouseJoint = constraints.distanceConstraint(e, t, .2)
        }
    }
    isMouseDown || mouseJoint && (constraints.remove(mouseJoint), mouseJoint = null), mouseJoint && mouseJoint.bodyA.state.pos.set(mouse.x, mouse.y)
}

function getBodyAtMouse() {
    return world.findOne({
        $at: Physics.vector(mouse.x, mouse.y)
    })
}

function setWalls() {
    worldAABB = Physics.aabb.apply(null, stage), edgeBounce.setAABB(worldAABB)
}

function getElementsByClass(t) {
    var e = [],
        n = document.getElementsByTagName("*"),
        o = n.length;
    for (j = i = 0; i < o; i++) {
        var r = n[i].className.split(" ");
        for (k = 0; k < r.length; k++) r[k] == t && (e[j++] = n[i])
    }
    return e
}

function getElementProperties(t) {
    for (var e = 0, n = 0, i = t.offsetWidth, o = t.offsetHeight; e += t.offsetLeft, n += t.offsetTop, t = t.offsetParent;);
    return [e, n, i, o]
}

function getBrowserDimensions() {
    var t = !1;
    return stage[0] != window.screenX && (delta[0] = 50 * (window.screenX - stage[0]), stage[0] = window.screenX, t = !0), stage[1] != window.screenY && (delta[1] = 50 * (window.screenY - stage[1]), stage[1] = window.screenY, t = !0), stage[2] != window.innerWidth && (stage[2] = window.innerWidth, t = !0), stage[3] != window.innerHeight && (stage[3] = window.innerHeight, t = !0), t
}! function(t, e) {
    "object" == typeof exports ? module.exports = e.call(t) : "function" == typeof define && define.amd ? define(function() {
        return e.call(t)
    }) : t.Physics = e.call(t)
}(this, function() {
    "use strict";

    function kt() {
        return kt.world.apply(kt, arguments)
    }
    kt.util = {},
        function(t) {
            function h(t) {
                return "function" != typeof t.toString && "string" == typeof(t + "")
            }

            function n() {}

            function d(t) {
                t.length = 0, x.length < B && x.push(t)
            }

            function s() {}

            function a(o, r, t) {
                if ("function" != typeof o) return u;
                if (void 0 === r) return o;
                var e = o.__bindData__ || yt.funcNames && !o.name;
                if (void 0 === e) {
                    var n = I && Z.call(o);
                    yt.funcNames || !n || P.test(n) || (e = !0), !yt.funcNames && e || (e = !yt.funcDecomp || I.test(n), bt(o, e))
                }
                if (!0 !== e && e && 1 & e[1]) return o;
                switch (t) {
                    case 1:
                        return function(t) {
                            return o.call(r, t)
                        };
                    case 2:
                        return function(t, e) {
                            return o.call(r, t, e)
                        };
                    case 3:
                        return function(t, e, n) {
                            return o.call(r, t, e, n)
                        };
                    case 4:
                        return function(t, e, n, i) {
                            return o.call(r, t, e, n, i)
                        }
                }
                return c(o, r)
            }

            function f(i, t, o, r, s, a) {
                if (o && void 0 !== (u = o(i, t))) return !!u;
                if (i === t) return 0 !== i || 1 / i == 1 / t;
                if (i == i && !(i && N[typeof i] || t && N[typeof t])) return !1;
                if (null == i || null == t) return i === t;
                var e = it.call(i),
                    n = it.call(t);
                if (e == j && (e = T), n == j && (n = T), e != n) return !1;
                switch (e) {
                    case S:
                    case O:
                        return +i == +t;
                    case F:
                        return i != +i ? t != +t : 0 == i ? 1 / i == 1 / t : i == +t;
                    case L:
                    case q:
                        return i == t + ""
                }
                if (!(n = e == E)) {
                    if (Q.call(i, "__wrapped__") || Q.call(t, "__wrapped__")) return f(i.__wrapped__ || i, t.__wrapped__ || t, o, r, s, a);
                    if (e != T || !yt.nodeClass && (h(i) || h(t))) return !1;
                    e = !yt.argsObject && p(i) ? Object : i.constructor;
                    var c = !yt.argsObject && p(t) ? Object : t.constructor;
                    if (e != c && !(b(e) && e instanceof e && b(c) && c instanceof c)) return !1
                }
                for (c = !s, s = s || (x.pop() || []), a = a || (x.pop() || []), e = s.length; e--;)
                    if (s[e] == i) return a[e] == t;
                var l = 0,
                    u = !0;
                if (s.push(i), a.push(t), n) {
                    if (e = i.length, l = t.length, !(u = l == i.length) && !r) return u;
                    for (; l--;)
                        if (n = e, c = t[l], r)
                            for (; n-- && !(u = f(i[n], c, o, r, s, a)););
                        else if (!(u = f(i[l], c, o, r, s, a))) break;
                    return u
                }
                return Ct(t, function(t, e, n) {
                    return Q.call(n, e) ? (l++, u = Q.call(i, e) && f(i[e], t, o, r, s, a)) : void 0
                }), u && !r && Ct(i, function(t, e, n) {
                    return Q.call(n, e) ? u = -1 < --l : void 0
                }), c && (d(s), d(a)), u
            }

            function g(n, i, o, r, s, a) {
                var c = 1 & i,
                    l = 2 & i,
                    u = 4 & i,
                    h = 8 & i,
                    d = 16 & i,
                    f = 32 & i,
                    p = n;
                if (!l && !b(n)) throw new TypeError;
                d && !o.length && (i &= -17, d = o = !1), f && !r.length && (i &= -33, f = r = !1);
                var t = n && n.__bindData__;
                if (t) return !c || 1 & t[1] || (t[4] = s), !c && 1 & t[1] && (i |= 8), !u || 4 & t[1] || (t[5] = a), d && et.apply(t[2] || (t[2] = []), o), f && et.apply(t[3] || (t[3] = []), r), t[1] |= i, g.apply(null, t);
                if (!c || l || u || f || !(yt.fastBind || st && d)) v = function() {
                    var t = arguments,
                        e = c ? s : this;
                    return (u || d || f) && (t = ft.call(t), d && ot.apply(t, o), f && et.apply(t, r), u && t.length < a) ? (i |= 16, g(n, h ? i : -4 & i, t, null, s, a)) : (l && (n = e[p]), this instanceof v ? (e = y(n.prototype), m(t = n.apply(e, t)) ? t : e) : n.apply(e, t))
                };
                else {
                    if (d) {
                        var e = [s];
                        et.apply(e, o)
                    }
                    var v = d ? st.apply(n, e) : st.call(n, s)
                }
                return bt(v, ft.call(arguments)), v
            }

            function e() {
                R.h = M, R.b = R.c = R.g = R.i = "", R.e = "t", R.j = !0;
                for (var t, e = 0; t = arguments[e]; e++)
                    for (var n in t) R[n] = t[n];
                e = R.a, R.d = /^[^,]+/.exec(e)[0], t = Function, e = "return function(" + e + "){";
                var i = "var n,t=" + (n = R).d + ",E=" + n.e + ";if(!t)return E;" + n.i + ";";
                n.b ? (i += "var u=t.length;n=-1;if(" + n.b + "){", yt.unindexedChars && (i += "if(s(t)){t=t.split('')}"), i += "while(++n<u){" + n.g + ";}}else{") : yt.nonEnumArgs && (i += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + n.g + ";}}else{"), yt.enumPrototypes && (i += "var G=typeof t=='function';"), yt.enumErrorProps && (i += "var F=t===k||t instanceof Error;");
                var o = [];
                if (yt.enumPrototypes && o.push('!(G&&n=="prototype")'), yt.enumErrorProps && o.push('!(F&&(n=="message"||n=="name"))'), n.j && n.f) i += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];", o.length && (i += "if(" + o.join("&&") + "){"), i += n.g + ";", o.length && (i += "}"), i += "}";
                else if (i += "for(n in t){", n.j && o.push("m.call(t, n)"), o.length && (i += "if(" + o.join("&&") + "){"), i += n.g + ";", o.length && (i += "}"), i += "}", yt.nonEnumShadows) {
                    for (i += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];", k = 0; k < 7; k++) i += "n='" + n.h[k] + "';if((!(r&&x[n])&&m.call(t,n))", n.j || (i += "||(!x[n]&&t[n]!==A[n])"), i += "){" + n.g + "}";
                    i += "}"
                }
                return (n.b || yt.nonEnumArgs) && (i += "}"), t("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", e + (i += n.c + ";return E") + "}")(a, D, Y, Q, A, p, mt, r, R.f, X, N, gt, q, U, it)
            }

            function y(t) {
                return m(t) ? at(t) : {}
            }

            function i(t) {
                var e, i;
                return !(!(t && it.call(t) == T && (!b(e = t.constructor) || e instanceof e)) || !yt.argsClass && p(t) || !yt.nodeClass && h(t)) && (yt.ownLast ? (Ct(t, function(t, e, n) {
                    return i = Q.call(n, e), !1
                }), !1 !== i) : (Ct(t, function(t, e) {
                    i = e
                }), void 0 === i || Q.call(t, i)))
            }

            function p(t) {
                return t && "object" == typeof t && "number" == typeof t.length && it.call(t) == j || !1
            }

            function b(t) {
                return "function" == typeof t
            }

            function m(t) {
                return !(!t || !N[typeof t])
            }

            function r(t) {
                return "string" == typeof t || it.call(t) == q
            }

            function o(t, e, n) {
                if (e && void 0 === n && mt(t)) {
                    n = -1;
                    for (var i = t.length; ++n < i && !1 !== e(t[n], n, t););
                } else At(t, e, n);
                return t
            }

            function c(t, e) {
                return 2 < arguments.length ? g(t, 17, ft.call(arguments, 2), null, e) : g(t, 1, null, null, e)
            }

            function l(n, i, t) {
                var o, r, s, a, c, l, u, h = 0,
                    d = !1,
                    f = !0;
                if (!b(n)) throw new TypeError;
                if (i = ut(0, i) || 0, !0 === t) {
                    var p = !0;
                    f = !1
                } else m(t) && (p = t.leading, d = "maxWait" in t && (ut(i, t.maxWait) || 0), f = "trailing" in t ? t.trailing : f);

                function v() {
                    l && clearTimeout(l), r = l = u = _, !f && d === i || (h = tt(), s = n.apply(c, o))
                }
                var g = function() {
                    var t = i - (tt() - a);
                    0 < t ? l = setTimeout(g, t) : (r && clearTimeout(r), t = u, r = l = u = _, t && (h = tt(), s = n.apply(c, o)))
                };
                return function() {
                    if (o = arguments, a = tt(), c = this, u = f && (l || !p), !1 === d) var t = p && !l;
                    else {
                        r || p || (h = a);
                        var e = d - (a - h);
                        0 < e ? r = r || setTimeout(v, e) : (r = r && clearTimeout(r), h = a, s = n.apply(c, o))
                    }
                    return l || i === d || (l = setTimeout(g, i)), t && (s = n.apply(c, o)), s
                }
            }

            function u(t) {
                return t
            }

            function v(t, e, n) {
                var i = null == t,
                    o = null == e;
                return null == n && ("boolean" == typeof t && o ? (n = t, t = 1) : o || "boolean" != typeof e || (n = e, o = !0)), i && o && (e = 1), t = +t || 0, o ? (e = t, t = 0) : e = +e || 0, i = dt(), n || t % 1 || e % 1 ? ht(t + i * (e - t + parseFloat("1e-" + ((i + "").length - 1))), e) : t + K(i * (e - t + 1))
            }
            var _, x = [],
                w = 0,
                A = {},
                B = 40,
                C = /\w*$/,
                P = /^function[ \n\r\t]+\w/,
                I = /\bthis\b/,
                M = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
                j = "[object Arguments]",
                E = "[object Array]",
                S = "[object Boolean]",
                O = "[object Date]",
                D = "[object Error]",
                F = "[object Number]",
                T = "[object Object]",
                L = "[object RegExp]",
                q = "[object String]",
                W = {
                    "[object Function]": !1
                };
            W[j] = W[E] = W[S] = W[O] = W[F] = W[T] = W[L] = W[q] = !0;
            var H = {
                    leading: !1,
                    maxWait: 0,
                    trailing: !1
                },
                z = {
                    configurable: !1,
                    enumerable: !1,
                    value: null,
                    writable: !1
                },
                R = {
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
                N = {
                    boolean: !1,
                    function: !0,
                    object: !0,
                    number: !1,
                    string: !1,
                    undefined: !1
                },
                V = N[typeof t] && t || this,
                J = [],
                Y = Error.prototype,
                X = Object.prototype,
                U = String.prototype,
                $ = RegExp("^" + (X.valueOf + "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"),
                K = Math.floor,
                Z = Function.prototype.toString,
                G = $.test(G = Object.getPrototypeOf) && G,
                Q = X.hasOwnProperty,
                tt = $.test(tt = Date.now) && tt || function() {
                    return +new Date
                },
                et = J.push,
                nt = X.propertyIsEnumerable,
                it = X.toString,
                ot = J.unshift,
                rt = function() {
                    try {
                        var t = {},
                            e = $.test(e = Object.defineProperty) && e,
                            n = e(t, t, t) && e
                    } catch (t) {}
                    return n
                }(),
                st = $.test(st = it.bind) && st,
                at = $.test(at = Object.create) && at,
                ct = $.test(ct = Array.isArray) && ct,
                lt = $.test(lt = Object.keys) && lt,
                ut = Math.max,
                ht = Math.min,
                dt = Math.random,
                ft = J.slice;
            t = $.test(V.attachEvent);
            var pt = st && !/\n|true/.test(st + t),
                vt = {};
            vt[E] = Array, vt[S] = Boolean, vt[O] = Date, vt["[object Function]"] = Function, vt[T] = Object, vt[F] = Number, vt[L] = RegExp, vt[q] = String;
            var gt = {};
            gt[E] = gt[O] = gt[F] = {
                    constructor: !0,
                    toLocaleString: !0,
                    toString: !0,
                    valueOf: !0
                }, gt[S] = gt[q] = {
                    constructor: !0,
                    toString: !0,
                    valueOf: !0
                }, gt[D] = gt["[object Function]"] = gt[L] = {
                    constructor: !0,
                    toString: !0
                }, gt[T] = {
                    constructor: !0
                },
                function() {
                    for (var t = M.length; t--;) {
                        var e, n = M[t];
                        for (e in gt) Q.call(gt, e) && !Q.call(gt[e], n) && (gt[e][n] = !1)
                    }
                }();
            var yt = s.support = {};
            ! function() {
                function t() {
                    this.x = 1
                }
                var e = {
                        0: 1,
                        length: 1
                    },
                    n = [];
                for (var i in t.prototype = {
                        valueOf: 1,
                        y: 1
                    }, new t) n.push(i);
                for (i in arguments);
                yt.argsClass = it.call(arguments) == j, yt.argsObject = arguments.constructor == Object && !(arguments instanceof Array), yt.enumErrorProps = nt.call(Y, "message") || nt.call(Y, "name"), yt.enumPrototypes = nt.call(t, "prototype"), yt.fastBind = st && !pt, yt.funcDecomp = !$.test(V.WinRTError) && I.test(function() {
                    return this
                }), yt.funcNames = "string" == typeof Function.name, yt.nonEnumArgs = 0 != i, yt.nonEnumShadows = !/valueOf/.test(n), yt.ownLast = "x" != n[0], yt.spliceObjects = (J.splice.call(e, 0, 1), !e[0]), yt.unindexedChars = "xx" != "x" [0] + Object("x")[0];
                try {
                    yt.nodeClass = !(it.call(document) == T && !({
                        toString: 0
                    } + ""))
                } catch (t) {
                    yt.nodeClass = !0
                }
            }(1), at || (y = function(t) {
                if (m(t)) {
                    n.prototype = t;
                    var e = new n;
                    n.prototype = null
                }
                return e || {}
            });
            var bt = rt ? function(t, e) {
                z.value = e, rt(t, "__bindData__", z)
            } : n;
            yt.argsClass || (p = function(t) {
                return t && "object" == typeof t && "number" == typeof t.length && Q.call(t, "callee") || !1
            });
            var mt = ct || function(t) {
                    return t && "object" == typeof t && "number" == typeof t.length && it.call(t) == E || !1
                },
                _t = e({
                    a: "z",
                    e: "[]",
                    i: "if(!(B[typeof z]))return E",
                    g: "E.push(n)"
                }),
                xt = lt ? function(t) {
                    return m(t) ? yt.enumPrototypes && "function" == typeof t || yt.nonEnumArgs && t.length && p(t) ? _t(t) : lt(t) : []
                } : _t,
                wt = {
                    i: "if(!B[typeof t])return E;" + (ct = {
                        a: "g,e,K",
                        i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
                        b: "typeof u=='number'",
                        v: xt,
                        g: "if(e(t[n],n,g)===false)return E"
                    }).i,
                    b: !(t = {
                        a: "z,H,l",
                        i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
                        v: xt,
                        g: "if(typeof E[n]=='undefined')E[n]=t[n]",
                        c: "}}"
                    })
                },
                At = e(ct),
                Bt = e(t, {
                    i: t.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
                    g: "E[n]=e?e(E[n],t[n]):t[n]"
                }),
                Ct = e(ct, wt, {
                    j: !1
                }),
                Pt = e(ct, wt);
            b(/x/) && (b = function(t) {
                return "function" == typeof t && "[object Function]" == it.call(t)
            }), ct = G ? function(t) {
                if (!t || it.call(t) != T || !yt.argsClass && p(t)) return !1;
                var e = t.valueOf,
                    n = "function" == typeof e && (n = G(e)) && G(n);
                return n ? t == n || G(t) == n : i(t)
            } : i, s.assign = Bt, s.bind = c, s.createCallback = function(i, t, e) {
                var n = typeof i;
                if (null == i || "function" == n) return a(i, t, e);
                if ("object" != n) return function(t) {
                    return t[i]
                };
                var o = xt(i),
                    r = o[0],
                    s = i[r];
                return 1 != o.length || s != s || m(s) ? function(t) {
                    for (var e = o.length, n = !1; e-- && (n = f(t[o[e]], i[o[e]], null, !0)););
                    return n
                } : function(t) {
                    return t = t[r], s === t && (0 !== s || 1 / s == 1 / t)
                }
            }, s.debounce = l, s.forEach = o, s.forIn = Ct, s.forOwn = Pt, s.keys = xt, s.shuffle = function(t) {
                var n = -1,
                    e = t ? t.length : 0,
                    i = Array("number" == typeof e ? e : 0);
                return o(t, function(t) {
                    var e = v(++n);
                    i[n] = i[e], i[e] = t
                }), i
            }, s.throttle = function(t, e, n) {
                var i = !0,
                    o = !0;
                if (!b(t)) throw new TypeError;
                return !1 === n ? i = !1 : m(n) && (i = "leading" in n ? n.leading : i, o = "trailing" in n ? n.trailing : o), H.leading = i, H.maxWait = e, H.trailing = o, l(t, e, H)
            }, s.each = o, s.extend = Bt, s.clone = function(t, e, n, i) {
                return "boolean" != typeof e && null != e && (i = n, n = e, e = !1),
                    function n(t, i, o, r, s) {
                        if (o) {
                            var a = o(t);
                            if (void 0 !== a) return a
                        }
                        if (!m(t)) return t;
                        var e = it.call(t);
                        if (!W[e] || !yt.nodeClass && h(t)) return t;
                        var c = vt[e];
                        switch (e) {
                            case S:
                            case O:
                                return new c(+t);
                            case F:
                            case q:
                                return new c(t);
                            case L:
                                return (a = c(t.source, C.exec(t))).lastIndex = t.lastIndex, a
                        }
                        if (e = mt(t), i) {
                            var l = !r;
                            r = r || x.pop() || [], s = s || x.pop() || [];
                            for (var u = r.length; u--;)
                                if (r[u] == t) return s[u];
                            a = e ? c(t.length) : {}
                        } else a = e ? function(t, e, n) {
                            e = e || 0, void 0 === n && (n = t ? t.length : 0);
                            var i = -1;
                            n = n - e || 0;
                            for (var o = Array(n < 0 ? 0 : n); ++i < n;) o[i] = t[e + i];
                            return o
                        }(t) : Bt({}, t);
                        return e && (Q.call(t, "index") && (a.index = t.index), Q.call(t, "input") && (a.input = t.input)), i && (r.push(t), s.push(a), (e ? At : Pt)(t, function(t, e) {
                            a[e] = n(t, i, o, r, s)
                        }), l && (d(r), d(s))), a
                    }(t, e, "function" == typeof n && a(n, i, 1))
            }, s.identity = u, s.isArguments = p, s.isArray = mt, s.isFunction = b, s.isObject = m, s.isPlainObject = ct, s.isString = r, s.random = v, s.sortedIndex = function(t, e, n, i) {
                var o = 0,
                    r = t ? t.length : o;
                for (e = (n = n ? s.createCallback(n, i, 1) : u)(e); o < r;) n(t[i = o + r >>> 1]) < e ? o = i + 1 : r = i;
                return o
            }, s.uniqueId = function(t) {
                return (null == t ? "" : t) + "" + ++w
            }, s.VERSION = "2.2.1", s.extend(kt.util, s)
        }(this);
    var t, e, n, i, o, r, s, a, c, _, l, u, h, d, f, p, v, g, y, b, m, x, w, A, B, C = kt.util.decorator = function(s, t) {
        function a(t, e) {
            return kt.util.isFunction(e) ? e : t
        }
        var c = {},
            l = {},
            u = Object.getPrototypeOf;
        "function" != typeof u && (u = "object" == typeof "test".__proto__ ? function(t) {
            return t.__proto__
        } : function(t) {
            return t.constructor.prototype
        });
        var h = Object.create;
        "function" != typeof h && (h = function(t) {
            function e() {}
            return e.prototype = t, new e
        });

        function e(t, e) {
            "object" != typeof t ? "type" !== t && kt.util.isFunction(e) && (l[t] = e) : (l = kt.util.extend(l, t, a)).type = s
        }
        e(t);

        function n(t, e, n, i) {
            var o, r = l;
            if ("string" != typeof e) i = n, n = e;
            else {
                if (!(r = c[e])) throw 'Error: "' + e + '" ' + s + " not defined";
                r = r.prototype
            }
            if ("function" == typeof n)(o = c[t]) ? o.prototype = kt.util.extend(o.prototype, n(u(o.prototype)), a) : ((o = c[t] = function(t) {
                this.init && this.init(t)
            }).prototype = h(r), o.prototype = kt.util.extend(o.prototype, n(r), a)), o.prototype.type = s, o.prototype.name = t;
            else if (i = n || {}, !(o = c[t])) throw 'Error: "' + t + '" ' + s + " not defined";
            if (i) return new o(i)
        }
        return n.mixin = e, n
    };
    return e = (t = this).Physics, kt.noConflict = function() {
            return t.Physics === kt && (t.Physics = e), kt
        }, (n = function t(e) {
            if (!(this instanceof t)) return new t(e);
            this.initPubsub(e)
        }).prototype = {
            initPubsub: function(t) {
                this._topics = {}, this._defaultScope = t || this
            },
            subscribe: function(t, e, n, i) {
                var o, r = this._topics[t] || (this._topics[t] = []),
                    s = e;
                if (kt.util.isObject(t)) {
                    for (var a in t) this.subscribe(a, t[a], e, n);
                    return this
                }
                return kt.util.isObject(n) ? (e = kt.util.bind(e, n))._bindfn_ = s : i = i || n, e._priority_ = i, o = kt.util.sortedIndex(r, e, "_priority_"), r.splice(o, 0, e), this
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
        }, kt.util.pubsub = n,
        function(r) {
            for (var s = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !r.requestAnimationFrame; ++e) r.requestAnimationFrame = r[t[e] + "RequestAnimationFrame"], r.cancelAnimationFrame = r[t[e] + "CancelAnimationFrame"] || r[t[e] + "CancelRequestAnimationFrame"];
            r.requestAnimationFrame || (r.requestAnimationFrame = function(t, e) {
                var n = (new Date).getTime(),
                    i = Math.max(0, 16 - (n - s)),
                    o = r.setTimeout(function() {
                        t(n + i)
                    }, i);
                return s = n + i, o
            }), r.cancelAnimationFrame || (r.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            })
        }(this), i = "Error: Scratchpad used after .done() called. (Could it be unintentionally scoped?)", o = "Error: Scratchpad usage space out of bounds. (Did you forget to call .done()?)", r = [], s = 0, (a = function() {
            if (this.objIndex = 0, this.arrayIndex = 0, this.vectorIndex = 0, this.aabbIndex = 0, this.transformIndex = 0, this.objectStack = [], this.arrayStack = [], this.vectorStack = [], this.aabbStack = [], this.transformStack = [], 100 <= ++s) throw "Error: Too many scratchpads created. (Did you forget to call .done()?)"
        }).prototype = {
            done: function() {
                this._active = !1, this.objIndex = this.arrayIndex = this.vectorIndex = this.aabbIndex = this.transformIndex = 0, r.push(this)
            },
            object: function() {
                var t = this.objectStack;
                if (!this._active) throw i;
                if (10 <= this.objIndex) throw o;
                return t[this.objIndex++] || t[t.push({}) - 1]
            },
            array: function() {
                var t = this.arrayStack;
                if (!this._active) throw i;
                if (10 <= this.arrIndex) throw o;
                return t[this.arrIndex++] || t[t.push([]) - 1]
            },
            vector: function() {
                var t = this.vectorStack;
                if (!this._active) throw i;
                if (10 <= this.vectorIndex) throw o;
                return t[this.vectorIndex++] || t[t.push(kt.vector()) - 1]
            },
            aabb: function() {
                var t = this.aabbStack;
                if (!this._active) throw i;
                if (10 <= this.aabbIndex) throw o;
                return t[this.aabbIndex++] || t[t.push(kt.aabb()) - 1]
            },
            transform: function() {
                var t = this.transformStack;
                if (!this._active) throw i;
                if (10 <= this.transformIndex) throw o;
                return t[this.transformIndex++] || t[t.push(kt.transform()) - 1]
            }
        }, x = this, w = 0, A = !(kt.scratchpad = function() {
            var t = r.pop() || new a;
            return t._active = !0, t
        }), B = [], kt.util.ticker = {
            start: function() {
                return w = (new Date).getTime(), A = !0, I(), this
            },
            stop: function() {
                return A = !1, this
            },
            subscribe: function(t) {
                if ("function" == typeof t) {
                    for (var e = 0, n = B.length; e < n; ++e)
                        if (t === B[e]) return this;
                    B.push(t)
                }
                return this
            },
            unsubscribe: function(t) {
                for (var e = B, n = 0, i = e.length; n < i; ++n)
                    if (e[n] === t) return e.splice(n, 1), this;
                return this
            },
            isActive: function() {
                return !!A
            }
        }, (c = function t(e, n, i, o) {
            if (!(this instanceof t)) return new t(e, n, i, o);
            this._pos = kt.vector(), this.set(e, n, i, o)
        }).prototype.set = function(t, e, n, i) {
            return kt.util.isObject(t) ? (this._pos.clone(t.pos), this._hw = t.halfWidth, this._hh = t.halfHeight) : (this._pos.set(.5 * (n + t), .5 * (i + e)), this._hw = .5 * (n - t), this._hh = .5 * (i - e)), this
        }, c.prototype.get = function() {
            var t = this.halfWidth(),
                e = this.halfHeight();
            return {
                pos: this._pos.values(),
                halfWidth: t,
                halfHeight: e,
                x: t,
                y: e
            }
        }, c.prototype.halfWidth = function() {
            return this._hw
        }, c.prototype.halfHeight = function() {
            return this._hh
        }, c.prototype.contains = function(t) {
            var e = void 0 !== t.x ? t.x : t.get(0),
                n = void 0 !== t.y ? t.y : t.get(1);
            return e > this._pos.get(0) - this._hw && e < this._pos.get(0) + this._hw && n > this._pos.get(1) - this._hh && n < this._pos.get(1) + this._hh
        }, c.prototype.transform = function(t) {
            var e = this._hw,
                n = this._hh,
                i = kt.scratchpad(),
                o = i.vector().set(e, n),
                r = i.vector().set(e, -n);
            return this._pos.translate(t), o.rotate(t), r.rotate(t), this._hw = Math.max(Math.abs(o.get(0)), Math.abs(r.get(0))), this._hh = Math.max(Math.abs(o.get(1)), Math.abs(r.get(1))), i.done(), this
        }, c.contains = function(t, e) {
            var n = void 0 !== e.x ? e.x : e.get(0),
                i = void 0 !== e.y ? e.y : e.get(1);
            return n > (t = t.get ? t.get() : t).pos.x - t.halfWidth && n < t.pos.x + t.halfWidth && i > t.pos.y - t.halfHeight && i < t.pos.y + t.halfHeight
        }, kt.aabb = c, _ = function(t, e, n) {
            var i = e.normSq() - e.dot(t),
                o = e.dot(t) - t.normSq();
            return i < 0 ? n.clone(e).negate() : 0 < o ? n.clone(t).negate() : (n.clone(e).vsub(t), n.perp(t.cross(n) < 0))
        }, kt.gjk = function(t, e, n, i) {
            var o, r, s, a, c = !1,
                l = !1,
                u = !1,
                h = [],
                d = 1,
                f = kt.scratchpad(),
                p = f.vector().clone(e || kt.vector.axis[0]),
                v = f.vector(),
                g = f.vector(),
                y = f.vector(),
                b = f.vector(),
                m = 0;
            for (a = t(p), d = h.push(a), v.clone(a.pt), p.negate(); ++m;) {
                if (v.swap(g), a = t(p), d = h.push(a), v.clone(a.pt), i && i(h), v.equals(kt.vector.zero)) {
                    c = !0;
                    break
                }
                if (!l && v.dot(p) <= 0) {
                    if (n) break;
                    l = !0
                }
                if (2 === d) p = _(v, g, p);
                else if (l) {
                    if (p.normalize(), a = g.dot(p), Math.abs(a - v.dot(p)) < 1e-4) {
                        u = -a;
                        break
                    }
                    g.normSq() < y.clone(h[0].pt).normSq() ? h.shift() : h.splice(1, 1), p = _(y.clone(h[1].pt), b.clone(h[0].pt), p)
                } else if (o = o || f.vector(), r = r || f.vector(), o.clone(g).vsub(v), r.clone(h[0].pt).vsub(v), (s = 0 < o.cross(r)) ^ 0 < v.cross(o)) h.shift(), o.perp(s), p.swap(o);
                else {
                    if (!(s ^ 0 < r.cross(v))) {
                        c = !0;
                        break
                    }
                    h.splice(1, 1), r.perp(!s), p.swap(o)
                }
                if (100 < m) return f.done(), {
                    simplex: h,
                    iterations: m,
                    distance: 0,
                    maxIterationsReached: !0
                }
            }
            return f.done(), !(a = {
                overlap: c,
                simplex: h,
                iterations: m
            }) !== u && (a.distance = u, a.closest = function(t) {
                var e, n, i = t.length,
                    o = t[i - 2],
                    r = t[i - 3],
                    s = kt.scratchpad(),
                    a = s.vector().clone(o.pt),
                    c = s.vector().clone(r.pt).vsub(a);
                if (c.equals(kt.vector.zero)) return s.done(), {
                    a: o.a,
                    b: o.b
                };
                if ((n = 1 - (e = -c.dot(a) / c.normSq())) <= 0) return s.done(), {
                    a: r.a,
                    b: r.b
                };
                if (e <= 0) return s.done(), {
                    a: o.a,
                    b: o.b
                };
                var l = {
                    a: a.clone(o.a).mult(n).vadd(c.clone(r.a).mult(e)).values(),
                    b: a.clone(o.b).mult(n).vadd(c.clone(r.b).mult(e)).values()
                };
                return s.done(), l
            }(h)), a
        }, (l = function t(e, n, i) {
            if (!(this instanceof t)) return new t(e, n);
            this.v = kt.vector(), this.o = kt.vector(i), e instanceof t && this.clone(e), e && this.setTranslation(e), this.setRotation(n || 0)
        }).prototype.setTranslation = function(t) {
            return this.v.clone(t), this
        }, l.prototype.setRotation = function(t, e) {
            return this.cosA = Math.cos(t), this.sinA = Math.sin(t), e && this.o.clone(e), this
        }, l.prototype.clone = function(t) {
            return t ? (this.setTranslation(t.v), this.cosA = t.cosA, this.sinA = t.sinA, this.o.clone(t.o), this) : new l(this)
        }, kt.transform = l, f = this, p = Math.sqrt, v = Math.min, g = Math.max, Math.acos, y = Math.atan2, b = 2 * Math.PI, m = !!f.Float64Array, P.prototype.set = function(t, e) {
            return this.recalc = !0, this._[0] = t || 0, this._[1] = e || 0, this
        }, P.prototype.get = function(t) {
            return this._[t]
        }, P.prototype.vadd = function(t) {
            return this.recalc = !0, this._[0] += t._[0], this._[1] += t._[1], this
        }, P.prototype.vsub = function(t) {
            return this.recalc = !0, this._[0] -= t._[0], this._[1] -= t._[1], this
        }, P.prototype.add = function(t, e) {
            return this.recalc = !0, this._[0] += t, this._[1] += void 0 === e ? t : e, this
        }, P.prototype.sub = function(t, e) {
            return this.recalc = !0, this._[0] -= t, this._[1] -= void 0 === e ? t : e, this
        }, P.prototype.mult = function(t) {
            return this.recalc || (this._[4] *= t * t, this._[3] *= t), this._[0] *= t, this._[1] *= t, this
        }, P.prototype.dot = function(t) {
            return this._[0] * t._[0] + this._[1] * t._[1]
        }, P.prototype.cross = function(t) {
            return -this._[0] * t._[1] + this._[1] * t._[0]
        }, P.prototype.proj = function(t) {
            return this.dot(t) / t.norm()
        }, P.prototype.vproj = function(t) {
            var e = this.dot(t) / t.normSq();
            return this.clone(t).mult(e)
        }, P.prototype.angle = function(t) {
            var e;
            if (this.equals(P.zero)) return t ? t.angle() : NaN;
            for (e = t && !t.equals(P.zero) ? y(this._[1] * t._[0] - this._[0] * t._[1], this._[0] * t._[0] + this._[1] * t._[1]) : y(this._[1], this._[0]); e > Math.PI;) e -= b;
            for (; e < -Math.PI;) e += b;
            return e
        }, P.prototype.angle2 = function(t, e) {
            for (var n = t._[0] - this._[0], i = t._[1] - this._[1], o = e._[0] - this._[0], r = e._[1] - this._[1], s = y(i * o - n * r, n * o + i * r); s > Math.PI;) s -= b;
            for (; s < -Math.PI;) s += b;
            return s
        }, P.prototype.norm = function() {
            return this.recalc && (this.recalc = !1, this._[4] = this._[0] * this._[0] + this._[1] * this._[1], this._[3] = p(this._[4])), this._[3]
        }, P.prototype.normSq = function() {
            return this.recalc && (this.recalc = !1, this._[4] = this._[0] * this._[0] + this._[1] * this._[1], this._[3] = p(this._[4])), this._[4]
        }, P.prototype.dist = function(t) {
            var e, n;
            return p((e = t._[0] - this._[0]) * e + (n = t._[1] - this._[1]) * n)
        }, P.prototype.distSq = function(t) {
            var e, n;
            return (e = t._[0] - this._[0]) * e + (n = t._[1] - this._[1]) * n
        }, P.prototype.perp = function(t) {
            var e = this._[0];
            return t ? (this._[0] = -this._[1], this._[1] = e) : (this._[0] = this._[1], this._[1] = -e), this
        }, P.prototype.normalize = function() {
            var t = this.norm();
            return 0 === t || (this._[0] /= t, this._[1] /= t, this._[3] = 1, this._[4] = 1), this
        }, P.prototype.transform = function(t) {
            return this.set((this._[0] - t.o._[0]) * t.cosA - (this._[1] - t.o._[1]) * t.sinA + t.v._[0] + t.o._[0], (this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.v._[1] + t.o._[1])
        }, P.prototype.transformInv = function(t) {
            return this.set((this._[0] - t.o._[0]) * t.cosA + (this._[1] - t.o._[1]) * t.sinA - t.v._[0] + t.o._[0], -(this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA - t.v._[1] + t.o._[1])
        }, P.prototype.rotate = function(t) {
            return this.set((this._[0] - t.o._[0]) * t.cosA - (this._[1] - t.o._[1]) * t.sinA + t.o._[0], (this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.o._[1])
        }, P.prototype.rotateInv = function(t) {
            return this.set((this._[0] - t.o._[0]) * t.cosA + (this._[1] - t.o._[1]) * t.sinA + t.o._[0], -(this._[0] - t.o._[0]) * t.sinA + (this._[1] - t.o._[1]) * t.cosA + t.o._[1])
        }, P.prototype.translate = function(t) {
            return this.vadd(t.v)
        }, P.prototype.translateInv = function(t) {
            return this.vsub(t.v)
        }, P.prototype.clone = function(t) {
            return t ? t._ ? (this.recalc = t.recalc, t.recalc || (this._[3] = t._[3], this._[4] = t._[4]), this._[0] = t._[0], this._[1] = t._[1], this) : this.set(t.x, t.y) : new P(this)
        }, P.prototype.swap = function(t) {
            var e = this._;
            return this._ = t._, t._ = e, e = this.recalc, this.recalc = t.recalc, t.recalc = e, this
        }, P.prototype.values = function() {
            return {
                x: this._[0],
                y: this._[1]
            }
        }, P.prototype.zero = function() {
            return this._[3] = 0, this._[4] = 0, this._[0] = 0, this._[1] = 0, this
        }, P.prototype.negate = function(t) {
            return void 0 !== t ? this._[t] = -this._[t] : (this._[0] = -this._[0], this._[1] = -this._[1]), this
        }, P.prototype.clamp = function(t, e) {
            return t = t.values ? t.values() : t, e = e.values ? e.values() : e, this._[0] = v(g(this._[0], t.x), e.x), this._[1] = v(g(this._[1], t.y), e.y), this.recalc = !0, this
        }, P.prototype.toString = function() {
            return "(" + this._[0] + ", " + this._[1] + ")"
        }, P.prototype.equals = function(t) {
            return this._[0] === t._[0] && this._[1] === t._[1] && this._[2] === t._[2]
        }, P.vadd = function(t, e) {
            return new P(t._[0] + e._[0], t._[1] + e._[1])
        }, P.vsub = function(t, e) {
            return new P(t._[0] - e._[0], t._[1] - e._[1])
        }, P.mult = function(t, e) {
            return new P(e._[0] * t, e._[1] * t)
        }, P.vproj = function(t, e) {
            return P.mult(t.dot(e) / e.normSq(), e)
        }, P.axis = [new P(1, 0), new P(0, 1)], P.zero = new P(0, 0), kt.vector = P, kt.behavior = kt.behaviour = C("behavior", {
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
        }), u = {
            fixed: !1,
            mass: 1,
            restitution: 1,
            cof: .8,
            view: null
        }, kt.body = C("body", {
            init: function(t) {
                var e = kt.vector;
                if (this.options = kt.util.extend({}, u, t), this.fixed = this.options.fixed, this.hidden = this.options.hidden, this.mass = this.options.mass, this.restitution = this.options.restitution, this.cof = this.options.cof, this.view = this.options.view, this.state = {
                        pos: e(t.x, t.y),
                        vel: e(t.vx, t.vy),
                        acc: e(),
                        angular: {
                            pos: t.angle || 0,
                            vel: t.angularVelocity || 0,
                            acc: 0
                        },
                        old: {
                            pos: e(),
                            vel: e(),
                            acc: e(),
                            angular: {
                                pos: 0,
                                vel: 0,
                                acc: 0
                            }
                        }
                    }, 0 === this.mass) throw "Error: Bodies must have non-zero mass";
                this.geometry = kt.geometry("point")
            },
            accelerate: function(t) {
                return this.state.acc.vadd(t), this
            },
            applyForce: function(t, e) {
                var n = kt.scratchpad(),
                    i = n.vector();
                return e ? this.moi && (this.state, i.clone(e), this.state.angular.acc -= i.cross(t) / this.moi, this.applyForce(t)) : this.accelerate(i.clone(t).mult(1 / this.mass)), n.done(), this
            },
            aabb: function() {
                var t = kt.scratchpad(),
                    e = t.transform(),
                    n = this.state.angular.pos,
                    i = t.aabb().set(this.geometry.aabb(n));
                return e.setRotation(0).setTranslation(this.state.pos), i.transform(e), i = i.get(), t.done(), i
            },
            recalc: function() {}
        }), (kt.geometry = C("geometry", {
            init: function(t) {
                this._aabb = new kt.aabb
            },
            aabb: function(t) {
                return this._aabb.get()
            },
            getFarthestHullPoint: function(t, e) {
                return (e = e || kt.vector()).set(0, 0)
            },
            getFarthestCorePoint: function(t, e, n) {
                return (e = e || kt.vector()).set(0, 0)
            }
        })).isPolygonConvex = function(t) {
            var e = kt.scratchpad(),
                n = e.vector(),
                i = e.vector(),
                o = e.vector(),
                r = !0,
                s = !1,
                a = t.length;
            if (!t || !a) return !1;
            if (a < 3) return e.done(), r;
            n.clone(t[0]).vsub(o.clone(t[a - 1]));
            for (var c = 1; c <= a; ++c) {
                if (i.clone(t[c % a]).vsub(o.clone(t[(c - 1) % a])), !1 === s) s = n.cross(i);
                else if (0 < s ^ 0 < n.cross(i)) {
                    r = !1;
                    break
                }
                i.swap(n)
            }
            return e.done(), r
        }, kt.geometry.getPolygonMOI = function(t) {
            var e, n = kt.scratchpad(),
                i = n.vector(),
                o = n.vector(),
                r = 0,
                s = 0,
                a = t.length;
            if (a < 2) return n.done(), 0;
            if (2 === a) return e = o.clone(t[1]).distSq(i.clone(t[0])), n.done(), e / 12;
            i.clone(t[0]);
            for (var c = 1; c < a; ++c) o.clone(t[c]), r += (e = Math.abs(o.cross(i))) * (o.normSq() + o.dot(i) + i.normSq()), s += e, i.swap(o);
            return n.done(), r / (6 * s)
        }, kt.geometry.isPointInPolygon = function(t, e) {
            var n = kt.scratchpad(),
                i = n.vector().clone(t),
                o = n.vector(),
                r = n.vector(),
                s = 0,
                a = e.length;
            if (a < 2) return s = i.equals(o.clone(e[0])), n.done(), s;
            if (2 === a) return s = i.angle(o.clone(e[0])), s += i.angle(o.clone(e[1])), n.done(), Math.abs(s) === Math.PI;
            o.clone(e[0]).vsub(i);
            for (var c = 1; c <= a; ++c) r.clone(e[c % a]).vsub(i), s += r.angle(o), o.swap(r);
            return n.done(), 0 < Math.abs(s)
        }, kt.geometry.getPolygonArea = function(t) {
            var e = kt.scratchpad(),
                n = e.vector(),
                i = e.vector(),
                o = 0,
                r = t.length;
            if (r < 3) return e.done(), 0;
            n.clone(t[r - 1]);
            for (var s = 0; s < r; ++s) i.clone(t[s]), o += n.cross(i), n.swap(i);
            return e.done(), o / 2
        }, kt.geometry.getPolygonCentroid = function(t) {
            var e, n = kt.scratchpad(),
                i = n.vector(),
                o = n.vector(),
                r = kt.vector(),
                s = t.length;
            if (s < 2) return n.done(), kt.vector(t[0]);
            if (2 === s) return n.done(), kt.vector((t[1].x + t[0].x) / 2, (t[1].y + t[0].y) / 2);
            i.clone(t[s - 1]);
            for (var a = 0; a < s; ++a) o.clone(t[a]), e = i.cross(o), i.vadd(o).mult(e), r.vadd(i), i.swap(o);
            return e = 1 / (6 * kt.geometry.getPolygonArea(t)), n.done(), r.mult(e)
        }, kt.geometry.nearestPointOnLine = function(t, e, n) {
            var i, o, r = kt.scratchpad(),
                s = r.vector().clone(t),
                a = r.vector().clone(e).vsub(s),
                c = r.vector().clone(n).vsub(s).vsub(a);
            return c.equals(kt.vector.zero) ? (r.done(), kt.vector(e)) : (o = 1 - (i = -c.dot(a) / c.normSq())) <= 0 ? (r.done(), kt.vector(n)) : i <= 0 ? (r.done(), kt.vector(e)) : (s = kt.vector(n).mult(i).vadd(a.clone(e).mult(o)), r.done(), s)
        }, d = {
            drag: 0
        }, kt.integrator = C("integrator", {
            init: function(t) {
                this.options = kt.util.extend({}, d, t)
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
        }), h = {
            meta: !1,
            metaRefresh: 200,
            width: 600,
            height: 600
        }, kt.renderer = C("renderer", {
            init: function(t) {
                var e = "string" == typeof t.el ? document.getElementById(t.el) : t.el;
                this.options = kt.util.extend({}, h, t), this.el = e || document.body, this.drawMeta = kt.util.throttle(kt.util.bind(this.drawMeta, this), this.options.metaRefresh)
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
        }),
        function() {
            function n(t) {
                this.disconnect && this._world && this.disconnect(this._world), this._world = t, this.connect && t && this.connect(t)
            }
            kt.util.each("body,behavior,integrator,renderer".split(","), function(t, e) {
                kt[t].mixin("setWorld", n)
            });

            function i(t, e) {
                if (!(this instanceof i)) return new i(t, e);
                this.init(t, e)
            }
            var e = {
                timestep: 6.25,
                maxIPF: 16,
                webworker: !1,
                integrator: "verlet"
            };
            i.prototype = kt.util.extend({}, kt.util.pubsub.prototype, {
                init: function(t, e) {
                    kt.util.isFunction(t) && (e = t, t = {}), this._stats = {
                        fps: 0,
                        ipf: 0
                    }, this._bodies = [], this._behaviors = [], this._integrator = null, this._renderer = null, this._paused = !1, this._opts = {}, this.initPubsub(this), this.options(t || {}), kt.util.isFunction(e) && e.call(this, this, kt)
                },
                options: function(t) {
                    return t ? (kt.util.extend(this._opts, e, t), this.timeStep(this._opts.timestep), this.add(kt.integrator(this._opts.integrator)), this) : kt.util.clone(this._opts)
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
                findOne: function(n) {
                    var t = {
                            check: function(t) {
                                for (var e = this; e = e.next;)
                                    if (e(t)) return !0;
                                return !1
                            }
                        },
                        e = t,
                        i = this._bodies;
                    n.$within, n.$at && (e.next = function(t) {
                        var e = t.aabb();
                        return kt.aabb.contains(e, n.$at)
                    });
                    for (var o = 0, r = i.length; o < r; ++o)
                        if (t.check(i[o])) return i[o];
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
            }), kt.world = i
        }(), kt.integrator("verlet", function(e) {
            return kt.body.mixin({
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
        }), kt.geometry("point", function(t) {}), kt.geometry("circle", function(e) {
            var n = {
                radius: 1
            };
            return {
                init: function(t) {
                    e.init.call(this, t), t = kt.util.extend({}, n, t), this.radius = t.radius, this._aabb = kt.aabb()
                },
                aabb: function(t) {
                    var e = this.radius,
                        n = this._aabb;
                    return n.halfWidth() === e ? n.get() : n.set(-e, -e, e, e).get()
                },
                getFarthestHullPoint: function(t, e) {
                    return (e = e || kt.vector()).clone(t).normalize().mult(this.radius)
                },
                getFarthestCorePoint: function(t, e, n) {
                    return (e = e || kt.vector()).clone(t).normalize().mult(this.radius - n)
                }
            }
        }), kt.geometry("convex-polygon", function(e) {
            var n = {};
            return {
                init: function(t) {
                    e.init.call(this, t), t = kt.util.extend({}, n, t), this.setVertices(t.vertices || [])
                },
                setVertices: function(t) {
                    var e = kt.scratchpad(),
                        n = e.transform(),
                        i = this.vertices = [];
                    if (!kt.geometry.isPolygonConvex(t)) throw "Error: The vertices specified do not match that of a _convex_ polygon.";
                    n.setRotation(0), n.setTranslation(kt.geometry.getPolygonCentroid(t).negate());
                    for (var o = 0, r = t.length; o < r; ++o) i.push(kt.vector(t[o]).translate(n));
                    return this._area = kt.geometry.getPolygonArea(i), this._aabb = !1, e.done(), this
                },
                aabb: function(t) {
                    if (!t && this._aabb) return this._aabb.get();
                    var e, n = kt.scratchpad(),
                        i = n.vector(),
                        o = n.transform().setRotation(t || 0),
                        r = n.vector().clone(kt.vector.axis[0]).rotateInv(o),
                        s = n.vector().clone(kt.vector.axis[1]).rotateInv(o),
                        a = this.getFarthestHullPoint(r, i).proj(r),
                        c = -this.getFarthestHullPoint(r.negate(), i).proj(r),
                        l = this.getFarthestHullPoint(s, i).proj(s),
                        u = -this.getFarthestHullPoint(s.negate(), i).proj(s);
                    return e = new kt.aabb(c, u, a, l), t || (this._aabb = e), n.done(), e.get()
                },
                getFarthestHullPoint: function(t, e, n) {
                    var i, o, r, s = this.vertices,
                        a = s.length,
                        c = 2;
                    if (e = e || kt.vector(), a < 2) return n && (n.idx = 0), e.clone(s[0]);
                    if (o = s[0].dot(t), i = s[1].dot(t), 2 === a) return r = o <= i ? 1 : 0, n && (n.idx = r), e.clone(s[r]);
                    if (o <= i) {
                        for (; c < a && o <= i;) o = i, i = s[c].dot(t), c++;
                        return o <= i && c++, r = c - 2, n && (n.idx = c - 2), e.clone(s[r])
                    }
                    for (c = a; 2 < c && i <= o;) i = o, o = s[--c].dot(t);
                    return r = (c + 1) % a, n && (n.idx = r), e.clone(s[r])
                },
                getFarthestCorePoint: function(t, e, n) {
                    var i, o = kt.scratchpad(),
                        r = o.vector(),
                        s = o.vector(),
                        a = this.vertices,
                        c = a.length,
                        l = 0 < this._area,
                        u = {};
                    return e = this.getFarthestHullPoint(t, e, u), r.clone(a[(u.idx + 1) % c]).vsub(e).normalize().perp(!l), s.clone(a[(u.idx - 1 + c) % c]).vsub(e).normalize().perp(l), i = n / (1 + r.dot(s)), e.vadd(r.vadd(s).mult(i)), o.done(), e
                }
            }
        }), kt.body("circle", function(e) {
            var n = {
                radius: 1
            };
            return {
                init: function(t) {
                    e.init.call(this, t), t = kt.util.extend({}, n, t), this.geometry = kt.geometry("circle", {
                        radius: t.radius
                    }), this.recalc()
                },
                recalc: function() {
                    e.recalc.call(this), this.moi = this.mass * this.geometry.radius * this.geometry.radius / 2
                }
            }
        }), kt.body("convex-polygon", function(e) {
            var n = {};
            return {
                init: function(t) {
                    e.init.call(this, t), t = kt.util.extend({}, n, t), this.geometry = kt.geometry("convex-polygon", {
                        vertices: t.vertices
                    }), this.recalc()
                },
                recalc: function() {
                    e.recalc.call(this), this.moi = kt.geometry.getPolygonMOI(this.geometry.vertices)
                }
            }
        }), kt.body("point", function() {}), kt.behavior("body-collision-detection", function(e) {
            function l(t, e) {
                return "circle" === t.geometry.name && "circle" === e.geometry.name ? (n = t, i = e, r = kt.scratchpad(), s = r.vector(), r.vector(), a = !1, s.clone(i.state.pos).vsub(n.state.pos), o = s.norm() - (n.geometry.radius + i.geometry.radius), s.equals(kt.vector.zero) && s.set(1, 0), o <= 0 && (a = {
                    bodyA: n,
                    bodyB: i,
                    norm: s.normalize().values(),
                    mtv: s.mult(-o).values(),
                    pos: s.normalize().mult(n.geometry.radius).values(),
                    overlap: -o
                }), r.done(), a) : function(t, e) {
                    var n, i, o, u, h, d, r = kt.scratchpad(),
                        s = r.vector(),
                        a = r.vector(),
                        c = !1,
                        l = t.aabb(),
                        f = Math.min(l.halfWidth, l.halfHeight),
                        p = e.aabb(),
                        v = Math.min(p.halfWidth, p.halfHeight);
                    if (u = t, h = e, (d = function(t) {
                            var e, n = kt.scratchpad(),
                                i = n.transform().setTranslation(u.state.pos).setRotation(u.state.angular.pos),
                                o = n.transform().setTranslation(h.state.pos).setRotation(h.state.angular.pos),
                                r = n.vector(),
                                s = n.vector(),
                                a = d.useCore ? "getFarthestCorePoint" : "getFarthestHullPoint",
                                c = d.marginA,
                                l = d.marginB;
                            return r = u.geometry[a](t.rotateInv(i), r, c).transform(i), s = h.geometry[a](t.rotate(i).rotateInv(o).negate(), s, l).transform(o), t.negate().rotate(o), e = {
                                a: r.values(),
                                b: s.values(),
                                pt: r.vsub(s).values()
                            }, n.done(), e
                        }).useCore = !1, d.margin = 0, o = d, s.clone(t.state.pos).vsub(e.state.pos), (i = kt.gjk(o, s, !0)).overlap) {
                        for (c = {
                                bodyA: t,
                                bodyB: e
                            }, o.useCore = !0, o.marginA = 0, o.marginB = 0; i.overlap && (o.marginA < f || o.marginB < v);) o.marginA < f && (o.marginA += 1), o.marginB < v && (o.marginB += 1), i = kt.gjk(o, s);
                        if (i.overlap || i.maxIterationsReached) return r.done(), !1;
                        n = Math.max(0, o.marginA + o.marginB - i.distance), c.overlap = n, c.norm = s.clone(i.closest.b).vsub(a.clone(i.closest.a)).normalize().values(), c.mtv = s.mult(n).values(), c.pos = s.clone(c.norm).mult(o.margin).vadd(a.clone(i.closest.a)).vsub(t.state.pos).values()
                    }
                    return r.done(), c
                }(t, e);
                var n, i, o, r, s, a
            }
            var n = {
                checkAll: !1
            };
            return {
                init: function(t) {
                    e.init.call(this, t), this.options = kt.util.extend({}, this.options, n, t)
                },
                connect: function(t) {
                    this.options.checkAll ? t.subscribe("integrate:velocities", this.checkAll, this) : t.subscribe("collisions:candidates", this.check, this)
                },
                disconnect: function(t) {
                    this.options.checkAll ? t.unsubscribe("integrate:velocities", this.checkAll) : t.unsubscribe("collisions:candidates", this.check)
                },
                check: function(t) {
                    for (var e, n, i = t.candidates, o = [], r = 0, s = i.length; r < s; ++r) e = i[r], (n = l(e.bodyA, e.bodyB)) && o.push(n);
                    o.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: o
                    })
                },
                checkAll: function(t) {
                    for (var e, n, i, o = t.bodies, r = (t.dt, []), s = 0, a = o.length; s < a; s++) {
                        e = o[s];
                        for (var c = s + 1; c < a; c++) n = o[c], e.fixed && n.fixed || (i = l(e, n)) && r.push(i)
                    }
                    r.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: r
                    })
                }
            }
        }), kt.behavior("body-impulse-response", function(t) {
            return {
                connect: function(t) {
                    t.subscribe("collisions:detected", this.respond, this)
                },
                disconnect: function(t) {
                    t.unsubscribe("collisions:detected", this.respond)
                },
                collideBodies: function(t, e, n, i, o, r) {
                    var s = t.fixed,
                        a = e.fixed,
                        c = kt.scratchpad(),
                        l = c.vector().clone(o);
                    if (s && a) c.done();
                    else {
                        s ? e.state.pos.vadd(l) : a ? t.state.pos.vsub(l) : (l.mult(.5), t.state.pos.vsub(l), e.state.pos.vadd(l));
                        var u, h, d, f = s ? 0 : 1 / t.moi,
                            p = a ? 0 : 1 / e.moi,
                            v = s ? 0 : 1 / t.mass,
                            g = a ? 0 : 1 / e.mass,
                            y = r ? 0 : t.restitution * e.restitution,
                            b = t.cof * e.cof,
                            m = c.vector().clone(n),
                            _ = c.vector().clone(m).perp(!0),
                            x = c.vector().clone(i),
                            w = c.vector().clone(i).vadd(t.state.pos).vsub(e.state.pos),
                            A = c.vector(),
                            B = t.state.angular.vel,
                            C = e.state.angular.vel,
                            P = c.vector().clone(e.state.vel).vadd(A.clone(w).perp(!0).mult(C)).vsub(t.state.vel).vsub(A.clone(x).perp(!0).mult(B)),
                            k = x.proj(m),
                            I = x.proj(_),
                            M = w.proj(m),
                            j = w.proj(_),
                            E = P.proj(m),
                            S = P.proj(_);
                        0 <= E || (u = -(1 + y) * E / (v + g + f * I * I + p * j * j), s ? (e.state.vel.vadd(m.mult(u * g)), e.state.angular.vel -= u * p * j) : (a ? t.state.vel.vsub(m.mult(u * v)) : (e.state.vel.vadd(m.mult(u * g)), e.state.angular.vel -= u * p * j, t.state.vel.vsub(m.mult(v * e.mass))), t.state.angular.vel += u * f * I), b && S && (d = S / (v + g + f * k * k + p * M * M), u *= (h = S < 0 ? -1 : 1) * b, u = 1 == h ? Math.min(u, d) : Math.max(u, d), s ? (e.state.vel.vsub(_.mult(u * g)), e.state.angular.vel -= u * p * M) : (a ? t.state.vel.vadd(_.mult(u * v)) : (e.state.vel.vsub(_.mult(u * g)), e.state.angular.vel -= u * p * M, t.state.vel.vadd(_.mult(v * e.mass))), t.state.angular.vel += u * f * k))), c.done()
                    }
                },
                respond: function(t) {
                    for (var e, n = kt.util.shuffle(t.collisions), i = 0, o = n.length; i < o; ++i) e = n[i], this.collideBodies(e.bodyA, e.bodyB, e.norm, e.pos, e.mtv)
                }
            }
        }), kt.behavior("constant-acceleration", function(e) {
            var n = {
                acc: {
                    x: 0,
                    y: 4e-4
                }
            };
            return {
                init: function(t) {
                    e.init.call(this, t), this.options = kt.util.extend(this.options, n, t), this._acc = kt.vector(), this.setAcceleration(this.options.acc)
                },
                setAcceleration: function(t) {
                    return this._acc.clone(t), this
                },
                behave: function(t) {
                    for (var e = t.bodies, n = 0, i = e.length; n < i; ++n) e[n].accelerate(this._acc)
                }
            }
        }), kt.behavior("edge-collision-detection", function(e) {
            var n = {
                aabb: null,
                restitution: .99,
                cof: 1
            };
            return {
                init: function(t) {
                    e.init.call(this, t), this.options = kt.util.extend({}, this.options, n, t), this.setAABB(t.aabb), this.restitution = t.restitution, this._dummy = kt.body("_dummy", function() {}, {
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
                    for (var e, n, i = t.bodies, o = (t.dt, []), r = this._edges, s = this._dummy, a = 0, c = i.length; a < c; a++)(e = i[a]).fixed || (m = b = y = g = v = p = f = d = h = u = l = void 0, u = r, h = s, f = (l = e).aabb(), p = kt.scratchpad(), v = p.transform(), g = p.vector(), y = p.vector(), b = !1, m = [], 0 <= (d = f.pos.x + f.x - u.max.x) && (g.set(1, 0).rotateInv(v.setRotation(l.state.angular.pos)), b = {
                        bodyA: l,
                        bodyB: h,
                        overlap: d,
                        norm: {
                            x: 1,
                            y: 0
                        },
                        mtv: {
                            x: d,
                            y: 0
                        },
                        pos: l.geometry.getFarthestHullPoint(g, y).rotate(v).values()
                    }, m.push(b)), 0 <= (d = f.pos.y + f.y - u.max.y) && (g.set(0, 1).rotateInv(v.setRotation(l.state.angular.pos)), b = {
                        bodyA: l,
                        bodyB: h,
                        overlap: d,
                        norm: {
                            x: 0,
                            y: 1
                        },
                        mtv: {
                            x: 0,
                            y: d
                        },
                        pos: l.geometry.getFarthestHullPoint(g, y).rotate(v).values()
                    }, m.push(b)), 0 <= (d = u.min.x - (f.pos.x - f.x)) && (g.set(-1, 0).rotateInv(v.setRotation(l.state.angular.pos)), b = {
                        bodyA: l,
                        bodyB: h,
                        overlap: d,
                        norm: {
                            x: -1,
                            y: 0
                        },
                        mtv: {
                            x: -d,
                            y: 0
                        },
                        pos: l.geometry.getFarthestHullPoint(g, y).rotate(v).values()
                    }, m.push(b)), 0 <= (d = u.min.y - (f.pos.y - f.y)) && (g.set(0, -1).rotateInv(v.setRotation(l.state.angular.pos)), b = {
                        bodyA: l,
                        bodyB: h,
                        overlap: d,
                        norm: {
                            x: 0,
                            y: -1
                        },
                        mtv: {
                            x: 0,
                            y: -d
                        },
                        pos: l.geometry.getFarthestHullPoint(g, y).rotate(v).values()
                    }, m.push(b)), p.done(), (n = m) && o.push.apply(o, n));
                    var l, u, h, d, f, p, v, g, y, b, m;
                    o.length && this._world.publish({
                        topic: "collisions:detected",
                        collisions: o
                    })
                }
            }
        }), kt.behavior("newtonian", function(e) {
            var n = {
                strength: 1
            };
            return {
                init: function(t) {
                    e.init.call(this, t), t = kt.util.extend({}, n, t), this.strength = t.strength, this.tolerance = t.tolerance || 100 * this.strength
                },
                behave: function(t) {
                    for (var e, n, i, o, r = t.bodies, s = this.strength, a = this.tolerance, c = kt.scratchpad(), l = c.vector(), u = 0, h = r.length; u < h; u++) {
                        e = r[u];
                        for (var d = u + 1; d < h; d++) n = r[d], l.clone(n.state.pos), l.vsub(e.state.pos), (i = l.normSq()) > a && (o = s / i, e.accelerate(l.normalize().mult(o * n.mass)), n.accelerate(l.mult(e.mass / n.mass).negate()))
                    }
                    c.done()
                }
            }
        }), kt.behavior("rigid-constraint-manager", function(e) {
            var n = {
                targetLength: 20
            };
            return {
                init: function(t) {
                    e.init.call(this, t), kt.util.extend(this.options, n, t), this._constraints = []
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
                constrain: function(t, e, n) {
                    var i;
                    return !(!t || !e) && (this._constraints.push(i = {
                        id: kt.util.uniqueId("rigid-constraint"),
                        bodyA: t,
                        bodyB: e,
                        targetLength: n || this.options.targetLength
                    }), i)
                },
                remove: function(t) {
                    var e, n = this._constraints;
                    if ("number" == typeof t) return n.splice(t, 1), this;
                    e = kt.util.isObject(t);
                    for (var i = 0, o = n.length; i < o; ++i)
                        if (e && n[i] === t || !e && n[i].id === t) return n.splice(i, 1), this;
                    return this
                },
                resolve: function() {
                    for (var t, e, n, i, o = this._constraints, r = kt.scratchpad(), s = r.vector(), a = r.vector(), c = 0, l = o.length; c < l; ++c) t = o[c], s.clone(t.bodyA.state.pos), a.clone(t.bodyB.state.pos).vsub(s), n = ((e = a.norm()) - t.targetLength) / e, a.mult(n), i = t.bodyB.mass / (t.bodyA.mass + t.bodyB.mass), t.bodyA.fixed || (a.mult(i), t.bodyA.state.pos.vadd(a), a.mult(1 / i)), t.bodyB.fixed || (a.mult(1 - i), t.bodyB.state.pos.vsub(a));
                    r.done()
                },
                getConstraints: function() {
                    return [].concat(this._constraints)
                }
            }
        }), kt.behavior("sweep-prune", function(e) {
            var r = 1,
                p = {
                    x: 0,
                    y: 1
                };
            return {
                init: function(t) {
                    e.init.call(this, t), this.clear()
                },
                clear: function() {
                    for (var t in this.tracked = [], this.pairs = [], this.intervalLists = {}, p) this.intervalLists[t] = []
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
                    var t, e, n, i, o, r, s, a, c;
                    for (var l in p)
                        for (n = 0, e = (t = this.intervalLists[l]).length, c = p[l]; ++n < e;) {
                            for (r = (o = t[n]).val.get(c), a = (s = t[(i = n) - 1]) && s.val.get(c); 0 < i && (r < a || a === r && s.type && !o.type);) t[i] = s, a = (s = t[--i - 1]) && s.val.get(c);
                            t[i] = o
                        }
                },
                getPair: function(t, e, n) {
                    var i, o, r = (i = t.id) !== (o = e.id) && (o < i ? i << 16 | 65535 & o : o << 16 | 65535 & i);
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
                    var t, e, n, i, o, r, s, a, c, l = p.z || p.y || p.x,
                        u = [],
                        h = 0,
                        d = [];
                    for (var f in p)
                        for (t = "x" === f, s = -1, r = (o = this.intervalLists[f]).length; ++s < r;)
                            if (e = (i = o[s]).tracker, i.type)
                                for (a = h; 0 <= --a;)(n = u[a]) === e ? (a < h - 1 ? u[a] = u.pop() : u.pop(), h--) : (c = this.getPair(e, n, t)) && (c.flag = t ? 0 : c.flag + 1, c.flag === l && d.push(c));
                            else h = u.push(e);
                    return d
                },
                updateIntervals: function() {
                    for (var t, e, n = kt.scratchpad(), i = n.vector(), o = n.vector(), r = this.tracked, s = r.length; 0 <= --s;) e = (t = r[s]).interval, i.clone(t.body.state.pos), o.clone(t.body.aabb()), e.min.val.clone(i).vsub(o), e.max.val.clone(i).vadd(o);
                    n.done()
                },
                trackBody: function(t) {
                    var e = t.body,
                        n = {
                            id: r++,
                            body: e
                        },
                        i = {
                            min: {
                                type: !1,
                                val: kt.vector(),
                                tracker: n
                            },
                            max: {
                                type: !0,
                                val: kt.vector(),
                                tracker: n
                            }
                        };
                    for (var o in n.interval = i, this.tracked.push(n), p) this.intervalLists[o].push(i.min, i.max)
                },
                untrackBody: function(t) {
                    for (var e, n, i, o, r = t.body, s = this.tracked, a = 0, c = s.length; a < c; ++a)
                        if ((i = s[a]).body === r) {
                            for (var l in s.splice(a, 1), p)
                                for (var u = o = 0, h = (e = this.intervalLists[l]).length; u < h; ++u)
                                    if ((n = e[u]) === i.interval.min || n === i.interval.max) {
                                        if (e.splice(u, 1), u--, c--, 0 < o) break;
                                        o++
                                    } break
                        }
                },
                sweep: function(t) {
                    var e;
                    t.bodies, t.dt, (e = this.broadPhase()).length && this._world.publish({
                        topic: "collisions:candidates",
                        candidates: e
                    })
                }
            }
        }), kt.behavior("verlet-constraints", function(e) {
            var u = 2 * Math.PI,
                n = {
                    iterations: 2
                };
            return {
                init: function(t) {
                    e.init.call(this, t), kt.util.extend(this.options, n, t), this._distanceConstraints = [], this._angleConstraints = []
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
                distanceConstraint: function(t, e, n, i) {
                    var o;
                    return !(!t || !e) && ((o = {
                        id: kt.util.uniqueId("dis-constraint"),
                        type: "dis",
                        bodyA: t,
                        bodyB: e,
                        stiffness: n || .5,
                        targetLength: i || e.state.pos.dist(t.state.pos)
                    }).targetLengthSq = o.targetLength * o.targetLength, this._distanceConstraints.push(o), o)
                },
                angleConstraint: function(t, e, n, i, o) {
                    var r;
                    return !(!t || !e) && (r = {
                        id: kt.util.uniqueId("ang-constraint"),
                        type: "ang",
                        bodyA: t,
                        bodyB: e,
                        bodyC: n,
                        stiffness: i || .5,
                        targetAngle: o || e.state.pos.angle2(t.state.pos, n.state.pos)
                    }, this._angleConstraints.push(r), r)
                },
                remove: function(t) {
                    var e, n, i, o;
                    if (e = "ang" === ((n = kt.util.isObject(t)) ? t.type : t.substr(0, 3)) ? this._angleConstraints : this._distanceConstraints, n) {
                        for (i = 0, o = e.length; i < o; ++i)
                            if (e[i] === t) return e.splice(i, 1), this
                    } else
                        for (i = 0, o = e.length; i < o; ++i)
                            if (e[i].id === t) return e.splice(i, 1), this;
                    return this
                },
                resolveAngleConstraints: function(t) {
                    for (var e, n, i, o, r = this._angleConstraints, s = kt.scratchpad(), a = s.transform(), c = 0, l = r.length; c < l; ++c)(i = (n = (e = r[c]).bodyB.state.pos.angle2(e.bodyA.state.pos, e.bodyC.state.pos)) - e.targetAngle) && (i <= -Math.PI ? i += u : i >= Math.PI && (i -= u), a.setTranslation(e.bodyB.state.pos), i *= -t * e.stiffness, e.bodyA.fixed || e.bodyB.fixed || e.bodyC.fixed || (o = 1 / (e.bodyA.mass + e.bodyB.mass + e.bodyC.mass)), e.bodyA.fixed || (n = e.bodyB.fixed || e.bodyC.fixed ? e.bodyB.fixed ? i * e.bodyC.mass / (e.bodyC.mass + e.bodyA.mass) : i * e.bodyB.mass / (e.bodyB.mass + e.bodyA.mass) : i * (e.bodyB.mass + e.bodyC.mass) * o, a.setRotation(n), e.bodyA.state.pos.translateInv(a), e.bodyA.state.pos.rotate(a), e.bodyA.state.pos.translate(a)), e.bodyC.fixed || (n = e.bodyA.fixed || e.bodyB.fixed ? e.bodyB.fixed ? -i * e.bodyA.mass / (e.bodyC.mass + e.bodyA.mass) : -i * e.bodyB.mass / (e.bodyB.mass + e.bodyC.mass) : -i * (e.bodyB.mass + e.bodyA.mass) * o, a.setRotation(n), e.bodyC.state.pos.translateInv(a), e.bodyC.state.pos.rotate(a), e.bodyC.state.pos.translate(a)), e.bodyB.fixed || (n = e.bodyA.fixed || e.bodyC.fixed ? e.bodyA.fixed ? i * e.bodyC.mass / (e.bodyC.mass + e.bodyB.mass) : i * e.bodyA.mass / (e.bodyA.mass + e.bodyC.mass) : i * (e.bodyA.mass + e.bodyC.mass) * o, a.setRotation(n).setTranslation(e.bodyA.state.pos), e.bodyB.state.pos.translateInv(a), e.bodyB.state.pos.rotate(a), e.bodyB.state.pos.translate(a), a.setTranslation(e.bodyC.state.pos), e.bodyB.state.pos.translateInv(a), e.bodyB.state.pos.rotateInv(a), e.bodyB.state.pos.translate(a)));
                    s.done()
                },
                resolveDistanceConstraints: function(t) {
                    for (var e, n, i, o, r = this._distanceConstraints, s = kt.scratchpad(), a = s.vector(), c = 0, l = r.length; c < l; ++c) e = r[c], a.clone(e.bodyB.state.pos).vsub(e.bodyA.state.pos), n = a.normSq() || 1e-4 * Math.random(), i = t * e.stiffness * (n - e.targetLengthSq) / n, a.mult(i), o = e.bodyA.fixed || e.bodyB.fixed ? 1 : e.bodyB.mass / (e.bodyA.mass + e.bodyB.mass), e.bodyA.fixed || (e.bodyB.fixed || a.mult(o), e.bodyA.state.pos.vadd(a), e.bodyB.fixed || a.mult(1 / o)), e.bodyB.fixed || (e.bodyA.fixed || a.mult(1 - o), e.bodyB.state.pos.vsub(a));
                    s.done()
                },
                shuffleConstraints: function() {
                    this._distanceConstraints = kt.util.shuffle(this._distanceConstraints), this._angleConstraints = kt.util.shuffle(this._angleConstraints)
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
        }), kt.integrator("improved-euler", function(e) {
            return {
                init: function(t) {
                    e.init.call(this, t)
                },
                integrateVelocities: function(t, e) {
                    for (var n, i = 1 - this.options.drag, o = null, r = 0, s = t.length; r < s; ++r) n = (o = t[r]).state, o.fixed ? (n.vel.zero(), n.acc.zero(), n.angular.vel = 0) : (n.old.vel.clone(n.vel), n.old.acc.clone(n.acc), n.vel.vadd(n.acc.mult(e)), i && n.vel.mult(i), n.acc.zero(), n.old.angular.vel = n.angular.vel, n.angular.vel += n.angular.acc * e), n.angular.acc = 0
                },
                integratePositions: function(t, e) {
                    for (var n, i = .5 * e * e, o = null, r = kt.scratchpad(), s = r.vector(), a = 0, c = t.length; a < c; ++a) n = (o = t[a]).state, o.fixed || (n.old.pos.clone(n.pos), s.clone(n.old.vel), n.pos.vadd(s.mult(e)).vadd(n.old.acc.mult(i)), n.old.acc.zero(), n.old.angular.pos = n.angular.pos, n.angular.pos += n.old.angular.vel * e + n.old.angular.acc * i, n.old.angular.acc = 0);
                    r.done()
                }
            }
        }), kt.renderer("canvas", function(i) {
            function o(t, e) {
                var n = document.createElement(t || "div");
                return e && (n.innerHTML = e), n
            }
            var r = 2 * Math.PI,
                s = {
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
                a = function(t, e) {
                    return kt.util.isPlainObject(e) ? kt.util.extend({}, t, e, a) : void 0 !== e ? e : t
                };
            return {
                init: function(t) {
                    if (i.init.call(this, t), this.options = kt.util.extend({}, s, this.options, a), this.options.offset = kt.vector(this.options.offset), this.hiddenCanvas = document.createElement("canvas"), this.hiddenCanvas.width = this.hiddenCanvas.height = 100, !this.hiddenCanvas.getContext) throw "Canvas not supported";
                    this.hiddenCtx = this.hiddenCanvas.getContext("2d");
                    var e = this.el;
                    if ("CANVAS" !== e.nodeName.toUpperCase() && (e = document.createElement("canvas"), this.el.appendChild(e), this.el = e), e.width = this.options.width, e.height = this.options.height, this.ctx = e.getContext("2d"), this.els = {}, this.options.meta) {
                        var n = this.options.metaEl || o();
                        n.className = "pjs-meta", this.els.fps = o("span"), this.els.ipf = o("span"), n.appendChild(o("span", "fps: ")), n.appendChild(this.els.fps), n.appendChild(o("br")), n.appendChild(o("span", "ipf: ")), n.appendChild(this.els.ipf), e.parentNode.insertBefore(n, e)
                    }
                },
                setStyle: function(t, e) {
                    e = e || this.ctx, kt.util.isObject(t) ? (e.strokeStyle = t.strokeStyle, e.fillStyle = t.fillStyle, e.lineWidth = t.lineWidth) : (e.fillStyle = e.strokeStyle = t, e.lineWidth = 1)
                },
                drawCircle: function(t, e, n, i, o) {
                    (o = o || this.ctx).beginPath(), this.setStyle(i, o), o.arc(t, e, n, 0, r, !1), o.closePath(), o.stroke(), o.fill()
                },
                drawPolygon: function(t, e, n) {
                    var i = t[0],
                        o = void 0 === i.x ? i.get(0) : i.x,
                        r = void 0 === i.y ? i.get(1) : i.y,
                        s = t.length;
                    (n = n || this.ctx).beginPath(), this.setStyle(e, n), n.moveTo(o, r);
                    for (var a = 1; a < s; ++a) o = void 0 === (i = t[a]).x ? i.get(0) : i.x, r = void 0 === i.y ? i.get(1) : i.y, n.lineTo(o, r);
                    2 < s && n.closePath(), n.stroke(), n.fill()
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
        }), kt.renderer("dom", function(i) {
            function o(t, e) {
                var n = document.createElement(t || "div");
                return e && (n.innerHTML = e), n
            }
            var r = {},
                s = document.createElement("div"),
                a = "px",
                c = function(t) {
                    if (r[t]) return r[t];
                    for (var e, n = ["Webkit", "Moz", "Ms", "O"], i = 0, o = n.length; i < o; ++i)
                        if ((e = n[i] + t.replace(/(?:^|\s)\w/g, function(t) {
                                return t.toUpperCase()
                            })) in s.style) return r[t] = e;
                    return e in s.style && (r[t] = t)
                }("transform");
            return {
                init: function(t) {
                    i.init.call(this, t);
                    var e = this.el;
                    if (e.style.position = "relative", e.style.overflow = "hidden", e.style.width = this.options.width + a, e.style.height = this.options.height + a, this.els = {}, t.meta) {
                        var n = o();
                        n.className = "pjs-meta", this.els.fps = o("span"), this.els.ipf = o("span"), n.appendChild(o("span", "fps: ")), n.appendChild(this.els.fps), n.appendChild(o("br")), n.appendChild(o("span", "ipf: ")), n.appendChild(this.els.ipf), e.appendChild(n)
                    }
                },
                circleProperties: function(t, e) {
                    var n = e.aabb();
                    t.style.width = 2 * n.halfWidth + a, t.style.height = 2 * n.halfHeight + a, t.style.marginLeft = -n.halfWidth + a, t.style.marginTop = -n.halfHeight + a
                },
                createView: function(t) {
                    var e = o(),
                        n = t.name + "Properties";
                    return e.className = "pjs-" + t.name, e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", this[n] && this[n](e, t), this.el.appendChild(e), e
                },
                drawMeta: function(t) {
                    this.els.fps.innerHTML = t.fps.toFixed(2), this.els.ipf.innerHTML = t.ipf
                },
                drawBody: c ? function(t, e) {
                    var n = t.state.pos;
                    e.style[c] = "translate(" + n.get(0) + "px," + n.get(1) + "px) rotate(" + t.state.angular.pos + "rad)"
                } : function(t, e) {
                    var n = t.state.pos;
                    e.style.left = n.get(0) + a, e.style.top = n.get(1) + a
                }
            }
        }), kt;

    function P(t, e) {
        if (!(this instanceof P)) return new P(t, e);
        this._ = m ? new Float64Array(5) : [], t && (void 0 !== t.x || t._ && t._.length) ? this.clone(t) : (this.recalc = !0, this.set(t || 0, e || 0))
    }

    function I(t) {
        var e = B;
        if (A) {
            x.requestAnimationFrame(I);
            for (var n = 0, i = e.length; n < i; ++n) e[n](t, t - w);
            w = t
        }
    }
});

/*
JSON STUFF:
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