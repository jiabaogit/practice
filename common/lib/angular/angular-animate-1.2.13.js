/*
 AngularJS v1.2.13
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
 */
(function (z, f, T) {
    'use strict';
    f.module("ngAnimate", ["ng"]).factory("$$animateReflow", ["$window", "$timeout", "$document", function (f, h, d) {
        var n = f.requestAnimationFrame || f.webkitRequestAnimationFrame || function (d) {
                return h(d, 10, !1)
            }, w = f.cancelAnimationFrame || f.webkitCancelAnimationFrame || function (d) {
                return h.cancel(d)
            };
        return function (d) {
            var f = n(function () {
                d()
            });
            return function () {
                w(f)
            }
        }
    }]).factory("$$asyncQueueBuffer", ["$timeout", function (f) {
        var h, d = [];
        return function (n) {
            f.cancel(h);
            d.push(n);
            h = f(function () {
                for (var f =
                    0; f < d.length; f++)d[f]();
                d = []
            }, 0, !1)
        }
    }]).config(["$provide", "$animateProvider", function ($, h) {
        function d(d) {
            for (var f = 0; f < d.length; f++) {
                var l = d[f];
                if (l.nodeType == da)return l
            }
        }

        function n(l) {
            return f.element(d(l))
        }

        var w = f.noop, D = f.forEach, ia = h.$$selectors, da = 1, l = "$$ngAnimateState", U = "ng-animate", s = {running: !0};
        $.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncQueueBuffer", "$rootScope", "$document", function (x, z, ca, F, J, B, T) {
            function V(a) {
                if (a) {
                    var c = [], e = {};
                    a = a.substr(1).split(".");
                    (ca.transitions || ca.animations) && a.push("");
                    for (var A = 0; A < a.length; A++) {
                        var d = a[A], f = ia[d];
                        f && !e[d] && (c.push(z.get(f)), e[d] = !0)
                    }
                    return c
                }
            }

            function t(a, c, e, d, k, C, s) {
                function t(b) {
                    var g = e.data(l);
                    b = b || !g || !g.active[c] || m && g.active[c].event != a;
                    K();
                    !0 === b ? G() : (g.active[c].done = G, n(L, "after", G))
                }

                function n(b, g, ja) {
                    "after" == g ? H() : x();
                    var fa = g + "End";
                    D(b, function (d, f) {
                        var A = function () {
                            a:{
                                var a = g + "Complete", c = b[f];
                                c[a] = !0;
                                (c[fa] || w)();
                                for (c = 0; c < b.length; c++)if (!b[c][a])break a;
                                ja()
                            }
                        };
                        "before" != g || "enter" !=
                        a && "move" != a ? d[g] ? d[fa] = F ? d[g](e, E, z, A) : m ? d[g](e, c, A) : d[g](e, A) : A() : A()
                    })
                }

                function h(b) {
                    var g = "$animate:" + b;
                    u && (u[g] && 0 < u[g].length) && J(function () {
                        e.triggerHandler(g, {event: a, className: c})
                    })
                }

                function x() {
                    h("before")
                }

                function H() {
                    h("after")
                }

                function B() {
                    h("close");
                    s && J(function () {
                        s()
                    })
                }

                function K() {
                    K.hasBeenRun || (K.hasBeenRun = !0, C())
                }

                function G() {
                    if (!G.hasBeenRun) {
                        G.hasBeenRun = !0;
                        var b = e.data(l);
                        b && (m ? M(e, c) : (J(function () {
                            var b = e.data(l) || {};
                            Q == b.index && M(e, c, a)
                        }), e.data(l, b)));
                        B()
                    }
                }

                var E, z, F = "setClass" ==
                    a;
                F && (E = c[0], z = c[1], c = E + " " + z);
                var v, y = e[0];
                y && (v = y.className, v = v + " " + c);
                if (y && W(v)) {
                    var u = f.element._data(y), u = u && u.events, y = (" " + v).replace(/\s+/g, ".");
                    d || (d = k ? k.parent() : e.parent());
                    var q = V(y), m = "addClass" == a || "removeClass" == a || F, I = e.data(l) || {};
                    k = I.active || {};
                    y = I.totalActive || 0;
                    v = I.last;
                    if (R(e, d) || 0 === q.length)K(), x(), H(), G(); else {
                        var L = [];
                        m && (I.disabled || v && !v.classBased) || D(q, function (b) {
                            if (!b.allowCancel || b.allowCancel(e, a, c)) {
                                var g = b[a];
                                "leave" == a ? (b = g, g = null) : b = b["before" + a.charAt(0).toUpperCase() +
                                a.substr(1)];
                                L.push({before: b, after: g})
                            }
                        });
                        if (0 === L.length)K(), x(), H(), B(); else {
                            d = !1;
                            if (0 < y) {
                                q = [];
                                if (m)"setClass" == v.event ? (q.push(v), M(e, c)) : k[c] && (N = k[c], N.event == a ? d = !0 : (q.push(N), M(e, c))); else if ("leave" == a && k["ng-leave"])d = !0; else {
                                    for (var N in k)q.push(k[N]), M(e, N);
                                    k = {};
                                    y = 0
                                }
                                0 < q.length && f.forEach(q, function (b) {
                                    (b.done || w)(!0);
                                    X(b.animations)
                                })
                            }
                            !m || (F || d) || (d = "addClass" == a == e.hasClass(c));
                            if (d)x(), H(), B(); else {
                                e.addClass(U);
                                var Q = S++;
                                v = {classBased: m, event: a, animations: L, done: t};
                                y++;
                                k[c] = v;
                                e.data(l,
                                    {last: v, active: k, index: Q, totalActive: y});
                                n(L, "before", t)
                            }
                        }
                    }
                } else K(), x(), H(), B()
            }

            function Y(a) {
                a = d(a);
                D(a.querySelectorAll("." + U), function (a) {
                    a = f.element(a);
                    (a = a.data(l)) && a.active && f.forEach(a.active, function (a) {
                        (a.done || w)(!0);
                        X(a.animations)
                    })
                })
            }

            function X(a) {
                D(a, function (a) {
                    a.beforeComplete || (a.beforeEnd || w)(!0);
                    a.afterComplete || (a.afterEnd || w)(!0)
                })
            }

            function M(a, c) {
                if (d(a) == d(F))s.disabled || (s.running = !1, s.structural = !1); else if (c) {
                    var e = a.data(l) || {}, f = !0 === c;
                    !f && (e.active && e.active[c]) && (e.totalActive--,
                        delete e.active[c]);
                    if (f || !e.totalActive)a.removeClass(U), a.removeData(l)
                }
            }

            function R(a, c) {
                if (s.disabled)return !0;
                if (d(a) == d(F))return s.disabled || s.running;
                do {
                    if (0 === c.length)break;
                    var e = d(c) == d(F), f = e ? s : c.data(l), f = f && (!!f.disabled || f.running || 0 < f.totalActive);
                    if (e || f)return f;
                    if (e)break
                } while (c = c.parent());
                return !0
            }

            var S = 0;
            F.data(l, s);
            B.$$postDigest(function () {
                B.$$postDigest(function () {
                    s.running = !1
                })
            });
            var Z = h.classNameFilter(), W = Z ? function (a) {
                return Z.test(a)
            } : function () {
                return !0
            };
            return {
                enter: function (a,
                                 c, e, d) {
                    this.enabled(!1, a);
                    x.enter(a, c, e);
                    B.$$postDigest(function () {
                        a = n(a);
                        t("enter", "ng-enter", a, c, e, w, d)
                    })
                }, leave: function (a, c) {
                    Y(a);
                    this.enabled(!1, a);
                    B.$$postDigest(function () {
                        a = n(a);
                        t("leave", "ng-leave", a, null, null, function () {
                            x.leave(a)
                        }, c)
                    })
                }, move: function (a, c, e, d) {
                    Y(a);
                    this.enabled(!1, a);
                    x.move(a, c, e);
                    B.$$postDigest(function () {
                        a = n(a);
                        t("move", "ng-move", a, c, e, w, d)
                    })
                }, addClass: function (a, c, d) {
                    a = n(a);
                    t("addClass", c, a, null, null, function () {
                        x.addClass(a, c)
                    }, d)
                }, removeClass: function (a, c, d) {
                    a = n(a);
                    t("removeClass", c, a, null, null, function () {
                        x.removeClass(a, c)
                    }, d)
                }, setClass: function (a, c, d, f) {
                    a = n(a);
                    t("setClass", [c, d], a, null, null, function () {
                        x.setClass(a, c, d)
                    }, f)
                }, enabled: function (a, c) {
                    switch (arguments.length) {
                        case 2:
                            if (a)M(c); else {
                                var d = c.data(l) || {};
                                d.disabled = !0;
                                c.data(l, d)
                            }
                            break;
                        case 1:
                            s.disabled = !a;
                            break;
                        default:
                            a = !s.disabled
                    }
                    return !!a
                }
            }
        }]);
        h.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function (l, s, h, n) {
            function J(b, g) {
                I && I();
                m.push(g);
                I = n(function () {
                    D(m, function (b) {
                        b()
                    });
                    m = [];
                    I = null;
                    u = {}
                })
            }

            function B(b, g) {
                var a = Date.now() + 1E3 * g;
                if (!(a <= N)) {
                    h.cancel(L);
                    var c = d(b);
                    b = f.element(c);
                    Q.push(b);
                    N = a;
                    L = h(function () {
                        U(Q);
                        Q = []
                    }, g, !1)
                }
            }

            function U(b) {
                D(b, function (b) {
                    (b = b.data(E)) && (b.closeAnimationFn || w)()
                })
            }

            function V(b, g) {
                var a = g ? u[g] : null;
                if (!a) {
                    var c = 0, d = 0, f = 0, e = 0, k, p, r, h;
                    D(b, function (b) {
                        if (b.nodeType == da) {
                            b = l.getComputedStyle(b) || {};
                            r = b[O + ea];
                            c = Math.max(t(r), c);
                            h = b[O + H];
                            k = b[O + ha];
                            d = Math.max(t(k), d);
                            p = b[P + ha];
                            e = Math.max(t(p), e);
                            var g = t(b[P + ea]);
                            0 < g && (g *= parseInt(b[P + K], 10) ||
                                1);
                            f = Math.max(g, f)
                        }
                    });
                    a = {
                        total: 0,
                        transitionPropertyStyle: h,
                        transitionDurationStyle: r,
                        transitionDelayStyle: k,
                        transitionDelay: d,
                        transitionDuration: c,
                        animationDelayStyle: p,
                        animationDelay: e,
                        animationDuration: f
                    };
                    g && (u[g] = a)
                }
                return a
            }

            function t(b) {
                var g = 0;
                b = f.isString(b) ? b.split(/\s*,\s*/) : [];
                D(b, function (b) {
                    g = Math.max(parseFloat(b) || 0, g)
                });
                return g
            }

            function Y(b) {
                var g = b.parent(), a = g.data(G);
                a || (g.data(G, ++q), a = q);
                return a + "-" + d(b).className
            }

            function X(b, g, a, c) {
                var e = Y(g), k = e + " " + a, l = u[k] ? ++u[k].total :
                    0, h = {};
                if (0 < l) {
                    var p = a + "-stagger", h = e + " " + p;
                    (e = !u[h]) && g.addClass(p);
                    h = V(g, h);
                    e && g.removeClass(p)
                }
                c = c || function (b) {
                        return b()
                    };
                g.addClass(a);
                var p = g.data(E) || {}, r = c(function () {
                    return V(g, k)
                });
                c = r.transitionDuration;
                e = r.animationDuration;
                if (0 === c && 0 === e)return g.removeClass(a), !1;
                g.data(E, {running: p.running || 0, itemIndex: l, stagger: h, timings: r, closeAnimationFn: f.noop});
                b = 0 < p.running || "setClass" == b;
                0 < c && M(g, a, b);
                0 < e && (d(g).style[P] = "none 0s");
                return !0
            }

            function M(b, a, c) {
                "ng-enter" != a && ("ng-move" != a && "ng-leave" !=
                a) && c ? b.addClass(ga) : d(b).style[O + H] = "none"
            }

            function R(b, a) {
                var c = O + H, e = d(b);
                e.style[c] && 0 < e.style[c].length && (e.style[c] = "");
                b.removeClass(ga)
            }

            function S(b) {
                var a = P;
                b = d(b);
                b.style[a] && 0 < b.style[a].length && (b.style[a] = "")
            }

            function Z(b, a, c, e) {
                function f(b) {
                    a.off(w, k);
                    a.removeClass(l);
                    A(a, c);
                    b = d(a);
                    for (var e in q)b.style.removeProperty(q[e])
                }

                function k(b) {
                    b.stopPropagation();
                    var a = b.originalEvent || b;
                    b = a.$manualTimeStamp || a.timeStamp || Date.now();
                    a = parseFloat(a.elapsedTime.toFixed($));
                    Math.max(b - x, 0) >=
                    u && a >= s && e()
                }

                var h = d(a);
                b = a.data(E);
                if (-1 != h.className.indexOf(c) && b) {
                    var l = "";
                    D(c.split(" "), function (b, a) {
                        l += (0 < a ? " " : "") + b + "-active"
                    });
                    var p = b.stagger, r = b.timings, n = b.itemIndex, s = Math.max(r.transitionDuration, r.animationDuration), t = Math.max(r.transitionDelay, r.animationDelay), u = t * y, x = Date.now(), w = ba + " " + aa, m = "", q = [];
                    if (0 < r.transitionDuration) {
                        var z = r.transitionPropertyStyle;
                        -1 == z.indexOf("all") && (m += C + "transition-property: " + z + ";", m += C + "transition-duration: " + r.transitionDurationStyle + ";", q.push(C +
                            "transition-property"), q.push(C + "transition-duration"))
                    }
                    0 < n && (0 < p.transitionDelay && 0 === p.transitionDuration && (m += C + "transition-delay: " + W(r.transitionDelayStyle, p.transitionDelay, n) + "; ", q.push(C + "transition-delay")), 0 < p.animationDelay && 0 === p.animationDuration && (m += C + "animation-delay: " + W(r.animationDelayStyle, p.animationDelay, n) + "; ", q.push(C + "animation-delay")));
                    0 < q.length && (r = h.getAttribute("style") || "", h.setAttribute("style", r + " " + m));
                    a.on(w, k);
                    a.addClass(l);
                    b.closeAnimationFn = function () {
                        f();
                        e()
                    };
                    h = (n * (Math.max(p.animationDelay, p.transitionDelay) || 0) + (t + s) * v) * y;
                    b.running++;
                    B(a, h);
                    return f
                }
                e()
            }

            function W(b, a, c) {
                var d = "";
                D(b.split(","), function (b, e) {
                    d += (0 < e ? "," : "") + (c * a + parseInt(b, 10)) + "s"
                });
                return d
            }

            function a(b, a, c, d) {
                if (X(b, a, c, d))return function (b) {
                    b && A(a, c)
                }
            }

            function c(b, a, c, d) {
                if (a.data(E))return Z(b, a, c, d);
                A(a, c);
                d()
            }

            function e(b, g, d, e) {
                var f = a(b, g, d);
                if (f) {
                    var h = f;
                    J(g, function () {
                        R(g, d);
                        S(g);
                        h = c(b, g, d, e)
                    });
                    return function (b) {
                        (h || w)(b)
                    }
                }
                e()
            }

            function A(b, a) {
                b.removeClass(a);
                var c =
                    b.data(E);
                c && (c.running && c.running--, c.running && 0 !== c.running || b.removeData(E))
            }

            function k(b, a) {
                var c = "";
                b = f.isArray(b) ? b : b.split(/\s+/);
                D(b, function (b, d) {
                    b && 0 < b.length && (c += (0 < d ? " " : "") + b + a)
                });
                return c
            }

            var C = "", O, aa, P, ba;
            z.ontransitionend === T && z.onwebkittransitionend !== T ? (C = "-webkit-", O = "WebkitTransition", aa = "webkitTransitionEnd transitionend") : (O = "transition", aa = "transitionend");
            z.onanimationend === T && z.onwebkitanimationend !== T ? (C = "-webkit-", P = "WebkitAnimation", ba = "webkitAnimationEnd animationend") :
                (P = "animation", ba = "animationend");
            var ea = "Duration", H = "Property", ha = "Delay", K = "IterationCount", G = "$$ngAnimateKey", E = "$$ngAnimateCSS3Data", ga = "ng-animate-block-transitions", $ = 3, v = 1.5, y = 1E3, u = {}, q = 0, m = [], I, L = null, N = 0, Q = [];
            return {
                enter: function (b, a) {
                    return e("enter", b, "ng-enter", a)
                }, leave: function (b, a) {
                    return e("leave", b, "ng-leave", a)
                }, move: function (a, c) {
                    return e("move", a, "ng-move", c)
                }, beforeSetClass: function (b, c, d, e) {
                    var f = k(d, "-remove") + " " + k(c, "-add"), h = a("setClass", b, f, function (a) {
                        var e = b.attr("class");
                        b.removeClass(d);
                        b.addClass(c);
                        a = a();
                        b.attr("class", e);
                        return a
                    });
                    if (h)return J(b, function () {
                        R(b, f);
                        S(b);
                        e()
                    }), h;
                    e()
                }, beforeAddClass: function (b, c, d) {
                    var e = a("addClass", b, k(c, "-add"), function (a) {
                        b.addClass(c);
                        a = a();
                        b.removeClass(c);
                        return a
                    });
                    if (e)return J(b, function () {
                        R(b, c);
                        S(b);
                        d()
                    }), e;
                    d()
                }, setClass: function (a, d, e, f) {
                    e = k(e, "-remove");
                    d = k(d, "-add");
                    return c("setClass", a, e + " " + d, f)
                }, addClass: function (a, d, e) {
                    return c("addClass", a, k(d, "-add"), e)
                }, beforeRemoveClass: function (b, c, d) {
                    var e = a("removeClass",
                        b, k(c, "-remove"), function (a) {
                            var d = b.attr("class");
                            b.removeClass(c);
                            a = a();
                            b.attr("class", d);
                            return a
                        });
                    if (e)return J(b, function () {
                        R(b, c);
                        S(b);
                        d()
                    }), e;
                    d()
                }, removeClass: function (a, d, e) {
                    return c("removeClass", a, k(d, "-remove"), e)
                }
            }
        }])
    }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map