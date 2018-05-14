"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  "function" == typeof define && define.amd ? define(function () {
    return e(t);
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie);
}(window || {}, function (window) {
  "use strict";
  function ProjectInterface() {
    return {};
  }function roundValues(t) {
    bm_rnd = t ? Math.round : function (t) {
      return t;
    };
  }function styleDiv(t) {
    t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d";
  }function BMEnterFrameEvent(t, e, i, r) {
    this.type = t, this.currentTime = e, this.totalTime = i, this.direction = r < 0 ? -1 : 1;
  }function BMCompleteEvent(t, e) {
    this.type = t, this.direction = e < 0 ? -1 : 1;
  }function BMCompleteLoopEvent(t, e, i, r) {
    this.type = t, this.currentLoop = i, this.totalLoops = e, this.direction = r < 0 ? -1 : 1;
  }function BMSegmentStartEvent(t, e, i) {
    this.type = t, this.firstFrame = e, this.totalFrames = i;
  }function BMDestroyEvent(t, e) {
    this.type = t, this.target = e;
  }function randomString(t, e) {
    void 0 === e && (e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");var i,
        r = "";for (i = t; i > 0; --i) {
      r += e[Math.round(Math.random() * (e.length - 1))];
    }return r;
  }function HSVtoRGB(t, e, i) {
    var r, s, a, n, o, h, l, p;switch (n = Math.floor(6 * t), o = 6 * t - n, h = i * (1 - e), l = i * (1 - o * e), p = i * (1 - (1 - o) * e), n % 6) {case 0:
        r = i, s = p, a = h;break;case 1:
        r = l, s = i, a = h;break;case 2:
        r = h, s = i, a = p;break;case 3:
        r = h, s = l, a = i;break;case 4:
        r = p, s = h, a = i;break;case 5:
        r = i, s = h, a = l;}return [r, s, a];
  }function RGBtoHSV(t, e, i) {
    var r,
        s = Math.max(t, e, i),
        a = Math.min(t, e, i),
        n = s - a,
        o = 0 === s ? 0 : n / s,
        h = s / 255;switch (s) {case a:
        r = 0;break;case t:
        r = e - i + n * (e < i ? 6 : 0), r /= 6 * n;break;case e:
        r = i - t + 2 * n, r /= 6 * n;break;case i:
        r = t - e + 4 * n, r /= 6 * n;}return [r, o, h];
  }function addSaturationToRGB(t, e) {
    var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);return i[1] += e, i[1] > 1 ? i[1] = 1 : i[1] <= 0 && (i[1] = 0), HSVtoRGB(i[0], i[1], i[2]);
  }function addBrightnessToRGB(t, e) {
    var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);return i[2] += e, i[2] > 1 ? i[2] = 1 : i[2] < 0 && (i[2] = 0), HSVtoRGB(i[0], i[1], i[2]);
  }function addHueToRGB(t, e) {
    var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);return i[0] += e / 360, i[0] > 1 ? i[0] -= 1 : i[0] < 0 && (i[0] += 1), HSVtoRGB(i[0], i[1], i[2]);
  }function BaseEvent() {}function createSizedArray(t) {
    return Array.apply(null, { length: t });
  }function createNS(t) {
    return document.createElementNS(svgNS, t);
  }function createTag(t) {
    return document.createElement(t);
  }function extendPrototype(t, e) {
    var i,
        r,
        s = t.length;for (i = 0; i < s; i += 1) {
      r = t[i].prototype;for (var a in r) {
        r.hasOwnProperty(a) && (e.prototype[a] = r[a]);
      }
    }
  }function getDescriptor(t, e) {
    return Object.getOwnPropertyDescriptor(t, e);
  }function createProxyFunction(t) {
    function e() {}return e.prototype = t, e;
  }function bezFunction() {
    function t(t, e, i, r, s, a) {
      var n = t * r + e * s + i * a - s * r - a * t - i * e;return n > -1e-4 && n < 1e-4;
    }function e(e, i, r, s, a, n, o, h, l) {
      if (0 === r && 0 === n && 0 === l) return t(e, i, s, a, o, h);var p,
          m = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - i, 2) + Math.pow(n - r, 2)),
          f = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - i, 2) + Math.pow(l - r, 2)),
          c = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));return p = m > f ? m > c ? m - f - c : c - f - m : c > f ? c - f - m : f - m - c, p > -1e-4 && p < 1e-4;
    }function i(t) {
      var e,
          i = segments_length_pool.newElement(),
          r = t.c,
          s = t.v,
          a = t.o,
          n = t.i,
          o = t._length,
          l = i.lengths,
          p = 0;for (e = 0; e < o - 1; e += 1) {
        l[e] = h(s[e], s[e + 1], a[e], n[e + 1]), p += l[e].addedLength;
      }return r && (l[e] = h(s[e], s[0], a[e], n[0]), p += l[e].addedLength), i.totalLength = p, i;
    }function r(t) {
      this.segmentLength = 0, this.points = new Array(t);
    }function s(t, e) {
      this.partialLength = t, this.point = e;
    }function a(t, e) {
      var i = e.percents,
          r = e.lengths,
          s = i.length,
          a = bm_floor((s - 1) * t),
          n = t * e.addedLength,
          o = 0;if (a === s - 1 || 0 === a || n === r[a]) return i[a];for (var h = r[a] > n ? -1 : 1, l = !0; l;) {
        if (r[a] <= n && r[a + 1] > n ? (o = (n - r[a]) / (r[a + 1] - r[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
          if (a === s - 1) return i[a];l = !1;
        }
      }return i[a] + (i[a + 1] - i[a]) * o;
    }function n(t, e, i, r, s, n) {
      var o = a(s, n),
          h = 1 - o,
          l = Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * i[0] + (o * o * h + h * o * o + o * h * o) * r[0] + o * o * o * e[0])) / 1e3,
          p = Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * i[1] + (o * o * h + h * o * o + o * h * o) * r[1] + o * o * o * e[1])) / 1e3;return [l, p];
    }function o(t, e, i, r, s, n, o) {
      s = s < 0 ? 0 : s > 1 ? 1 : s;var h = a(s, o);n = n > 1 ? 1 : n;var l,
          m = a(n, o),
          f = t.length,
          c = 1 - h,
          d = 1 - m,
          u = c * c * c,
          y = h * c * c * 3,
          g = h * h * c * 3,
          v = h * h * h,
          b = c * c * d,
          E = h * c * d + c * h * d + c * c * m,
          P = h * h * d + c * h * m + h * c * m,
          x = h * h * m,
          S = c * d * d,
          _ = h * d * d + c * m * d + c * d * m,
          C = h * m * d + c * m * m + h * d * m,
          A = h * m * m,
          k = d * d * d,
          M = m * d * d + d * m * d + d * d * m,
          T = m * m * d + d * m * m + m * d * m,
          D = m * m * m;for (l = 0; l < f; l += 1) {
        p[4 * l] = Math.round(1e3 * (u * t[l] + y * i[l] + g * r[l] + v * e[l])) / 1e3, p[4 * l + 1] = Math.round(1e3 * (b * t[l] + E * i[l] + P * r[l] + x * e[l])) / 1e3, p[4 * l + 2] = Math.round(1e3 * (S * t[l] + _ * i[l] + C * r[l] + A * e[l])) / 1e3, p[4 * l + 3] = Math.round(1e3 * (k * t[l] + M * i[l] + T * r[l] + D * e[l])) / 1e3;
      }return p;
    }var h = (Math, function () {
      return function (t, e, i, r) {
        var s,
            a,
            n,
            o,
            h,
            l,
            p = defaultCurveSegments,
            m = 0,
            f = [],
            c = [],
            d = bezier_length_pool.newElement();for (n = i.length, s = 0; s < p; s += 1) {
          for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) {
            o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * i[a] + 3 * (1 - h) * bm_pow(h, 2) * r[a] + bm_pow(h, 3) * e[a], f[a] = o, null !== c[a] && (l += bm_pow(f[a] - c[a], 2)), c[a] = f[a];
          }l && (l = bm_sqrt(l), m += l), d.percents[s] = h, d.lengths[s] = m;
        }return d.addedLength = m, d;
      };
    }()),
        l = function () {
      var e = {};return function (i) {
        var a = i.s,
            n = i.e,
            o = i.to,
            h = i.ti,
            l = (a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1] + "_" + h[0] + "_" + h[1]).replace(/\./g, "p");if (e[l]) return void (i.bezierData = e[l]);var p,
            m,
            f,
            c,
            d,
            u,
            y,
            g = defaultCurveSegments,
            v = 0,
            b = null;2 === a.length && (a[0] != n[0] || a[1] != n[1]) && t(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && t(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) && (g = 2);var E = new r(g);for (f = o.length, p = 0; p < g; p += 1) {
          for (y = createSizedArray(f), d = p / (g - 1), u = 0, m = 0; m < f; m += 1) {
            c = bm_pow(1 - d, 3) * a[m] + 3 * bm_pow(1 - d, 2) * d * (a[m] + o[m]) + 3 * (1 - d) * bm_pow(d, 2) * (n[m] + h[m]) + bm_pow(d, 3) * n[m], y[m] = c, null !== b && (u += bm_pow(y[m] - b[m], 2));
          }u = bm_sqrt(u), v += u, E.points[p] = new s(u, y), b = y;
        }E.segmentLength = v, i.bezierData = E, e[l] = E;
      };
    }(),
        p = createTypedArray("float32", 8);return { getSegmentsLength: i, getNewSegment: o, getPointInSegment: n, buildBezierData: l, pointOnLine2D: t, pointOnLine3D: e };
  }function dataFunctionManager() {
    function t(s, a, o) {
      var h,
          l,
          p,
          m,
          f,
          c,
          d,
          u,
          y = s.length;for (m = 0; m < y; m += 1) {
        if (h = s[m], "ks" in h && !h.completed) {
          if (h.completed = !0, h.tt && (s[m - 1].td = h.tt), l = [], p = -1, h.hasMask) {
            var g = h.masksProperties;for (c = g.length, f = 0; f < c; f += 1) {
              if (g[f].pt.k.i) r(g[f].pt.k);else for (u = g[f].pt.k.length, d = 0; d < u; d += 1) {
                g[f].pt.k[d].s && r(g[f].pt.k[d].s[0]), g[f].pt.k[d].e && r(g[f].pt.k[d].e[0]);
              }
            }
          }0 === h.ty ? (h.layers = e(h.refId, a), t(h.layers, a, o)) : 4 === h.ty ? i(h.shapes) : 5 == h.ty && n(h, o);
        }
      }
    }function e(t, e) {
      for (var i = 0, r = e.length; i < r;) {
        if (e[i].id === t) return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : (e[i].layers.__used = !0, e[i].layers);i += 1;
      }
    }function i(t) {
      var e,
          s,
          a,
          n = t.length,
          o = !1;for (e = n - 1; e >= 0; e -= 1) {
        if ("sh" == t[e].ty) {
          if (t[e].ks.k.i) r(t[e].ks.k);else for (a = t[e].ks.k.length, s = 0; s < a; s += 1) {
            t[e].ks.k[s].s && r(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && r(t[e].ks.k[s].e[0]);
          }o = !0;
        } else "gr" == t[e].ty && i(t[e].it);
      }
    }function r(t) {
      var e,
          i = t.i.length;for (e = 0; e < i; e += 1) {
        t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
      }
    }function s(t, e) {
      var i = e ? e.split(".") : [100, 100, 100];return t[0] > i[0] || !(i[0] > t[0]) && (t[1] > i[1] || !(i[1] > t[1]) && (t[2] > i[2] || !(i[2] > t[2]) && void 0));
    }function a(e, i) {
      e.__complete || (l(e), o(e), h(e), p(e), t(e.layers, e.assets, i), e.__complete = !0);
    }function n(t, e) {
      0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0);
    }var o = function () {
      function t(t) {
        var e = t.t.d;t.t.d = { k: [{ s: e, t: 0 }] };
      }function e(e) {
        var i,
            r = e.length;for (i = 0; i < r; i += 1) {
          5 === e[i].ty && t(e[i]);
        }
      }var i = [4, 4, 14];return function (t) {
        if (s(i, t.v) && (e(t.layers), t.assets)) {
          var r,
              a = t.assets.length;for (r = 0; r < a; r += 1) {
            t.assets[r].layers && e(t.assets[r].layers);
          }
        }
      };
    }(),
        h = function () {
      var t = [4, 7, 99];return function (e) {
        if (e.chars && !s(t, e.v)) {
          var i,
              a,
              n,
              o,
              h,
              l = e.chars.length;for (i = 0; i < l; i += 1) {
            if (e.chars[i].data && e.chars[i].data.shapes) for (h = e.chars[i].data.shapes[0].it, n = h.length, a = 0; a < n; a += 1) {
              o = h[a].ks.k, o.__converted || (r(h[a].ks.k), o.__converted = !0);
            }
          }
        }
      };
    }(),
        l = function () {
      function t(e) {
        var i,
            r,
            s,
            a = e.length;for (i = 0; i < a; i += 1) {
          if ("gr" === e[i].ty) t(e[i].it);else if ("fl" === e[i].ty || "st" === e[i].ty) if (e[i].c.k && e[i].c.k[0].i) for (s = e[i].c.k.length, r = 0; r < s; r += 1) {
            e[i].c.k[r].s && (e[i].c.k[r].s[0] /= 255, e[i].c.k[r].s[1] /= 255, e[i].c.k[r].s[2] /= 255, e[i].c.k[r].s[3] /= 255), e[i].c.k[r].e && (e[i].c.k[r].e[0] /= 255, e[i].c.k[r].e[1] /= 255, e[i].c.k[r].e[2] /= 255, e[i].c.k[r].e[3] /= 255);
          } else e[i].c.k[0] /= 255, e[i].c.k[1] /= 255, e[i].c.k[2] /= 255, e[i].c.k[3] /= 255;
        }
      }function e(e) {
        var i,
            r = e.length;for (i = 0; i < r; i += 1) {
          4 === e[i].ty && t(e[i].shapes);
        }
      }var i = [4, 1, 9];return function (t) {
        if (s(i, t.v) && (e(t.layers), t.assets)) {
          var r,
              a = t.assets.length;for (r = 0; r < a; r += 1) {
            t.assets[r].layers && e(t.assets[r].layers);
          }
        }
      };
    }(),
        p = function () {
      function t(e) {
        var i,
            r,
            s,
            a = e.length,
            n = !1;for (i = a - 1; i >= 0; i -= 1) {
          if ("sh" == e[i].ty) {
            if (e[i].ks.k.i) e[i].ks.k.c = e[i].closed;else for (s = e[i].ks.k.length, r = 0; r < s; r += 1) {
              e[i].ks.k[r].s && (e[i].ks.k[r].s[0].c = e[i].closed), e[i].ks.k[r].e && (e[i].ks.k[r].e[0].c = e[i].closed);
            }n = !0;
          } else "gr" == e[i].ty && t(e[i].it);
        }
      }function e(e) {
        var i,
            r,
            s,
            a,
            n,
            o,
            h = e.length;for (r = 0; r < h; r += 1) {
          if (i = e[r], i.hasMask) {
            var l = i.masksProperties;for (a = l.length, s = 0; s < a; s += 1) {
              if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;else for (o = l[s].pt.k.length, n = 0; n < o; n += 1) {
                l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl);
              }
            }
          }4 === i.ty && t(i.shapes);
        }
      }var i = [4, 4, 18];return function (t) {
        if (s(i, t.v) && (e(t.layers), t.assets)) {
          var r,
              a = t.assets.length;for (r = 0; r < a; r += 1) {
            t.assets[r].layers && e(t.assets[r].layers);
          }
        }
      };
    }(),
        m = {};return m.completeData = a, m;
  }function ShapePath() {
    this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
  }function ShapeModifier() {}function TrimModifier() {}function RoundCornersModifier() {}function RepeaterModifier() {}function ShapeCollection() {
    this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
  }function DashProperty(t, e, i, r) {
    this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = i, this._mdf = !1, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length - 1), this.dashoffset = createTypedArray("float32", 1);var s,
        a,
        n = e.length;for (s = 0; s < n; s += 1) {
      a = PropertyFactory.getProp(t, e[s].v, 0, 0, r), this.k = !!a.k || this.k, this.dataProps[s] = { n: e[s].n, p: a };
    }this.k ? r.push(this) : this.getValue(!0);
  }function GradientProperty(t, e, i) {
    this.prop = PropertyFactory.getProp(t, e.k, 1, null, []), this.data = e, this.k = this.prop.k, this.c = createTypedArray("uint8c", 4 * e.p);var r = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;this.o = createTypedArray("float32", r), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = r, this.prop.k && i.push(this), this.getValue(!0);
  }function TextAnimatorProperty(t, e, i) {
    this._mdf = !1, this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._dynamicProperties = [], this._textData = t, this._renderType = e, this._elem = i, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = { alignment: {} }, this.renderedLetters = [], this.lettersChangedFlag = !1;
  }function TextAnimatorDataProperty(t, e, i) {
    var r = { propType: !1 },
        s = PropertyFactory.getProp,
        a = e.a;this.a = { r: a.r ? s(t, a.r, 0, degToRads, i) : r, rx: a.rx ? s(t, a.rx, 0, degToRads, i) : r, ry: a.ry ? s(t, a.ry, 0, degToRads, i) : r, sk: a.sk ? s(t, a.sk, 0, degToRads, i) : r, sa: a.sa ? s(t, a.sa, 0, degToRads, i) : r, s: a.s ? s(t, a.s, 1, .01, i) : r, a: a.a ? s(t, a.a, 1, 0, i) : r, o: a.o ? s(t, a.o, 0, .01, i) : r, p: a.p ? s(t, a.p, 1, 0, i) : r, sw: a.sw ? s(t, a.sw, 0, 0, i) : r, sc: a.sc ? s(t, a.sc, 1, 0, i) : r, fc: a.fc ? s(t, a.fc, 1, 0, i) : r, fh: a.fh ? s(t, a.fh, 0, 0, i) : r, fs: a.fs ? s(t, a.fs, 0, .01, i) : r, fb: a.fb ? s(t, a.fb, 0, .01, i) : r, t: a.t ? s(t, a.t, 0, 0, i) : r }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i), this.s.t = e.s.t;
  }function LetterProps(t, e, i, r, s, a) {
    this.o = t, this.sw = e, this.sc = i, this.fc = r, this.m = s, this.p = a, this._mdf = { o: !0, sw: !!e, sc: !!i, fc: !!r, m: !0, p: !0 };
  }function TextProperty(t, e, i) {
    this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !0, this.data = e, this.elem = t, this.keysIndex = -1, this.canResize = !1, this.minimumFontSize = 1, this.currentData = { ascent: 0, boxWidth: [0, 0], f: "", fStyle: "", fWeight: "", fc: "", j: "", justifyOffset: "", l: [], lh: 0, lineWidths: [], ls: "", of: "", s: "", sc: "", sw: 0, t: 0, tr: 0, sz: 0, ps: [0, 0], fillColorAnim: !1, strokeColorAnim: !1, strokeWidthAnim: !1, yOffset: 0, __complete: !1, finalSize: 0, finalText: "", finalLineHeight: 0 }, this.searchProperty() ? i.push(this) : this.getValue(!0);
  }function BaseRenderer() {}function SVGRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");var i = createNS("g");this.svgElement.appendChild(i), this.layerElement = i;var r = createNS("defs");this.svgElement.appendChild(r), this.renderConfig = { preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet", progressiveLoad: e && e.progressiveLoad || !1, hideOnTransparent: !e || e.hideOnTransparent !== !1, viewBoxOnly: e && e.viewBoxOnly || !1, viewBoxSize: e && e.viewBoxSize || !1, className: e && e.className || "" }, this.globalData = { _mdf: !1, frameNum: -1, defs: r, frameId: 0, compSize: { w: 0, h: 0 }, renderConfig: this.renderConfig, fontManager: new FontManager() }, this.elements = [], this.pendingElements = [], this.destroyed = !1;
  }function MaskElement(t, e, i, r) {
    this.data = t, this.element = e, this.globalData = i, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null, this._isFirstFrame = !0;var s,
        a = this.globalData.defs,
        n = this.masksProperties ? this.masksProperties.length : 0;this.viewData = createSizedArray(n), this.solidPath = "";var o,
        h,
        l,
        p,
        m,
        f,
        c,
        d = this.masksProperties,
        u = 0,
        y = [],
        g = randomString(10),
        v = "clipPath",
        b = "clip-path";for (s = 0; s < n; s++) {
      if (("a" !== d[s].mode && "n" !== d[s].mode || d[s].inv || 100 !== d[s].o.k) && (v = "mask", b = "mask"), "s" != d[s].mode && "i" != d[s].mode || 0 !== u ? p = null : (p = createNS("rect"), p.setAttribute("fill", "#ffffff"), p.setAttribute("width", this.element.comp.data.w), p.setAttribute("height", this.element.comp.data.h), y.push(p)), o = createNS("path"), "n" != d[s].mode) {
        u += 1, o.setAttribute("fill", "s" === d[s].mode ? "#000000" : "#ffffff"), o.setAttribute("clip-rule", "nonzero");var E;if (0 !== d[s].x.k ? (v = "mask", b = "mask", c = PropertyFactory.getProp(this.element, d[s].x, 0, null, r), E = "fi_" + randomString(10), m = createNS("filter"), m.setAttribute("id", E), f = createNS("feMorphology"), f.setAttribute("operator", "dilate"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), m.appendChild(f), a.appendChild(m), o.setAttribute("stroke", "s" === d[s].mode ? "#000000" : "#ffffff")) : (f = null, c = null), this.storedData[s] = { elem: o, x: c, expan: f, lastPath: "", lastOperator: "", filterId: E, lastRadius: 0 }, "i" == d[s].mode) {
          l = y.length;var P = createNS("g");for (h = 0; h < l; h += 1) {
            P.appendChild(y[h]);
          }var x = createNS("mask");x.setAttribute("mask-type", "alpha"), x.setAttribute("id", g + "_" + u), x.appendChild(o), a.appendChild(x), P.setAttribute("mask", "url(" + locationHref + "#" + g + "_" + u + ")"), y.length = 0, y.push(P);
        } else y.push(o);d[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[s] = { elem: o, lastPath: "", op: PropertyFactory.getProp(this.element, d[s].o, 0, .01, r), prop: ShapePropertyFactory.getShapeProp(this.element, d[s], 3, r, null), invRect: p }, this.viewData[s].prop.k || this.drawPath(d[s], this.viewData[s].prop.v, this.viewData[s]);
      } else this.viewData[s] = { op: PropertyFactory.getProp(this.element, d[s].o, 0, .01, r), prop: ShapePropertyFactory.getShapeProp(this.element, d[s], 3, r, null), elem: o }, a.appendChild(o);
    }for (this.maskElement = createNS(v), n = y.length, s = 0; s < n; s += 1) {
      this.maskElement.appendChild(y[s]);
    }u > 0 && (this.maskElement.setAttribute("id", g), this.element.maskedElement.setAttribute(b, "url(" + locationHref + "#" + g + ")"), a.appendChild(this.maskElement));
  }function HierarchyElement() {}function FrameElement() {}function TransformElement() {}function RenderableElement() {}function RenderableDOMElement() {}function ProcessedElement(t, e) {
    this.elem = t, this.pos = e;
  }function SVGStyleData(t, e) {
    this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !1, this.pElem = createNS("path"), this.msElem = null;
  }function SVGShapeData(t, e, i) {
    this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = i, this.lvl = e;
  }function SVGTransformData(t, e) {
    this.transform = { mProps: t, op: e }, this.elements = [];
  }function SVGStrokeStyleData(t, e, i, r) {
    this.o = PropertyFactory.getProp(t, e.o, 0, .01, i), this.w = PropertyFactory.getProp(t, e.w, 0, null, i), this.d = new DashProperty(t, e.d || {}, "svg", i), this.c = PropertyFactory.getProp(t, e.c, 1, 255, i), this.style = r;
  }function SVGFillStyleData(t, e, i, r) {
    this.o = PropertyFactory.getProp(t, e.o, 0, .01, i), this.c = PropertyFactory.getProp(t, e.c, 1, 255, i), this.style = r;
  }function SVGGradientFillStyleData(t, e, i, r) {
    this.initGradientData(t, e, i, r);
  }function SVGGradientStrokeStyleData(t, e, i, r) {
    this.w = PropertyFactory.getProp(t, e.w, 0, null, i), this.d = new DashProperty(t, e.d || {}, "svg", i), this.initGradientData(t, e, i, r);
  }function ShapeGroupData() {
    this.it = [], this.prevViewData = [], this.gr = createNS("g");
  }function BaseElement() {}function NullElement(t, e, i) {
    this.initFrame(), this.initBaseData(t, e, i), this.initFrame(), this.initTransform(t, e, i), this.initHierarchy();
  }function SVGBaseElement() {}function IShapeElement() {}function ITextElement() {}function ICompElement() {}function IImageElement(t, e, i) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i);
  }function ISolidElement(t, e, i) {
    this.initElement(t, e, i);
  }function SVGCompElement(t, e, i) {
    this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, i), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this.dynamicProperties) : { _placeholder: !0 };
  }function SVGTextElement(t, e, i) {
    this.textSpans = [], this.renderType = "svg", this.initElement(t, e, i);
  }function SVGShapeElement(t, e, i) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.initElement(t, e, i), this.prevViewData = [];
  }function SVGTintFilter(t, e) {
    this.filterManager = e;var i = createNS("feColorMatrix");if (i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i), i = createNS("feColorMatrix"), i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), i.setAttribute("result", "f2"), t.appendChild(i), this.matrixFilter = i, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
      var r = createNS("feMerge");t.appendChild(r);var s;s = createNS("feMergeNode"), s.setAttribute("in", "SourceGraphic"), r.appendChild(s), s = createNS("feMergeNode"), s.setAttribute("in", "f2"), r.appendChild(s);
    }
  }function SVGFillFilter(t, e) {
    this.filterManager = e;var i = createNS("feColorMatrix");i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(i), this.matrixFilter = i;
  }function SVGStrokeEffect(t, e) {
    this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
  }function SVGTritoneFilter(t, e) {
    this.filterManager = e;var i = createNS("feColorMatrix");i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "linearRGB"), i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), i.setAttribute("result", "f1"), t.appendChild(i);var r = createNS("feComponentTransfer");r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), this.matrixFilter = r;var s = createNS("feFuncR");s.setAttribute("type", "table"), r.appendChild(s), this.feFuncR = s;var a = createNS("feFuncG");a.setAttribute("type", "table"), r.appendChild(a), this.feFuncG = a;var n = createNS("feFuncB");n.setAttribute("type", "table"), r.appendChild(n), this.feFuncB = n;
  }function SVGProLevelsFilter(t, e) {
    this.filterManager = e;var i = this.filterManager.effectElements,
        r = createNS("feComponentTransfer");(i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", r)), (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", r)), (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", r)), (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", r)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), r = createNS("feComponentTransfer")), (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) && (r.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(r), this.feFuncRComposed = this.createFeFunc("feFuncR", r), this.feFuncGComposed = this.createFeFunc("feFuncG", r), this.feFuncBComposed = this.createFeFunc("feFuncB", r));
  }function SVGDropShadowEffect(t, e) {
    t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "400%"), t.setAttribute("height", "400%"), this.filterManager = e;var i = createNS("feGaussianBlur");i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);var r = createNS("feOffset");r.setAttribute("dx", "25"), r.setAttribute("dy", "0"), r.setAttribute("in", "drop_shadow_1"), r.setAttribute("result", "drop_shadow_2"), this.feOffset = r, t.appendChild(r);var s = createNS("feFlood");s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);var a = createNS("feComposite");a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);var n = createNS("feMerge");t.appendChild(n);var o;o = createNS("feMergeNode"), n.appendChild(o), o = createNS("feMergeNode"), o.setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = n, this.originalNodeAdded = !1, n.appendChild(o);
  }function SVGMatte3Effect(t, e, i) {
    this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = i, i.matteElement = createNS("g"), i.matteElement.appendChild(i.layerElement), i.matteElement.appendChild(i.transformedElement), i.baseElement = i.matteElement;
  }function SVGEffects(t) {
    var e,
        i = t.data.ef ? t.data.ef.length : 0,
        r = randomString(10),
        s = filtersFactory.createFilter(r),
        a = 0;this.filters = [];var n;for (e = 0; e < i; e += 1) {
      n = null, 20 === t.data.ef[e].ty ? (a += 1, n = new SVGTintFilter(s, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (a += 1, n = new SVGFillFilter(s, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? n = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (a += 1, n = new SVGTritoneFilter(s, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (a += 1, n = new SVGProLevelsFilter(s, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (a += 1, n = new SVGDropShadowEffect(s, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty && (n = new SVGMatte3Effect(s, t.effectsManager.effectElements[e], t)), n && this.filters.push(n);
    }a && (t.globalData.defs.appendChild(s), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + r + ")"));
  }function CanvasRenderer(t, e) {
    this.animationItem = t, this.renderConfig = { clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas, context: e && e.context || null, progressiveLoad: e && e.progressiveLoad || !1, preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet", className: e && e.className || "" }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig };this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1;
  }function HybridRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = { className: e && e.className || "", hideOnTransparent: !e || e.hideOnTransparent !== !1 }, this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0;
  }function CVContextData() {
    this.saved = [], this.cArrPos = 0, this.cTr = new Matrix(), this.cO = 1;var t,
        e = 15;for (this.savedOp = createTypedArray("float32", e), t = 0; t < e; t += 1) {
      this.saved[t] = createTypedArray("float32", 16);
    }this._length = e;
  }function CVBaseElement() {}function CVImageElement(t, e, i) {
    this.failed = !1, this.img = new Image(), this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i), this.globalData.addPendingElement();
  }function CVCompElement(t, e, i) {
    this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, i), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this.dynamicProperties) : { _placeholder: !0 };
  }function CVMaskElement(t, e, i) {
    this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);var r,
        s = this.masksProperties.length,
        a = !1;for (r = 0; r < s; r++) {
      "n" !== this.masksProperties[r].mode && (a = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3, i, null);
    }this.hasMasks = a;
  }function CVShapeElement(t, e, i) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.initElement(t, e, i);
  }function CVSolidElement(t, e, i) {
    this.initElement(t, e, i);
  }function CVTextElement(t, e, i) {
    this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = { fill: "rgba(0,0,0,0)", stroke: "rgba(0,0,0,0)", sWidth: 0, fValue: "" }, this.initElement(t, e, i);
  }function CVEffects() {}function HBaseElement(t, e, i) {}function HSolidElement(t, e, i) {
    this.initElement(t, e, i);
  }function HCompElement(t, e, i) {
    this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this.dynamicProperties) : { _placeholder: !0 }, this.initElement(t, e, i);
  }function HShapeElement(t, e, i) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.shapesContainer = createNS("g"), this.initElement(t, e, i), this.prevViewData = [], this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 };
  }function HTextElement(t, e, i) {
    this.textSpans = [], this.textPaths = [], this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, i);
  }function HImageElement(t, e, i) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, i);
  }function HCameraElement(t, e, i) {
    this.initFrame(), this.initBaseData(t, e, i);var r = PropertyFactory.getProp;if (this.pe = r(this, t.pe, 0, 0, this.dynamicProperties), t.ks.p.s ? (this.px = r(this, t.ks.p.x, 1, 0, this.dynamicProperties), this.py = r(this, t.ks.p.y, 1, 0, this.dynamicProperties), this.pz = r(this, t.ks.p.z, 1, 0, this.dynamicProperties)) : this.p = r(this, t.ks.p, 1, 0, this.dynamicProperties), t.ks.a && (this.a = r(this, t.ks.a, 1, 0, this.dynamicProperties)), t.ks.or.k.length && t.ks.or.k[0].to) {
      var s,
          a = t.ks.or.k.length;for (s = 0; s < a; s += 1) {
        t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null;
      }
    }this.or = r(this, t.ks.or, 1, degToRads, this.dynamicProperties), this.or.sh = !0, this.rx = r(this, t.ks.rx, 0, degToRads, this.dynamicProperties), this.ry = r(this, t.ks.ry, 0, degToRads, this.dynamicProperties), this.rz = r(this, t.ks.rz, 0, degToRads, this.dynamicProperties), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0;
  }function HEffects() {}function SliderEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
  }function AngleEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
  }function ColorEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
  }function PointEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
  }function LayerIndexEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
  }function MaskIndexEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
  }function CheckboxEffect(t, e, i) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
  }function NoValueEffect() {
    this.p = {};
  }function EffectsManager(t, e, i) {
    var r = t.ef || [];this.effectElements = [];var s,
        a,
        n = r.length;for (s = 0; s < n; s++) {
      a = new GroupEffect(r[s], e, i), this.effectElements.push(a);
    }
  }function GroupEffect(t, e, i) {
    this.dynamicProperties = [], this.init(t, e, this.dynamicProperties), this.dynamicProperties.length && i.push(this);
  }function setLocationHref(t) {
    locationHref = t;
  }function play(t) {
    animationManager.play(t);
  }function pause(t) {
    animationManager.pause(t);
  }function togglePause(t) {
    animationManager.togglePause(t);
  }function setSpeed(t, e) {
    animationManager.setSpeed(t, e);
  }function setDirection(t, e) {
    animationManager.setDirection(t, e);
  }function stop(t) {
    animationManager.stop(t);
  }function searchAnimations() {
    standalone === !0 ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
  }function registerAnimation(t) {
    return animationManager.registerAnimation(t);
  }function resize() {
    animationManager.resize();
  }function goToAndStop(t, e, i) {
    animationManager.goToAndStop(t, e, i);
  }function setSubframeRendering(t) {
    subframeEnabled = t;
  }function loadAnimation(t) {
    return standalone === !0 && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
  }function destroy(t) {
    return animationManager.destroy(t);
  }function setQuality(t) {
    if ("string" == typeof t) switch (t) {case "high":
        defaultCurveSegments = 200;break;case "medium":
        defaultCurveSegments = 50;break;case "low":
        defaultCurveSegments = 10;} else !isNaN(t) && t > 1 && (defaultCurveSegments = t);roundValues(!(defaultCurveSegments >= 50));
  }function inBrowser() {
    return "undefined" != typeof navigator;
  }function installPlugin(t, e) {
    "expressions" === t && (expressionsPlugin = e);
  }function getFactory(t) {
    switch (t) {case "propertyFactory":
        return PropertyFactory;case "shapePropertyFactory":
        return ShapePropertyFactory;case "matrix":
        return Matrix;}
  }function checkReady() {
    "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
  }function getQueryVariable(t) {
    for (var e = queryString.split("&"), i = 0; i < e.length; i++) {
      var r = e[i].split("=");if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1]);
    }
  }var svgNS = "http://www.w3.org/2000/svg",
      locationHref = "",
      initialDefaultFrame = -999999,
      subframeEnabled = !0,
      expressionsPlugin,
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      cachedColors = {},
      bm_rounder = Math.round,
      bm_rnd,
      bm_pow = Math.pow,
      bm_sqrt = Math.sqrt,
      bm_abs = Math.abs,
      bm_floor = Math.floor,
      bm_max = Math.max,
      bm_min = Math.min,
      blitter = 10,
      BMMath = {};!function () {
    var t,
        e = Object.getOwnPropertyNames(Math),
        i = e.length;for (t = 0; t < i; t += 1) {
      BMMath[e[t]] = Math[e[t]];
    }
  }(), BMMath.random = Math.random, BMMath.abs = function (t) {
    var e = typeof t === "undefined" ? "undefined" : _typeof(t);if ("object" === e && t.length) {
      var i,
          r = createSizedArray(t.length),
          s = t.length;for (i = 0; i < s; i += 1) {
        r[i] = Math.abs(t[i]);
      }return r;
    }return Math.abs(t);
  };var defaultCurveSegments = 150,
      degToRads = Math.PI / 180,
      roundCorner = .5519;roundValues(!1);var rgbToHex = function () {
    var t,
        e,
        i = [];for (t = 0; t < 256; t += 1) {
      e = t.toString(16), i[t] = 1 == e.length ? "0" + e : e;
    }return function (t, e, r) {
      return t < 0 && (t = 0), e < 0 && (e = 0), r < 0 && (r = 0), "#" + i[t] + i[e] + i[r];
    };
  }();BaseEvent.prototype = { triggerEvent: function triggerEvent(t, e) {
      if (this._cbs[t]) for (var i = this._cbs[t].length, r = 0; r < i; r++) {
        this._cbs[t][r](e);
      }
    }, addEventListener: function addEventListener(t, e) {
      return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
        this.removeEventListener(t, e);
      }.bind(this);
    }, removeEventListener: function removeEventListener(t, e) {
      if (e) {
        if (this._cbs[t]) {
          for (var i = 0, r = this._cbs[t].length; i < r;) {
            this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), i -= 1, r -= 1), i += 1;
          }this._cbs[t].length || (this._cbs[t] = null);
        }
      } else this._cbs[t] = null;
    } };var createTypedArray = function () {
    function t(t, e) {
      var i,
          r = 0,
          s = [];switch (t) {case "int16":case "uint8c":
          i = 1;break;default:
          i = 1.1;}for (r = 0; r < e; r += 1) {
        s.push(i);
      }return s;
    }function e(t, e) {
      return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
    }return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? e : t;
  }(),
      Matrix = function () {
    function t() {
      return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
    }function e(t) {
      if (0 === t) return this;var e = k(t),
          i = M(t);return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }function i(t) {
      if (0 === t) return this;var e = k(t),
          i = M(t);return this._t(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1);
    }function r(t) {
      if (0 === t) return this;var e = k(t),
          i = M(t);return this._t(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1);
    }function s(t) {
      if (0 === t) return this;var e = k(t),
          i = M(t);return this._t(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }function a(t, e) {
      return this._t(1, e, t, 1, 0, 0);
    }function n(t, e) {
      return this.shear(T(t), T(e));
    }function o(t, e) {
      var i = k(e),
          r = M(e);return this._t(i, r, 0, 0, -r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, T(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(i, -r, 0, 0, r, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }function h(t, e, i) {
      return i = isNaN(i) ? 1 : i, 1 == t && 1 == e && 1 == i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1);
    }function l(t, e, i, r, s, a, n, o, h, l, p, m, f, c, d, u) {
      return this.props[0] = t, this.props[1] = e, this.props[2] = i, this.props[3] = r, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m, this.props[12] = f, this.props[13] = c, this.props[14] = d, this.props[15] = u, this;
    }function p(t, e, i) {
      return i = i || 0, 0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this;
    }function m(t, e, i, r, s, a, n, o, h, l, p, m, f, c, d, u) {
      var y = this.props;if (1 === t && 0 === e && 0 === i && 0 === r && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return y[12] = y[12] * t + y[15] * f, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;var g = y[0],
          v = y[1],
          b = y[2],
          E = y[3],
          P = y[4],
          x = y[5],
          S = y[6],
          _ = y[7],
          C = y[8],
          A = y[9],
          k = y[10],
          M = y[11],
          T = y[12],
          D = y[13],
          w = y[14],
          F = y[15];return y[0] = g * t + v * s + b * h + E * f, y[1] = g * e + v * a + b * l + E * c, y[2] = g * i + v * n + b * p + E * d, y[3] = g * r + v * o + b * m + E * u, y[4] = P * t + x * s + S * h + _ * f, y[5] = P * e + x * a + S * l + _ * c, y[6] = P * i + x * n + S * p + _ * d, y[7] = P * r + x * o + S * m + _ * u, y[8] = C * t + A * s + k * h + M * f, y[9] = C * e + A * a + k * l + M * c, y[10] = C * i + A * n + k * p + M * d, y[11] = C * r + A * o + k * m + M * u, y[12] = T * t + D * s + w * h + F * f, y[13] = T * e + D * a + w * l + F * c, y[14] = T * i + D * n + w * p + F * d, y[15] = T * r + D * o + w * m + F * u, this._identityCalculated = !1, this;
    }function f() {
      return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
    }function c(t) {
      for (var e = 0; e < 16;) {
        if (t.props[e] !== this.props[e]) return !1;e += 1;
      }return !0;
    }function d(t) {
      var e;for (e = 0; e < 16; e += 1) {
        t.props[e] = this.props[e];
      }
    }function u(t) {
      var e;for (e = 0; e < 16; e += 1) {
        this.props[e] = t[e];
      }
    }function y(t, e, i) {
      return { x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14] };
    }function g(t, e, i) {
      return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12];
    }function v(t, e, i) {
      return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13];
    }function b(t, e, i) {
      return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14];
    }function E(t) {
      var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
          i = this.props[5] / e,
          r = -this.props[1] / e,
          s = -this.props[4] / e,
          a = this.props[0] / e,
          n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e,
          o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;return [t[0] * i + t[1] * s + n, t[0] * r + t[1] * a + o, 0];
    }function P(t) {
      var e,
          i = t.length,
          r = [];for (e = 0; e < i; e += 1) {
        r[e] = E(t[e]);
      }return r;
    }function x(t, e, i) {
      var r = createTypedArray("float32", 6);if (this.isIdentity()) r[0] = t[0], r[1] = t[1], r[2] = e[0], r[3] = e[1], r[4] = i[0], r[5] = i[1];else {
        var s = this.props[0],
            a = this.props[1],
            n = this.props[4],
            o = this.props[5],
            h = this.props[12],
            l = this.props[13];r[0] = t[0] * s + t[1] * n + h, r[1] = t[0] * a + t[1] * o + l, r[2] = e[0] * s + e[1] * n + h, r[3] = e[0] * a + e[1] * o + l, r[4] = i[0] * s + i[1] * n + h, r[5] = i[0] * a + i[1] * o + l;
      }return r;
    }function S(t, e, i) {
      var r;return r = this.isIdentity() ? [t, e, i] : [t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]];
    }function _(t, e) {
      return this.isIdentity() ? t + "," + e : t * this.props[0] + e * this.props[4] + this.props[12] + "," + (t * this.props[1] + e * this.props[5] + this.props[13]);
    }function C() {
      for (var t = 0, e = this.props, i = "matrix3d(", r = 1e4; t < 16;) {
        i += D(e[t] * r) / r, i += 15 === t ? ")" : ",", t += 1;
      }return i;
    }function A() {
      var t = 1e4,
          e = this.props;return "matrix(" + D(e[0] * t) / t + "," + D(e[1] * t) / t + "," + D(e[4] * t) / t + "," + D(e[5] * t) / t + "," + D(e[12] * t) / t + "," + D(e[13] * t) / t + ")";
    }var k = Math.cos,
        M = Math.sin,
        T = Math.tan,
        D = Math.round;return function () {
      this.reset = t, this.rotate = e, this.rotateX = i, this.rotateY = r, this.rotateZ = s, this.skew = n, this.skewFromAxis = o, this.shear = a, this.scale = h, this.setTransform = l, this.translate = p, this.transform = m, this.applyToPoint = y, this.applyToX = g, this.applyToY = v, this.applyToZ = b, this.applyToPointArray = S, this.applyToTriplePoints = x, this.applyToPointStringified = _, this.toCSS = C, this.to2dCSS = A, this.clone = d, this.cloneFromProps = u, this.equals = c, this.inversePoints = P, this.inversePoint = E, this._t = this.transform, this.isIdentity = f, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
    };
  }();!function (t, e) {
    function i(i, l, p) {
      var c = [];l = l === !0 ? { entropy: !0 } : l || {};var v = n(a(l.entropy ? [i, h(t)] : null === i ? o() : i, 3), c),
          b = new r(c),
          E = function E() {
        for (var t = b.g(f), e = u, i = 0; t < y;) {
          t = (t + i) * m, e *= m, i = b.g(1);
        }for (; t >= g;) {
          t /= 2, e /= 2, i >>>= 1;
        }return (t + i) / e;
      };return E.int32 = function () {
        return 0 | b.g(4);
      }, E.quick = function () {
        return b.g(4) / 4294967296;
      }, E["double"] = E, n(h(b.S), t), (l.pass || p || function (t, i, r, a) {
        return a && (a.S && s(a, b), t.state = function () {
          return s(b, {});
        }), r ? (e[d] = t, i) : t;
      })(E, v, "global" in l ? l.global : this == e, l.state);
    }function r(t) {
      var e,
          i = t.length,
          r = this,
          s = 0,
          a = r.i = r.j = 0,
          n = r.S = [];for (i || (t = [i++]); s < m;) {
        n[s] = s++;
      }for (s = 0; s < m; s++) {
        n[s] = n[a = v & a + t[s % i] + (e = n[s])], n[a] = e;
      }r.g = function (t) {
        for (var e, i = 0, s = r.i, a = r.j, n = r.S; t--;) {
          e = n[s = v & s + 1], i = i * m + n[v & (n[s] = n[a = v & a + e]) + (n[a] = e)];
        }return r.i = s, r.j = a, i;
      }(m);
    }function s(t, e) {
      return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
    }function a(t, e) {
      var i,
          r = [],
          s = typeof t === "undefined" ? "undefined" : _typeof(t);if (e && "object" == s) for (i in t) {
        try {
          r.push(a(t[i], e - 1));
        } catch (n) {}
      }return r.length ? r : "string" == s ? t : t + "\0";
    }function n(t, e) {
      for (var i, r = t + "", s = 0; s < r.length;) {
        e[v & s] = v & (i ^= 19 * e[v & s]) + r.charCodeAt(s++);
      }return h(e);
    }function o() {
      try {
        if (l) return h(l.randomBytes(m));var e = new Uint8Array(m);return (p.crypto || p.msCrypto).getRandomValues(e), h(e);
      } catch (i) {
        var r = p.navigator,
            s = r && r.plugins;return [+new Date(), p, s, p.screen, h(t)];
      }
    }function h(t) {
      return String.fromCharCode.apply(0, t);
    }var l,
        p = this,
        m = 256,
        f = 6,
        c = 52,
        d = "random",
        u = e.pow(m, f),
        y = e.pow(2, c),
        g = 2 * y,
        v = m - 1;e["seed" + d] = i, n(e.random(), t);
  }([], BMMath);var BezierFactory = function () {
    function t(t, e, i, r, s) {
      var a = s || ("bez_" + t + "_" + e + "_" + i + "_" + r).replace(/\./g, "p");if (p[a]) return p[a];var n = new h([t, e, i, r]);return p[a] = n, n;
    }function e(t, e) {
      return 1 - 3 * e + 3 * t;
    }function i(t, e) {
      return 3 * e - 6 * t;
    }function r(t) {
      return 3 * t;
    }function s(t, s, a) {
      return ((e(s, a) * t + i(s, a)) * t + r(s)) * t;
    }function a(t, s, a) {
      return 3 * e(s, a) * t * t + 2 * i(s, a) * t + r(s);
    }function n(t, e, i, r, a) {
      var n,
          o,
          h = 0;do {
        o = e + (i - e) / 2, n = s(o, r, a) - t, n > 0 ? i = o : e = o;
      } while (Math.abs(n) > c && ++h < d);return o;
    }function o(t, e, i, r) {
      for (var n = 0; n < m; ++n) {
        var o = a(e, i, r);if (0 === o) return e;var h = s(e, i, r) - t;e -= h / o;
      }return e;
    }function h(t) {
      this._p = t, this._mSampleValues = g ? new Float32Array(u) : new Array(u), this._precomputed = !1, this.get = this.get.bind(this);
    }var l = {};l.getBezierEasing = t;var p = {},
        m = 4,
        f = .001,
        c = 1e-7,
        d = 10,
        u = 11,
        y = 1 / (u - 1),
        g = "function" == typeof Float32Array;return h.prototype = { get: function get(t) {
        var e = this._p[0],
            i = this._p[1],
            r = this._p[2],
            a = this._p[3];return this._precomputed || this._precompute(), e === i && r === a ? t : 0 === t ? 0 : 1 === t ? 1 : s(this._getTForX(t), i, a);
      }, _precompute: function _precompute() {
        var t = this._p[0],
            e = this._p[1],
            i = this._p[2],
            r = this._p[3];this._precomputed = !0, t === e && i === r || this._calcSampleValues();
      }, _calcSampleValues: function _calcSampleValues() {
        for (var t = this._p[0], e = this._p[2], i = 0; i < u; ++i) {
          this._mSampleValues[i] = s(i * y, t, e);
        }
      }, _getTForX: function _getTForX(t) {
        for (var e = this._p[0], i = this._p[2], r = this._mSampleValues, s = 0, h = 1, l = u - 1; h !== l && r[h] <= t; ++h) {
          s += y;
        }--h;var p = (t - r[h]) / (r[h + 1] - r[h]),
            m = s + p * y,
            c = a(m, e, i);return c >= f ? o(t, m, e, i) : 0 === c ? m : n(t, s, s + y, e, i);
      } }, l;
  }();!function () {
    for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) {
      window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
    }window.requestAnimationFrame || (window.requestAnimationFrame = function (e, i) {
      var r = new Date().getTime(),
          s = Math.max(0, 16 - (r - t)),
          a = setTimeout(function () {
        e(r + s);
      }, s);return t = r + s, a;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    });
  }();var bez = bezFunction(),
      dataManager = dataFunctionManager(),
      FontManager = function () {
    function t(t, e) {
      var i = createTag("span");i.style.fontFamily = e;var r = createTag("span");r.innerHTML = "giItT1WQy@!-/#", i.style.position = "absolute", i.style.left = "-10000px", i.style.top = "-10000px", i.style.fontSize = "300px", i.style.fontVariant = "normal", i.style.fontStyle = "normal", i.style.fontWeight = "normal", i.style.letterSpacing = "0", i.appendChild(r), document.body.appendChild(i);var s = r.offsetWidth;return r.style.fontFamily = t + ", " + e, { node: r, w: s, parent: i };
    }function e() {
      var t,
          i,
          r,
          s = this.fonts.length,
          a = s;for (t = 0; t < s; t += 1) {
        if (this.fonts[t].loaded) a -= 1;else if ("t" === this.fonts[t].fOrigin || 2 === this.fonts[t].origin) {
          if (window.Typekit && window.Typekit.load && 0 === this.typekitLoaded) {
            this.typekitLoaded = 1;try {
              window.Typekit.load({ async: !0, active: function () {
                  this.typekitLoaded = 2;
                }.bind(this) });
            } catch (n) {}
          }2 === this.typekitLoaded && (this.fonts[t].loaded = !0);
        } else "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (i = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, i.offsetWidth !== r ? (a -= 1, this.fonts[t].loaded = !0) : (i = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, i.offsetWidth !== r && (a -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
      }0 !== a && Date.now() - this.initTime < h ? setTimeout(e.bind(this), 20) : setTimeout(function () {
        this.loaded = !0;
      }.bind(this), 0);
    }function i(t, e) {
      var i = createNS("text");i.style.fontSize = "100px", i.style.fontFamily = e.fFamily, i.textContent = "1", e.fClass ? (i.style.fontFamily = "inherit", i.className = e.fClass) : i.style.fontFamily = e.fFamily, t.appendChild(i);var r = createTag("canvas").getContext("2d");return r.font = "100px " + e.fFamily, r;
    }function r(r, s) {
      if (!r) return void (this.loaded = !0);if (this.chars) return this.loaded = !0, void (this.fonts = r.list);var a,
          n = r.list,
          o = n.length;for (a = 0; a < o; a += 1) {
        if (n[a].loaded = !1, n[a].monoCase = t(n[a].fFamily, "monospace"), n[a].sansCase = t(n[a].fFamily, "sans-serif"), n[a].fPath) {
          if ("p" === n[a].fOrigin || 3 === n[a].origin) {
            var h = createTag("style");h.type = "text/css", h.innerHTML = "@font-face {font-family: " + n[a].fFamily + "; font-style: normal; src: url('" + n[a].fPath + "');}", s.appendChild(h);
          } else if ("g" === n[a].fOrigin || 1 === n[a].origin) {
            var l = createTag("link");l.type = "text/css", l.rel = "stylesheet", l.href = n[a].fPath, s.appendChild(l);
          } else if ("t" === n[a].fOrigin || 2 === n[a].origin) {
            var p = createTag("script");p.setAttribute("src", n[a].fPath), s.appendChild(p);
          }
        } else n[a].loaded = !0;n[a].helper = i(s, n[a]), this.fonts.push(n[a]);
      }e.bind(this)();
    }function s(t) {
      if (t) {
        this.chars || (this.chars = []);var e,
            i,
            r,
            s = t.length,
            a = this.chars.length;for (e = 0; e < s; e += 1) {
          for (i = 0, r = !1; i < a;) {
            this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (r = !0), i += 1;
          }r || (this.chars.push(t[e]), a += 1);
        }
      }
    }function a(t, e, i) {
      for (var r = 0, s = this.chars.length; r < s;) {
        if (this.chars[r].ch === t && this.chars[r].style === e && this.chars[r].fFamily === i) return this.chars[r];r += 1;
      }return console && console.warn && console.warn("Missing character from exported characters list: ", t, e, i), l;
    }function n(t, e, i) {
      var r = this.getFontByName(e),
          s = r.helper;return s.measureText(t).width * i / 100;
    }function o(t) {
      for (var e = 0, i = this.fonts.length; e < i;) {
        if (this.fonts[e].fName === t) return this.fonts[e];e += 1;
      }return "sans-serif";
    }var h = 5e3,
        l = { w: 0, size: 0, shapes: [] },
        p = function p() {
      this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.loaded = !1, this.initTime = Date.now();
    };return p.prototype.addChars = s, p.prototype.addFonts = r, p.prototype.getCharData = a, p.prototype.getFontByName = o, p.prototype.measureText = n, p;
  }(),
      PropertyFactory = function () {
    function t(t, e, i) {
      var r,
          s = this.offsetTime;"multidimensional" === this.propType && (r = createTypedArray("float32", e.length));for (var a, n, o = i.lastIndex, h = o, l = this.keyframes.length - 1, p = !0; p;) {
        if (a = this.keyframes[h], n = this.keyframes[h + 1], h == l - 1 && t >= n.t - s) {
          a.h && (a = n), o = 0;break;
        }if (n.t - s > t) {
          o = h;break;
        }h < l - 1 ? h += 1 : (o = 0, p = !1);
      }var m, f, c, d, u, y;if (a.to) {
        a.bezierData || bez.buildBezierData(a);var g = a.bezierData;if (t >= n.t - s || t < a.t - s) {
          var v = t >= n.t - s ? g.points.length - 1 : 0;for (f = g.points[v].point.length, m = 0; m < f; m += 1) {
            r[m] = g.points[v].point[m];
          }i._lastBezierData = null;
        } else {
          a.__fnct ? y = a.__fnct : (y = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = y), c = y((t - (a.t - s)) / (n.t - s - (a.t - s)));var b,
              E = g.segmentLength * c,
              P = i.lastFrame < t && i._lastBezierData === g ? i._lastAddedLength : 0;for (u = i.lastFrame < t && i._lastBezierData === g ? i._lastPoint : 0, p = !0, d = g.points.length; p;) {
            if (P += g.points[u].partialLength, 0 === E || 0 === c || u == g.points.length - 1) {
              for (f = g.points[u].point.length, m = 0; m < f; m += 1) {
                r[m] = g.points[u].point[m];
              }break;
            }if (E >= P && E < P + g.points[u + 1].partialLength) {
              for (b = (E - P) / g.points[u + 1].partialLength, f = g.points[u].point.length, m = 0; m < f; m += 1) {
                r[m] = g.points[u].point[m] + (g.points[u + 1].point[m] - g.points[u].point[m]) * b;
              }break;
            }u < d - 1 ? u += 1 : p = !1;
          }i._lastPoint = u, i._lastAddedLength = P - g.points[u].partialLength, i._lastBezierData = g;
        }
      } else {
        var x, S, _, C, A;for (l = a.s.length, h = 0; h < l; h += 1) {
          if (1 !== a.h && (t >= n.t - s ? c = 1 : t < a.t - s ? c = 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[h] ? y = a.__fnct[h] : (x = a.o.x[h] || a.o.x[0], S = a.o.y[h] || a.o.y[0], _ = a.i.x[h] || a.i.x[0], C = a.i.y[h] || a.i.y[0], y = BezierFactory.getBezierEasing(x, S, _, C).get, a.__fnct[h] = y)) : a.__fnct ? y = a.__fnct : (x = a.o.x, S = a.o.y, _ = a.i.x, C = a.i.y, y = BezierFactory.getBezierEasing(x, S, _, C).get, a.__fnct = y), c = y((t - (a.t - s)) / (n.t - s - (a.t - s))))), this.sh && 1 !== a.h) {
            var k = a.s[h],
                M = a.e[h];k - M < -180 ? k += 360 : k - M > 180 && (k -= 360), A = k + (M - k) * c;
          } else A = 1 === a.h ? a.s[h] : a.s[h] + (a.e[h] - a.s[h]) * c;1 === l ? r = A : r[h] = A;
        }
      }return i.lastIndex = o, r;
    }function e(t) {
      for (var e = 0; e < this.v.length;) {
        this.pv[e] = t[e], this.v[e] = this.mult ? this.pv[e] * this.mult : this.pv[e], this.lastPValue[e] !== this.pv[e] && (this._mdf = !0, this.lastPValue[e] = this.pv[e]), e += 1;
      }
    }function i(t) {
      this.pv = t, this.v = this.mult ? this.pv * this.mult : this.pv, this.lastPValue != this.pv && (this._mdf = !0, this.lastPValue = this.pv);
    }function r() {
      if (this.elem.globalData.frameId !== this.frameId) {
        this._mdf = !1;var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;if (!(t === this._caching.lastFrame || this._caching.lastFrame !== p && (this._caching.lastFrame >= i && t >= i || this._caching.lastFrame < e && t < e))) {
          this._caching.lastIndex = this._caching.lastFrame < t ? this._caching.lastIndex : 0;var r = this.interpolateValue(t, this.pv, this._caching);this.calculateValueAtCurrentTime(r);
        }this._caching.lastFrame = t, this.frameId = this.elem.globalData.frameId;
      }
    }function s() {
      this._mdf = !1;
    }function a(t, e, i) {
      this.propType = "unidimensional", this.mult = i, this.v = i ? e.k * i : e.k, this.pv = e.k, this._mdf = !1, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.getValue = s;
    }function n(t, e, i) {
      this.propType = "multidimensional", this.mult = i, this.data = e, this._mdf = !1, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;var r,
          a = e.k.length;this.v = createTypedArray("float32", a), this.pv = createTypedArray("float32", a), this.lastValue = createTypedArray("float32", a);createTypedArray("float32", a);for (this.vel = createTypedArray("float32", a), r = 0; r < a; r += 1) {
        this.v[r] = i ? e.k[r] * i : e.k[r], this.pv[r] = e.k[r];
      }this.getValue = s;
    }function o(e, s, a) {
      this.propType = "unidimensional", this.keyframes = s.k, this.offsetTime = e.data.st, this.lastValue = p, this.lastPValue = p, this.frameId = -1, this._caching = { lastFrame: p, lastIndex: 0, value: 0 }, this.k = !0, this.kf = !0, this.data = s, this.mult = a, this.elem = e, this._isFirstFrame = !1, this.comp = e.comp, this.v = a ? s.k[0].s[0] * a : s.k[0].s[0], this.pv = s.k[0].s[0], this.getValue = r, this.calculateValueAtCurrentTime = i, this.interpolateValue = t;
    }function h(i, s, a) {
      this.propType = "multidimensional";var n,
          o,
          h,
          l,
          m,
          f = s.k.length;for (n = 0; n < f - 1; n += 1) {
        s.k[n].to && s.k[n].s && s.k[n].e && (o = s.k[n].s, h = s.k[n].e, l = s.k[n].to, m = s.k[n].ti, (2 === o.length && (o[0] !== h[0] || o[1] !== h[1]) && bez.pointOnLine2D(o[0], o[1], h[0], h[1], o[0] + l[0], o[1] + l[1]) && bez.pointOnLine2D(o[0], o[1], h[0], h[1], h[0] + m[0], h[1] + m[1]) || 3 === o.length && (o[0] !== h[0] || o[1] !== h[1] || o[2] !== h[2]) && bez.pointOnLine3D(o[0], o[1], o[2], h[0], h[1], h[2], o[0] + l[0], o[1] + l[1], o[2] + l[2]) && bez.pointOnLine3D(o[0], o[1], o[2], h[0], h[1], h[2], h[0] + m[0], h[1] + m[1], h[2] + m[2])) && (s.k[n].to = null, s.k[n].ti = null), o[0] === h[0] && o[1] === h[1] && 0 === l[0] && 0 === l[1] && 0 === m[0] && 0 === m[1] && (2 === o.length || o[2] === h[2] && 0 === l[2] && 0 === m[2]) && (s.k[n].to = null, s.k[n].ti = null));
      }this.keyframes = s.k, this.offsetTime = i.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = a, this.elem = i, this.comp = i.comp, this.getValue = r, this.calculateValueAtCurrentTime = e, this.interpolateValue = t, this.frameId = -1;var c = s.k[0].s.length;this.v = createTypedArray("float32", c), this.pv = createTypedArray("float32", c), this.lastValue = createTypedArray("float32", c), this.lastPValue = createTypedArray("float32", c), this._caching = { lastFrame: p, lastIndex: 0, value: createTypedArray("float32", c) };
    }function l(t, e, i, r, s) {
      var l;if (0 === e.a) l = 0 === i ? new a(t, e, r) : new n(t, e, r);else if (1 === e.a) l = 0 === i ? new o(t, e, r) : new h(t, e, r);else if (e.k.length) {
        if ("number" == typeof e.k[0]) l = new n(t, e, r);else switch (i) {case 0:
            l = new o(t, e, r);break;case 1:
            l = new h(t, e, r);}
      } else l = new a(t, e, r);return l.k && s.push(l), l;
    }var p = initialDefaultFrame,
        m = { getProp: l };return m;
  }(),
      TransformPropertyFactory = function () {
    function t(t) {
      var e,
          i = this.dynamicProperties.length;for (e = 0; e < i; e += 1) {
        this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0);
      }this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
    }function e(t) {
      if (this.elem.globalData.frameId !== this.frameId) {
        this._mdf = !1;var e,
            i = this.dynamicProperties.length;for (e = 0; e < i; e += 1) {
          this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0);
        }if (this._mdf || t) {
          if (this.v.reset(), this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented && this.p.keyframes && this.p.getValueAtTime) {
            var r, s;this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / this.elem.globalData.frameRate, 0), s = this.p.getValueAtTime(this.p.keyframes[0].t / this.elem.globalData.frameRate, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / this.elem.globalData.frameRate, 0), s = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / this.elem.globalData.frameRate, 0)) : (r = this.p.pv, s = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / this.elem.globalData.frameRate, this.p.offsetTime)), this.v.rotate(-Math.atan2(r[1] - s[1], r[0] - s[0]));
          }this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
        }this.frameId = this.elem.globalData.frameId;
      }
    }function i() {
      this.inverted = !0, this.iv = new Matrix(), this.k || (this.data.p.s ? this.iv.translate(this.px.v, this.py.v, -this.pz.v) : this.iv.translate(this.p.v[0], this.p.v[1], -this.p.v[2]), this.r ? this.iv.rotate(-this.r.v) : this.iv.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.s && this.iv.scale(this.s.v[0], this.s.v[1], 1), this.a && this.iv.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]));
    }function r() {}function s(t, e, i) {
      if (this.elem = t, this.frameId = -1, this.propType = "transform", this.dynamicProperties = [], this._mdf = !1, this.data = e, this.v = new Matrix(), e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this.dynamicProperties), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this.dynamicProperties))) : this.p = PropertyFactory.getProp(t, e.p, 1, 0, this.dynamicProperties), e.r) this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this.dynamicProperties);else if (e.rx) {
        if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this.dynamicProperties), e.or.k[0].ti) {
          var r,
              s = e.or.k.length;for (r = 0; r < s; r += 1) {
            e.or.k[r].to = e.or.k[r].ti = null;
          }
        }this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this.dynamicProperties), this.or.sh = !0;
      }e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this.dynamicProperties), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this.dynamicProperties)), e.a && (this.a = PropertyFactory.getProp(t, e.a, 1, 0, this.dynamicProperties)), e.s && (this.s = PropertyFactory.getProp(t, e.s, 1, .01, this.dynamicProperties)), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, i) : this.o = { _mdf: !1, v: 1 }, this.dynamicProperties.length ? i.push(this) : this.getValue(!0);
    }function a(t, e, i) {
      return new s(t, e, i);
    }return s.prototype.applyToMatrix = t, s.prototype.getValue = e, s.prototype.setInverted = i, s.prototype.autoOrient = r, { getTransformProperty: a };
  }();ShapePath.prototype.setPathData = function (t, e) {
    this.c = t, this.setLength(e);for (var i = 0; i < e;) {
      this.v[i] = point_pool.newElement(), this.o[i] = point_pool.newElement(), this.i[i] = point_pool.newElement(), i += 1;
    }
  }, ShapePath.prototype.setLength = function (t) {
    for (; this._maxLength < t;) {
      this.doubleArrayLength();
    }this._length = t;
  }, ShapePath.prototype.doubleArrayLength = function () {
    this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
  }, ShapePath.prototype.setXYAt = function (t, e, i, r, s) {
    var a;switch (this._length = Math.max(this._length, r + 1), this._length >= this._maxLength && this.doubleArrayLength(), i) {case "v":
        a = this.v;break;case "i":
        a = this.i;break;case "o":
        a = this.o;}(!a[r] || a[r] && !s) && (a[r] = point_pool.newElement()), a[r][0] = t, a[r][1] = e;
  }, ShapePath.prototype.setTripleAt = function (t, e, i, r, s, a, n, o) {
    this.setXYAt(t, e, "v", n, o), this.setXYAt(i, r, "o", n, o), this.setXYAt(s, a, "i", n, o);
  }, ShapePath.prototype.reverse = function () {
    var t = new ShapePath();t.setPathData(this.c, this._length);var e = this.v,
        r = this.o,
        s = this.i,
        a = 0;this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], r[0][0], r[0][1], 0, !1), a = 1);var n = this._length - 1,
        o = this._length;for (i = a; i < o; i += 1) {
      t.setTripleAt(e[n][0], e[n][1], s[n][0], s[n][1], r[n][0], r[n][1], i, !1), n -= 1;
    }return t;
  };var ShapePropertyFactory = function () {
    function t(t, e, i, r) {
      var s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c = r.lastIndex,
          d = !1;if (t < this.keyframes[0].t - this.offsetTime) s = this.keyframes[0].s[0], n = !0, c = 0;else if (t >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime) s = 1 === this.keyframes[this.keyframes.length - 2].h ? this.keyframes[this.keyframes.length - 1].s[0] : this.keyframes[this.keyframes.length - 2].e[0], n = !0;else {
        for (var u, y, g = c, v = this.keyframes.length - 1, b = !0; b && (u = this.keyframes[g], y = this.keyframes[g + 1], !(y.t - this.offsetTime > t));) {
          g < v - 1 ? g += 1 : b = !1;
        }if (n = 1 === u.h, c = g, !n) {
          if (t >= y.t - this.offsetTime) m = 1;else if (t < u.t - this.offsetTime) m = 0;else {
            var E;u.__fnct ? E = u.__fnct : (E = BezierFactory.getBezierEasing(u.o.x, u.o.y, u.i.x, u.i.y).get, u.__fnct = E), m = E((t - (u.t - this.offsetTime)) / (y.t - this.offsetTime - (u.t - this.offsetTime)));
          }a = u.e[0];
        }s = u.s[0];
      }for (l = e._length, p = s.i[0].length, r.lastIndex = c, o = 0; o < l; o += 1) {
        for (h = 0; h < p; h += 1) {
          f = n ? s.i[o][h] : s.i[o][h] + (a.i[o][h] - s.i[o][h]) * m, e.i[o][h] !== f && (e.i[o][h] = f, i && (this.pv.i[o][h] = f), d = !0), f = n ? s.o[o][h] : s.o[o][h] + (a.o[o][h] - s.o[o][h]) * m, e.o[o][h] !== f && (e.o[o][h] = f, i && (this.pv.o[o][h] = f), d = !0), f = n ? s.v[o][h] : s.v[o][h] + (a.v[o][h] - s.v[o][h]) * m, e.v[o][h] !== f && (e.v[o][h] = f, i && (this.pv.v[o][h] = f), d = !0);
        }
      }return d;
    }function e() {
      if (this.elem.globalData.frameId !== this.frameId) {
        this._mdf = !1;var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
            r = this._caching.lastFrame;if (r === l || !(r < e && t < e || r > i && t > i)) {
          this._caching.lastIndex = r < t ? this._caching.lastIndex : 0;var s = this.interpolateShape(t, this.v, !0, this._caching);this._mdf = s, s && (this.paths = this.localShapeCollection);
        }this._caching.lastFrame = t, this.frameId = this.elem.globalData.frameId;
      }
    }function i() {
      return this.v;
    }function r() {
      this.paths = this.localShapeCollection, this.k || (this._mdf = !1);
    }function s(t, e, i) {
      this.propType = "shape", this.comp = t.comp, this.k = !1, this._mdf = !1;var s = 3 === i ? e.pt.k : e.ks.k;this.v = shape_pool.clone(s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r;
    }function a(t, e, i) {
      this.propType = "shape", this.comp = t.comp, this.elem = t, this.offsetTime = t.data.st, this.keyframes = 3 === i ? e.pt.k : e.ks.k, this.k = !0, this.kf = !0;var s = this.keyframes[0].s[0].i.length;this.keyframes[0].s[0].i[0].length;this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = l, this.reset = r, this._caching = { lastFrame: l, lastIndex: 0 };
    }function n(t, e, i, r) {
      var n;if (3 === i || 4 === i) {
        var o = 3 === i ? e.pt : e.ks,
            h = o.k;n = 1 === o.a || h.length ? new a(t, e, i) : new s(t, e, i);
      } else 5 === i ? n = new f(t, e) : 6 === i ? n = new p(t, e) : 7 === i && (n = new m(t, e));return n.k && r.push(n), n;
    }function o() {
      return s;
    }function h() {
      return a;
    }var l = -999999;s.prototype.interpolateShape = t, s.prototype.getValue = i, a.prototype.getValue = e, a.prototype.interpolateShape = t;var p = function () {
      function t() {
        var t = this.p.v[0],
            e = this.p.v[1],
            r = this.s.v[0] / 2,
            s = this.s.v[1] / 2,
            a = 3 !== this.d,
            n = this.v;3 !== this.d && (n.v[0][0] = t, n.v[0][1] = e - s, n.v[1][0] = a ? t + r : t - r, n.v[1][1] = e, n.v[2][0] = t, n.v[2][1] = e + s, n.v[3][0] = a ? t - r : t + r, n.v[3][1] = e, n.i[0][0] = a ? t - r * i : t + r * i, n.i[0][1] = e - s, n.i[1][0] = a ? t + r : t - r, n.i[1][1] = e - s * i, n.i[2][0] = a ? t + r * i : t - r * i, n.i[2][1] = e + s, n.i[3][0] = a ? t - r : t + r, n.i[3][1] = e + s * i, n.o[0][0] = a ? t + r * i : t - r * i, n.o[0][1] = e - s, n.o[1][0] = a ? t + r : t - r, n.o[1][1] = e + s * i, n.o[2][0] = a ? t - r * i : t + r * i, n.o[2][1] = e + s, n.o[3][0] = a ? t - r : t + r, n.o[3][1] = e - s * i);
      }function e(t) {
        var e,
            i = this.dynamicProperties.length;if (this.elem.globalData.frameId !== this.frameId) {
          for (this._mdf = !1, this.frameId = this.elem.globalData.frameId, e = 0; e < i; e += 1) {
            this.dynamicProperties[e].getValue(t), this.dynamicProperties[e]._mdf && (this._mdf = !0);
          }this._mdf && this.convertEllToPath();
        }
      }var i = roundCorner;return function (i, s) {
        this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = s.d, this.dynamicProperties = [], this.elem = i, this.comp = i.comp, this.frameId = -1, this._mdf = !1, this.getValue = e, this.convertEllToPath = t, this.reset = r, this.p = PropertyFactory.getProp(i, s.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(i, s.s, 1, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertEllToPath();
      };
    }(),
        m = function () {
      function t() {
        var t,
            e = Math.floor(this.pt.v),
            i = 2 * Math.PI / e,
            r = this.or.v,
            s = this.os.v,
            a = 2 * Math.PI * r / (4 * e),
            n = -Math.PI / 2,
            o = 3 === this.data.d ? -1 : 1;for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
          var h = r * Math.cos(n),
              l = r * Math.sin(n),
              p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
              m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - m * a * s * o, h + p * a * s * o, l + m * a * s * o, t, !0), n += i * o;
        }this.paths.length = 0, this.paths[0] = this.v;
      }function e() {
        var t,
            e,
            i,
            r,
            s = 2 * Math.floor(this.pt.v),
            a = 2 * Math.PI / s,
            n = !0,
            o = this.or.v,
            h = this.ir.v,
            l = this.os.v,
            p = this.is.v,
            m = 2 * Math.PI * o / (2 * s),
            f = 2 * Math.PI * h / (2 * s),
            c = -Math.PI / 2;c += this.r.v;var d = 3 === this.data.d ? -1 : 1;for (this.v._length = 0, t = 0; t < s; t += 1) {
          e = n ? o : h, i = n ? l : p, r = n ? m : f;var u = e * Math.cos(c),
              y = e * Math.sin(c),
              g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
              v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * r * i * d, y - v * r * i * d, u + g * r * i * d, y + v * r * i * d, t, !0), n = !n, c += a * d;
        }
      }function i() {
        if (this.elem.globalData.frameId !== this.frameId) {
          this._mdf = !1, this.frameId = this.elem.globalData.frameId;var t,
              e = this.dynamicProperties.length;for (t = 0; t < e; t += 1) {
            this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
          }this._mdf && this.convertToPath();
        }
      }return function (s, a) {
        this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = s, this.comp = s.comp, this.data = a, this.frameId = -1, this.d = a.d, this.dynamicProperties = [], this._mdf = !1, this.getValue = i, this.reset = r, 1 === a.sy ? (this.ir = PropertyFactory.getProp(s, a.ir, 0, 0, this.dynamicProperties), this.is = PropertyFactory.getProp(s, a.is, 0, .01, this.dynamicProperties), this.convertToPath = e) : this.convertToPath = t, this.pt = PropertyFactory.getProp(s, a.pt, 0, 0, this.dynamicProperties), this.p = PropertyFactory.getProp(s, a.p, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(s, a.r, 0, degToRads, this.dynamicProperties), this.or = PropertyFactory.getProp(s, a.or, 0, 0, this.dynamicProperties), this.os = PropertyFactory.getProp(s, a.os, 0, .01, this.dynamicProperties), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : this.convertToPath();
      };
    }(),
        f = function () {
      function t(t) {
        if (this.elem.globalData.frameId !== this.frameId) {
          this._mdf = !1, this.frameId = this.elem.globalData.frameId;var e,
              i = this.dynamicProperties.length;for (e = 0; e < i; e += 1) {
            this.dynamicProperties[e].getValue(t), this.dynamicProperties[e]._mdf && (this._mdf = !0);
          }this._mdf && this.convertRectToPath();
        }
      }function e() {
        var t = this.p.v[0],
            e = this.p.v[1],
            i = this.s.v[0] / 2,
            r = this.s.v[1] / 2,
            s = bm_min(i, r, this.r.v),
            a = s * (1 - roundCorner);this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + i, e - r + s, t + i, e - r + s, t + i, e - r + a, 0, !0), this.v.setTripleAt(t + i, e + r - s, t + i, e + r - a, t + i, e + r - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + i - s, e + r, t + i - s, e + r, t + i - a, e + r, 2, !0), this.v.setTripleAt(t - i + s, e + r, t - i + a, e + r, t - i + s, e + r, 3, !0), this.v.setTripleAt(t - i, e + r - s, t - i, e + r - s, t - i, e + r - a, 4, !0), this.v.setTripleAt(t - i, e - r + s, t - i, e - r + a, t - i, e - r + s, 5, !0), this.v.setTripleAt(t - i + s, e - r, t - i + s, e - r, t - i + a, e - r, 6, !0), this.v.setTripleAt(t + i - s, e - r, t + i - a, e - r, t + i - s, e - r, 7, !0)) : (this.v.setTripleAt(t - i, e + r, t - i + a, e + r, t - i, e + r, 2), this.v.setTripleAt(t - i, e - r, t - i, e - r + a, t - i, e - r, 3))) : (this.v.setTripleAt(t + i, e - r + s, t + i, e - r + a, t + i, e - r + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + i - s, e - r, t + i - s, e - r, t + i - a, e - r, 1, !0), this.v.setTripleAt(t - i + s, e - r, t - i + a, e - r, t - i + s, e - r, 2, !0), this.v.setTripleAt(t - i, e - r + s, t - i, e - r + s, t - i, e - r + a, 3, !0), this.v.setTripleAt(t - i, e + r - s, t - i, e + r - a, t - i, e + r - s, 4, !0), this.v.setTripleAt(t - i + s, e + r, t - i + s, e + r, t - i + a, e + r, 5, !0), this.v.setTripleAt(t + i - s, e + r, t + i - a, e + r, t + i - s, e + r, 6, !0), this.v.setTripleAt(t + i, e + r - s, t + i, e + r - s, t + i, e + r - a, 7, !0)) : (this.v.setTripleAt(t - i, e - r, t - i + a, e - r, t - i, e - r, 1, !0), this.v.setTripleAt(t - i, e + r, t - i, e + r - a, t - i, e + r, 2, !0), this.v.setTripleAt(t + i, e + r, t + i - a, e + r, t + i, e + r, 3, !0)));
      }return function (i, s) {
        this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = i, this.comp = i.comp, this.frameId = -1, this.d = s.d, this.dynamicProperties = [], this._mdf = !1, this.getValue = t, this.convertRectToPath = e, this.reset = r, this.p = PropertyFactory.getProp(i, s.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(i, s.s, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(i, s.r, 0, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertRectToPath();
      };
    }(),
        c = {};return c.getShapeProp = n, c.getConstructorFunction = o, c.getKeyframedConstructorFunction = h, c;
  }(),
      ShapeModifiers = function () {
    function t(t, e) {
      r[t] || (r[t] = e);
    }function e(t, e, i, s) {
      return new r[t](e, i, s);
    }var i = {},
        r = {};return i.registerModifier = t, i.getModifier = e, i;
  }();ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
    if (!this.closed) {
      var e = { shape: t.sh, data: t, localShapeCollection: shapeCollection_pool.newShapeCollection() };this.shapes.push(e), this.addShapeToModifier(e);
    }
  }, ShapeModifier.prototype.init = function (t, e, i) {
    this.dynamicProperties = [], this.shapes = [], this.elem = t, this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this._mdf = !1, this.closed = !1, this.k = !1, this.dynamicProperties.length ? (this.k = !0, i.push(this)) : this.getValue(!0);
  }, ShapeModifier.prototype.processKeys = function () {
    if (this.elem.globalData.frameId !== this.frameId) {
      this._mdf = !1;var t,
          e = this.dynamicProperties.length;for (t = 0; t < e; t += 1) {
        this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
      }this.frameId = this.elem.globalData.frameId;
    }
  }, extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
    this.s = PropertyFactory.getProp(t, e.s, 0, .01, this.dynamicProperties), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this.dynamicProperties), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this.dynamicProperties), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m;
  }, TrimModifier.prototype.addShapeToModifier = function (t) {
    t.pathsData = [];
  }, TrimModifier.prototype.calculateShapeEdges = function (t, e, i, r, s) {
    var a = [];e <= 1 ? a.push({ s: t, e: e }) : t >= 1 ? a.push({ s: t - 1, e: e - 1 }) : (a.push({ s: t, e: 1 }), a.push({ s: 0, e: e - 1 }));var n,
        o,
        h = [],
        l = a.length;for (n = 0; n < l; n += 1) {
      if (o = a[n], o.e * s < r || o.s * s > r + i) ;else {
        var p, m;p = o.s * s <= r ? 0 : (o.s * s - r) / i, m = o.e * s >= r + i ? 1 : (o.e * s - r) / i, h.push([p, m]);
      }
    }return h.length || h.push([0, 0]), h;
  }, TrimModifier.prototype.releasePathsData = function (t) {
    var e,
        i = t.length;for (e = 0; e < i; e += 1) {
      segments_length_pool.release(t[e]);
    }return t.length = 0, t;
  }, TrimModifier.prototype.processShapes = function (t) {
    var e, i;if (this._mdf || t) {
      var r = this.o.v % 360 / 360;if (r < 0 && (r += 1), e = this.s.v + r, i = this.e.v + r, e > i) {
        var s = e;e = i, i = s;
      }this.sValue = e, this.eValue = i;
    } else e = this.sValue, i = this.eValue;var a,
        n,
        o,
        h,
        l,
        p,
        m,
        f = this.shapes.length,
        c = 0;if (i === e) for (n = 0; n < f; n += 1) {
      this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
    } else if (1 === i && 0 === e || 0 === i && 1 === e) {
      if (this._mdf) for (n = 0; n < f; n += 1) {
        this.shapes[n].shape._mdf = !0;
      }
    } else {
      var d,
          u,
          y = [];for (n = 0; n < f; n += 1) {
        if (d = this.shapes[n], d.shape._mdf || this._mdf || t || 2 === this.m) {
          if (a = d.shape.paths, h = a._length, m = 0, !d.shape._mdf && d.pathsData.length) m = d.totalShapeLength;else {
            for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) {
              p = bez.getSegmentsLength(a.shapes[o]), l.push(p), m += p.totalLength;
            }d.totalShapeLength = m, d.pathsData = l;
          }c += m, d.shape._mdf = !0;
        } else d.shape.paths = d.localShapeCollection;
      }var g,
          v = e,
          b = i,
          E = 0;for (n = f - 1; n >= 0; n -= 1) {
        if (d = this.shapes[n], d.shape._mdf) {
          for (u = d.localShapeCollection, u.releaseShapes(), 2 === this.m && f > 1 ? (g = this.calculateShapeEdges(e, i, d.totalShapeLength, E, c), E += d.totalShapeLength) : g = [[v, b]], h = g.length, o = 0; o < h; o += 1) {
            v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength * b }) : v >= 1 ? y.push({ s: d.totalShapeLength * (v - 1), e: d.totalShapeLength * (b - 1) }) : (y.push({ s: d.totalShapeLength * v, e: d.totalShapeLength }), y.push({ s: 0, e: d.totalShapeLength * (b - 1) }));var P = this.addShapes(d, y[0]);if (y[0].s !== y[0].e) {
              if (y.length > 1) if (d.shape.v.c) {
                var x = P.pop();this.addPaths(P, u), P = this.addShapes(d, y[1], x);
              } else this.addPaths(P, u), P = this.addShapes(d, y[1]);this.addPaths(P, u);
            }
          }d.shape.paths = u;
        }
      }
    }
  }, TrimModifier.prototype.addPaths = function (t, e) {
    var i,
        r = t.length;for (i = 0; i < r; i += 1) {
      e.addShape(t[i]);
    }
  }, TrimModifier.prototype.addSegment = function (t, e, i, r, s, a, n) {
    s.setXYAt(e[0], e[1], "o", a), s.setXYAt(i[0], i[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(r[0], r[1], "v", a + 1);
  }, TrimModifier.prototype.addSegmentFromArray = function (t, e, i, r) {
    e.setXYAt(t[1], t[5], "o", i), e.setXYAt(t[2], t[6], "i", i + 1), r && e.setXYAt(t[0], t[4], "v", i), e.setXYAt(t[3], t[7], "v", i + 1);
  }, TrimModifier.prototype.addShapes = function (t, e, i) {
    var r,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m = t.pathsData,
        f = t.shape.paths.shapes,
        c = t.shape.paths._length,
        d = 0,
        u = [],
        y = !0;for (i ? (o = i._length, p = i._length) : (i = shape_pool.newElement(), o = 0, p = 0), u.push(i), r = 0; r < c; r += 1) {
      for (h = m[r].lengths, i.c = f[r].c, a = f[r].c ? h.length : h.length + 1, s = 1; s < a; s += 1) {
        if (n = h[s - 1], d + n.addedLength < e.s) d += n.addedLength, i.c = !1;else {
          if (d > e.e) {
            i.c = !1;break;
          }e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(f[r].v[s - 1], f[r].o[s - 1], f[r].i[s], f[r].v[s], i, o, y), y = !1) : (l = bez.getNewSegment(f[r].v[s - 1], f[r].v[s], f[r].o[s - 1], f[r].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, i, o, y), y = !1, i.c = !1), d += n.addedLength, o += 1;
        }
      }if (f[r].c) {
        if (n = h[s - 1], d <= e.e) {
          var g = h[s - 1].addedLength;e.s <= d && e.e >= d + g ? (this.addSegment(f[r].v[s - 1], f[r].o[s - 1], f[r].i[0], f[r].v[0], i, o, y), y = !1) : (l = bez.getNewSegment(f[r].v[s - 1], f[r].v[0], f[r].o[s - 1], f[r].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, i, o, y), y = !1, i.c = !1);
        } else i.c = !1;d += n.addedLength, o += 1;
      }if (i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p), i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)), d > e.e) break;r < c - 1 && (i = shape_pool.newElement(), y = !0, u.push(i), o = 0);
    }return u;
  }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this.dynamicProperties);
  }, RoundCornersModifier.prototype.processPath = function (t, e) {
    var i = shape_pool.newElement();i.c = t.c;var r,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m,
        f,
        c,
        d,
        u,
        y = t._length,
        g = 0;for (r = 0; r < y; r += 1) {
      s = t.v[r], n = t.o[r], a = t.i[r], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== r && r !== y - 1 || t.c ? (o = 0 === r ? t.v[y - 1] : t.v[r - 1], h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)), l = h ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, m = u = s[1] - (s[1] - o[1]) * l, f = p - (p - s[0]) * roundCorner, c = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, f, c, d, u, g), g += 1, o = r === y - 1 ? t.v[0] : t.v[r + 1], h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)), l = h ? Math.min(h / 2, e) / h : 0, p = f = s[0] + (o[0] - s[0]) * l, m = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, f, c, d, u, g), g += 1) : (i.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], g), g += 1);
    }return i;
  }, RoundCornersModifier.prototype.processShapes = function (t) {
    var e,
        i,
        r,
        s,
        a = this.shapes.length,
        n = this.rd.v;if (0 !== n) {
      var o, h, l;for (i = 0; i < a; i += 1) {
        if (o = this.shapes[i], h = o.shape.paths, l = o.localShapeCollection, o.shape._mdf || this._mdf || t) for (l.releaseShapes(), o.shape._mdf = !0, e = o.shape.paths.shapes, s = o.shape.paths._length, r = 0; r < s; r += 1) {
          l.addShape(this.processPath(e[r], n));
        }o.shape.paths = o.localShapeCollection;
      }
    }this.dynamicProperties.length || (this._mdf = !1);
  }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this.dynamicProperties), this.o = PropertyFactory.getProp(t, e.o, 0, null, this.dynamicProperties), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this.dynamicProperties), this.data = e, this.dynamicProperties.length || this.getValue(!0), this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
  }, RepeaterModifier.prototype.applyTransforms = function (t, e, i, r, s, a) {
    var n = a ? -1 : 1,
        o = r.s.v[0] + (1 - r.s.v[0]) * (1 - s),
        h = r.s.v[1] + (1 - r.s.v[1]) * (1 - s);t.translate(r.p.v[0] * n * s, r.p.v[1] * n * s, r.p.v[2]), e.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]), e.rotate(-r.r.v * n * s), e.translate(r.a.v[0], r.a.v[1], r.a.v[2]), i.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]), i.scale(a ? 1 / o : o, a ? 1 / h : h), i.translate(r.a.v[0], r.a.v[1], r.a.v[2]);
  }, RepeaterModifier.prototype.init = function (t, e, i, r, s) {
    this.elem = t, this.arr = e, this.pos = i, this.elemsData = r, this._currentCopies = 0, this._elements = [], this._groups = [], this.dynamicProperties = [], this.frameId = -1, this.initModifierProperties(t, e[i]);for (var a = 0; i > 0;) {
      i -= 1, this._elements.unshift(e[i]), a += 1;
    }this.dynamicProperties.length ? (this.k = !0, s.push(this)) : this.getValue(!0);
  }, RepeaterModifier.prototype.resetElements = function (t) {
    var e,
        i = t.length;for (e = 0; e < i; e += 1) {
      t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
    }
  }, RepeaterModifier.prototype.cloneElements = function (t) {
    var e = (t.length, JSON.parse(JSON.stringify(t)));return this.resetElements(e), e;
  }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
    var i,
        r = t.length;for (i = 0; i < r; i += 1) {
      t[i]._render = e, "gr" === t[i].ty && this.changeGroupRender(t[i].it, e);
    }
  }, RepeaterModifier.prototype.processShapes = function (t) {
    var e, i, r, s, a;if (this._mdf || t) {
      var n = Math.ceil(this.c.v);if (this._groups.length < n) {
        for (; this._groups.length < n;) {
          var o = { it: this.cloneElements(this._elements), ty: "gr" };o.it.push({ a: { a: 0, ix: 1, k: [0, 0] }, nm: "Transform", o: { a: 0, ix: 7, k: 100 }, p: { a: 0, ix: 2, k: [0, 0] }, r: { a: 0, ix: 6, k: 0 }, s: { a: 0, ix: 3, k: [100, 100] }, sa: { a: 0, ix: 5, k: 0 }, sk: { a: 0, ix: 4, k: 0 }, ty: "tr" }), this.arr.splice(0, 0, o), this._groups.splice(0, 0, o), this._currentCopies += 1;
        }this.elem.reloadShapes();
      }a = 0;var h;for (r = 0; r <= this._groups.length - 1; r += 1) {
        h = a < n, this._groups[r]._render = h, this.changeGroupRender(this._groups[r].it, h), a += 1;
      }this._currentCopies = n;var l = this.o.v,
          p = l % 1,
          m = l > 0 ? Math.floor(l) : Math.ceil(l),
          f = (this.tr.v.props, this.pMatrix.props),
          c = this.rMatrix.props,
          d = this.sMatrix.props;this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();var u = 0;if (l > 0) {
        for (; u < m;) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), u += 1;
        }p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), u += p);
      } else if (l < 0) {
        for (; u > m;) {
          this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), u -= 1;
        }p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), u -= p);
      }r = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies;for (var y, g; a;) {
        if (e = this.elemsData[r].it, i = e[e.length - 1].transform.mProps.v.props, g = i.length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, 0 !== u) {
          for ((0 !== r && 1 === s || r !== this._currentCopies - 1 && s === -1) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), y = 0; y < g; y += 1) {
            i[y] = this.matrix.props[y];
          }this.matrix.reset();
        } else for (this.matrix.reset(), y = 0; y < g; y += 1) {
          i[y] = this.matrix.props[y];
        }u += 1, a -= 1, r += s;
      }
    } else for (a = this._currentCopies, r = 0, s = 1; a;) {
      e = this.elemsData[r].it, i = e[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, r += s;
    }
  }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
    this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
  }, ShapeCollection.prototype.releaseShapes = function () {
    var t;for (t = 0; t < this._length; t += 1) {
      shape_pool.release(this.shapes[t]);
    }this._length = 0;
  }, DashProperty.prototype.getValue = function (t) {
    if (this.elem.globalData.frameId !== this.frameId || t) {
      var e = 0,
          i = this.dataProps.length;for (this._mdf = !1, this.frameId = this.elem.globalData.frameId; e < i;) {
        if (this.dataProps[e].p._mdf) {
          this._mdf = !t;break;
        }e += 1;
      }if (this._mdf || t) for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < i; e += 1) {
        "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
      }
    }
  }, GradientProperty.prototype.comparePoints = function (t, e) {
    for (var i, r = 0, s = this.o.length / 2; r < s;) {
      if (i = Math.abs(t[4 * r] - t[4 * e + 2 * r]), i > .01) return !1;r += 1;
    }return !0;
  }, GradientProperty.prototype.checkCollapsable = function () {
    if (this.o.length / 2 !== this.c.length / 4) return !1;if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
      if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;t += 1;
    } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;return !0;
  }, GradientProperty.prototype.getValue = function (t) {
    if (this.prop.getValue(), this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
      var e,
          i,
          r,
          s = 4 * this.data.p;for (e = 0; e < s; e += 1) {
        i = e % 4 === 0 ? 100 : 255, r = Math.round(this.prop.v[e] * i), this.c[e] !== r && (this.c[e] = r, this._cmdf = !t);
      }if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) {
        i = e % 2 === 0 ? 100 : 1, r = e % 2 === 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== r && (this.o[e - 4 * this.data.p] = r, this._omdf = !t);
      }
    }
  };var ImagePreloader = function () {
    function t() {
      this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
    }function e(t) {
      var e = "";if (this.assetsPath) {
        var i = t.p;i.indexOf("images/") !== -1 && (i = i.split("/")[1]), e = this.assetsPath + i;
      } else e = this.path, e += t.u ? t.u : "", e += t.p;return e;
    }function i(e) {
      var i = createTag("img");i.addEventListener("load", t.bind(this), !1), i.addEventListener("error", t.bind(this), !1), i.src = e;
    }function r(t, r) {
      this.imagesLoadedCb = r, this.totalAssets = t.length;var s;for (s = 0; s < this.totalAssets; s += 1) {
        t[s].layers || (i.bind(this)(e.bind(this)(t[s])), this.totalImages += 1);
      }
    }function s(t) {
      this.path = t || "";
    }function a(t) {
      this.assetsPath = t || "";
    }function n() {
      this.imagesLoadedCb = null;
    }return function () {
      this.loadAssets = r, this.setAssetsPath = a, this.setPath = s, this.destroy = n, this.assetsPath = "", this.path = "", this.totalAssets = 0, this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null;
    };
  }(),
      featureSupport = function () {
    var t = { maskType: !0 };return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t;
  }(),
      filtersFactory = function () {
    function t(t) {
      var e = createNS("filter");return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
    }function e() {
      var t = createNS("feColorMatrix");return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
    }var i = {};return i.createFilter = t, i.createAlphaToLuminanceFilter = e, i;
  }();TextAnimatorProperty.prototype.searchProperties = function (t) {
    var e,
        i,
        r = this._textData.a.length,
        s = PropertyFactory.getProp;for (e = 0; e < r; e += 1) {
      i = this._textData.a[e], this._animatorsData[e] = new TextAnimatorDataProperty(this._elem, i, this._dynamicProperties);
    }this._textData.p && "m" in this._textData.p ? (this._pathData = { f: s(this._elem, this._textData.p.f, 0, 0, this._dynamicProperties), l: s(this._elem, this._textData.p.l, 0, 0, this._dynamicProperties), r: this._textData.p.r, m: this._elem.maskManager.getMaskProperty(this._textData.p.m) }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this._dynamicProperties), this._dynamicProperties.length && t.push(this);
  }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
    if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
      this._isFirstFrame = !1;var i,
          r,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f,
          c,
          d,
          u,
          y,
          g,
          v,
          b,
          E,
          P = this._moreOptions.alignment.v,
          x = this._animatorsData,
          S = this._textData,
          _ = this.mHelper,
          C = this._renderType,
          A = this.renderedLetters.length,
          k = (this.data, t.l);if (this._hasMaskedPath) {
        if (E = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
          var M = E.v;this._pathData.r && (M = M.reverse()), n = { tLength: 0, segments: [] }, a = M._length - 1;var T;for (g = 0, s = 0; s < a; s += 1) {
            T = { s: M.v[s], e: M.v[s + 1], to: [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], ti: [M.i[s + 1][0] - M.v[s + 1][0], M.i[s + 1][1] - M.v[s + 1][1]] }, bez.buildBezierData(T), n.tLength += T.bezierData.segmentLength, n.segments.push(T), g += T.bezierData.segmentLength;
          }s = a, E.v.c && (T = { s: M.v[s], e: M.v[0], to: [M.o[s][0] - M.v[s][0], M.o[s][1] - M.v[s][1]], ti: [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]] }, bez.buildBezierData(T), n.tLength += T.bezierData.segmentLength, n.segments.push(T), g += T.bezierData.segmentLength), this._pathData.pi = n;
        }if (n = this._pathData.pi, o = this._pathData.f.v, f = 0, m = 1, l = 0, p = !0, u = n.segments, o < 0 && E.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = u.length - 1, d = u[f].bezierData.points, m = d.length - 1; o < 0;) {
          o += d[m].partialLength, m -= 1, m < 0 && (f -= 1, d = u[f].bezierData.points, m = d.length - 1);
        }d = u[f].bezierData.points, c = d[m - 1], h = d[m], y = h.partialLength;
      }a = k.length, i = 0, r = 0;var D,
          w,
          F,
          I,
          V,
          R = 1.2 * t.finalSize * .714,
          B = !0;I = x.length;var L,
          G,
          z,
          N,
          O,
          H,
          j,
          W,
          q,
          Y,
          X,
          J,
          Z,
          K = -1,
          U = o,
          Q = f,
          $ = m,
          tt = -1,
          et = 0,
          it = "",
          rt = this.defaultPropsArray;for (s = 0; s < a; s += 1) {
        if (_.reset(), O = 1, k[s].n) i = 0, r += t.yOffset, r += B ? 1 : 0, o = U, B = !1, et = 0, this._hasMaskedPath && (f = Q, m = $, d = u[f].bezierData.points, c = d[m - 1], h = d[m], y = h.partialLength, l = 0), Z = Y = J = it = "", rt = this.defaultPropsArray;else {
          if (this._hasMaskedPath) {
            if (tt !== k[s].line) {
              switch (t.j) {case 1:
                  o += g - t.lineWidths[k[s].line];break;case 2:
                  o += (g - t.lineWidths[k[s].line]) / 2;}tt = k[s].line;
            }K !== k[s].ind && (k[K] && (o += k[K].extra), o += k[s].an / 2, K = k[s].ind), o += P[0] * k[s].an / 200;var st = 0;for (F = 0; F < I; F += 1) {
              D = x[F].a, D.p.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), st += L.length ? D.p.v[0] * L[0] : D.p.v[0] * L), D.a.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), st += L.length ? D.a.v[0] * L[0] : D.a.v[0] * L);
            }for (p = !0; p;) {
              l + y >= o + st || !d ? (v = (o + st - l) / h.partialLength, z = c.point[0] + (h.point[0] - c.point[0]) * v, N = c.point[1] + (h.point[1] - c.point[1]) * v, _.translate(-P[0] * k[s].an / 200, -(P[1] * R / 100)), p = !1) : d && (l += h.partialLength, m += 1, m >= d.length && (m = 0, f += 1, u[f] ? d = u[f].bezierData.points : E.v.c ? (m = 0, f = 0, d = u[f].bezierData.points) : (l -= h.partialLength, d = null)), d && (c = h, h = d[m], y = h.partialLength));
            }G = k[s].an / 2 - k[s].add, _.translate(-G, 0, 0);
          } else G = k[s].an / 2 - k[s].add, _.translate(-G, 0, 0), _.translate(-P[0] * k[s].an / 200, -P[1] * R / 100, 0);for (et += k[s].l / 2, F = 0; F < I; F += 1) {
            D = x[F].a, D.t.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), this._hasMaskedPath ? o += L.length ? D.t * L[0] : D.t * L : i += L.length ? D.t.v * L[0] : D.t.v * L);
          }for (et += k[s].l / 2, t.strokeWidthAnim && (j = t.sw || 0), t.strokeColorAnim && (H = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (W = [t.fc[0], t.fc[1], t.fc[2]]), F = 0; F < I; F += 1) {
            D = x[F].a, D.a.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), L.length ? _.translate(-D.a.v[0] * L[0], -D.a.v[1] * L[1], D.a.v[2] * L[2]) : _.translate(-D.a.v[0] * L, -D.a.v[1] * L, D.a.v[2] * L));
          }for (F = 0; F < I; F += 1) {
            D = x[F].a, D.s.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), L.length ? _.scale(1 + (D.s.v[0] - 1) * L[0], 1 + (D.s.v[1] - 1) * L[1], 1) : _.scale(1 + (D.s.v[0] - 1) * L, 1 + (D.s.v[1] - 1) * L, 1));
          }for (F = 0; F < I; F += 1) {
            if (D = x[F].a, w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), D.sk.propType && (L.length ? _.skewFromAxis(-D.sk.v * L[0], D.sa.v * L[1]) : _.skewFromAxis(-D.sk.v * L, D.sa.v * L)), D.r.propType && (L.length ? _.rotateZ(-D.r.v * L[2]) : _.rotateZ(-D.r.v * L)), D.ry.propType && (L.length ? _.rotateY(D.ry.v * L[1]) : _.rotateY(D.ry.v * L)), D.rx.propType && (L.length ? _.rotateX(D.rx.v * L[0]) : _.rotateX(D.rx.v * L)), D.o.propType && (O += L.length ? (D.o.v * L[0] - O) * L[0] : (D.o.v * L - O) * L), t.strokeWidthAnim && D.sw.propType && (j += L.length ? D.sw.v * L[0] : D.sw.v * L), t.strokeColorAnim && D.sc.propType) for (q = 0; q < 3; q += 1) {
              L.length ? H[q] = H[q] + (D.sc.v[q] - H[q]) * L[0] : H[q] = H[q] + (D.sc.v[q] - H[q]) * L;
            }if (t.fillColorAnim && t.fc) {
              if (D.fc.propType) for (q = 0; q < 3; q += 1) {
                L.length ? W[q] = W[q] + (D.fc.v[q] - W[q]) * L[0] : W[q] = W[q] + (D.fc.v[q] - W[q]) * L;
              }D.fh.propType && (W = L.length ? addHueToRGB(W, D.fh.v * L[0]) : addHueToRGB(W, D.fh.v * L)), D.fs.propType && (W = L.length ? addSaturationToRGB(W, D.fs.v * L[0]) : addSaturationToRGB(W, D.fs.v * L)), D.fb.propType && (W = L.length ? addBrightnessToRGB(W, D.fb.v * L[0]) : addBrightnessToRGB(W, D.fb.v * L));
            }
          }for (F = 0; F < I; F += 1) {
            D = x[F].a, D.p.propType && (w = x[F].s, L = w.getMult(k[s].anIndexes[F], S.a[F].s.totalChars), this._hasMaskedPath ? L.length ? _.translate(0, D.p.v[1] * L[0], -D.p.v[2] * L[1]) : _.translate(0, D.p.v[1] * L, -D.p.v[2] * L) : L.length ? _.translate(D.p.v[0] * L[0], D.p.v[1] * L[1], -D.p.v[2] * L[2]) : _.translate(D.p.v[0] * L, D.p.v[1] * L, -D.p.v[2] * L));
          }if (t.strokeWidthAnim && (Y = j < 0 ? 0 : j), t.strokeColorAnim && (X = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"), t.fillColorAnim && t.fc && (J = "rgb(" + Math.round(255 * W[0]) + "," + Math.round(255 * W[1]) + "," + Math.round(255 * W[2]) + ")"), this._hasMaskedPath) {
            if (_.translate(0, -t.ls), _.translate(0, P[1] * R / 100 + r, 0), S.p.p) {
              b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);var at = 180 * Math.atan(b) / Math.PI;h.point[0] < c.point[0] && (at += 180), _.rotate(-at * Math.PI / 180);
            }_.translate(z, N, 0), o -= P[0] * k[s].an / 200, k[s + 1] && K !== k[s + 1].ind && (o += k[s].an / 2, o += t.tr / 1e3 * t.finalSize);
          } else {
            switch (_.translate(i, r, 0), t.ps && _.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {case 1:
                _.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[k[s].line]), 0, 0);break;case 2:
                _.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[k[s].line]) / 2, 0, 0);}_.translate(0, -t.ls), _.translate(G, 0, 0), _.translate(P[0] * k[s].an / 200, P[1] * R / 100, 0), i += k[s].l + t.tr / 1e3 * t.finalSize;
          }"html" === C ? it = _.toCSS() : "svg" === C ? it = _.to2dCSS() : rt = [_.props[0], _.props[1], _.props[2], _.props[3], _.props[4], _.props[5], _.props[6], _.props[7], _.props[8], _.props[9], _.props[10], _.props[11], _.props[12], _.props[13], _.props[14], _.props[15]], Z = O;
        }A <= s ? (V = new LetterProps(Z, Y, X, J, it, rt), this.renderedLetters.push(V), A += 1, this.lettersChangedFlag = !0) : (V = this.renderedLetters[s], this.lettersChangedFlag = V.update(Z, Y, X, J, it, rt) || this.lettersChangedFlag);
      }
    }
  }, TextAnimatorProperty.prototype.getValue = function () {
    if (this._elem.globalData.frameId !== this._frameId) {
      this._frameId = this._elem.globalData.frameId;var t,
          e = this._dynamicProperties.length;for (this._mdf = !1, t = 0; t < e; t += 1) {
        this._dynamicProperties[t].getValue(), this._mdf = this._dynamicProperties[t]._mdf || this._mdf;
      }
    }
  }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], LetterProps.prototype.update = function (t, e, i, r, s, a) {
    this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;var n = !1;return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== i && (this.sc = i, this._mdf.sc = !0, n = !0), this.fc !== r && (this.fc = r, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n;
  }, TextProperty.prototype.setCurrentData = function (t) {
    var e = this.currentData;e.ascent = t.ascent, e.boxWidth = t.boxWidth ? t.boxWidth : e.boxWidth, e.f = t.f, e.fStyle = t.fStyle, e.fWeight = t.fWeight, e.fc = t.fc, e.j = t.j, e.justifyOffset = t.justifyOffset, e.l = t.l, e.lh = t.lh, e.lineWidths = t.lineWidths, e.ls = t.ls, e.of = t.of, e.s = t.s, e.sc = t.sc, e.sw = t.sw, e.sz = t.sz, e.ps = t.ps, e.t = t.t, e.tr = t.tr, e.fillColorAnim = t.fillColorAnim || e.fillColorAnim, e.strokeColorAnim = t.strokeColorAnim || e.strokeColorAnim, e.strokeWidthAnim = t.strokeWidthAnim || e.strokeWidthAnim, e.yOffset = t.yOffset, e.finalSize = t.finalSize, e.finalLineHeight = t.finalLineHeight, e.finalText = t.finalText, e.__complete = !1;
  }, TextProperty.prototype.searchProperty = function () {
    return this.kf = this.data.d.k.length > 1, this.kf;
  }, TextProperty.prototype.getValue = function (t) {
    this._mdf = !1;var e = this.elem.globalData.frameId;if (e !== this._frameId && this.kf || this._isFirstFrame || t) {
      for (var i, r = this.data.d.k, s = this.elem.comp.renderedFrame, a = 0, n = r.length; a <= n - 1 && (i = r[a].s, !(a === n - 1 || r[a + 1].t > s));) {
        a += 1;
      }this.keysIndex !== a && (i.__complete || this.completeTextData(i), this.setCurrentData(i), this._mdf = !this._isFirstFrame, this.pv = this.v = this.currentData.t, this.keysIndex = a), this._frameId = e;
    }
  }, TextProperty.prototype.completeTextData = function (t) {
    t.__complete = !0;var e,
        i,
        r,
        s,
        a,
        n,
        o,
        h = this.elem.globalData.fontManager,
        l = this.data,
        p = [],
        m = 0,
        f = l.m.g,
        c = 0,
        d = 0,
        u = 0,
        y = [],
        g = 0,
        v = 0,
        b = h.getFontByName(t.f),
        E = 0,
        P = b.fStyle.split(" "),
        x = "normal",
        S = "normal";i = P.length;var _;for (e = 0; e < i; e += 1) {
      switch (_ = P[e].toLowerCase()) {case "italic":
          S = "italic";break;case "bold":
          x = "700";break;case "black":
          x = "900";break;case "medium":
          x = "500";break;case "regular":case "normal":
          x = "400";break;case "light":case "thin":
          x = "200";}
    }t.fWeight = x, t.fStyle = S, i = t.t.length, t.finalSize = t.s, t.finalText = t.t, t.finalLineHeight = t.lh;var C = t.tr / 1e3 * t.finalSize;if (t.sz) for (var A, k, M = !0, T = t.sz[0], D = t.sz[1]; M;) {
      k = t.t, A = 0, g = 0, i = t.t.length, C = t.tr / 1e3 * t.finalSize;var w = -1;for (e = 0; e < i; e += 1) {
        r = !1, " " === k.charAt(e) ? w = e : 13 === k.charCodeAt(e) && (g = 0, r = !0, A += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(k.charAt(e), b.fStyle, b.fFamily), E = r ? 0 : o.w * t.finalSize / 100) : E = h.measureText(k.charAt(e), t.f, t.finalSize), g + E > T && " " !== k.charAt(e) ? (w === -1 ? i += 1 : e = w, A += t.finalLineHeight || 1.2 * t.finalSize, k = k.substr(0, e) + "\r" + k.substr(e === w ? e + 1 : e), w = -1, g = 0) : (g += E, g += C);
      }A += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && D < A ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = k, i = t.finalText.length, M = !1);
    }g = -C, E = 0;var F,
        I = 0;for (e = 0; e < i; e += 1) {
      if (r = !1, F = t.finalText.charAt(e), " " === F ? s = "\xa0" : 13 === F.charCodeAt(0) ? (I = 0, y.push(g), v = g > v ? g : v, g = -2 * C, s = "", r = !0, u += 1) : s = t.finalText.charAt(e), h.chars ? (o = h.getCharData(F, b.fStyle, h.getFontByName(t.f).fFamily), E = r ? 0 : o.w * t.finalSize / 100) : E = h.measureText(s, t.f, t.finalSize), " " === F ? I += E + C : (g += E + C + I, I = 0), p.push({ l: E, an: E, add: c, n: r, anIndexes: [], val: s, line: u }), 2 == f) {
        if (c += E, "" === s || "\xa0" === s || e === i - 1) {
          for ("" !== s && "\xa0" !== s || (c -= E); d <= e;) {
            p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
          }m += 1, c = 0;
        }
      } else if (3 == f) {
        if (c += E, "" === s || e === i - 1) {
          for ("" === s && (c -= E); d <= e;) {
            p[d].an = c, p[d].ind = m, p[d].extra = E, d += 1;
          }c = 0, m += 1;
        }
      } else p[m].ind = m, p[m].extra = 0, m += 1;
    }if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = v, t.j) {case 1:
        t.justifyOffset = -t.boxWidth;break;case 2:
        t.justifyOffset = -t.boxWidth / 2;break;default:
        t.justifyOffset = 0;}t.lineWidths = y;var V,
        R,
        B = l.a;n = B.length;var L,
        G,
        z = [];for (a = 0; a < n; a += 1) {
      for (V = B[a], V.a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < i; e += 1) {
        R = p[e], R.anIndexes[a] = G, (1 == L && "" !== R.val || 2 == L && "" !== R.val && "\xa0" !== R.val || 3 == L && (R.n || "\xa0" == R.val || e == i - 1) || 4 == L && (R.n || e == i - 1)) && (1 === V.s.rn && z.push(G), G += 1);
      }l.a[a].s.totalChars = G;var N,
          O = -1;if (1 === V.s.rn) for (e = 0; e < i; e += 1) {
        R = p[e], O != R.anIndexes[a] && (O = R.anIndexes[a], N = z.splice(Math.floor(Math.random() * z.length), 1)[0]), R.anIndexes[a] = N;
      }
    }t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
  }, TextProperty.prototype.updateDocumentData = function (t, e) {
    e = void 0 === e ? this.keysIndex : e;var i = this.data.d.k[e].s;for (var r in t) {
      i[r] = t[r];
    }this.recalculate(e);
  }, TextProperty.prototype.recalculate = function (t) {
    var e = this.data.d.k[t].s;e.__complete = !1, this.keysIndex = -1, this.getValue(!0);
  }, TextProperty.prototype.canResizeFont = function (t) {
    this.canResize = t, this.recalculate(this.keysIndex);
  }, TextProperty.prototype.setMinimumFontSize = function (t) {
    this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex);
  };var TextSelectorProp = function () {
    function t(t) {
      if (this._mdf = t || !1, this.dynamicProperties.length) {
        var e,
            i = this.dynamicProperties.length;for (e = 0; e < i; e += 1) {
          this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0);
        }
      }var r = this.elem.textProperty.currentData ? this.elem.textProperty.currentData.l.length : 0;t && 2 === this.data.r && (this.e.v = r);var s = 2 === this.data.r ? 1 : 100 / r,
          a = this.o.v / s,
          n = this.s.v / s + a,
          o = this.e.v / s + a;if (n > o) {
        var h = n;n = o, o = h;
      }this.finalS = n, this.finalE = o;
    }function e(t) {
      var e = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
          i = 0,
          r = this.finalS,
          o = this.finalE,
          h = this.data.sh;if (2 == h) i = o === r ? t >= o ? 1 : 0 : s(0, a(.5 / (o - r) + (t - r) / (o - r), 1)), i = e(i);else if (3 == h) i = o === r ? t >= o ? 0 : 1 : 1 - s(0, a(.5 / (o - r) + (t - r) / (o - r), 1)), i = e(i);else if (4 == h) o === r ? i = 0 : (i = s(0, a(.5 / (o - r) + (t - r) / (o - r), 1)), i < .5 ? i *= 2 : i = 1 - 2 * (i - .5)), i = e(i);else if (5 == h) {
        if (o === r) i = 0;else {
          var l = o - r;t = a(s(0, t + .5 - r), o - r);var p = -l / 2 + t,
              m = l / 2;i = Math.sqrt(1 - p * p / (m * m));
        }i = e(i);
      } else 6 == h ? (o === r ? i = 0 : (t = a(s(0, t + .5 - r), o - r), i = (1 + Math.cos(Math.PI + 2 * Math.PI * t / (o - r))) / 2), i = e(i)) : (t >= n(r) && (i = t - r < 0 ? 1 - (r - t) : s(0, a(o - t, 1))), i = e(i));return i * this.a.v;
    }function i(i, r, s) {
      this._mdf = !1, this.k = !1, this.data = r, this.dynamicProperties = [], this.getValue = t, this.getMult = e, this.elem = i, this.comp = i.comp, this.finalS = 0, this.finalE = 0, this.s = PropertyFactory.getProp(i, r.s || { k: 0 }, 0, 0, this.dynamicProperties), "e" in r ? this.e = PropertyFactory.getProp(i, r.e, 0, 0, this.dynamicProperties) : this.e = { v: 100 }, this.o = PropertyFactory.getProp(i, r.o || { k: 0 }, 0, 0, this.dynamicProperties), this.xe = PropertyFactory.getProp(i, r.xe || { k: 0 }, 0, 0, this.dynamicProperties), this.ne = PropertyFactory.getProp(i, r.ne || { k: 0 }, 0, 0, this.dynamicProperties), this.a = PropertyFactory.getProp(i, r.a, 0, .01, this.dynamicProperties), this.dynamicProperties.length ? s.push(this) : this.getValue();
    }function r(t, e, r) {
      return new i(t, e, r);
    }var s = Math.max,
        a = Math.min,
        n = Math.floor;return { getTextSelectorProp: r };
  }(),
      pool_factory = function () {
    return function (t, e, i, r) {
      function s() {
        var t;return n ? (n -= 1, t = h[n]) : t = e(), t;
      }function a(t) {
        n === o && (h = pooling["double"](h), o = 2 * o), i && i(t), h[n] = t, n += 1;
      }var n = 0,
          o = t,
          h = createSizedArray(o),
          l = { newElement: s, release: a };return l;
    };
  }(),
      pooling = function () {
    function t(t) {
      return t.concat(createSizedArray(t.length));
    }return { "double": t };
  }(),
      point_pool = function () {
    function t() {
      return createTypedArray("float32", 2);
    }return pool_factory(8, t);
  }(),
      shape_pool = function () {
    function t() {
      return new ShapePath();
    }function e(t) {
      var e,
          i = t._length;for (e = 0; e < i; e += 1) {
        point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
      }t._length = 0, t.c = !1;
    }function i(t) {
      var e,
          i = r.newElement(),
          s = void 0 === t._length ? t.v.length : t._length;i.setLength(s), i.c = t.c;for (e = 0; e < s; e += 1) {
        i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
      }return i;
    }var r = pool_factory(4, t, e);return r.clone = i, r;
  }(),
      shapeCollection_pool = function () {
    function t() {
      var t;return r ? (r -= 1, t = a[r]) : t = new ShapeCollection(), t;
    }function e(t) {
      var e,
          i = t._length;for (e = 0; e < i; e += 1) {
        shape_pool.release(t.shapes[e]);
      }t._length = 0, r === s && (a = pooling["double"](a), s = 2 * s), a[r] = t, r += 1;
    }var i = { newShapeCollection: t, release: e },
        r = 0,
        s = 4,
        a = createSizedArray(s);return i;
  }(),
      segments_length_pool = function () {
    function t() {
      return { lengths: [], totalLength: 0 };
    }function e(t) {
      var e,
          i = t.lengths.length;for (e = 0; e < i; e += 1) {
        bezier_length_pool.release(t.lengths[e]);
      }t.lengths.length = 0;
    }return pool_factory(8, t, e);
  }(),
      bezier_length_pool = function () {
    function t() {
      return { addedLength: 0, percents: createTypedArray("float32", defaultCurveSegments), lengths: createTypedArray("float32", defaultCurveSegments) };
    }return pool_factory(8, t);
  }();BaseRenderer.prototype.checkLayers = function (t) {
    var e,
        i,
        r = this.layers.length;for (this.completeLayers = !0, e = r - 1; e >= 0; e--) {
      this.elements[e] || (i = this.layers[e], i.ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e)), this.completeLayers = !!this.elements[e] && this.completeLayers;
    }this.checkPendingElements();
  }, BaseRenderer.prototype.createItem = function (t) {
    switch (t.ty) {case 2:
        return this.createImage(t);case 0:
        return this.createComp(t);case 1:
        return this.createSolid(t);case 3:
        return this.createNull(t);case 4:
        return this.createShape(t);case 5:
        return this.createText(t);case 13:
        return this.createCamera(t);}return this.createNull(t);
  }, BaseRenderer.prototype.createCamera = function () {
    throw new Error("You're using a 3d camera. Try the html renderer.");
  }, BaseRenderer.prototype.buildAllItems = function () {
    var t,
        e = this.layers.length;
    for (t = 0; t < e; t += 1) {
      this.buildItem(t);
    }this.checkPendingElements();
  }, BaseRenderer.prototype.includeLayers = function (t) {
    this.completeLayers = !1;var e,
        i,
        r = t.length,
        s = this.layers.length;for (e = 0; e < r; e += 1) {
      for (i = 0; i < s;) {
        if (this.layers[i].id == t[e].id) {
          this.layers[i] = t[e];break;
        }i += 1;
      }
    }
  }, BaseRenderer.prototype.setProjectInterface = function (t) {
    this.globalData.projectInterface = t;
  }, BaseRenderer.prototype.initItems = function () {
    this.globalData.progressiveLoad || this.buildAllItems();
  }, BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
    for (var r = this.elements, s = this.layers, a = 0, n = s.length; a < n;) {
      s[a].ind == e && (r[a] && r[a] !== !0 ? (i.push(r[a]), r[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, i) : t.setHierarchy(i)) : (this.buildItem(a), this.addPendingElement(t))), a += 1;
    }
  }, BaseRenderer.prototype.addPendingElement = function (t) {
    this.pendingElements.push(t);
  }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
        i = t.length;for (e = 0; e < i; e += 1) {
      if (t[e].xt) {
        var r = this.createComp(t[e]);r.initExpressions(), this.globalData.projectInterface.registerComposition(r);
      }
    }
  }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
    return new NullElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createShape = function (t) {
    return new SVGShapeElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createText = function (t) {
    return new SVGTextElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createImage = function (t) {
    return new IImageElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createComp = function (t) {
    return new SVGCompElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createSolid = function (t) {
    return new ISolidElement(t, this.globalData, this);
  }, SVGRenderer.prototype.configAnimation = function (t) {
    this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);var e = this.globalData.defs;this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.nm = t.nm, this.globalData.compSize.w = t.w, this.globalData.compSize.h = t.h, this.globalData.frameRate = t.fr, this.data = t;var i = createNS("clipPath"),
        r = createNS("rect");r.setAttribute("width", t.w), r.setAttribute("height", t.h), r.setAttribute("x", 0), r.setAttribute("y", 0);var s = "animationMask_" + randomString(10);i.setAttribute("id", s), i.appendChild(r), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(i), this.layers = t.layers, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.elements = createSizedArray(t.layers.length);
  }, SVGRenderer.prototype.destroy = function () {
    this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;var t,
        e = this.layers ? this.layers.length : 0;for (t = 0; t < e; t++) {
      this.elements[t] && this.elements[t].destroy();
    }this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
    var e = this.elements;if (!e[t] && 99 != this.layers[t].ty) {
      e[t] = !0;var i = this.createItem(this.layers[t]);e[t] = i, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i), i.initExpressions()), this.appendElementInPos(i, t), this.layers[t].tt && (this.elements[t - 1] && this.elements[t - 1] !== !0 ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(i)));
    }
  }, SVGRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      var t = this.pendingElements.pop();if (t.checkParenting(), t.data.tt) for (var e = 0, i = this.elements.length; e < i;) {
        if (this.elements[e] === t) {
          t.setMatte(this.elements[e - 1].layerId);break;
        }e += 1;
      }
    }
  }, SVGRenderer.prototype.renderFrame = function (t) {
    if (this.renderedFrame !== t && !this.destroyed) {
      null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;var e,
          i = this.layers.length;for (this.completeLayers || this.checkLayers(t), e = i - 1; e >= 0; e--) {
        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
      }if (this.globalData._mdf) for (e = 0; e < i; e += 1) {
        (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
      }
    }
  }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
    var i = t.getBaseElement();if (i) {
      for (var r, s = 0; s < e;) {
        this.elements[s] && this.elements[s] !== !0 && this.elements[s].getBaseElement() && (r = this.elements[s].getBaseElement()), s += 1;
      }r ? this.layerElement.insertBefore(i, r) : this.layerElement.appendChild(i);
    }
  }, SVGRenderer.prototype.hide = function () {
    this.layerElement.style.display = "none";
  }, SVGRenderer.prototype.show = function () {
    this.layerElement.style.display = "block";
  }, MaskElement.prototype.getMaskProperty = function (t) {
    return this.viewData[t].prop;
  }, MaskElement.prototype.renderFrame = function (t) {
    var e,
        i = this.masksProperties.length;for (e = 0; e < i; e++) {
      if ((this.viewData[e].prop._mdf || this._isFirstFrame) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || this._isFirstFrame) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || this._isFirstFrame) && (this.viewData[e].invRect.setAttribute("x", -t.props[12]), this.viewData[e].invRect.setAttribute("y", -t.props[13])), this.storedData[e].x && (this.storedData[e].x._mdf || this._isFirstFrame))) {
        var r = this.storedData[e].expan;this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), r.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
      }
    }this._isFirstFrame = !1;
  }, MaskElement.prototype.getMaskelement = function () {
    return this.maskElement;
  }, MaskElement.prototype.createLayerSolidPath = function () {
    var t = "M0,0 ";return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
  }, MaskElement.prototype.drawPath = function (t, e, i) {
    var r,
        s,
        a = " M" + e.v[0][0] + "," + e.v[0][1];for (s = e._length, r = 1; r < s; r += 1) {
      a += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[r][0] + "," + e.i[r][1] + " " + e.v[r][0] + "," + e.v[r][1];
    }if (e.c && s > 1 && (a += " C" + e.o[r - 1][0] + "," + e.o[r - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), i.lastPath !== a) {
      var n = "";i.elem && (e.c && (n = t.inv ? this.solidPath + a : a), i.elem.setAttribute("d", n)), i.lastPath = a;
    }
  }, MaskElement.prototype.destroy = function () {
    this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
  }, HierarchyElement.prototype = { initHierarchy: function initHierarchy() {
      this.hierarchy = [], this._isParent = !1, this.checkParenting();
    }, setHierarchy: function setHierarchy(t) {
      this.hierarchy = t;
    }, setAsParent: function setAsParent() {
      this._isParent = !0;
    }, checkParenting: function checkParenting() {
      void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
    } }, FrameElement.prototype = { initFrame: function initFrame() {
      this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
    }, prepareProperties: function prepareProperties(t, e) {
      var i,
          r = this.dynamicProperties.length;for (i = 0; i < r; i += 1) {
        (e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
      }
    } }, TransformElement.prototype = { initTransform: function initTransform() {
      this.finalTransform = { mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this.dynamicProperties) : { o: 0 }, _matMdf: !1, _opMdf: !1, mat: new Matrix() }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), 11 !== this.data.ty;
    }, renderTransform: function renderTransform() {
      if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
        var t,
            e = this.finalTransform.mat,
            i = 0,
            r = this.hierarchy.length;if (!this.finalTransform._matMdf) for (; i < r;) {
          if (this.hierarchy[i].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = !0;break;
          }i += 1;
        }if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < r; i += 1) {
          t = this.hierarchy[i].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
        }
      }
    }, globalToLocal: function globalToLocal(t) {
      var e = [];e.push(this.finalTransform);for (var i = !0, r = this.comp; i;) {
        r.finalTransform ? (r.data.hasMask && e.splice(0, 0, r.finalTransform), r = r.comp) : i = !1;
      }var s,
          a,
          n = e.length;for (s = 0; s < n; s += 1) {
        a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
      }return t;
    }, mHelper: new Matrix() }, RenderableElement.prototype = { initRenderable: function initRenderable() {
      this.isInRange = !1, this.hidden = !1, this.isTransparent = !1;
    }, prepareRenderableFrame: function prepareRenderableFrame(t) {
      this.checkLayerLimits(t);
    }, checkTransparency: function checkTransparency() {
      this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
    }, checkLayerLimits: function checkLayerLimits(t) {
      this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? this.isInRange !== !0 && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : this.isInRange !== !1 && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
    }, renderRenderable: function renderRenderable() {
      this.maskManager.renderFrame(this.finalTransform.mat), this.renderableEffectsManager.renderFrame(this._isFirstFrame);
    }, sourceRectAtTime: function sourceRectAtTime() {
      return { top: 0, left: 0, width: 100, height: 100 };
    }, getLayerSize: function getLayerSize() {
      return 5 === this.data.ty ? { w: this.data.textData.width, h: this.data.textData.height } : { w: this.data.width, h: this.data.height };
    } }, function () {
    var t = { initElement: function initElement(t, e, i) {
        this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.addMasks(), this.createContent(), this.hide();
      }, hide: function hide() {
        this.hidden || this.isInRange && !this.isTransparent || (this.layerElement.style.display = "none", this.hidden = !0);
      }, show: function show() {
        this.isInRange && !this.isTransparent && (this.data.hd || (this.layerElement.style.display = "block"), this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
      }, renderFrame: function renderFrame() {
        this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
      }, renderInnerContent: function renderInnerContent() {}, prepareFrame: function prepareFrame(t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
      }, destroy: function destroy() {
        this.innerElem = null, this.destroyBaseElement();
      } };extendPrototype([RenderableElement, createProxyFunction(t)], RenderableDOMElement);
  }(), SVGStyleData.prototype.reset = function () {
    this.d = "", this._mdf = !1;
  }, SVGGradientFillStyleData.prototype.initGradientData = function (t, e, i, r) {
    this.o = PropertyFactory.getProp(t, e.o, 0, .01, i), this.s = PropertyFactory.getProp(t, e.s, 1, null, i), this.e = PropertyFactory.getProp(t, e.e, 1, null, i), this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, .01, i), this.a = PropertyFactory.getProp(t, e.a || { k: 0 }, 0, degToRads, i), this.g = new GradientProperty(t, e.g, i), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r);
  }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
    var i = "gr_" + randomString(10),
        r = createNS(1 === e.t ? "linearGradient" : "radialGradient");r.setAttribute("id", i), r.setAttribute("spreadMethod", "pad"), r.setAttribute("gradientUnits", "userSpaceOnUse");var s,
        a,
        n,
        o = [];for (n = 4 * e.g.p, a = 0; a < n; a += 4) {
      s = createNS("stop"), r.appendChild(s), o.push(s);
    }t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(#" + i + ")"), this.gf = r, this.cst = o;
  }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
    if (this.g._hasOpacity && !this.g._collapsable) {
      var i,
          r,
          s,
          a = createNS("mask"),
          n = createNS("path");a.appendChild(n);var o = "op_" + randomString(10),
          h = "mk_" + randomString(10);a.setAttribute("id", h);var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;var p = this.stops;for (r = 4 * t.g.p; r < s; r += 2) {
        i = createNS("stop"), i.setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(i), p.push(i);
      }n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n;
    }
  }, SVGGradientStrokeStyleData.prototype.initGradientData = SVGGradientFillStyleData.prototype.initGradientData, SVGGradientStrokeStyleData.prototype.setGradientData = SVGGradientFillStyleData.prototype.setGradientData, SVGGradientStrokeStyleData.prototype.setGradientOpacity = SVGGradientFillStyleData.prototype.setGradientOpacity, BaseElement.prototype.checkMasks = function () {
    if (!this.data.hasMask) return !1;for (var t = 0, e = this.data.masksProperties.length; t < e;) {
      if ("n" !== this.data.masksProperties[t].mode && this.data.masksProperties[t].cl !== !1) return !0;t += 1;
    }return !1;
  }, BaseElement.prototype.initExpressions = function () {
    this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.layerInterface.registerMaskInterface(this.maskManager);var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
  }, BaseElement.prototype.blendModeEnums = { 1: "multiply", 2: "screen", 3: "overlay", 4: "darken", 5: "lighten", 6: "color-dodge", 7: "color-burn", 8: "hard-light", 9: "soft-light", 10: "difference", 11: "exclusion", 12: "hue", 13: "saturation", 14: "color", 15: "luminosity" }, BaseElement.prototype.getBlendMode = function () {
    return this.blendModeEnums[this.data.bm] || "";
  }, BaseElement.prototype.setBlendMode = function () {
    var t = this.getBlendMode(),
        e = this.baseElement || this.layerElement;e.style["mix-blend-mode"] = t;
  }, BaseElement.prototype.initBaseData = function (t, e, i) {
    this.globalData = e, this.comp = i, this.data = t, this.layerId = "ly_" + randomString(10), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
  }, BaseElement.prototype.getType = function () {
    return this.type;
  }, NullElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
    return null;
  }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = { initRendererElement: function initRendererElement() {
      this.layerElement = createNS("g");
    }, createContainerElements: function createContainerElements() {
      this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;var t,
          e,
          i,
          r = null;if (this.data.td) {
        if (3 == this.data.td || 1 == this.data.td) {
          var s = createNS("mask");s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), r = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = randomString(10), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), i = createNS("g"), i.appendChild(this.layerElement), r = i, s.appendChild(i), i.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
        } else if (2 == this.data.td) {
          var a = createNS("mask");a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");var n = createNS("g");a.appendChild(n), t = randomString(10), e = filtersFactory.createFilter(t);var o = createNS("feColorMatrix");o.setAttribute("type", "matrix"), o.setAttribute("color-interpolation-filters", "sRGB"), o.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1"), e.appendChild(o), this.globalData.defs.appendChild(e);var h = createNS("rect");h.setAttribute("width", this.comp.data.w), h.setAttribute("height", this.comp.data.h), h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("fill", "#ffffff"), h.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(h), n.appendChild(this.layerElement), r = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), i = createNS("g"), n.appendChild(h), i.appendChild(this.layerElement), r = i, n.appendChild(i)), this.globalData.defs.appendChild(a);
        }
      } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), r = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;if (!this.data.ln && !this.data.cl || 4 !== this.data.ty && 0 !== this.data.ty || (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)), 0 === this.data.ty && !this.data.hd) {
        var l = createNS("clipPath"),
            p = createNS("path");p.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");var m = "cp_" + randomString(8);if (l.setAttribute("id", m), l.appendChild(p), this.globalData.defs.appendChild(l), this.checkMasks()) {
          var f = createNS("g");f.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), f.appendChild(this.layerElement), this.transformedElement = f, r ? r.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
        } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")");
      }0 !== this.data.bm && this.setBlendMode(), this.renderableEffectsManager = new SVGEffects(this);
    }, renderElement: function renderElement() {
      this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
    }, destroyBaseElement: function destroyBaseElement() {
      this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
    }, getBaseElement: function getBaseElement() {
      return this.data.hd ? null : this.baseElement;
    }, addMasks: function addMasks() {
      this.maskManager = new MaskElement(this.data, this, this.globalData, this.dynamicProperties);
    }, setMatte: function setMatte(t) {
      this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
    } }, IShapeElement.prototype = { addShapeToModifiers: function addShapeToModifiers(t) {
      var e,
          i = this.shapeModifiers.length;for (e = 0; e < i; e += 1) {
        this.shapeModifiers[e].addShape(t);
      }
    }, renderModifiers: function renderModifiers() {
      if (this.shapeModifiers.length) {
        var t,
            e = this.shapes.length;for (t = 0; t < e; t += 1) {
          this.shapes[t].reset();
        }for (e = this.shapeModifiers.length, t = e - 1; t >= 0; t -= 1) {
          this.shapeModifiers[t].processShapes(this._isFirstFrame);
        }
      }
    }, lcEnum: { 1: "butt", 2: "round", 3: "square" }, ljEnum: { 1: "miter", 2: "round", 3: "butt" }, searchProcessedElement: function searchProcessedElement(t) {
      for (var e = 0, i = this.processedElements.length; e < i;) {
        if (this.processedElements[e].elem === t) return this.processedElements[e].pos;e += 1;
      }return 0;
    }, addProcessedElement: function addProcessedElement(t, e) {
      for (var i = this.processedElements.length; i;) {
        if (i -= 1, this.processedElements[i].elem === t) {
          this.processedElements[i].pos = e;break;
        }
      }0 === i && this.processedElements.push(new ProcessedElement(t, e));
    }, prepareFrame: function prepareFrame(t) {
      this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
    }, buildShapeString: function buildShapeString(t, e, i, r) {
      var s,
          a = "";for (s = 1; s < e; s += 1) {
        1 === s && (a += " M" + r.applyToPointStringified(t.v[0][0], t.v[0][1])), a += " C" + r.applyToPointStringified(t.o[s - 1][0], t.o[s - 1][1]) + " " + r.applyToPointStringified(t.i[s][0], t.i[s][1]) + " " + r.applyToPointStringified(t.v[s][0], t.v[s][1]);
      }return 1 === e && (a += " M" + r.applyToPointStringified(t.v[0][0], t.v[0][1])), i && e && (a += " C" + r.applyToPointStringified(t.o[s - 1][0], t.o[s - 1][1]) + " " + r.applyToPointStringified(t.i[0][0], t.i[0][1]) + " " + r.applyToPointStringified(t.v[0][0], t.v[0][1]), a += "z"), a;
    } }, ITextElement.prototype.initElement = function (t, e, i) {
    this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, i), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.initTransform(t, e, i), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.addMasks(), this.createContent(), this.textAnimator.searchProperties(this.dynamicProperties);
  }, ITextElement.prototype.prepareFrame = function (t) {
    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1);
  }, ITextElement.prototype.createPathShape = function (t, e) {
    var i,
        r,
        s = e.length,
        a = "";for (i = 0; i < s; i += 1) {
      r = e[i].ks.k, a += this.buildShapeString(r, r.i.length, !0, t);
    }return a;
  }, ITextElement.prototype.updateDocumentData = function (t, e) {
    this.textProperty.updateDocumentData(t, e), this.buildNewText(), this.renderInnerContent();
  }, ITextElement.prototype.canResizeFont = function (t) {
    this.textProperty.canResizeFont(t), this.buildNewText(), this.renderInnerContent();
  }, ITextElement.prototype.setMinimumFontSize = function (t) {
    this.textProperty.setMinimumFontSize(t), this.buildNewText(), this.renderInnerContent();
  }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, i, r, s) {
    switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {case 1:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);break;case 2:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0);}e.translate(r, s, 0);
  }, ITextElement.prototype.buildColor = function (t) {
    return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
  }, ITextElement.prototype.buildShapeString = IShapeElement.prototype.buildShapeString, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, i) {
    this.initFrame(), this.initBaseData(t, e, i), this.initTransform(t, e, i), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.addMasks(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
  }, ICompElement.prototype.prepareFrame = function (t) {
    if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
      if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
        var e = this.tm.v;e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
      }var i,
          r = this.elements.length;for (this.completeLayers || this.checkLayers(this.renderedFrame), i = 0; i < r; i += 1) {
        (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st), this.elements[i]._mdf && (this._mdf = !0));
      }
    }
  }, ICompElement.prototype.renderInnerContent = function () {
    var t,
        e = this.layers.length;for (t = 0; t < e; t += 1) {
      (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
    }
  }, ICompElement.prototype.setElements = function (t) {
    this.elements = t;
  }, ICompElement.prototype.getElements = function () {
    return this.elements;
  }, ICompElement.prototype.destroyElements = function () {
    var t,
        e = this.layers.length;for (t = 0; t < e; t += 1) {
      this.elements[t] && this.elements[t].destroy();
    }
  }, ICompElement.prototype.destroy = function () {
    this.destroyElements(), this.destroyBaseElement();
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData);this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", "xMidYMid slice"), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
  }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
    var t = createNS("rect");t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
  }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
    this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
  }, SVGTextElement.prototype.buildNewText = function () {
    var t,
        e,
        i = this.textProperty.currentData;this.renderedLetters = createSizedArray(i ? i.l.length : 0), i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)), this.layerElement.setAttribute("stroke-width", i.sw)), this.layerElement.setAttribute("font-size", i.finalSize);var r = this.globalData.fontManager.getFontByName(i.f);if (r.fClass) this.layerElement.setAttribute("class", r.fClass);else {
      this.layerElement.setAttribute("font-family", r.fFamily);var s = i.fWeight,
          a = i.fStyle;this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s);
    }var n = i.l || [],
        o = this.globalData.fontManager.chars;if (e = n.length) {
      var h,
          l,
          p = this.mHelper,
          m = "",
          f = this.data.singleShape,
          c = 0,
          d = 0,
          u = !0,
          y = i.tr / 1e3 * i.finalSize;if (!f || o || i.sz) {
        var g,
            v,
            b = this.textSpans.length;for (t = 0; t < e; t += 1) {
          o && f && 0 !== t || (h = b > t ? this.textSpans[t] : createNS(o ? "path" : "text"), b <= t && (h.setAttribute("stroke-linecap", "butt"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = h, this.layerElement.appendChild(h)), h.style.display = "inherit"), p.reset(), p.scale(i.finalSize / 100, i.finalSize / 100), f && (n[t].n && (c = -y, d += i.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(i, p, n[t].line, c, d), c += n[t].l || 0, c += y), o ? (v = this.globalData.fontManager.getCharData(i.finalText.charAt(t), r.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily), g = v && v.data || {}, l = g.shapes ? g.shapes[0].it : [], f ? m += this.createPathShape(p, l) : h.setAttribute("d", this.createPathShape(p, l))) : (f && h.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), h.textContent = n[t].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
        }f && h.setAttribute("d", m);
      } else {
        var E = this.textContainer,
            P = "start";switch (i.j) {case 1:
            P = "end";break;case 2:
            P = "middle";}E.setAttribute("text-anchor", P), E.setAttribute("letter-spacing", y);var x = i.finalText.split(String.fromCharCode(13));for (e = x.length, d = i.ps ? i.ps[1] + i.ascent : 0, t = 0; t < e; t += 1) {
          h = this.textSpans[t] || createNS("tspan"), h.textContent = x[t], h.setAttribute("x", 0), h.setAttribute("y", d), h.style.display = "inherit", E.appendChild(h), this.textSpans[t] = h, d += i.finalLineHeight;
        }this.layerElement.appendChild(E);
      }for (; t < this.textSpans.length;) {
        this.textSpans[t].style.display = "none", t += 1;
      }this._sizeChanged = !0;
    }
  }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
    if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
      this._sizeChanged = !1;var e = this.layerElement.getBBox();this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height };
    }return this.bbox;
  }, SVGTextElement.prototype.renderInnerContent = function () {
    if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
      this._sizeChanged = !0;var t,
          e,
          i = this.textAnimator.renderedLetters,
          r = this.textProperty.currentData.l;e = r.length;var s, a;for (t = 0; t < e; t += 1) {
        r[t].n || (s = i[t], a = this.textSpans[t], s._mdf.m && a.setAttribute("transform", s.m), s._mdf.o && a.setAttribute("opacity", s.o), s._mdf.sw && a.setAttribute("stroke-width", s.sw), s._mdf.sc && a.setAttribute("stroke", s.sc), s._mdf.fc && a.setAttribute("fill", s.fc));
      }
    }
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, this.dynamicProperties, 0, [], !0);
  }, SVGShapeElement.prototype.createStyleElement = function (t, e, i) {
    var r,
        s = new SVGStyleData(t, e),
        a = s.pElem;if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i, s);else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i, s);else if ("gf" === t.ty || "gs" === t.ty) {
      var n = "gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;r = new n(this, t, i, s), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), a.setAttribute("mask", "url(#" + r.maskId + ")"));
    }return "st" !== t.ty && "gs" !== t.ty || (a.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), a.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), a.setAttribute("fill-opacity", "0"), 1 === t.lj && a.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && a.setAttribute("fill-rule", "evenodd"), t.ln && a.setAttribute("id", t.ln), t.cl && a.setAttribute("class", t.cl), this.stylesList.push(s), r;
  }, SVGShapeElement.prototype.createGroupElement = function (t) {
    var e = new ShapeGroupData();return t.ln && e.gr.setAttribute("id", t.ln), e;
  }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
    return new SVGTransformData(TransformPropertyFactory.getTransformProperty(this, t, e), PropertyFactory.getProp(this, t.o, 0, .01, e));
  }, SVGShapeElement.prototype.createShapeElement = function (t, e, i, r) {
    var s = 4;"rc" === t.ty ? s = 5 : "el" === t.ty ? s = 6 : "sr" === t.ty && (s = 7);var a = ShapePropertyFactory.getShapeProp(this, t, s, r),
        n = new SVGShapeData(e, i, a);return this.shapes.push(n.sh), this.addShapeToModifiers(n), n;
  }, SVGShapeElement.prototype.setElementStyles = function (t) {
    var e,
        i = t.styles,
        r = this.stylesList.length;for (e = 0; e < r; e += 1) {
      this.stylesList[e].closed || i.push(this.stylesList[e]);
    }
  }, SVGShapeElement.prototype.reloadShapes = function () {
    this._isFirstFrame = !0;var t,
        e = this.itemsData.length;for (t = 0; t < e; t += 1) {
      this.prevViewData[t] = this.itemsData[t];
    }for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, this.dynamicProperties, 0, [], !0), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
      this.dynamicProperties[t].getValue();
    }this.renderModifiers();
  }, SVGShapeElement.prototype.searchShapes = function (t, e, i, r, s, a, n, o) {
    var h,
        l,
        p,
        m,
        f,
        c,
        d = [].concat(n),
        u = t.length - 1,
        y = [],
        g = [];for (h = u; h >= 0; h -= 1) {
      if (c = this.searchProcessedElement(t[h]), c ? e[h] = i[c - 1] : t[h]._render = o, "fl" == t[h].ty || "st" == t[h].ty || "gf" == t[h].ty || "gs" == t[h].ty) c ? e[h].style.closed = !1 : e[h] = this.createStyleElement(t[h], a, s), t[h]._render && r.appendChild(e[h].style.pElem), y.push(e[h].style);else if ("gr" == t[h].ty) {
        if (c) for (p = e[h].it.length, l = 0; l < p; l += 1) {
          e[h].prevViewData[l] = e[h].it[l];
        } else e[h] = this.createGroupElement(t[h]);this.searchShapes(t[h].it, e[h].it, e[h].prevViewData, e[h].gr, s, a + 1, d, o), t[h]._render && r.appendChild(e[h].gr);
      } else "tr" == t[h].ty ? (c || (e[h] = this.createTransformElement(t[h], s)), m = e[h].transform, d.push(m)) : "sh" == t[h].ty || "rc" == t[h].ty || "el" == t[h].ty || "sr" == t[h].ty ? (c || (e[h] = this.createShapeElement(t[h], d, a, s)), this.setElementStyles(e[h])) : "tm" == t[h].ty || "rd" == t[h].ty || "ms" == t[h].ty ? (c ? (f = e[h], f.closed = !1) : (f = ShapeModifiers.getModifier(t[h].ty), f.init(this, t[h], s), e[h] = f, this.shapeModifiers.push(f)), g.push(f)) : "rp" == t[h].ty && (c ? (f = e[h], f.closed = !0) : (f = ShapeModifiers.getModifier(t[h].ty), e[h] = f, f.init(this, t, h, e, s), this.shapeModifiers.push(f), o = !1), g.push(f));this.addProcessedElement(t[h], h + 1);
    }for (u = y.length, h = 0; h < u; h += 1) {
      y[h].closed = !0;
    }for (u = g.length, h = 0; h < u; h += 1) {
      g[h].closed = !0;
    }
  }, SVGShapeElement.prototype.renderInnerContent = function () {
    this.renderModifiers();var t,
        e = this.stylesList.length;for (t = 0; t < e; t += 1) {
      this.stylesList[t].reset();
    }for (this.renderShape(this.shapesData, this.itemsData, this.layerElement), t = 0; t < e; t += 1) {
      (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
    }
  }, SVGShapeElement.prototype.renderShape = function (t, e, i) {
    var r,
        s,
        a = t.length - 1;for (r = 0; r <= a; r += 1) {
      s = t[r].ty, "tr" == s ? ((this._isFirstFrame || e[r].transform.op._mdf) && i.setAttribute("opacity", e[r].transform.op.v), (this._isFirstFrame || e[r].transform.mProps._mdf) && i.setAttribute("transform", e[r].transform.mProps.v.to2dCSS())) : !t[r]._render || "sh" != s && "el" != s && "rc" != s && "sr" != s ? "fl" == s ? this.renderFill(t[r], e[r]) : "gf" == s ? this.renderGradient(t[r], e[r]) : "gs" == s ? (this.renderGradient(t[r], e[r]), this.renderStroke(t[r], e[r])) : "st" == s ? this.renderStroke(t[r], e[r]) : "gr" == s && this.renderShape(t[r].it, e[r].it, e[r].gr) : this.renderPath(e[r]);
    }
  }, SVGShapeElement.prototype.renderPath = function (t) {
    var e,
        i,
        r,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m,
        f = t.styles.length,
        c = t.lvl;for (n = 0; n < f; n += 1) {
      if (s = t.sh._mdf || this._isFirstFrame, t.styles[n].lvl < c) for (h = this.mHelper.reset(), p = c - t.styles[n].lvl, m = t.transformers.length - 1; p > 0;) {
        s = t.transformers[m].mProps._mdf || s, l = t.transformers[m].mProps.v.props, h.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], l[12], l[13], l[14], l[15]), p--, m--;
      } else h = this.identityMatrix;if (o = t.sh.paths, i = o._length, s) {
        for (r = "", e = 0; e < i; e += 1) {
          a = o.shapes[e], a && a._length && (r += this.buildShapeString(a, a._length, a.c, h));
        }t.caches[n] = r;
      } else r = t.caches[n];t.styles[n].d += r, t.styles[n]._mdf = s || t.styles[n]._mdf;
    }
  }, SVGShapeElement.prototype.renderFill = function (t, e) {
    var i = e.style;(e.c._mdf || this._isFirstFrame) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || this._isFirstFrame) && i.pElem.setAttribute("fill-opacity", e.o.v);
  }, SVGShapeElement.prototype.renderGradient = function (t, e) {
    var i = e.gf,
        r = e.g._hasOpacity,
        s = e.s.v,
        a = e.e.v;if (e.o._mdf || this._isFirstFrame) {
      var n = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";e.style.pElem.setAttribute(n, e.o.v);
    }if (e.s._mdf || this._isFirstFrame) {
      var o = 1 === t.t ? "x1" : "cx",
          h = "x1" === o ? "y1" : "cy";i.setAttribute(o, s[0]), i.setAttribute(h, s[1]), r && !e.g._collapsable && (e.of.setAttribute(o, s[0]), e.of.setAttribute(h, s[1]));
    }var l, p, m, f;if (e.g._cmdf || this._isFirstFrame) {
      l = e.cst;var c = e.g.c;for (m = l.length, p = 0; p < m; p += 1) {
        f = l[p], f.setAttribute("offset", c[4 * p] + "%"), f.setAttribute("stop-color", "rgb(" + c[4 * p + 1] + "," + c[4 * p + 2] + "," + c[4 * p + 3] + ")");
      }
    }if (r && (e.g._omdf || this._isFirstFrame)) {
      var d = e.g.o;for (l = e.g._collapsable ? e.cst : e.ost, m = l.length, p = 0; p < m; p += 1) {
        f = l[p], e.g._collapsable || f.setAttribute("offset", d[2 * p] + "%"), f.setAttribute("stop-opacity", d[2 * p + 1]);
      }
    }if (1 === t.t) (e.e._mdf || this._isFirstFrame) && (i.setAttribute("x2", a[0]), i.setAttribute("y2", a[1]), r && !e.g._collapsable && (e.of.setAttribute("x2", a[0]), e.of.setAttribute("y2", a[1])));else {
      var u;if ((e.s._mdf || e.e._mdf || this._isFirstFrame) && (u = Math.sqrt(Math.pow(s[0] - a[0], 2) + Math.pow(s[1] - a[1], 2)), i.setAttribute("r", u), r && !e.g._collapsable && e.of.setAttribute("r", u)), e.e._mdf || e.h._mdf || e.a._mdf || this._isFirstFrame) {
        u || (u = Math.sqrt(Math.pow(s[0] - a[0], 2) + Math.pow(s[1] - a[1], 2)));var y = Math.atan2(a[1] - s[1], a[0] - s[0]),
            g = e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v,
            v = u * g,
            b = Math.cos(y + e.a.v) * v + s[0],
            E = Math.sin(y + e.a.v) * v + s[1];i.setAttribute("fx", b), i.setAttribute("fy", E), r && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E));
      }
    }
  }, SVGShapeElement.prototype.renderStroke = function (t, e) {
    var i = e.style,
        r = e.d;r && (r._mdf || this._isFirstFrame) && (i.pElem.setAttribute("stroke-dasharray", r.dashStr), i.pElem.setAttribute("stroke-dashoffset", r.dashoffset[0])), e.c && (e.c._mdf || this._isFirstFrame) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || this._isFirstFrame) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || this._isFirstFrame) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
  }, SVGShapeElement.prototype.destroy = function () {
    this.destroyBaseElement(), this.shapeData = null, this.itemsData = null;
  }, SVGTintFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
          i = this.filterManager.effectElements[1].p.v,
          r = this.filterManager.effectElements[2].p.v / 100;this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
    }
  }, SVGFillFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[2].p.v,
          i = this.filterManager.effectElements[6].p.v;this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
    }
  }, SVGStrokeEffect.prototype.initialize = function () {
    var t,
        e,
        i,
        r,
        s = this.elem.layerElement.children || this.elem.layerElement.childNodes;for (1 === this.filterManager.effectElements[1].p.v ? (r = this.elem.maskManager.masksProperties.length, i = 0) : (i = this.filterManager.effectElements[0].p.v - 1, r = i + 1), e = createNS("g"), e.setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1), i; i < r; i += 1) {
      t = createNS("path"), e.appendChild(t), this.paths.push({ p: t, m: i });
    }if (3 === this.filterManager.effectElements[10].p.v) {
      var a = createNS("mask"),
          n = "stms_" + randomString(10);a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);var o = createNS("g");o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"), s[0] && o.appendChild(s[0]), this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff");
    } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
      if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) {
        this.elem.layerElement.removeChild(s[0]);
      }this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
    }this.initialized = !0, this.pathMasker = e;
  }, SVGStrokeEffect.prototype.renderFrame = function (t) {
    this.initialized || this.initialize();var e,
        i,
        r,
        s = this.paths.length;for (e = 0; e < s; e += 1) {
      if (i = this.elem.maskManager.viewData[this.paths[e].m], r = this.paths[e].p, (t || this.filterManager._mdf || i.prop._mdf) && r.setAttribute("d", i.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf) {
        var a;if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
          var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
              o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
              h = r.getTotalLength();a = "0 0 0 " + h * n + " ";var l,
              p = h * (o - n),
              m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
              f = Math.floor(p / m);for (l = 0; l < f; l += 1) {
            a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
          }a += "0 " + 10 * h + " 0 0";
        } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;r.setAttribute("stroke-dasharray", a);
      }
    }if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
      var c = this.filterManager.effectElements[3].p.v;this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")");
    }
  }, SVGTritoneFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
          i = this.filterManager.effectElements[1].p.v,
          r = this.filterManager.effectElements[2].p.v,
          s = r[0] + " " + i[0] + " " + e[0],
          a = r[1] + " " + i[1] + " " + e[1],
          n = r[2] + " " + i[2] + " " + e[2];this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
    }
  }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
    var i = createNS(t);return i.setAttribute("type", "table"), e.appendChild(i), i;
  }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, i, r, s) {
    for (var a, n, o = 0, h = 256, l = Math.min(t, e), p = Math.max(t, e), m = Array.call(null, { length: h }), f = 0, c = s - r, d = e - t; o <= 256;) {
      a = o / 256, n = a <= l ? d < 0 ? s : r : a >= p ? d < 0 ? r : s : r + c * Math.pow((a - t) / d, 1 / i), m[f++] = n, o += 256 / (h - 1);
    }return m.join(" ");
  }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e,
          i = this.filterManager.effectElements;this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v), this.feFuncA.setAttribute("tableValues", e));
    }
  }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
        var e = this.filterManager.effectElements[0].p.v;this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
      }if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
        var i = this.filterManager.effectElements[3].p.v,
            r = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
            s = i * Math.cos(r),
            a = i * Math.sin(r);this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a);
      }
    }
  };var _svgMatteSymbols = [],
      _svgMatteMaskCounter = 0;SVGMatte3Effect.prototype.findSymbol = function (t) {
    for (var e = 0, i = _svgMatteSymbols.length; e < i;) {
      if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];e += 1;
    }return null;
  }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
    var i = t.layerElement.parentNode;if (i) {
      for (var r = i.children, s = 0, a = r.length; s < a && r[s] !== t.layerElement;) {
        s += 1;
      }var n;s <= a - 2 && (n = r[s + 1]);var o = createNS("use");o.setAttribute("href", "#" + e), n ? i.insertBefore(o, n) : i.appendChild(o);
    }
  }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
    if (!this.findSymbol(e)) {
      var i = "matte_" + randomString(5) + "_" + _svgMatteMaskCounter++,
          r = createNS("mask");r.setAttribute("id", e.layerId), r.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);var s = t.globalData.defs;s.appendChild(r);var a = createNS("symbol");a.setAttribute("id", i), this.replaceInParent(e, i), a.appendChild(e.layerElement), s.appendChild(a), useElem = createNS("use"), useElem.setAttribute("href", "#" + i), r.appendChild(useElem), e.data.hd = !1, e.show();
    }t.setMatte(e.layerId);
  }, SVGMatte3Effect.prototype.initialize = function () {
    for (var t = this.filterManager.effectElements[0].p.v, e = 0, i = this.elem.comp.elements.length; e < i;) {
      this.elem.comp.elements[e].data.ind === t && this.setElementAsMask(this.elem, this.elem.comp.elements[e]), e += 1;
    }this.initialized = !0;
  }, SVGMatte3Effect.prototype.renderFrame = function () {
    this.initialized || this.initialize();
  }, SVGEffects.prototype.renderFrame = function (t) {
    var e,
        i = this.filters.length;for (e = 0; e < i; e += 1) {
      this.filters[e].renderFrame(t);
    }
  };var animationManager = function () {
    function t(t) {
      for (var e = 0, i = t.target; e < x;) {
        E[e].animation === i && (E.splice(e, 1), e -= 1, x -= 1, i.isPaused || r()), e += 1;
      }
    }function e(t, e) {
      if (!t) return null;for (var i = 0; i < x;) {
        if (E[i].elem == t && null !== E[i].elem) return E[i].animation;i += 1;
      }var r = new AnimationItem();return s(r, t), r.setData(t, e), r;
    }function i() {
      _ += 1, v();
    }function r() {
      _ -= 1, 0 === _ && (S = !0);
    }function s(e, s) {
      e.addEventListener("destroy", t), e.addEventListener("_active", i), e.addEventListener("_idle", r), E.push({ elem: s, animation: e }), x += 1;
    }function a(t) {
      var e = new AnimationItem();return s(e, null), e.setParams(t), e;
    }function n(t, e) {
      var i;for (i = 0; i < x; i += 1) {
        E[i].animation.setSpeed(t, e);
      }
    }function o(t, e) {
      var i;for (i = 0; i < x; i += 1) {
        E[i].animation.setDirection(t, e);
      }
    }function h(t) {
      var e;for (e = 0; e < x; e += 1) {
        E[e].animation.play(t);
      }
    }function l(t) {
      var e,
          i = t - P;for (e = 0; e < x; e += 1) {
        E[e].animation.advanceTime(i);
      }P = t, S ? C = !0 : window.requestAnimationFrame(l);
    }function p(t) {
      P = t, window.requestAnimationFrame(l);
    }function m(t) {
      var e;for (e = 0; e < x; e += 1) {
        E[e].animation.pause(t);
      }
    }function f(t, e, i) {
      var r;for (r = 0; r < x; r += 1) {
        E[r].animation.goToAndStop(t, e, i);
      }
    }function c(t) {
      var e;for (e = 0; e < x; e += 1) {
        E[e].animation.stop(t);
      }
    }function d(t) {
      var e;for (e = 0; e < x; e += 1) {
        E[e].animation.togglePause(t);
      }
    }function u(t) {
      var e;for (e = x - 1; e >= 0; e -= 1) {
        E[e].animation.destroy(t);
      }
    }function y(t, i, r) {
      var s,
          a = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
          n = a.length;for (s = 0; s < n; s += 1) {
        r && a[s].setAttribute("data-bm-type", r), e(a[s], t);
      }if (i && 0 === n) {
        r || (r = "svg");var o = document.getElementsByTagName("body")[0];o.innerHTML = "";var h = createTag("div");h.style.width = "100%", h.style.height = "100%", h.setAttribute("data-bm-type", r), o.appendChild(h), e(h, t);
      }
    }function g() {
      var t;for (t = 0; t < x; t += 1) {
        E[t].animation.resize();
      }
    }function v() {
      S && (S = !1, C && (window.requestAnimationFrame(p), C = !1));
    }var b = {},
        E = [],
        P = 0,
        x = 0,
        S = !0,
        _ = 0,
        C = !0;return b.registerAnimation = e, b.loadAnimation = a, b.setSpeed = n, b.setDirection = o, b.play = h, b.pause = m, b.stop = c, b.togglePause = d, b.searchAnimations = y, b.resize = g, b.goToAndStop = f, b.destroy = u, b;
  }(),
      AnimationItem = function AnimationItem() {
    this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.pendingElements = 0, this.playCount = 0, this.animationData = {}, this.layers = [], this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = randomString(10), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this.projectInterface = ProjectInterface();
  };extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
    var e = this;t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);var i = t.animType ? t.animType : t.renderer ? t.renderer : "svg";switch (i) {case "canvas":
        this.renderer = new CanvasRenderer(this, t.rendererSettings);break;case "svg":
        this.renderer = new SVGRenderer(this, t.rendererSettings);break;default:
        this.renderer = new HybridRenderer(this, t.rendererSettings);}if (this.renderer.setProjectInterface(this.projectInterface), this.animType = i, "" === t.loop || null === t.loop || (t.loop === !1 ? this.loop = !1 : t.loop === !0 ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, t.animationData) e.configAnimation(t.animationData);else if (t.path) {
      "json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"), t.path += "data.json");var r = new XMLHttpRequest();t.path.lastIndexOf("\\") != -1 ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.assetsPath = t.assetsPath, this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), r.open("GET", t.path, !0), r.send(), r.onreadystatechange = function () {
        if (4 == r.readyState) if (200 == r.status) e.configAnimation(JSON.parse(r.responseText));else try {
          var t = JSON.parse(r.responseText);e.configAnimation(t);
        } catch (i) {}
      };
    }
  }, AnimationItem.prototype.setData = function (t, e) {
    var i = { wrapper: t, animationData: e ? "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : JSON.parse(e) : null },
        r = t.attributes;i.path = r.getNamedItem("data-animation-path") ? r.getNamedItem("data-animation-path").value : r.getNamedItem("data-bm-path") ? r.getNamedItem("data-bm-path").value : r.getNamedItem("bm-path") ? r.getNamedItem("bm-path").value : "", i.animType = r.getNamedItem("data-anim-type") ? r.getNamedItem("data-anim-type").value : r.getNamedItem("data-bm-type") ? r.getNamedItem("data-bm-type").value : r.getNamedItem("bm-type") ? r.getNamedItem("bm-type").value : r.getNamedItem("data-bm-renderer") ? r.getNamedItem("data-bm-renderer").value : r.getNamedItem("bm-renderer") ? r.getNamedItem("bm-renderer").value : "canvas";var s = r.getNamedItem("data-anim-loop") ? r.getNamedItem("data-anim-loop").value : r.getNamedItem("data-bm-loop") ? r.getNamedItem("data-bm-loop").value : r.getNamedItem("bm-loop") ? r.getNamedItem("bm-loop").value : "";"" === s || ("false" === s ? i.loop = !1 : "true" === s ? i.loop = !0 : i.loop = parseInt(s));var a = r.getNamedItem("data-anim-autoplay") ? r.getNamedItem("data-anim-autoplay").value : r.getNamedItem("data-bm-autoplay") ? r.getNamedItem("data-bm-autoplay").value : !r.getNamedItem("bm-autoplay") || r.getNamedItem("bm-autoplay").value;i.autoplay = "false" !== a, i.name = r.getNamedItem("data-name") ? r.getNamedItem("data-name").value : r.getNamedItem("data-bm-name") ? r.getNamedItem("data-bm-name").value : r.getNamedItem("bm-name") ? r.getNamedItem("bm-name").value : "";var n = r.getNamedItem("data-anim-prerender") ? r.getNamedItem("data-anim-prerender").value : r.getNamedItem("data-bm-prerender") ? r.getNamedItem("data-bm-prerender").value : r.getNamedItem("bm-prerender") ? r.getNamedItem("bm-prerender").value : "";"false" === n && (i.prerender = !1), this.setParams(i);
  }, AnimationItem.prototype.includeLayers = function (t) {
    t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip), this.animationData.tf = this.totalFrames);var e,
        i,
        r = this.animationData.layers,
        s = r.length,
        a = t.layers,
        n = a.length;for (i = 0; i < n; i += 1) {
      for (e = 0; e < s;) {
        if (r[e].id == a[i].id) {
          r[e] = a[i];break;
        }e += 1;
      }
    }if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) {
      this.animationData.assets.push(t.assets[e]);
    }this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.renderFrame(-1), this.loadNextSegment();
  }, AnimationItem.prototype.loadNextSegment = function () {
    var t = this.animationData.segments;if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.animationData.tf);var e = t.shift();this.timeCompleted = e.time * this.frameRate;var i = new XMLHttpRequest(),
        r = this,
        s = this.path + this.fileName + "_" + this.segmentPos + ".json";this.segmentPos += 1, i.open("GET", s, !0), i.send(), i.onreadystatechange = function () {
      if (4 == i.readyState) if (200 == i.status) r.includeLayers(JSON.parse(i.responseText));else try {
        var t = JSON.parse(i.responseText);r.includeLayers(t);
      } catch (e) {}
    };
  }, AnimationItem.prototype.loadSegments = function () {
    var t = this.animationData.segments;t || (this.timeCompleted = this.animationData.tf), this.loadNextSegment();
  }, AnimationItem.prototype.configAnimation = function (t) {
    var e = this;this.renderer && this.renderer.destroyed || (this.animationData = t, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.animationData.tf = this.totalFrames, this.renderer.configAnimation(t), t.assets || (t.assets = []), t.comps && (t.assets = t.assets.concat(t.comps), t.comps = null), this.renderer.searchExtraCompositions(t.assets), this.layers = this.animationData.layers, this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.imagePreloader = new ImagePreloader(), this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(t.assets, function (t) {
      t || e.trigger("loaded_images");
    }), this.loadSegments(), this.updaFrameModifier(), this.renderer.globalData.fontManager ? this.waitForFontsLoaded() : (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()));
  }, AnimationItem.prototype.waitForFontsLoaded = function () {
    function t() {
      this.renderer.globalData.fontManager.loaded ? (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()) : setTimeout(t.bind(this), 20);
    }return function () {
      t.bind(this)();
    };
  }(), AnimationItem.prototype.addPendingElement = function () {
    this.pendingElements += 1;
  }, AnimationItem.prototype.elementLoaded = function () {
    this.pendingElements--, this.checkLoaded();
  }, AnimationItem.prototype.checkLoaded = function () {
    0 === this.pendingElements && (expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
      this.trigger("DOMLoaded");
    }.bind(this), 0), this.isLoaded = !0, this.gotoFrame(), this.autoplay && this.play());
  }, AnimationItem.prototype.resize = function () {
    this.renderer.updateContainerSize();
  }, AnimationItem.prototype.setSubframe = function (t) {
    this.subframeEnabled = !!t;
  }, AnimationItem.prototype.gotoFrame = function () {
    this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
  }, AnimationItem.prototype.renderFrame = function () {
    this.isLoaded !== !1 && this.renderer.renderFrame(this.currentFrame + this.firstFrame);
  }, AnimationItem.prototype.play = function (t) {
    t && this.name != t || this.isPaused === !0 && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")));
  }, AnimationItem.prototype.pause = function (t) {
    t && this.name != t || this.isPaused === !1 && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"));
  }, AnimationItem.prototype.togglePause = function (t) {
    t && this.name != t || (this.isPaused === !0 ? this.play() : this.pause());
  }, AnimationItem.prototype.stop = function (t) {
    t && this.name != t || (this.pause(), this.playCount = 0, this.setCurrentRawFrameValue(0));
  }, AnimationItem.prototype.goToAndStop = function (t, e, i) {
    i && this.name != i || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
  }, AnimationItem.prototype.goToAndPlay = function (t, e, i) {
    this.goToAndStop(t, e, i), this.play();
  }, AnimationItem.prototype.advanceTime = function (t) {
    if (this.isPaused !== !0 && this.isLoaded !== !1) {
      var e = this.currentRawFrame + t * this.frameModifier,
          i = !1;e >= this.totalFrames ? this.checkSegments(e % this.totalFrames) || (this.loop && ++this.playCount !== this.loop ? (this.setCurrentRawFrameValue(e % this.totalFrames), this.trigger("loopComplete")) : (i = !0, e = this.totalFrames)) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && this.loop !== !0 ? (i = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e), i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
    }
  }, AnimationItem.prototype.adjustSegment = function (t, e) {
    this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
  }, AnimationItem.prototype.setSegment = function (t, e) {
    var i = -1;this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)), this.firstFrame = t, this.totalFrames = e - t, i !== -1 && this.goToAndStop(i, !0);
  }, AnimationItem.prototype.playSegments = function (t, e) {
    if ("object" == _typeof(t[0])) {
      var i,
          r = t.length;for (i = 0; i < r; i += 1) {
        this.segments.push(t[i]);
      }
    } else this.segments.push(t);e && this.checkSegments(0), this.isPaused && this.play();
  }, AnimationItem.prototype.resetSegments = function (t) {
    this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
  }, AnimationItem.prototype.checkSegments = function (t) {
    return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
  }, AnimationItem.prototype.remove = function (t) {
    t && this.name != t || this.renderer.destroy();
  }, AnimationItem.prototype.destroy = function (t) {
    t && this.name != t || this.renderer && this.renderer.destroyed || (this.renderer.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
  }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
    this.currentRawFrame = t, this.gotoFrame();
  }, AnimationItem.prototype.setSpeed = function (t) {
    this.playSpeed = t, this.updaFrameModifier();
  }, AnimationItem.prototype.setDirection = function (t) {
    this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
  }, AnimationItem.prototype.updaFrameModifier = function () {
    this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
  }, AnimationItem.prototype.getPath = function () {
    return this.path;
  }, AnimationItem.prototype.getAssetsPath = function (t) {
    var e = "";if (this.assetsPath) {
      var i = t.p;i.indexOf("images/") !== -1 && (i = i.split("/")[1]), e = this.assetsPath + i;
    } else e = this.path, e += t.u ? t.u : "", e += t.p;return e;
  }, AnimationItem.prototype.getAssetData = function (t) {
    for (var e = 0, i = this.assets.length; e < i;) {
      if (t == this.assets[e].id) return this.assets[e];e += 1;
    }
  }, AnimationItem.prototype.hide = function () {
    this.renderer.hide();
  }, AnimationItem.prototype.show = function () {
    this.renderer.show();
  }, AnimationItem.prototype.getAssets = function () {
    return this.assets;
  }, AnimationItem.prototype.trigger = function (t) {
    if (this._cbs && this._cbs[t]) switch (t) {case "enterFrame":
        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult));break;case "loopComplete":
        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));break;case "complete":
        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));break;case "segmentStart":
        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));break;case "destroy":
        this.triggerEvent(t, new BMDestroyEvent(t, this));break;default:
        this.triggerEvent(t);}"enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
  }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
    return new CVShapeElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createText = function (t) {
    return new CVTextElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createImage = function (t) {
    return new CVImageElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createComp = function (t) {
    return new CVCompElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createSolid = function (t) {
    return new CVSolidElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
    if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) {
      if (!this.renderConfig.clearCanvas) return void this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);this.transformMat.cloneFromProps(t);var e = this.contextData.cTr.props;this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);var i = this.contextData.cTr.props;this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]);
    }
  }, CanvasRenderer.prototype.ctxOpacity = function (t) {
    return this.renderConfig.clearCanvas ? (this.contextData.cO *= t < 0 ? 0 : t, void (this.canvasContext.globalAlpha = this.contextData.cO)) : void (this.canvasContext.globalAlpha *= t < 0 ? 0 : t);
  }, CanvasRenderer.prototype.reset = function () {
    return this.renderConfig.clearCanvas ? void this.contextData.reset() : void this.canvasContext.restore();
  }, CanvasRenderer.prototype.save = function (t) {
    if (!this.renderConfig.clearCanvas) return void this.canvasContext.save();t && this.canvasContext.save();var e = this.contextData.cTr.props;this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();var i,
        r = this.contextData.saved[this.contextData.cArrPos];for (i = 0; i < 16; i += 1) {
      r[i] = e[i];
    }this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
  }, CanvasRenderer.prototype.restore = function (t) {
    if (!this.renderConfig.clearCanvas) return void this.canvasContext.restore();t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;var e,
        i = this.contextData.saved[this.contextData.cArrPos],
        r = this.contextData.cTr.props;for (e = 0; e < 16; e += 1) {
      r[e] = i[e];
    }this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]), i = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = i, this.canvasContext.globalAlpha = i;
  }, CanvasRenderer.prototype.configAnimation = function (t) {
    this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context, this.data = t, this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.totalFrames = Math.floor(t.tf), this.globalData.compWidth = t.w, this.globalData.compHeight = t.h, this.globalData.frameRate = t.fr, this.globalData.frameId = 0, this.globalData.compSize = { w: t.w, h: t.h }, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.layers = t.layers, this.transformCanvas = { w: t.w, h: t.h, sx: 0, sy: 0, tx: 0, ty: 0 }, this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, document.body), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.addPendingElement = this.animationItem.addPendingElement.bind(this.animationItem), this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize();
  }, CanvasRenderer.prototype.updateContainerSize = function () {
    this.reset();var t, e;this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr);var i, r;if (this.renderConfig.preserveAspectRatio.indexOf("meet") !== -1 || this.renderConfig.preserveAspectRatio.indexOf("slice") !== -1) {
      var s = this.renderConfig.preserveAspectRatio.split(" "),
          a = s[1] || "meet",
          n = s[0] || "xMidYMid",
          o = n.substr(0, 4),
          h = n.substr(4);i = t / e, r = this.transformCanvas.w / this.transformCanvas.h, r > i && "meet" === a || r < i && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), "xMid" === o && (r < i && "meet" === a || r > i && "slice" === a) ? this.transformCanvas.tx = (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (r < i && "meet" === a || r > i && "slice" === a) ? this.transformCanvas.tx = (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : this.transformCanvas.tx = 0, "YMid" === h && (r > i && "meet" === a || r < i && "slice" === a) ? this.transformCanvas.ty = (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r > i && "meet" === a || r < i && "slice" === a) ? this.transformCanvas.ty = (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : this.transformCanvas.ty = 0;
    } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip();
  }, CanvasRenderer.prototype.destroy = function () {
    this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = "");var t,
        e = this.layers ? this.layers.length : 0;for (t = e - 1; t >= 0; t -= 1) {
      this.elements[t] && this.elements[t].destroy();
    }this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
  }, CanvasRenderer.prototype.renderFrame = function (t) {
    if (!(this.renderedFrame == t && this.renderConfig.clearCanvas === !0 || this.destroyed || t === -1)) {
      this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !1, this.globalData.projectInterface.currentFrame = t;var e,
          i = this.layers.length;for (this.completeLayers || this.checkLayers(t), e = 0; e < i; e++) {
        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
      }if (this.globalData._mdf) {
        for (this.renderConfig.clearCanvas === !0 ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), e = i - 1; e >= 0; e -= 1) {
          (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        }this.renderConfig.clearCanvas !== !0 && this.restore();
      }
    }
  }, CanvasRenderer.prototype.buildItem = function (t) {
    var e = this.elements;if (!e[t] && 99 != this.layers[t].ty) {
      var i = this.createItem(this.layers[t], this, this.globalData);e[t] = i, i.initExpressions();
    }
  }, CanvasRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      var t = this.pendingElements.pop();t.checkParenting();
    }
  }, CanvasRenderer.prototype.hide = function () {
    this.animationItem.container.style.display = "none";
  }, CanvasRenderer.prototype.show = function () {
    this.animationItem.container.style.display = "block";
  }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      var t = this.pendingElements.pop();t.checkParenting();
    }
  }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
    var i = t.getBaseElement();if (i) {
      var r = this.layers[e];if (r.ddd && this.supports3d) this.addTo3dContainer(i, e);else {
        for (var s, a, n, o = 0; o < e;) {
          this.elements[o] && this.elements[o] !== !0 && this.elements[o].getBaseElement && (a = this.elements[o], n = this.layers[o].ddd ? this.getThreeDContainerByPos(o) : a.getBaseElement(), s = n || s), o += 1;
        }s ? r.ddd && this.supports3d || this.layerElement.insertBefore(i, s) : r.ddd && this.supports3d || this.layerElement.appendChild(i);
      }
    }
  }, HybridRenderer.prototype.createShape = function (t) {
    return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createText = function (t) {
    return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createCamera = function (t) {
    return this.camera = new HCameraElement(t, this.globalData, this), this.camera;
  }, HybridRenderer.prototype.createImage = function (t) {
    return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createComp = function (t) {
    return this.supports3d ? new HCompElement(t, this.globalData, this) : new ICompElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createSolid = function (t) {
    return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
    for (var e = 0, i = this.threeDElements.length; e < i;) {
      if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;e += 1;
    }
  }, HybridRenderer.prototype.createThreeDContainer = function (t) {
    var e = createTag("div");styleDiv(e), e.style.width = this.globalData.compSize.w + "px", e.style.height = this.globalData.compSize.h + "px", e.style.transformOrigin = e.style.mozTransformOrigin = e.style.webkitTransformOrigin = "50% 50%";var i = createTag("div");styleDiv(i), i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)", e.appendChild(i), this.resizerElem.appendChild(e);var r = { container: i, perspectiveElem: e, startPos: t, endPos: t };return this.threeDElements.push(r), r;
  }, HybridRenderer.prototype.build3dContainers = function () {
    var t,
        e,
        i = this.layers.length;for (t = 0; t < i; t += 1) {
      this.layers[t].ddd ? (e || (e = this.createThreeDContainer(t)), e.endPos = Math.max(e.endPos, t)) : e = null;
    }
  }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
    for (var i = 0, r = this.threeDElements.length; i < r;) {
      if (e <= this.threeDElements[i].endPos) {
        for (var s, a = this.threeDElements[i].startPos; a < e;) {
          this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
        }s ? this.threeDElements[i].container.insertBefore(t, s) : this.threeDElements[i].container.appendChild(t);break;
      }i += 1;
    }
  }, HybridRenderer.prototype.configAnimation = function (t) {
    var e = createTag("div"),
        i = this.animationItem.wrapper;e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && i.setAttribute("class", this.renderConfig.className), i.appendChild(e), e.style.overflow = "hidden";var r = createNS("svg");r.setAttribute("width", "1"), r.setAttribute("height", "1"), styleDiv(r), this.resizerElem.appendChild(r);var s = createNS("defs");r.appendChild(s), this.globalData.defs = s, this.data = t, this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.compSize = { w: t.w, h: t.h }, this.globalData.frameRate = t.fr, this.layers = t.layers, this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, r), this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
  }, HybridRenderer.prototype.destroy = function () {
    this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;var t,
        e = this.layers ? this.layers.length : 0;for (t = 0; t < e; t++) {
      this.elements[t].destroy();
    }this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, HybridRenderer.prototype.updateContainerSize = function () {
    var t,
        e,
        i,
        r,
        s = this.animationItem.wrapper.offsetWidth,
        a = this.animationItem.wrapper.offsetHeight,
        n = s / a,
        o = this.globalData.compSize.w / this.globalData.compSize.h;o > n ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, i = 0, r = (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, i = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, r = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + i + "," + r + ",0,1)";
  }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
    this.resizerElem.style.display = "none";
  }, HybridRenderer.prototype.show = function () {
    this.resizerElem.style.display = "block";
  }, HybridRenderer.prototype.initItems = function () {
    if (this.buildAllItems(), this.camera) this.camera.setup();else {
      var t,
          e = this.globalData.compSize.w,
          i = this.globalData.compSize.h,
          r = this.threeDElements.length;for (t = 0; t < r; t += 1) {
        this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)) + "px";
      }
    }
  }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
        i = t.length,
        r = createTag("div");for (e = 0; e < i; e += 1) {
      if (t[e].xt) {
        var s = this.createComp(t[e], r, this.globalData.comp, null);s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
      }
    }
  }, CVContextData.prototype.duplicate = function () {
    var t = 2 * this._length,
        e = this.savedOp;this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);var i = 0;for (i = this._length; i < t; i += 1) {
      this.saved[i] = createTypedArray("float32", 16);
    }this._length = t;
  }, CVContextData.prototype.reset = function () {
    this.cArrPos = 0, this.cTr.reset(), this.cO = 1;
  }, CVBaseElement.prototype = { createElements: function createElements() {}, initRendererElement: function initRendererElement() {}, createContainerElements: function createContainerElements() {
      this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this);
    }, createContent: function createContent() {}, setBlendMode: function setBlendMode() {
      var t = this.globalData;if (t.blendMode !== this.data.bm) {
        t.blendMode = this.data.bm;var e = this.getBlendMode();t.canvasContext.globalCompositeOperation = e;
      }
    }, addMasks: function addMasks() {
      this.maskManager = new CVMaskElement(this.data, this, this.dynamicProperties);
    }, hideElement: function hideElement() {
      this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0);
    }, showElement: function showElement() {
      this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
    }, renderFrame: function renderFrame() {
      this.hidden || (this.renderTransform(), this.renderRenderable(), this.setBlendMode(), this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1));
    }, destroy: function destroy() {
      this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
    }, mHelper: new Matrix() }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.imageLoaded = function () {
    if (this.globalData.elementLoaded(), this.assetData.w !== this.img.width || this.assetData.h !== this.img.height) {
      var t = createTag("canvas");t.width = this.assetData.w, t.height = this.assetData.h;var e,
          i,
          r = t.getContext("2d"),
          s = this.img.width,
          a = this.img.height,
          n = s / a,
          o = this.assetData.w / this.assetData.h;n > o ? (i = a, e = i * o) : (e = s, i = e / o), r.drawImage(this.img, (s - e) / 2, (a - i) / 2, e, i, 0, 0, this.assetData.w, this.assetData.h), this.img = t;
    }
  }, CVImageElement.prototype.imageFailed = function () {
    this.failed = !0, this.globalData.elementLoaded();
  }, CVImageElement.prototype.createContent = function () {
    var t = this.img;t.addEventListener("load", this.imageLoaded.bind(this), !1), t.addEventListener("error", this.imageFailed.bind(this), !1);var e = this.globalData.getAssetsPath(this.assetData);t.src = e;
  }, CVImageElement.prototype.renderInnerContent = function (t) {
    this.failed || this.canvasContext.drawImage(this.img, 0, 0);
  }, CVImageElement.prototype.destroy = function () {
    this.img = null;
  }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
    var t,
        e = this.layers.length;for (t = e - 1; t >= 0; t -= 1) {
      (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
    }
  }, CVCompElement.prototype.destroy = function () {
    var t,
        e = this.layers.length;for (t = e - 1; t >= 0; t -= 1) {
      this.elements[t] && this.elements[t].destroy();
    }this.layers = null, this.elements = null;
  }, CVMaskElement.prototype.renderFrame = function (t) {
    if (this.hasMasks) {
      var e,
          i,
          r,
          s,
          a = this.element.canvasContext,
          n = this.masksProperties.length;for (a.beginPath(), e = 0; e < n; e++) {
        if ("n" !== this.masksProperties[e].mode) {
          this.masksProperties[e].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compWidth, 0), a.lineTo(this.element.globalData.compWidth, this.element.globalData.compHeight), a.lineTo(0, this.element.globalData.compHeight), a.lineTo(0, 0)), s = this.viewData[e].v, i = t.applyToPointArray(s.v[0][0], s.v[0][1], 0), a.moveTo(i[0], i[1]);var o,
              h = s._length;for (o = 1; o < h; o++) {
            r = t.applyToTriplePoints(s.o[o - 1], s.i[o], s.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
          }r = t.applyToTriplePoints(s.o[o - 1], s.i[0], s.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
        }
      }this.element.globalData.renderer.save(!0), a.clip();
    }
  }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
    this.element = null;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = { opacity: 1, mat: new Matrix(), _matMdf: !1, _opMdf: !1 }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.dynamicProperties, !0);
  }, CVShapeElement.prototype.createStyleElement = function (t, e) {
    var i = { data: t, type: t.ty, elements: [] },
        r = {};if ("fl" != t.ty && "st" != t.ty || (r.c = PropertyFactory.getProp(this, t.c, 1, 255, e), r.c.k || (i.co = "rgb(" + bm_floor(r.c.v[0]) + "," + bm_floor(r.c.v[1]) + "," + bm_floor(r.c.v[2]) + ")")), r.o = PropertyFactory.getProp(this, t.o, 0, .01, e), "st" == t.ty) {
      if (i.lc = this.lcEnum[t.lc] || "round", i.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (i.ml = t.ml), r.w = PropertyFactory.getProp(this, t.w, 0, null, e), r.w.k || (i.wi = r.w.v), t.d) {
        var s = new DashProperty(this, t.d, "canvas", e);r.d = s, r.d.k || (i.da = r.d.dashArray, i["do"] = r.d.dashoffset[0]);
      }
    } else i.r = 2 === t.r ? "evenodd" : "nonzero";return this.stylesList.push(i), r.style = i, r;
  }, CVShapeElement.prototype.createGroupElement = function (t) {
    var e = { it: [], prevViewData: [] };return e;
  }, CVShapeElement.prototype.createTransformElement = function (t, e) {
    var i = { transform: { mat: new Matrix(), opacity: 1, _matMdf: !1, _opMdf: !1, op: PropertyFactory.getProp(this, t.o, 0, .01, e), mProps: TransformPropertyFactory.getTransformProperty(this, t, e) }, elements: [] };return i;
  }, CVShapeElement.prototype.createShapeElement = function (t, e) {
    var i = { nodes: [], trNodes: [], tr: [0, 0, 0, 0, 0, 0] },
        r = 4;"rc" == t.ty ? r = 5 : "el" == t.ty ? r = 6 : "sr" == t.ty && (r = 7), i.sh = ShapePropertyFactory.getShapeProp(this, t, r, e), this.shapes.push(i.sh), this.addShapeToModifiers(i);var s,
        a = this.stylesList.length,
        n = !1,
        o = !1;for (s = 0; s < a; s += 1) {
      this.stylesList[s].closed || (this.stylesList[s].elements.push(i), "st" === this.stylesList[s].type ? n = !0 : o = !0);
    }return i.st = n, i.fl = o, i;
  }, CVShapeElement.prototype.reloadShapes = function () {
    this._isFirstFrame = !0;var t,
        e = this.itemsData.length;for (t = 0; t < e; t += 1) {
      this.prevViewData[t] = this.itemsData[t];
    }for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.dynamicProperties, !0), e = this.dynamicProperties.length, t = 0; t < e; t += 1) {
      this.dynamicProperties[t].getValue();
    }this.renderModifiers();
  }, CVShapeElement.prototype.searchShapes = function (t, e, i, r, s) {
    var a,
        n,
        o,
        h,
        l,
        p = t.length - 1,
        m = [],
        f = [];for (a = p; a >= 0; a -= 1) {
      if (h = this.searchProcessedElement(t[a]), h ? e[a] = i[h - 1] : t[a]._render = s, "fl" == t[a].ty || "st" == t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], r), m.push(e[a].style);else if ("gr" == t[a].ty) {
        if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) {
          e[a].prevViewData[n] = e[a].it[n];
        } else e[a] = this.createGroupElement(t[a]);this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, r, s);
      } else "tr" == t[a].ty ? h || (e[a] = this.createTransformElement(t[a], r)) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a], r)) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a], l.closed = !1) : (l = ShapeModifiers.getModifier(t[a].ty), l.init(this, t[a], r), e[a] = l, this.shapeModifiers.push(l)), f.push(l)) : "rp" == t[a].ty && (h ? (l = e[a], l.closed = !0) : (l = ShapeModifiers.getModifier(t[a].ty), e[a] = l, l.init(this, t, a, e, r), this.shapeModifiers.push(l), s = !1), f.push(l));this.addProcessedElement(t[a], a + 1);
    }for (p = m.length, a = 0; a < p; a += 1) {
      m[a].closed = !0;
    }for (p = f.length, a = 0; a < p; a += 1) {
      f[a].closed = !0;
    }
  }, CVShapeElement.prototype.renderInnerContent = function () {
    this.transformHelper.mat.reset(), this.transformHelper.opacity = 1, this.transformHelper._matMdf = !1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
  }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
    var i, r;(t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0), (t._opMdf || e.op._mdf || this._isFirstFrame) && (r = e.mat, r.cloneFromProps(e.mProps.v.props), e._matMdf = !0, i = t.mat.props, r.transform(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15]));
  }, CVShapeElement.prototype.drawLayer = function () {
    var t,
        e,
        i,
        r,
        s,
        a,
        n,
        o,
        h,
        l = this.stylesList.length,
        p = this.globalData.renderer,
        m = this.globalData.canvasContext;for (t = 0; t < l; t += 1) {
      if (h = this.stylesList[t], o = h.type, ("st" !== o || 0 !== h.wi) && h.data._render && 0 !== h.coOp) {
        for (p.save(), a = h.elements, "st" === o ? (m.strokeStyle = h.co, m.lineWidth = h.wi, m.lineCap = h.lc, m.lineJoin = h.lj, m.miterLimit = h.ml || 0) : m.fillStyle = h.co, p.ctxOpacity(h.coOp), "st" !== o && m.beginPath(), i = a.length, e = 0; e < i; e += 1) {
          for ("st" === o && (m.beginPath(), h.da ? (m.setLineDash(h.da), m.lineDashOffset = h["do"], this.globalData.isDashed = !0) : this.globalData.isDashed && (m.setLineDash(this.dashResetter), this.globalData.isDashed = !1)), n = a[e].trNodes, s = n.length, r = 0; r < s; r += 1) {
            "m" == n[r].t ? m.moveTo(n[r].p[0], n[r].p[1]) : "c" == n[r].t ? m.bezierCurveTo(n[r].pts[0], n[r].pts[1], n[r].pts[2], n[r].pts[3], n[r].pts[4], n[r].pts[5]) : m.closePath();
          }"st" === o && m.stroke();
        }"st" !== o && m.fill(h.r), p.restore();
      }
    }
  }, CVShapeElement.prototype.renderShape = function (t, e, i, r) {
    var s,
        a,
        n = e.length - 1;for (a = t, s = n; s >= 0; s -= 1) {
      "tr" == e[s].ty ? (a = i[s].transform, this.renderShapeTransform(t, a)) : "sh" == e[s].ty || "el" == e[s].ty || "rc" == e[s].ty || "sr" == e[s].ty ? this.renderPath(e[s], i[s], a) : "fl" == e[s].ty ? this.renderFill(e[s], i[s], a) : "st" == e[s].ty ? this.renderStroke(e[s], i[s], a) : "gr" == e[s].ty ? this.renderShape(a, e[s].it, i[s].it) : "tm" == e[s].ty;
    }r && this.drawLayer();
  }, CVShapeElement.prototype.renderPath = function (t, e, i) {
    var r,
        s,
        a,
        n,
        o = i._matMdf || e.sh._mdf || this._isFirstFrame;if (o) {
      var h = e.sh.paths,
          l = i.mat;n = t._render === !1 ? 0 : h._length;var p = e.trNodes;for (p.length = 0, a = 0; a < n; a += 1) {
        var m = h.shapes[a];if (m && m.v) {
          for (r = m._length, s = 1; s < r; s += 1) {
            1 == s && p.push({ t: "m", p: l.applyToPointArray(m.v[0][0], m.v[0][1], 0) }), p.push({ t: "c", pts: l.applyToTriplePoints(m.o[s - 1], m.i[s], m.v[s]) });
          }1 == r && p.push({ t: "m", p: l.applyToPointArray(m.v[0][0], m.v[0][1], 0) }), m.c && r && (p.push({ t: "c", pts: l.applyToTriplePoints(m.o[s - 1], m.i[0], m.v[0]) }), p.push({ t: "z" })), e.lStr = p;
        }
      }if (e.st) for (s = 0; s < 16; s += 1) {
        e.tr[s] = i.mat.props[s];
      }e.trNodes = p;
    }
  }, CVShapeElement.prototype.renderFill = function (t, e, i) {
    var r = e.style;(e.c._mdf || this._isFirstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i._opMdf || this._isFirstFrame) && (r.coOp = e.o.v * i.opacity);
  }, CVShapeElement.prototype.renderStroke = function (t, e, i) {
    var r = e.style,
        s = e.d;s && (s._mdf || this._isFirstFrame) && (r.da = s.dashArray, r["do"] = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (r.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || i._opMdf || this._isFirstFrame) && (r.coOp = e.o.v * i.opacity), (e.w._mdf || this._isFirstFrame) && (r.wi = e.w.v);
  }, CVShapeElement.prototype.destroy = function () {
    this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
    var t = this.canvasContext;t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh);
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);var e = !1;t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;var i = !1;t.sc && (i = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);var r,
        s,
        a = this.globalData.fontManager.getFontByName(t.f),
        n = t.l,
        o = this.mHelper;this.stroke = i, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;var h,
        l,
        p,
        m,
        f,
        c,
        d,
        u,
        y,
        g,
        v = this.data.singleShape,
        b = t.tr / 1e3 * t.finalSize,
        E = 0,
        P = 0,
        x = !0,
        S = 0;for (r = 0; r < s; r += 1) {
      for (h = this.globalData.fontManager.getCharData(t.finalText.charAt(r), a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily), l = h && h.data || {}, o.reset(), v && n[r].n && (E = -b, P += t.yOffset, P += x ? 1 : 0, x = !1), f = l.shapes ? l.shapes[0].it : [], d = f.length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, n[r].line, E, P), y = createSizedArray(d), c = 0; c < d; c += 1) {
        for (m = f[c].ks.k.i.length, u = f[c].ks.k, g = [], p = 1; p < m; p += 1) {
          1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
        }g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)), y[c] = g;
      }v && (E += n[r].l, E += b), this.textSpans[S] ? this.textSpans[S].elem = y : this.textSpans[S] = { elem: y }, S += 1;
    }
  }, CVTextElement.prototype.renderInnerContent = function () {
    var t = this.canvasContext;this.finalTransform.mat.props;t.font = this.values.fValue, t.lineCap = "butt", t.lineJoin = "miter", t.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);var e,
        i,
        r,
        s,
        a,
        n,
        o = this.textAnimator.renderedLetters,
        h = this.textProperty.currentData.l;i = h.length;var l,
        p,
        m,
        f = null,
        c = null,
        d = null;for (e = 0; e < i; e += 1) {
      if (!h[e].n) {
        if (l = o[e], l && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(l.p), this.globalData.renderer.ctxOpacity(l.o)), this.fill) {
          for (l && l.fc ? f !== l.fc && (f = l.fc, t.fillStyle = l.fc) : f !== this.values.fill && (f = this.values.fill, t.fillStyle = this.values.fill), p = this.textSpans[e].elem, s = p.length, this.globalData.canvasContext.beginPath(), r = 0; r < s; r += 1) {
            for (m = p[r], n = m.length, this.globalData.canvasContext.moveTo(m[0], m[1]), a = 2; a < n; a += 6) {
              this.globalData.canvasContext.bezierCurveTo(m[a], m[a + 1], m[a + 2], m[a + 3], m[a + 4], m[a + 5]);
            }
          }this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
        }if (this.stroke) {
          for (l && l.sw ? d !== l.sw && (d = l.sw, t.lineWidth = l.sw) : d !== this.values.sWidth && (d = this.values.sWidth, t.lineWidth = this.values.sWidth), l && l.sc ? c !== l.sc && (c = l.sc, t.strokeStyle = l.sc) : c !== this.values.stroke && (c = this.values.stroke, t.strokeStyle = this.values.stroke), p = this.textSpans[e].elem, s = p.length, this.globalData.canvasContext.beginPath(), r = 0; r < s; r += 1) {
            for (m = p[r], n = m.length, this.globalData.canvasContext.moveTo(m[0], m[1]), a = 2; a < n; a += 6) {
              this.globalData.canvasContext.bezierCurveTo(m[a], m[a + 1], m[a + 2], m[a + 3], m[a + 4], m[a + 5]);
            }
          }this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
        }l && this.globalData.renderer.restore();
      }
    }
  }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = { checkBlendMode: function checkBlendMode() {}, initRendererElement: function initRendererElement() {
      this.baseElement = createTag("div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement);
    }, createContainerElements: function createContainerElements() {
      this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), 0 !== this.data.bm && this.setBlendMode();
    }, renderElement: function renderElement() {
      this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v);
    }, renderFrame: function renderFrame() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    }, destroy: function destroy() {
      this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null);
    }, addMasks: function addMasks() {
      this.maskManager = new MaskElement(this.data, this, this.globalData, this.dynamicProperties);
    }, setMatte: function setMatte() {} }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
    var t;this.data.hasMask ? (t = createNS("rect"), t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : (t = createTag("div"), t.style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t);
  }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
    this._createBaseContainerElements(), this.data.hasMask && (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h)), this.transformedElement = this.layerElement;
  }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
    var t;if (this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;else {
      t = createNS("svg");var e = this.comp.data ? this.comp.data : this.globalData.compSize;t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
    }this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, this.dynamicProperties, 0, [], !0), this.shapeCont = t;
  }, HShapeElement.prototype.renderInnerContent = function () {
    if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
      var t = this.shapeCont.getBBox(),
          e = !1;this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), e = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), e = !0), (e || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
    if (this.isMasked = this.checkMasks(), this.isMasked) {
      this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);var t = createNS("g");this.maskedElement.appendChild(t), this.innerElem = t;
    } else this.renderType = "html", this.innerElem = this.layerElement;this.checkParenting();
  }, HTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;this.renderedLetters = createSizedArray(this.textProperty.currentData.l ? this.textProperty.currentData.l.length : 0);var e = this.innerElem.style;e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");var i = this.globalData.fontManager.getFontByName(t.f);if (!this.globalData.fontManager.chars) if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", i.fClass) this.innerElem.className = i.fClass;else {
      e.fontFamily = i.fFamily;var r = t.fWeight,
          s = t.fStyle;e.fontStyle = s, e.fontWeight = r;
    }var a,
        n,
        o = t.l;n = o.length;var h,
        l,
        p,
        m,
        f = this.mHelper,
        c = "",
        d = 0;for (a = 0; a < n; a += 1) {
      if (this.globalData.fontManager.chars ? (this.textPaths[d] ? h = this.textPaths[d] : (h = createNS("path"), h.setAttribute("stroke-linecap", "butt"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? (l = this.textSpans[d], p = l.children[0]) : (l = createTag("div"), p = createNS("svg"), p.appendChild(h), styleDiv(l)))) : this.isMasked ? h = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (l = this.textSpans[d], h = this.textPaths[d]) : (l = createTag("span"), styleDiv(l), h = createTag("span"), styleDiv(h), l.appendChild(h)), this.globalData.fontManager.chars) {
        var u,
            y = this.globalData.fontManager.getCharData(t.finalText.charAt(a), i.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);if (u = y ? y.data : null, f.reset(), u && u.shapes && (m = u.shapes[0].it, f.scale(t.finalSize / 100, t.finalSize / 100), c = this.createPathShape(f, m), h.setAttribute("d", c)), this.isMasked) this.innerElem.appendChild(h);else if (this.innerElem.appendChild(l), u && u.shapes) {
          document.body.appendChild(p);var g = p.getBBox();p.setAttribute("width", g.width + 2), p.setAttribute("height", g.height + 2), p.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), p.style.transform = p.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", o[a].yOffset = g.y - 1, l.appendChild(p);
        } else p.setAttribute("width", 1), p.setAttribute("height", 1);
      } else h.textContent = o[a].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(h) : (this.innerElem.appendChild(l), h.style.transform = h.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");this.isMasked ? this.textSpans[d] = h : this.textSpans[d] = l, this.textSpans[d].style.display = "block", this.textPaths[d] = h, d += 1;
    }for (; d < this.textSpans.length;) {
      this.textSpans[d].style.display = "none", d += 1;
    }
  }, HTextElement.prototype.renderInnerContent = function () {
    if (this.data.singleShape) {
      if (!this._isFirstFrame && !this.lettersChangedFlag) return;this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)");
    }if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
      var t,
          e,
          i = 0,
          r = this.textAnimator.renderedLetters,
          s = this.textProperty.currentData.l;e = s.length;var a, n, o;for (t = 0; t < e; t += 1) {
        s[t].n ? i += 1 : (n = this.textSpans[t], o = this.textPaths[t], a = r[i], i += 1, this.isMasked ? n.setAttribute("transform", a.m) : n.style.transform = n.style.webkitTransform = a.m, n.style.opacity = a.o, a.sw && o.setAttribute("stroke-width", a.sw), a.sc && o.setAttribute("stroke", a.sc), a.fc && (o.setAttribute("fill", a.fc), o.style.color = a.fc));
      }if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
        var h = this.innerElem.getBBox();this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));var l = 1;this.currentBBox.w === h.width + 2 * l && this.currentBBox.h === h.height + 2 * l && this.currentBBox.x === h.x - l && this.currentBBox.y === h.y - l || (this.currentBBox.w = h.width + 2 * l, this.currentBBox.h = h.height + 2 * l, this.currentBBox.x = h.x - l, this.currentBBox.y = h.y - l, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)");
      }
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData),
        e = new Image();this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.innerElem.setAttribute("id", this.data.ln);
  }, extendPrototype([BaseElement, FrameElement], HCameraElement), HCameraElement.prototype.setup = function () {
    var t,
        e,
        i = this.comp.threeDElements.length;for (t = 0; t < i; t += 1) {
      e = this.comp.threeDElements[t], e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
    }
  }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
    var t,
        e,
        i = this._isFirstFrame;if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) {
      i = this.hierarchy[t].finalTransform.mProp._mdf || i;
    }if (i || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
      if (this.mat.reset(), this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
        var r = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
            s = Math.sqrt(Math.pow(r[0], 2) + Math.pow(r[1], 2) + Math.pow(r[2], 2)),
            a = [r[0] / s, r[1] / s, r[2] / s],
            n = Math.sqrt(a[2] * a[2] + a[0] * a[0]),
            o = Math.atan2(a[1], n),
            h = Math.atan2(a[0], -a[2]);this.mat.rotateY(h).rotateX(-o);
      }if (this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v), this.hierarchy) {
        var l;for (e = this.hierarchy.length, t = 0; t < e; t += 1) {
          l = this.hierarchy[t].finalTransform.mProp.iv.props, this.mat.transform(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11], -l[12], -l[13], l[14], l[15]);
        }
      }if (!this._prevMat.equals(this.mat)) {
        e = this.comp.threeDElements.length;var p;for (t = 0; t < e; t += 1) {
          p = this.comp.threeDElements[t], p.container.style.transform = p.container.style.webkitTransform = this.mat.toCSS();
        }this.mat.clone(this._prevMat);
      }
    }this._isFirstFrame = !1;
  }, HCameraElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.initExpressions = function () {}, HCameraElement.prototype.getBaseElement = function () {
    return null;
  }, HEffects.prototype.renderFrame = function () {};var Expressions = function () {
    function t(t) {
      t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer);
    }var e = {};return e.initExpressions = t, e;
  }();expressionsPlugin = Expressions;var ExpressionManager = function () {
    function duplicatePropertyValue(t, e) {
      if (e = e || 1, "number" == typeof t || t instanceof Number) return t * e;if (t.i) return shape_pool.clone(t);var i,
          r = createTypedArray("float32", t.length),
          s = t.length;for (i = 0; i < s; i += 1) {
        r[i] = t[i] * e;
      }return r;
    }function isTypeOfArray(t) {
      return t.constructor === Array || t.constructor === Float32Array;
    }function shapesEqual(t, e) {
      if (t._length !== e._length || t.c !== e.c) return !1;var i,
          r = t._length;for (i = 0; i < r; i += 1) {
        if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1]) return !1;
      }return !0;
    }function $bm_neg(t) {
      var e = typeof t === "undefined" ? "undefined" : _typeof(t);if ("number" === e || "boolean" === e || t instanceof Number) return -t;if (isTypeOfArray(t)) {
        var i,
            r = t.length,
            s = [];for (i = 0; i < r; i += 1) {
          s[i] = -t[i];
        }return s;
      }
    }function sum(t, e) {
      var i = typeof t === "undefined" ? "undefined" : _typeof(t),
          r = typeof e === "undefined" ? "undefined" : _typeof(e);if ("string" === i || "string" === r) return t + e;if (("number" === i || "boolean" === i || "string" === i || t instanceof Number) && ("number" === r || "boolean" === r || "string" === r || e instanceof Number)) return t + e;if (isTypeOfArray(t) && ("number" === r || "boolean" === r || "string" === r || e instanceof Number)) return t[0] = t[0] + e, t;if (("number" === i || "boolean" === i || "string" === i || t instanceof Number) && isTypeOfArray(e)) return e[0] = t + e[0], e;if (isTypeOfArray(t) && isTypeOfArray(e)) {
        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
          ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
        }return o;
      }return 0;
    }function sub(t, e) {
      var i = typeof t === "undefined" ? "undefined" : _typeof(t),
          r = typeof e === "undefined" ? "undefined" : _typeof(e);if (("number" === i || "boolean" === i || "string" === i || t instanceof Number) && ("number" === r || "boolean" === r || "string" === r || e instanceof Number)) return "string" === i && (t = parseInt(t)), "string" === r && (e = parseInt(e)), t - e;if (isTypeOfArray(t) && ("number" === r || "boolean" === r || "string" === r || e instanceof Number)) return t[0] = t[0] - e, t;if (("number" === i || "boolean" === i || "string" === i || t instanceof Number) && isTypeOfArray(e)) return e[0] = t - e[0], e;if (isTypeOfArray(t) && isTypeOfArray(e)) {
        for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) {
          "number" == typeof t[s] || t[s] instanceof Number ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
        }return o;
      }return 0;
    }function mul(t, e) {
      var i,
          r = typeof t === "undefined" ? "undefined" : _typeof(t),
          s = typeof e === "undefined" ? "undefined" : _typeof(e);if (("number" === r || "boolean" === r || "string" === r || t instanceof Number) && ("number" === s || "boolean" === s || "string" === s || e instanceof Number)) return t * e;var a, n;if (isTypeOfArray(t) && ("number" === s || "boolean" === s || "string" === s || e instanceof Number)) {
        for (n = t.length, i = createTypedArray("float32", n), a = 0; a < n; a += 1) {
          i[a] = t[a] * e;
        }return i;
      }if (("number" === r || "boolean" === r || "string" === r || t instanceof Number) && isTypeOfArray(e)) {
        for (n = e.length, i = createTypedArray("float32", n), a = 0; a < n; a += 1) {
          i[a] = t * e[a];
        }return i;
      }return 0;
    }function div(t, e) {
      var i,
          r = typeof t === "undefined" ? "undefined" : _typeof(t),
          s = typeof e === "undefined" ? "undefined" : _typeof(e);if (("number" === r || "boolean" === r || "string" === r || t instanceof Number) && ("number" === s || "boolean" === s || "string" === s || e instanceof Number)) return t / e;var a, n;if (isTypeOfArray(t) && ("number" === s || "boolean" === s || "string" === s || e instanceof Number)) {
        for (n = t.length, i = createTypedArray("float32", n), a = 0; a < n; a += 1) {
          i[a] = t[a] / e;
        }return i;
      }if (("number" === r || "boolean" === r || "string" === r || t instanceof Number) && isTypeOfArray(e)) {
        for (n = e.length, i = createTypedArray("float32", n), a = 0; a < n; a += 1) {
          i[a] = t / e[a];
        }return i;
      }return 0;
    }function mod(t, e) {
      return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e;
    }function clamp(t, e, i) {
      if (e > i) {
        var r = i;i = e, e = r;
      }return Math.min(Math.max(t, e), i);
    }function radiansToDegrees(t) {
      return t / degToRads;
    }function degreesToRadians(t) {
      return t * degToRads;
    }function length(t, e) {
      if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);e || (e = helperLengthArray);var i,
          r = Math.min(t.length, e.length),
          s = 0;for (i = 0; i < r; i += 1) {
        s += Math.pow(e[i] - t[i], 2);
      }return Math.sqrt(s);
    }function normalize(t) {
      return div(t, length(t));
    }function rgbToHsl(t) {
      var e,
          i,
          r = t[0],
          s = t[1],
          a = t[2],
          n = Math.max(r, s, a),
          o = Math.min(r, s, a),
          h = (n + o) / 2;if (n == o) e = i = 0;else {
        var l = n - o;switch (i = h > .5 ? l / (2 - n - o) : l / (n + o), n) {case r:
            e = (s - a) / l + (s < a ? 6 : 0);break;case s:
            e = (a - r) / l + 2;break;case a:
            e = (r - s) / l + 4;}e /= 6;
      }return [e, i, h, t[3]];
    }function hue2rgb(t, e, i) {
      return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t;
    }function hslToRgb(t) {
      var e,
          i,
          r,
          s = t[0],
          a = t[1],
          n = t[2];if (0 === a) e = i = r = n;else {
        var o = n < .5 ? n * (1 + a) : n + a - n * a,
            h = 2 * n - o;e = hue2rgb(h, o, s + 1 / 3), i = hue2rgb(h, o, s), r = hue2rgb(h, o, s - 1 / 3);
      }return [e, i, r, t[3]];
    }function linear(t, e, i, r, s) {
      if (void 0 === r || void 0 === s) return linear(t, 0, 1, e, i);if (t <= e) return r;if (t >= i) return s;var a = i === e ? 0 : (t - e) / (i - e);if (!r.length) return r + (s - r) * a;var n,
          o = r.length,
          h = createTypedArray("float32", o);for (n = 0; n < o; n += 1) {
        h[n] = r[n] + (s[n] - r[n]) * a;
      }return h;
    }function random(t, e) {
      if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
        var i,
            r = e.length;t || (t = createTypedArray("float32", r));var s = createTypedArray("float32", r),
            a = BMMath.random();for (i = 0; i < r; i += 1) {
          s[i] = t[i] + a * (e[i] - t[i]);
        }return s;
      }void 0 === t && (t = 0);var n = BMMath.random();return t + n * (e - t);
    }function createPath(t, e, i, r) {
      e = e && e.length ? e : t, i = i && i.length ? i : t;var s,
          a = shape_pool.newElement(),
          n = t.length;for (a.setPathData(r, n), s = 0; s < n; s += 1) {
        a.setTripleAt(t[s][0], t[s][1], i[s][0] + t[s][0], i[s][1] + t[s][1], e[s][0] + t[s][0], e[s][1] + t[s][1], s, !0);
      }return a;
    }function initiateExpression(elem, data, property) {
      function loopInDuration(t, e) {
        return loopIn(t, e, !0);
      }function loopOutDuration(t, e) {
        return loopOut(t, e, !0);
      }function lookAt(t, e) {
        var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
            r = Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) / degToRads,
            s = -Math.atan2(i[1], i[2]) / degToRads;return [s, r, 0];
      }function easeOut(t, e, i, r, s) {
        return void 0 === r ? (r = e, s = i) : t = (t - e) / (i - e), -(s - r) * t * (t - 2) + r;
      }function easeIn(t, e, i, r, s) {
        return void 0 === r ? (r = e, s = i) : t = (t - e) / (i - e), (s - r) * t * t + r;
      }function nearestKey(t) {
        var e,
            i,
            r,
            s = data.k.length;if (data.k.length && "number" != typeof data.k[0]) {
          if (i = -1, t *= elem.comp.globalData.frameRate, t < data.k[0].t) i = 1, r = data.k[0].t;else {
            for (e = 0; e < s - 1; e += 1) {
              if (t === data.k[e].t) {
                i = e + 1, r = data.k[e].t;break;
              }if (t > data.k[e].t && t < data.k[e + 1].t) {
                t - data.k[e].t > data.k[e + 1].t - t ? (i = e + 2, r = data.k[e + 1].t) : (i = e + 1, r = data.k[e].t);break;
              }
            }i === -1 && (i = e + 1, r = data.k[e].t);
          }
        } else i = 0, r = 0;var a = {};return a.index = i, a.time = r / elem.comp.globalData.frameRate, a;
      }function key(t) {
        var e, i, r;if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);t -= 1, e = { time: data.k[t].t / elem.comp.globalData.frameRate };var s;for (s = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t - 1].e, r = s.length, i = 0; i < r; i += 1) {
          e[i] = s[i];
        }return e;
      }function framesToTime(t, e) {
        return e || (e = elem.comp.globalData.frameRate), t / e;
      }function timeToFrames(t, e) {
        return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
      }function seedRandom(t) {
        BMMath.seedrandom(randSeed + t);
      }function sourceRectAtTime() {
        return elem.sourceRectAtTime();
      }function executeExpression() {
        if (_needsRandom && seedRandom(randSeed), this.frameExpressionId !== elem.globalData.frameId || "textSelector" === this.propType) {
          if (this.lock) return this.v = duplicatePropertyValue(this.pv, this.mult), !0;"textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), anchorPoint = transform.anchorPoint), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), hasParent = !(!elem.hierarchy || !elem.hierarchy.length), hasParent && !parent && (parent = elem.hierarchy[0].layerInterface), this.lock = !0, this.getPreValue && this.getPreValue(), value = this.pv, time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), "shape" === scoped_bm_rt.propType ? this.v = shape_pool.clone(scoped_bm_rt.v) : this.v = scoped_bm_rt, this.frameExpressionId = elem.globalData.frameId;var t, e;if (this.mult) if ("unidimensional" === this.propType) this.v *= this.mult;else if (1 === this.v.length) this.v = this.v[0] * this.mult;else for (e = this.v.length, value === this.v && (this.v = 2 === e ? [value[0], value[1]] : [value[0], value[1], value[2]]), t = 0; t < e; t += 1) {
            this.v[t] *= this.mult;
          }if (1 === this.v.length && (this.v = this.v[0]), "unidimensional" === this.propType) this.lastValue !== this.v && (this.lastValue = this.v, this._mdf = !0);else if ("shape" === this.propType) shapesEqual(this.v, this.localShapeCollection.shapes[0]) || (this._mdf = !0, this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(shape_pool.clone(this.v)));else for (e = this.v.length, t = 0; t < e; t += 1) {
            this.v[t] !== this.lastValue[t] && (this.lastValue[t] = this.v[t], this._mdf = !0);
          }this.lock = !1;
        }
      }var val = data.x,
          needsVelocity = /velocity(?![\w\d])/.test(val),
          _needsRandom = val.indexOf("random") !== -1,
          elemType = elem.data.ty,
          transform,
          content,
          effect,
          thisProperty = property;elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate;var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
          outPoint = elem.data.op / elem.comp.globalData.frameRate,
          width = elem.data.sw ? elem.data.sw : 0,
          height = elem.data.sh ? elem.data.sh : 0,
          loopIn,
          loop_in,
          loopOut,
          loop_out,
          toWorld,
          fromWorld,
          fromComp,
          fromCompToSurface,
          anchorPoint,
          thisLayer,
          thisComp,
          mask,
          valueAtTime,
          velocityAtTime,
          scoped_bm_rt,
          expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
          numKeys = property.kf ? data.k.length : 0,
          wiggle = function (t, e) {
        var i,
            r,
            s = this.pv.length ? this.pv.length : 1,
            a = createTypedArray("float32", s);t = 5;var n = Math.floor(time * t);for (i = 0, r = 0; i < n;) {
          for (r = 0; r < s; r += 1) {
            a[r] += -e + 2 * e * BMMath.random();
          }i += 1;
        }var o = time * t,
            h = o - Math.floor(o),
            l = createTypedArray("float32", s);if (s > 1) {
          for (r = 0; r < s; r += 1) {
            l[r] = this.pv[r] + a[r] + (-e + 2 * e * BMMath.random()) * h;
          }return l;
        }return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
      }.bind(this);thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
          time,
          velocity,
          value,
          textIndex,
          textTotal,
          selectorValue,
          index = elem.data.ind,
          hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
          parent,
          randSeed = Math.floor(1e6 * Math.random());return executeExpression;
    }var ob = {},
        Math = BMMath,
        window = null,
        document = null,
        add = sum,
        radians_to_degrees = radiansToDegrees,
        degrees_to_radians = radiansToDegrees,
        helperLengthArray = [0, 0, 0, 0, 0, 0];return ob.initiateExpression = initiateExpression, ob;
  }();!function () {
    function t() {
      return this.pv;
    }function e(t, e, i) {
      if (!this.k || !this.keyframes) return this.pv;t = t ? t.toLowerCase() : "";var r = this.comp.renderedFrame,
          s = this.keyframes,
          a = s[s.length - 1].t;if (r <= a) return this.pv;var n, o;i ? (n = e ? Math.abs(a - elem.comp.globalData.frameRate * e) : Math.max(0, a - this.elem.data.ip), o = a - n) : ((!e || e > s.length - 1) && (e = s.length - 1), o = s[s.length - 1 - e].t, n = a - o);var h, l, p;if ("pingpong" === t) {
        var m = Math.floor((r - o) / n);if (m % 2 !== 0) return this.getValueAtTime((n - (r - o) % n + o) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var f = this.getValueAtTime(o / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              d = this.getValueAtTime(((r - o) % n + o) / this.comp.globalData.frameRate, 0),
              u = Math.floor((r - o) / n);if (this.pv.length) {
            for (p = new Array(f.length), l = p.length, h = 0; h < l; h += 1) {
              p[h] = (c[h] - f[h]) * u + d[h];
            }return p;
          }return (c - f) * u + d;
        }if ("continue" === t) {
          var y = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              g = this.getValueAtTime((a - .001) / this.comp.globalData.frameRate, 0);if (this.pv.length) {
            for (p = new Array(y.length), l = p.length, h = 0; h < l; h += 1) {
              p[h] = y[h] + (y[h] - g[h]) * ((r - a) / this.comp.globalData.frameRate) / 5e-4;
            }return p;
          }return y + (y - g) * ((r - a) / .001);
        }
      }return this.getValueAtTime(((r - o) % n + o) / this.comp.globalData.frameRate, 0);
    }function i(t, e, i) {
      if (!this.k) return this.pv;t = t ? t.toLowerCase() : "";var r = this.comp.renderedFrame,
          s = this.keyframes,
          a = s[0].t;if (r >= a) return this.pv;var n, o;i ? (n = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - a), o = a + n) : ((!e || e > s.length - 1) && (e = s.length - 1), o = s[e].t, n = o - a);var h, l, p;if ("pingpong" === t) {
        var m = Math.floor((a - r) / n);if (m % 2 === 0) return this.getValueAtTime(((a - r) % n + a) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var f = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(o / this.comp.globalData.frameRate, 0),
              d = this.getValueAtTime((n - (a - r) % n + a) / this.comp.globalData.frameRate, 0),
              u = Math.floor((a - r) / n) + 1;if (this.pv.length) {
            for (p = new Array(f.length), l = p.length, h = 0; h < l; h += 1) {
              p[h] = d[h] - (c[h] - f[h]) * u;
            }return p;
          }return d - (c - f) * u;
        }if ("continue" === t) {
          var y = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
              g = this.getValueAtTime((a + .001) / this.comp.globalData.frameRate, 0);if (this.pv.length) {
            for (p = new Array(y.length), l = p.length, h = 0; h < l; h += 1) {
              p[h] = y[h] + (y[h] - g[h]) * (a - r) / .001;
            }return p;
          }return y + (y - g) * (a - r) / .001;
        }
      }return this.getValueAtTime((n - (a - r) % n + a) / this.comp.globalData.frameRate, 0);
    }function r(t) {
      return t !== this._cachingAtTime.lastFrame && (t *= this.elem.globalData.frameRate, t -= this.offsetTime, this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this.pv, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value;
    }function s(t) {
      if (void 0 !== this.vel) return this.vel;var e,
          i = -.01,
          r = this.getValueAtTime(t),
          s = this.getValueAtTime(t + i);if (r.length) {
        e = createTypedArray("float32", r.length);var a;for (a = 0; a < r.length; a += 1) {
          e[a] = (s[a] - r[a]) / i;
        }
      } else e = (s - r) / i;return e;
    }function a(t) {
      this.propertyGroup = t;
    }function n(t, e, i) {
      e.x && (i.k = !0, i.x = !0, i.getValue && (i.getPreValue = i.getValue), i.initiateExpression = ExpressionManager.initiateExpression, i.getValue = i.initiateExpression(t, e, i));
    }function o(t) {}function h(t) {}function l(t) {
      return this._cachingAtTime || (this._cachingAtTime = { shapeValue: shape_pool.clone(this.pv), lastIndex: 0, lastTime: initialDefaultFrame }), t !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastTime = t, t *= this.elem.globalData.frameRate, this.interpolateShape(t, this._cachingAtTime.shapeValue, !1, this._cachingAtTime)), this._cachingAtTime.shapeValue;
    }function p() {}var m = function () {
      function e(t, e) {
        return this.textIndex = t + 1, this.textTotal = e, this.getValue(), this.v;
      }return function (i, o) {
        this.pv = 1, this.comp = i.comp, this.elem = i, this.mult = .01, this.propType = "textSelector", this.textTotal = o.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], n.bind(this)(i, o, this), this.getMult = e, this.getVelocityAtTime = s, this.kf ? this.getValueAtTime = r.bind(this) : this.getValueAtTime = t.bind(this), this.setGroupProperty = a;
      };
    }(),
        f = TransformPropertyFactory.getTransformProperty;TransformPropertyFactory.getTransformProperty = function (t, e, i) {
      var r = f(t, e, i);return r.dynamicProperties.length ? r.getValueAtTime = o.bind(r) : r.getValueAtTime = h.bind(r), r.setGroupProperty = a, r;
    };var c = PropertyFactory.getProp;PropertyFactory.getProp = function (o, h, l, p, m) {
      var f = c(o, h, l, p, m);f.kf ? f.getValueAtTime = r.bind(f) : f.getValueAtTime = t.bind(f), f.setGroupProperty = a, f.loopOut = e, f.loopIn = i, f.getVelocityAtTime = s, f.numKeys = 1 === h.a ? h.k.length : 0;var d = f.k;f.propertyIndex = h.ix;var u = 0;return 0 !== l && (u = createTypedArray("float32", 1 === h.a ? h.k[0].s.length : h.k.length)), f._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: u }, n(o, h, f), !d && f.x && m.push(f), f;
    };var d = ShapePropertyFactory.getConstructorFunction(),
        u = ShapePropertyFactory.getKeyframedConstructorFunction();p.prototype = { vertices: function vertices(t, e) {
        var i = this.v;void 0 !== e && (i = this.getValueAtTime(e, 0));var r,
            s = i._length,
            a = i[t],
            n = i.v,
            o = createSizedArray(s);for (r = 0; r < s; r += 1) {
          "i" === t || "o" === t ? o[r] = [a[r][0] - n[r][0], a[r][1] - n[r][1]] : o[r] = [a[r][0], a[r][1]];
        }return o;
      }, points: function points(t) {
        return this.vertices("v", t);
      }, inTangents: function inTangents(t) {
        return this.vertices("i", t);
      }, outTangents: function outTangents(t) {
        return this.vertices("o", t);
      }, isClosed: function isClosed() {
        return this.v.c;
      }, pointOnPath: function pointOnPath(t, e) {
        var i = this.v;void 0 !== e && (i = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(i));for (var r, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
          if (l + a[o].addedLength > n) {
            var p = o,
                m = i.c && o === h - 1 ? 0 : o + 1,
                f = (n - l) / a[o].addedLength;r = bez.getPointInSegment(i.v[p], i.v[m], i.o[p], i.i[m], f, a[o]);break;
          }l += a[o].addedLength, o += 1;
        }return r || (r = i.c ? [i.v[0][0], i.v[0][1]] : [i.v[i._length - 1][0], i.v[i._length - 1][1]]), r;
      }, vectorOnPath: function vectorOnPath(t, e, i) {
        t = 1 == t ? this.v.c ? 0 : .999 : t;var r = this.pointOnPath(t, e),
            s = this.pointOnPath(t + .001, e),
            a = s[0] - r[0],
            n = s[1] - r[1],
            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2)),
            h = "tangent" === i ? [a / o, n / o] : [-n / o, a / o];return h;
      }, tangentOnPath: function tangentOnPath(t, e) {
        return this.vectorOnPath(t, e, "tangent");
      }, normalOnPath: function normalOnPath(t, e) {
        return this.vectorOnPath(t, e, "normal");
      }, setGroupProperty: a, getValueAtTime: t }, extendPrototype([p], d), extendPrototype([p], u), u.prototype.getValueAtTime = l, u.prototype.initiateExpression = ExpressionManager.initiateExpression;var y = ShapePropertyFactory.getShapeProp;ShapePropertyFactory.getShapeProp = function (t, e, i, r, s) {
      var a = y(t, e, i, r, s),
          o = a.k;return a.propertyIndex = e.ix, a.lock = !1, 3 === i ? n(t, e.pt, a) : 4 === i && n(t, e.ks, a), !o && a.x && r.push(a), a;
    };var g = TextSelectorProp.getTextSelectorProp;TextSelectorProp.getTextSelectorProp = function (t, e, i) {
      return 1 === e.t ? new m(t, e, i) : g(t, e, i);
    };
  }(), function () {
    function t() {
      return !!this.data.d.x && (this.comp = this.elem.comp, this.getValue && (this.getPreValue = this.getValue), this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.getValue = this.getExpressionValue, !0);
    }TextProperty.prototype.searchProperty = function () {
      return this.kf = this.searchExpressions() || this.data.d.k.length > 1, this.kf;
    }, TextProperty.prototype.getExpressionValue = function (t) {
      this.calculateExpression(), this._mdf && (this.currentData.t = this.v.toString(), this.completeTextData(this.currentData));
    }, TextProperty.prototype.searchExpressions = t;
  }();var ShapeExpressionInterface = function () {
    function t(t, e, n) {
      var c,
          d = [],
          u = t ? t.length : 0;for (c = 0; c < u; c += 1) {
        "gr" == t[c].ty ? d.push(i(t[c], e[c], n)) : "fl" == t[c].ty ? d.push(r(t[c], e[c], n)) : "st" == t[c].ty ? d.push(s(t[c], e[c], n)) : "tm" == t[c].ty ? d.push(a(t[c], e[c], n)) : "tr" == t[c].ty || ("el" == t[c].ty ? d.push(o(t[c], e[c], n)) : "sr" == t[c].ty ? d.push(h(t[c], e[c], n)) : "sh" == t[c].ty ? d.push(f(t[c], e[c], n)) : "rc" == t[c].ty ? d.push(l(t[c], e[c], n)) : "rd" == t[c].ty ? d.push(p(t[c], e[c], n)) : "rp" == t[c].ty && d.push(m(t[c], e[c], n)));
      }return d;
    }function e(e, i, r) {
      var s,
          a = function a(t) {
        for (var e = 0, i = s.length; e < i;) {
          if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];e += 1;
        }if ("number" == typeof t) return s[t - 1];
      };return a.propertyGroup = function (t) {
        return 1 === t ? a : r(t - 1);
      }, s = t(e.it, i.it, a.propertyGroup), a.numProperties = s.length, a.propertyIndex = e.cix, a;
    }function i(t, i, r) {
      var s = function s(t) {
        switch (t) {case "ADBE Vectors Group":case "Contents":case 2:
            return s.content;default:
            return s.transform;}
      };s.propertyGroup = function (t) {
        return 1 === t ? s : r(t - 1);
      };var a = e(t, i, s.propertyGroup),
          o = n(t.it[t.it.length - 1], i.it[i.it.length - 1], s.propertyGroup);return s.content = a, s.transform = o, Object.defineProperty(s, "_name", { get: function get() {
          return t.nm;
        } }), s.numProperties = t.np, s.propertyIndex = t.ix, s.nm = t.nm, s.mn = t.mn, s;
    }function r(t, e, i) {
      function r(t) {
        return "Color" === t || "color" === t ? r.color : "Opacity" === t || "opacity" === t ? r.opacity : void 0;
      }return Object.defineProperties(r, { color: { get: function get() {
            return ExpressionValue(e.c, 1 / e.c.mult, "color");
          } }, opacity: { get: function get() {
            return ExpressionValue(e.o, 100);
          } }, _name: { value: t.nm }, mn: { value: t.mn } }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), r;
    }function s(t, e, i) {
      function r(t) {
        return 1 === t ? ob : i(t - 1);
      }function s(t) {
        return 1 === t ? l : r(t - 1);
      }function a(i) {
        Object.defineProperty(l, t.d[i].nm, { get: function get() {
            return ExpressionValue(e.d.dataProps[i].p);
          } });
      }function n(t) {
        return "Color" === t || "color" === t ? n.color : "Opacity" === t || "opacity" === t ? n.opacity : "Stroke Width" === t || "stroke width" === t ? n.strokeWidth : void 0;
      }var o,
          h = t.d ? t.d.length : 0,
          l = {};for (o = 0; o < h; o += 1) {
        a(o), e.d.dataProps[o].p.setGroupProperty(s);
      }return Object.defineProperties(n, { color: { get: function get() {
            return ExpressionValue(e.c, 1 / e.c.mult, "color");
          } }, opacity: { get: function get() {
            return ExpressionValue(e.o, 100);
          } }, strokeWidth: { get: function get() {
            return ExpressionValue(e.w);
          } }, dash: { get: function get() {
            return l;
          } }, _name: { value: t.nm }, mn: { value: t.mn } }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), e.w.setGroupProperty(r), n;
    }function a(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return e === t.e.ix || "End" === e || "end" === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0;
      }return s.propertyIndex = t.ix, e.s.setGroupProperty(r), e.e.setGroupProperty(r), e.o.setGroupProperty(r), s.propertyIndex = t.ix, Object.defineProperties(s, { start: { get: function get() {
            return ExpressionValue(e.s, 1 / e.s.mult);
          } }, end: { get: function get() {
            return ExpressionValue(e.e, 1 / e.e.mult);
          } }, offset: { get: function get() {
            return ExpressionValue(e.o);
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function n(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return t.a.ix === e || "Anchor Point" === e ? s.anchorPoint : t.o.ix === e || "Opacity" === e ? s.opacity : t.p.ix === e || "Position" === e ? s.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? s.rotation : t.s.ix === e || "Scale" === e ? s.scale : t.sk && t.sk.ix === e || "Skew" === e ? s.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? s.skewAxis : void 0;
      }return e.transform.mProps.o.setGroupProperty(r), e.transform.mProps.p.setGroupProperty(r), e.transform.mProps.a.setGroupProperty(r), e.transform.mProps.s.setGroupProperty(r), e.transform.mProps.r.setGroupProperty(r), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(r), e.transform.mProps.sa.setGroupProperty(r)), e.transform.op.setGroupProperty(r), Object.defineProperties(s, { opacity: { get: function get() {
            return ExpressionValue(e.transform.mProps.o, 1 / e.transform.mProps.o.mult);
          } }, position: { get: function get() {
            return ExpressionValue(e.transform.mProps.p);
          } }, anchorPoint: { get: function get() {
            return ExpressionValue(e.transform.mProps.a);
          } }, scale: { get: function get() {
            return ExpressionValue(e.transform.mProps.s, 1 / e.transform.mProps.s.mult);
          } }, rotation: { get: function get() {
            return ExpressionValue(e.transform.mProps.r, 1 / e.transform.mProps.r.mult);
          } }, skew: { get: function get() {
            return ExpressionValue(e.transform.mProps.sk);
          } }, skewAxis: { get: function get() {
            return ExpressionValue(e.transform.mProps.sa);
          } }, _name: { value: t.nm } }), s.ty = "tr", s.mn = t.mn, s;
    }function o(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return t.p.ix === e ? s.position : t.s.ix === e ? s.size : void 0;
      }s.propertyIndex = t.ix;var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;return a.s.setGroupProperty(r), a.p.setGroupProperty(r), Object.defineProperties(s, { size: { get: function get() {
            return ExpressionValue(a.s);
          } }, position: { get: function get() {
            return ExpressionValue(a.p);
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function h(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return t.p.ix === e ? s.position : t.r.ix === e ? s.rotation : t.pt.ix === e ? s.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? s.outerRadius : t.os.ix === e ? s.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? s.innerRoundness : void 0 : s.innerRadius;
      }var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;return s.propertyIndex = t.ix, a.or.setGroupProperty(r), a.os.setGroupProperty(r), a.pt.setGroupProperty(r), a.p.setGroupProperty(r), a.r.setGroupProperty(r), t.ir && (a.ir.setGroupProperty(r), a.is.setGroupProperty(r)), Object.defineProperties(s, { position: { get: function get() {
            return ExpressionValue(a.p);
          } }, rotation: { get: function get() {
            return ExpressionValue(a.r, 1 / a.r.mult);
          } }, points: { get: function get() {
            return ExpressionValue(a.pt);
          } }, outerRadius: { get: function get() {
            return ExpressionValue(a.or);
          } }, outerRoundness: { get: function get() {
            return ExpressionValue(a.os);
          } }, innerRadius: { get: function get() {
            return a.ir ? ExpressionValue(a.ir) : 0;
          } }, innerRoundness: { get: function get() {
            return a.is ? ExpressionValue(a.is, 1 / a.is.mult) : 0;
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function l(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return t.p.ix === e ? s.position : t.r.ix === e ? s.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? s.size : void 0;
      }var a = "tm" === e.sh.ty ? e.sh.prop : e.sh;return s.propertyIndex = t.ix, a.p.setGroupProperty(r), a.s.setGroupProperty(r), a.r.setGroupProperty(r), Object.defineProperties(s, { position: { get: function get() {
            return ExpressionValue(a.p);
          } }, roundness: { get: function get() {
            return ExpressionValue(a.r);
          } }, size: { get: function get() {
            return ExpressionValue(a.s);
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function p(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        if (t.r.ix === e || "Round Corners 1" === e) return s.radius;
      }var a = e;return s.propertyIndex = t.ix, a.rd.setGroupProperty(r), Object.defineProperties(s, { radius: { get: function get() {
            return ExpressionValue(a.rd);
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function m(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(e) {
        return t.c.ix === e || "Copies" === e ? s.copies : t.o.ix === e || "Offset" === e ? s.offset : void 0;
      }var a = e;return s.propertyIndex = t.ix, a.c.setGroupProperty(r), a.o.setGroupProperty(r), Object.defineProperties(s, { copies: { get: function get() {
            return ExpressionValue(a.c);
          } }, offset: { get: function get() {
            return ExpressionValue(a.o);
          } }, _name: { value: t.nm } }), s.mn = t.mn, s;
    }function f(t, e, i) {
      function r(t) {
        return 1 == t ? s : i(--t);
      }function s(t) {
        if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path;
      }var a = e.sh;return a.setGroupProperty(r), Object.defineProperties(s, { path: { get: function get() {
            return a.k && a.getValue(), a;
          } }, shape: { get: function get() {
            return a.k && a.getValue(), a;
          } }, _name: { value: t.nm },
        ix: { value: t.ix }, mn: { value: t.mn } }), s;
    }return function (e, i, r) {
      function s(t) {
        if ("number" == typeof t) return a[t - 1];for (var e = 0, i = a.length; e < i;) {
          if (a[e]._name === t) return a[e];e += 1;
        }
      }var a;return s.propertyGroup = r, a = t(e, i, s), s;
    };
  }(),
      TextExpressionInterface = function () {
    return function (t) {
      function e() {}var i, r;return Object.defineProperty(e, "sourceText", { get: function get() {
          var e = t.textProperty.currentData.t;return t.textProperty.currentData.t !== i && (t.textProperty.currentData.t = i, r = new String(e), r.value = e ? e : new String(e)), r;
        } }), e;
    };
  }(),
      LayerExpressionInterface = function () {
    function t(t, e) {
      var i = new Matrix();i.reset();var r;if (r = e ? this._elem.finalTransform.mProp : this._elem.finalTransform.mProp, r.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length) {
        var s,
            a = this._elem.hierarchy.length;for (s = 0; s < a; s += 1) {
          this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
        }return i.applyToPointArray(t[0], t[1], t[2] || 0);
      }return i.applyToPointArray(t[0], t[1], t[2] || 0);
    }function e(t, e) {
      var i = new Matrix();i.reset();var r;if (r = e ? this._elem.finalTransform.mProp : this._elem.finalTransform.mProp, r.applyToMatrix(i), this._elem.hierarchy && this._elem.hierarchy.length) {
        var s,
            a = this._elem.hierarchy.length;for (s = 0; s < a; s += 1) {
          this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
        }return i.inversePoint(t);
      }return i.inversePoint(t);
    }function i(t) {
      var e = new Matrix();if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
        var i,
            r = this._elem.hierarchy.length;for (i = 0; i < r; i += 1) {
          this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
        }return e.inversePoint(t);
      }return e.inversePoint(t);
    }return function (r) {
      function s(t) {
        n.mask = new MaskManagerInterface(t, r);
      }function a(t) {
        n.effect = t;
      }function n(t) {
        switch (t) {case "ADBE Root Vectors Group":case "Contents":case 2:
            return n.shapeInterface;case 1:case 6:case "Transform":case "transform":case "ADBE Transform Group":
            return o;case 4:case "ADBE Effect Parade":
            return n.effect;}
      }var o;n.toWorld = t, n.fromWorld = e, n.toComp = t, n.fromComp = i, n.sourceRectAtTime = r.sourceRectAtTime.bind(r), n._elem = r, o = TransformExpressionInterface(r.finalTransform.mProp);var h = getDescriptor(o, "anchorPoint");return Object.defineProperties(n, { hasParent: { get: function get() {
            return r.hierarchy.length;
          } }, parent: { get: function get() {
            return r.hierarchy[0].layerInterface;
          } }, rotation: getDescriptor(o, "rotation"), scale: getDescriptor(o, "scale"), position: getDescriptor(o, "position"), opacity: getDescriptor(o, "opacity"), anchorPoint: h, anchor_point: h, transform: { get: function get() {
            return o;
          } }, active: { get: function get() {
            return r.isInRange;
          } } }), n.startTime = r.data.st, n.index = r.data.ind, n.source = r.data.refId, n.height = 0 === r.data.ty ? r.data.h : 100, n.width = 0 === r.data.ty ? r.data.w : 100, n.registerMaskInterface = s, n.registerEffectsInterface = a, n;
    };
  }(),
      CompExpressionInterface = function () {
    return function (t) {
      function e(e) {
        for (var i = 0, r = t.layers.length; i < r;) {
          if (t.layers[i].nm === e || t.layers[i].ind === e) return t.elements[i].layerInterface;i += 1;
        }return { active: !1 };
      }return Object.defineProperty(e, "_name", { value: t.data.nm }), e.layer = e, e.pixelAspect = 1, e.height = t.globalData.compSize.h, e.width = t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e;
    };
  }(),
      TransformExpressionInterface = function () {
    return function (t) {
      function e(t) {
        switch (t) {case "scale":case "Scale":case "ADBE Scale":case 6:
            return e.scale;case "rotation":case "Rotation":case "ADBE Rotation":case "ADBE Rotate Z":case 10:
            return e.rotation;case "position":case "Position":case "ADBE Position":case 2:
            return e.position;case "anchorPoint":case "AnchorPoint":case "Anchor Point":case "ADBE AnchorPoint":case 1:
            return e.anchorPoint;case "opacity":case "Opacity":case 11:
            return e.opacity;}
      }return Object.defineProperty(e, "rotation", { get: function get() {
          return t.r ? ExpressionValue(t.r, 1 / degToRads) : ExpressionValue(t.rz, 1 / degToRads);
        } }), Object.defineProperty(e, "scale", { get: function get() {
          return ExpressionValue(t.s, 100);
        } }), Object.defineProperty(e, "position", { get: function get() {
          return t.p ? ExpressionValue(t.p) : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
        } }), Object.defineProperty(e, "xPosition", { get: function get() {
          return ExpressionValue(t.px);
        } }), Object.defineProperty(e, "yPosition", { get: function get() {
          return ExpressionValue(t.py);
        } }), Object.defineProperty(e, "zPosition", { get: function get() {
          return ExpressionValue(t.pz);
        } }), Object.defineProperty(e, "anchorPoint", { get: function get() {
          return ExpressionValue(t.a);
        } }), Object.defineProperty(e, "opacity", { get: function get() {
          return ExpressionValue(t.o, 100);
        } }), Object.defineProperty(e, "skew", { get: function get() {
          return ExpressionValue(t.sk);
        } }), Object.defineProperty(e, "skewAxis", { get: function get() {
          return ExpressionValue(t.sa);
        } }), Object.defineProperty(e, "orientation", { get: function get() {
          return ExpressionValue(t.or);
        } }), e;
    };
  }(),
      ProjectInterface = function () {
    function t(t) {
      this.compositions.push(t);
    }return function () {
      function e(t) {
        for (var e = 0, i = this.compositions.length; e < i;) {
          if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].prepareFrame(this.compositions[e].data.xt ? this.currentFrame : this.compositions[e].renderedFrame), this.compositions[e].compInterface;e += 1;
        }
      }return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e;
    };
  }(),
      EffectsExpressionInterface = function () {
    function t(t, i) {
      if (t.effectsManager) {
        var r,
            s = [],
            a = t.data.ef,
            n = t.effectsManager.effectElements.length;for (r = 0; r < n; r += 1) {
          s.push(e(a[r], t.effectsManager.effectElements[r], i, t));
        }return function (e) {
          for (var i = t.data.ef, r = 0, a = i.length; r < a;) {
            if (e === i[r].nm || e === i[r].mn || e === i[r].ix) return s[r];r += 1;
          }
        };
      }
    }function e(t, r, s, a) {
      function n(t) {
        return 1 === t ? p : s(t - 1);
      }var o,
          h = [],
          l = t.ef.length;for (o = 0; o < l; o += 1) {
        5 === t.ef[o].ty ? h.push(e(t.ef[o], r.effectElements[o], r.effectElements[o].propertyGroup, a)) : h.push(i(r.effectElements[o], t.ef[o].ty, a, n));
      }var p = function p(e) {
        for (var i = t.ef, r = 0, s = i.length; r < s;) {
          if (e === i[r].nm || e === i[r].mn || e === i[r].ix) return 5 === i[r].ty ? h[r] : h[r]();r += 1;
        }return h[0]();
      };return p.propertyGroup = n, "ADBE Color Control" === t.mn && Object.defineProperty(p, "color", { get: function get() {
          return h[0]();
        } }), Object.defineProperty(p, "numProperties", { get: function get() {
          return t.np;
        } }), p.active = 0 !== t.en, p;
    }function i(t, e, i, r) {
      function s() {
        return 10 === e ? i.comp.compInterface(t.p.v) : ExpressionValue(t.p);
      }return t.p.setGroupProperty && t.p.setGroupProperty(r), s;
    }var r = { createEffectsInterface: t };return r;
  }(),
      MaskManagerInterface = function () {
    function t(t, e) {
      this._mask = t, this._data = e;
    }Object.defineProperty(t.prototype, "maskPath", { get: function get() {
        return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
      } });var e = function e(_e, i) {
      var r,
          s = createSizedArray(_e.viewData.length),
          a = _e.viewData.length;for (r = 0; r < a; r += 1) {
        s[r] = new t(_e.viewData[r], _e.masksProperties[r]);
      }var n = function n(t) {
        for (r = 0; r < a;) {
          if (_e.masksProperties[r].nm === t) return s[r];r += 1;
        }
      };return n;
    };return e;
  }(),
      ExpressionValue = function () {
    return function (t, e, i) {
      var r;t.k && t.getValue();var s, a, n, o;if (i) {
        if ("color" === i) {
          for (a = 4, r = createTypedArray("float32", a), n = createTypedArray("float32", a), s = 0; s < a; s += 1) {
            r[s] = n[s] = e && s < 3 ? t.v[s] * e : 1;
          }r.value = n;
        }
      } else if ("number" == typeof t.v || t.v instanceof Number) o = e ? t.v * e : t.v, r = new Number(o), r.value = o;else {
        for (a = t.v.length, r = createTypedArray("float32", a), n = createTypedArray("float32", a), s = 0; s < a; s += 1) {
          r[s] = n[s] = e ? t.v[s] * e : t.v[s];
        }r.value = n;
      }return r.numKeys = t.keyframes ? t.keyframes.length : 0, r.key = function (e) {
        return r.numKeys ? t.keyframes[e - 1].t : 0;
      }, r.valueAtTime = t.getValueAtTime, r.propertyGroup = t.propertyGroup, r;
    };
  }();GroupEffect.prototype.getValue = function () {
    this._mdf = !1;var t,
        e = this.dynamicProperties.length;for (t = 0; t < e; t += 1) {
      this.dynamicProperties[t].getValue(), this._mdf = this.dynamicProperties[t]._mdf || this._mdf;
    }
  }, GroupEffect.prototype.init = function (t, e, i) {
    this.data = t, this._mdf = !1, this.effectElements = [];var r,
        s,
        a = this.data.ef.length,
        n = this.data.ef;for (r = 0; r < a; r += 1) {
      switch (s = null, n[r].ty) {case 0:
          s = new SliderEffect(n[r], e, i);break;case 1:
          s = new AngleEffect(n[r], e, i);break;case 2:
          s = new ColorEffect(n[r], e, i);break;case 3:
          s = new PointEffect(n[r], e, i);break;case 4:case 7:
          s = new CheckboxEffect(n[r], e, i);break;case 10:
          s = new LayerIndexEffect(n[r], e, i);break;case 11:
          s = new MaskIndexEffect(n[r], e, i);break;case 5:
          s = new EffectsManager(n[r], e, i);break;default:
          s = new NoValueEffect(n[r], e, i);}s && this.effectElements.push(s);
    }
  };var lottiejs = {};lottiejs.play = play, lottiejs.pause = pause, lottiejs.setLocationHref = setLocationHref, lottiejs.togglePause = togglePause, lottiejs.setSpeed = setSpeed, lottiejs.setDirection = setDirection, lottiejs.stop = stop, lottiejs.searchAnimations = searchAnimations, lottiejs.registerAnimation = registerAnimation, lottiejs.loadAnimation = loadAnimation, lottiejs.setSubframeRendering = setSubframeRendering, lottiejs.resize = resize, lottiejs.goToAndStop = goToAndStop, lottiejs.destroy = destroy, lottiejs.setQuality = setQuality, lottiejs.inBrowser = inBrowser, lottiejs.installPlugin = installPlugin, lottiejs.__getFactory = getFactory, lottiejs.version = "5.1.1";var standalone = "__[STANDALONE]__",
      animationData = "__[ANIMATIONDATA]__",
      renderer = "";if (standalone) {
    var scripts = document.getElementsByTagName("script"),
        index = scripts.length - 1,
        myScript = scripts[index] || { src: "" },
        queryString = myScript.src.replace(/^[^\?]+\??/, "");renderer = getQueryVariable("renderer");
  }var readyStateCheckInterval = setInterval(checkReady, 100);return lottiejs;
});
var app = {
  elements: {
    stats: {
      time: document.querySelectorAll('.time'),
      humidity: {
        wrap: document.querySelectorAll('.humidity'),
        values: document.querySelectorAll('.humidity .value'),
        statuses: document.querySelectorAll('.humidity .status')
      },
      roomTemp: {
        wrap: document.querySelectorAll('.roomTemp'),
        values: document.querySelectorAll('.roomTemp .value'),
        statuses: document.querySelectorAll('.roomTemp .status')
      },
      waterTemp: {
        wrap: document.querySelectorAll('.waterTemp'),
        values: document.querySelectorAll('.waterTemp .value'),
        statuses: document.querySelectorAll('.waterTemp .status')
      },
      ph: {
        wrap: document.querySelectorAll('.ph'),
        values: document.querySelectorAll('.ph .value'),
        statuses: document.querySelectorAll('.ph .status')
      },
      conductivity: {
        wrap: document.querySelectorAll('.conductivity'),
        values: document.querySelectorAll('.conductivity .value'),
        statuses: document.querySelectorAll('.conductivity .status')
      }
    }
  },
  timer: '',
  init: function init() {
    intersectionObserver.init();
    animation.init();
    connect.init();
  },
  handleData: function handleData(data) {
    console.log(data);
    if (data.humidity.value) {
      this.elements.stats.humidity.values.forEach(function (value) {
        helper.replaceHTML(value, data.humidity.value);
      });
      this.elements.stats.humidity.statuses.forEach(function (status) {
        helper.replaceHTML(status, data.humidity.status);
      });
      this.elements.stats.humidity.wrap.forEach(function (el) {
        if (data.humidity.status === 'te hoog') {
          el.classList.remove('low');
          el.classList.add('high');
        } else if (data.humidity.status === 'te laag') {
          el.classList.remove('high');
          el.classList.add('low');
        }
      });
      this.elements.stats.roomTemp.values.forEach(function (el) {
        helper.replaceHTML(el, data.roomTemp.value);
      });
      this.elements.stats.roomTemp.statuses.forEach(function (el) {
        helper.replaceHTML(el, data.roomTemp.status);
      });
      this.elements.stats.roomTemp.wrap.forEach(function (el) {
        if (data.roomTemp.status === 'te hoog') {
          el.classList.remove('low');
          el.classList.add('high');
        } else if (data.roomTemp.status === 'te laag') {
          el.classList.remove('high');
          el.classList.add('low');
        }
      });
      this.elements.stats.waterTemp.values.forEach(function (el) {
        helper.replaceHTML(el, data.waterTemp.value);
      });
      this.elements.stats.waterTemp.statuses.forEach(function (el) {
        helper.replaceHTML(el, data.waterTemp.status);
      });
      this.elements.stats.waterTemp.wrap.forEach(function (el) {
        if (data.waterTemp.status === 'te hoog') {
          el.classList.remove('low');
          el.classList.add('high');
        } else if (data.waterTemp.status === 'te laag') {
          el.classList.remove('high');
          el.classList.add('low');
        }
      });
      this.elements.stats.ph.values.forEach(function (el) {
        helper.replaceHTML(el, data.ph.value);
      });
      this.elements.stats.ph.statuses.forEach(function (el) {
        helper.replaceHTML(el, data.ph.status);
      });
      this.elements.stats.ph.wrap.forEach(function (el) {
        if (data.ph.status === 'te hoog') {
          el.classList.remove('low');
          el.classList.add('high');
        } else if (data.ph.status === 'te laag') {
          el.classList.remove('high');
          el.classList.add('low');
        }
      });
      this.elements.stats.conductivity.values.forEach(function (el) {
        helper.replaceHTML(el, data.conductivity.value);
      });
      this.elements.stats.conductivity.statuses.forEach(function (el) {
        helper.replaceHTML(el, data.conductivity.status);
      });
      this.elements.stats.conductivity.wrap.forEach(function (el) {
        if (data.conductivity.status === 'te hoog') {
          el.classList.remove('low');
          el.classList.add('high');
        } else if (data.conductivity.status === 'te laag') {
          el.classList.remove('high');
          el.classList.add('low');
        }
      });
      var timeElapsed = helper.timeElapsed(Date.now() - new Date(data.time));
      console.log(timeElapsed);
      this.elements.stats.time.forEach(function (el) {
        helper.replaceHTML(el, timeElapsed);
      });
    }
  }
};
var animation = {
  config: {
    fish: {
      container: document.querySelector('#animation-fish'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/fish.json'
    },
    water: {
      container: document.querySelector('#animation-water'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/watering-plants.json'
    },
    bacteria: {
      container: document.querySelector('#animation-bacteria'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/bacteria.json'
    },
    grow: {
      container: document.querySelector('#animation-grow'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '../animations/growing-plants.json'
    }
  },
  init: function init() {
    this.load();
  },
  load: function load() {
    this.fish = lottie.loadAnimation(this.config.fish);
    this.water = lottie.loadAnimation(this.config.water);
    this.bacteria = lottie.loadAnimation(this.config.bacteria);
    this.grow = lottie.loadAnimation(this.config.grow);
  },
  start: function start(index) {
    index = index * 1;
    switch (index) {
      case 0:
        this.fish.play();
        break;
      case 1:
        this.water.play();
        break;
      case 2:
        this.bacteria.play();
        break;
      case 3:
        this.grow.play();
        break;
    }
  },
  stop: function stop(index) {
    index = index * 1;
    switch (index) {
      case 0:
        this.fish.goToAndStop(0, true);
        break;
      case 1:
        this.water.goToAndStop(0, true);
        break;
      case 2:
        this.bacteria.goToAndStop(0, true);
        break;
      case 3:
        this.grow.goToAndStop(0, true);
        break;
    }
  }
};
var intersectionObserver = {
  options: {
    root: null, // refers to window. Use document.querySelector to refer to a container
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.001 // visible amount of item shown in relation to root
  },
  init: function init() {
    var observer = new IntersectionObserver(this.change, this.options); // set callback and options
    document.querySelectorAll('.intersection').forEach(function (intersection) {
      observer.observe(intersection); // observe object and pass object as 'entries' array
    });
  },
  change: function change(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio >= intersectionObserver.options.threshold) {
        animation.start(entry.target.dataset.anim);
        entry.target.classList.add('inView');
      } else {
        animation.stop(entry.target.dataset.anim);
        entry.target.classList.remove('inView');
      }
    });
  }
};
var connect = {
  socket: io(),
  init: function init() {
    this.handleEvents();
  },
  handleEvents: function handleEvents() {
    this.socket.on('data', function (data) {
      if (data) {
        app.handleData(data);
      }
    });
  }
};
var helper = {
  emptyElement: function emptyElement(element) {
    // empty an html element
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },
  replaceHTML: function replaceHTML(element, string) {
    // empty html and insert new value
    this.emptyElement(element);
    element.insertAdjacentHTML('beforeend', string);
  },
  timeElapsed: function timeElapsed(time) {
    var obj = {};
    obj.seconds = time / 1000 % 60;
    obj.minutes = time / (1000 * 60) % 60;
    obj.hours = time / (1000 * 60 * 60) % 24;

    obj.hours = Math.round(obj.hours < 10 ? '0' + obj.hours : obj.hours);
    obj.minutes = Math.round(obj.minutes < 10 ? '0' + obj.minutes : obj.minutes);
    obj.seconds = Math.round(obj.seconds < 10 ? '0' + obj.seconds : obj.seconds);

    var timeString = 'Laatste update: ';
    if (obj.hours) {
      timeString += obj.hours + " uur,";
    }
    if (obj.minutes === 1) {
      timeString += obj.minutes + " minuut,";
    } else if (obj.minutes > 1) {
      timeString += obj.minutes + " minuten,";
    }
    if (obj.seconds === 1) {
      timeString += obj.seconds + " seconde geleden";
    } else if (obj.seconds > 1) {
      timeString += obj.seconds + " seconden geleden";
    }
    return timeString;
  }
};
var smoothScroll = {
  // Scroll to function using requestanimationframe
  // Source: https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
  scroll: function scroll(elementY, duration) {
    var startingY = window.pageYOffset;
    var diff = elementY - startingY;
    var start = void 0;

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      // Elapsed milliseconds since start of scrolling.
      var time = timestamp - start;
      // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  },
  getElementY: function getElementY(element) {
    return element.offsetTop;
  },
  getElementHeight: function getElementHeight(element) {
    return element.clientHeight;
  },
  setEventListeners: function setEventListeners(element) {
    var _this = this;

    element.addEventListener('click', function (event) {
      event.preventDefault();

      var navElement = document.querySelector('nav'),
          navHeight = _this.getElementHeight(navElement),
          targetElementId = this.getAttribute('href'),
          targetElement = document.querySelector(targetElementId),
          targetElementY = _this.getElementY(targetElement);

      _this.scroll(targetElementY - navHeight, 230);
    });
  },
  init: function init() {
    var _this = this;
    var links = document.querySelectorAll('a');

    links.forEach(function (link, index) {
      if (link.href.indexOf('#') >= 0) {
        _this.setEventListeners(link);
      }
    });
  }
};
app.init();

smoothScroll.init();