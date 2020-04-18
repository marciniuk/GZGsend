var olm_exports = {};
var onInitSuccess;
var onInitFail;

var Module = (function () {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (Module) {
    Module = Module || {};

    var a;
    a || (a = typeof Module !== "undefined" ? Module : {});
    var aa;
    if ("undefined" !== typeof window)
      aa = function (b) {
        window.crypto.getRandomValues(b);
      };
    else if (module.exports) {
      var ba = require("crypto");
      aa = function (b) {
        var c = ba.randomBytes(b.length);
        b.set(c);
      };
      process = global.process;
    } else throw Error("Cannot find global to attach library to");
    if ("undefined" !== typeof OLM_OPTIONS)
      for (var ca in OLM_OPTIONS)
        OLM_OPTIONS.hasOwnProperty(ca) && (a[ca] = OLM_OPTIONS[ca]);
    a.onRuntimeInitialized = function () {
      g = a._olm_error();
      olm_exports.PRIVATE_KEY_LENGTH = a._olm_pk_private_key_length();
      onInitSuccess && onInitSuccess();
    };
    a.onAbort = function (b) {
      onInitFail && onInitFail(b);
    };
    var da = {},
      h;
    for (h in a) a.hasOwnProperty(h) && (da[h] = a[h]);
    var ea = !1,
      l = !1,
      fa = !1,
      ia = !1,
      ja = !1;
    ea = "object" === typeof window;
    l = "function" === typeof importScripts;
    fa =
      (ia =
        "object" === typeof process &&
        "object" === typeof process.versions &&
        "string" === typeof process.versions.node) &&
      !ea &&
      !l;
    ja = !ea && !fa && !l;
    var m = "",
      ka,
      la,
      ma,
      na;
    if (fa)
      (m = __dirname + "/"),
        (ka = function (b, c) {
          ma || (ma = require("fs"));
          na || (na = require("path"));
          b = na.normalize(b);
          return ma.readFileSync(b, c ? null : "utf8");
        }),
        (la = function (b) {
          b = ka(b, !0);
          b.buffer || (b = new Uint8Array(b));
          assert(b.buffer);
          return b;
        }),
        1 < process.argv.length && process.argv[1].replace(/\\/g, "/"),
        process.argv.slice(2),
        process.on("uncaughtException", function (b) {
          throw b;
        }),
        process.on("unhandledRejection", n),
        (a.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (ja)
      "undefined" != typeof read &&
        (ka = function (b) {
          return read(b);
        }),
        (la = function (b) {
          if ("function" === typeof readbuffer)
            return new Uint8Array(readbuffer(b));
          b = read(b, "binary");
          assert("object" === typeof b);
          return b;
        }),
        "undefined" !== typeof print &&
          ("undefined" === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            "undefined" !== typeof printErr ? printErr : print));
    else if (ea || l)
      l
        ? (m = self.location.href)
        : document.currentScript && (m = document.currentScript.src),
        _scriptDir && (m = _scriptDir),
        0 !== m.indexOf("blob:")
          ? (m = m.substr(0, m.lastIndexOf("/") + 1))
          : (m = ""),
        (ka = function (b) {
          var c = new XMLHttpRequest();
          c.open("GET", b, !1);
          c.send(null);
          return c.responseText;
        }),
        l &&
          (la = function (b) {
            var c = new XMLHttpRequest();
            c.open("GET", b, !1);
            c.responseType = "arraybuffer";
            c.send(null);
            return new Uint8Array(c.response);
          });
    var oa = a.print || console.log.bind(console),
      q = a.printErr || console.warn.bind(console);
    for (h in da) da.hasOwnProperty(h) && (a[h] = da[h]);
    da = null;
    function pa(b) {
      var c = r[qa >> 2];
      b = (c + b + 15) & -16;
      b > t.length && n();
      r[qa >> 2] = b;
      return c;
    }
    var ra;
    a.wasmBinary && (ra = a.wasmBinary);
    "object" !== typeof WebAssembly && q("no native wasm support detected");
    function u(b) {
      var c = "i8";
      "*" === c.charAt(c.length - 1) && (c = "i32");
      switch (c) {
        case "i1":
          t[b >> 0] = 0;
          break;
        case "i8":
          t[b >> 0] = 0;
          break;
        case "i16":
          sa[b >> 1] = 0;
          break;
        case "i32":
          r[b >> 2] = 0;
          break;
        case "i64":
          ta = [
            0,
            ((w = 0),
            1 <= +ua(w)
              ? 0 < w
                ? (va(+wa(w / 4294967296), 4294967295) | 0) >>> 0
                : ~~+xa((w - +(~~w >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          r[b >> 2] = ta[0];
          r[(b + 4) >> 2] = ta[1];
          break;
        case "float":
          ya[b >> 2] = 0;
          break;
        case "double":
          za[b >> 3] = 0;
          break;
        default:
          n("invalid type for setValue: " + c);
      }
    }
    function Aa(b, c) {
      c = c || "i8";
      "*" === c.charAt(c.length - 1) && (c = "i32");
      switch (c) {
        case "i1":
          return t[b >> 0];
        case "i8":
          return t[b >> 0];
        case "i16":
          return sa[b >> 1];
        case "i32":
          return r[b >> 2];
        case "i64":
          return r[b >> 2];
        case "float":
          return ya[b >> 2];
        case "double":
          return za[b >> 3];
        default:
          n("invalid type for getValue: " + c);
      }
      return null;
    }
    var x,
      Ba = new WebAssembly.Table({
        initial: 9,
        maximum: 9,
        element: "anyfunc",
      }),
      Da = !1;
    function assert(b, c) {
      b || n("Assertion failed: " + c);
    }
    function y(b) {
      var c = a.ALLOC_STACK;
      if ("number" === typeof b) {
        var d = !0;
        var e = b;
      } else (d = !1), (e = b.length);
      c = 3 == c ? f : [Ea, Fa, pa][c](Math.max(e, 1));
      if (d) {
        var f = c;
        assert(0 == (c & 3));
        for (b = c + (e & -4); f < b; f += 4) r[f >> 2] = 0;
        for (b = c + e; f < b; ) t[f++ >> 0] = 0;
        return c;
      }
      b.subarray || b.slice ? z.set(b, c) : z.set(new Uint8Array(b), c);
      return c;
    }
    var Ga =
      "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function A(b, c) {
      if (b) {
        var d = z,
          e = b + c;
        for (c = b; d[c] && !(c >= e); ) ++c;
        if (16 < c - b && d.subarray && Ga) b = Ga.decode(d.subarray(b, c));
        else {
          for (e = ""; b < c; ) {
            var f = d[b++];
            if (f & 128) {
              var k = d[b++] & 63;
              if (192 == (f & 224))
                e += String.fromCharCode(((f & 31) << 6) | k);
              else {
                var p = d[b++] & 63;
                f =
                  224 == (f & 240)
                    ? ((f & 15) << 12) | (k << 6) | p
                    : ((f & 7) << 18) | (k << 12) | (p << 6) | (d[b++] & 63);
                65536 > f
                  ? (e += String.fromCharCode(f))
                  : ((f -= 65536),
                    (e += String.fromCharCode(
                      55296 | (f >> 10),
                      56320 | (f & 1023)
                    )));
              }
            } else e += String.fromCharCode(f);
          }
          b = e;
        }
      } else b = "";
      return b;
    }
    function B(b, c, d, e) {
      if (!(0 < e)) return 0;
      var f = d;
      e = d + e - 1;
      for (var k = 0; k < b.length; ++k) {
        var p = b.charCodeAt(k);
        if (55296 <= p && 57343 >= p) {
          var v = b.charCodeAt(++k);
          p = (65536 + ((p & 1023) << 10)) | (v & 1023);
        }
        if (127 >= p) {
          if (d >= e) break;
          c[d++] = p;
        } else {
          if (2047 >= p) {
            if (d + 1 >= e) break;
            c[d++] = 192 | (p >> 6);
          } else {
            if (65535 >= p) {
              if (d + 2 >= e) break;
              c[d++] = 224 | (p >> 12);
            } else {
              if (d + 3 >= e) break;
              c[d++] = 240 | (p >> 18);
              c[d++] = 128 | ((p >> 12) & 63);
            }
            c[d++] = 128 | ((p >> 6) & 63);
          }
          c[d++] = 128 | (p & 63);
        }
      }
      c[d] = 0;
      return d - f;
    }
    function C(b) {
      for (var c = 0, d = 0; d < b.length; ++d) {
        var e = b.charCodeAt(d);
        55296 <= e &&
          57343 >= e &&
          (e = (65536 + ((e & 1023) << 10)) | (b.charCodeAt(++d) & 1023));
        127 >= e ? ++c : (c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4);
      }
      return c;
    }
    "undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
    function Ha(b, c) {
      for (var d = 0; d < b.length; ++d) t[c++ >> 0] = b.charCodeAt(d);
    }
    var buffer, t, z, sa, r, ya, za;
    function Ia(b) {
      buffer = b;
      a.HEAP8 = t = new Int8Array(b);
      a.HEAP16 = sa = new Int16Array(b);
      a.HEAP32 = r = new Int32Array(b);
      a.HEAPU8 = z = new Uint8Array(b);
      a.HEAPU16 = new Uint16Array(b);
      a.HEAPU32 = new Uint32Array(b);
      a.HEAPF32 = ya = new Float32Array(b);
      a.HEAPF64 = za = new Float64Array(b);
    }
    var qa = 38304,
      Ja = a.TOTAL_MEMORY || 262144;
    a.wasmMemory
      ? (x = a.wasmMemory)
      : (x = new WebAssembly.Memory({ initial: Ja / 65536 }));
    x && (buffer = x.buffer);
    Ja = buffer.byteLength;
    Ia(buffer);
    r[qa >> 2] = 104e3;
    function Ka(b) {
      for (; 0 < b.length; ) {
        var c = b.shift();
        if ("function" == typeof c) c();
        else {
          var d = c.Ib;
          "number" === typeof d
            ? void 0 === c.Hb
              ? a.dynCall_v(d)
              : a.dynCall_vi(d, c.Hb)
            : d(void 0 === c.Hb ? null : c.Hb);
        }
      }
    }
    var La = [],
      Ma = [],
      Na = [],
      Oa = [];
    function Pa() {
      var b = a.preRun.shift();
      La.unshift(b);
    }
    var ua = Math.abs,
      xa = Math.ceil,
      wa = Math.floor,
      va = Math.min,
      D = 0,
      Qa = null,
      Ra = null;
    a.preloadedImages = {};
    a.preloadedAudios = {};
    function n(b) {
      if (a.onAbort) a.onAbort(b);
      oa(b);
      q(b);
      Da = !0;
      throw new WebAssembly.RuntimeError(
        "abort(" + b + "). Build with -s ASSERTIONS=1 for more info."
      );
    }
    function Sa() {
      var b = E;
      return String.prototype.startsWith
        ? b.startsWith("data:application/octet-stream;base64,")
        : 0 === b.indexOf("data:application/octet-stream;base64,");
    }
    var E = "olm.wasm";
    if (!Sa()) {
      var Ta = E;
      E = a.locateFile ? a.locateFile(Ta, m) : m + Ta;
    }
    function Ua() {
      try {
        if (ra) return new Uint8Array(ra);
        if (la) return la(E);
        throw "both async and sync fetching of the wasm failed";
      } catch (b) {
        n(b);
      }
    }
    function Va() {
      return ra || (!ea && !l) || "function" !== typeof fetch
        ? new Promise(function (b) {
            b(Ua());
          })
        : fetch(E, { credentials: "same-origin" })
            .then(function (b) {
              if (!b.ok) throw "failed to load wasm binary file at '" + E + "'";
              return b.arrayBuffer();
            })
            .catch(function () {
              return Ua();
            });
    }
    var w, ta;
    Ma.push({
      Ib: function () {
        Wa();
      },
    });
    function F(b) {
      var c = Array(C(b) + 1);
      b = B(b, c, 0, c.length);
      c.length = b;
      return c;
    }
    var Xa = {
        a: function (b, c, d) {
          z.set(z.subarray(c, c + d), b);
        },
        b: function (b) {
          var c = t.length;
          if (2147418112 < b) return !1;
          for (var d = 1; 4 >= d; d *= 2) {
            var e = c * (1 + 0.2 / d);
            e = Math.min(e, b + 100663296);
            e = Math.max(16777216, b, e);
            0 < e % 65536 && (e += 65536 - (e % 65536));
            a: {
              try {
                x.grow(
                  (Math.min(2147418112, e) - buffer.byteLength + 65535) >> 16
                );
                Ia(x.buffer);
                var f = 1;
                break a;
              } catch (k) {}
              f = void 0;
            }
            if (f) return !0;
          }
          return !1;
        },
        memory: x,
        table: Ba,
      },
      Ya = (function () {
        function b(b) {
          a.asm = b.exports;
          D--;
          a.monitorRunDependencies && a.monitorRunDependencies(D);
          0 == D &&
            (null !== Qa && (clearInterval(Qa), (Qa = null)),
            Ra && ((b = Ra), (Ra = null), b()));
        }
        function c(c) {
          b(c.instance);
        }
        function d(b) {
          return Va()
            .then(function (b) {
              return WebAssembly.instantiate(b, e);
            })
            .then(b, function (b) {
              q("failed to asynchronously prepare wasm: " + b);
              n(b);
            });
        }
        var e = { env: Xa, wasi_snapshot_preview1: Xa };
        D++;
        a.monitorRunDependencies && a.monitorRunDependencies(D);
        if (a.instantiateWasm)
          try {
            return a.instantiateWasm(e, b);
          } catch (f) {
            return (
              q("Module.instantiateWasm callback failed with error: " + f), !1
            );
          }
        (function () {
          if (
            ra ||
            "function" !== typeof WebAssembly.instantiateStreaming ||
            Sa() ||
            "function" !== typeof fetch
          )
            return d(c);
          fetch(E, { credentials: "same-origin" }).then(function (b) {
            return WebAssembly.instantiateStreaming(b, e).then(c, function (b) {
              q("wasm streaming compile failed: " + b);
              q("falling back to ArrayBuffer instantiation");
              d(c);
            });
          });
        })();
        return {};
      })();
    a.asm = Ya;
    var Wa = (a.___wasm_call_ctors = function () {
      return (Wa = a.___wasm_call_ctors = a.asm.c).apply(null, arguments);
    });
    a._olm_get_library_version = function () {
      return (a._olm_get_library_version = a.asm.d).apply(null, arguments);
    };
    a._olm_error = function () {
      return (a._olm_error = a.asm.e).apply(null, arguments);
    };
    a._olm_account_last_error = function () {
      return (a._olm_account_last_error = a.asm.f).apply(null, arguments);
    };
    a._olm_session_last_error = function () {
      return (a._olm_session_last_error = a.asm.g).apply(null, arguments);
    };
    a._olm_utility_last_error = function () {
      return (a._olm_utility_last_error = a.asm.h).apply(null, arguments);
    };
    a._olm_account_size = function () {
      return (a._olm_account_size = a.asm.i).apply(null, arguments);
    };
    a._olm_session_size = function () {
      return (a._olm_session_size = a.asm.j).apply(null, arguments);
    };
    a._olm_utility_size = function () {
      return (a._olm_utility_size = a.asm.k).apply(null, arguments);
    };
    a._olm_account = function () {
      return (a._olm_account = a.asm.l).apply(null, arguments);
    };
    a._olm_session = function () {
      return (a._olm_session = a.asm.m).apply(null, arguments);
    };
    a._olm_utility = function () {
      return (a._olm_utility = a.asm.n).apply(null, arguments);
    };
    a._olm_clear_account = function () {
      return (a._olm_clear_account = a.asm.o).apply(null, arguments);
    };
    a._olm_clear_session = function () {
      return (a._olm_clear_session = a.asm.p).apply(null, arguments);
    };
    a._olm_clear_utility = function () {
      return (a._olm_clear_utility = a.asm.q).apply(null, arguments);
    };
    a._olm_pickle_account_length = function () {
      return (a._olm_pickle_account_length = a.asm.r).apply(null, arguments);
    };
    a._olm_pickle_session_length = function () {
      return (a._olm_pickle_session_length = a.asm.s).apply(null, arguments);
    };
    a._olm_pickle_account = function () {
      return (a._olm_pickle_account = a.asm.t).apply(null, arguments);
    };
    a._olm_pickle_session = function () {
      return (a._olm_pickle_session = a.asm.u).apply(null, arguments);
    };
    a._olm_unpickle_account = function () {
      return (a._olm_unpickle_account = a.asm.v).apply(null, arguments);
    };
    a._olm_unpickle_session = function () {
      return (a._olm_unpickle_session = a.asm.w).apply(null, arguments);
    };
    a._olm_create_account_random_length = function () {
      return (a._olm_create_account_random_length = a.asm.x).apply(
        null,
        arguments
      );
    };
    a._olm_create_account = function () {
      return (a._olm_create_account = a.asm.y).apply(null, arguments);
    };
    a._olm_account_identity_keys_length = function () {
      return (a._olm_account_identity_keys_length = a.asm.z).apply(
        null,
        arguments
      );
    };
    a._olm_account_identity_keys = function () {
      return (a._olm_account_identity_keys = a.asm.A).apply(null, arguments);
    };
    a._olm_account_signature_length = function () {
      return (a._olm_account_signature_length = a.asm.B).apply(null, arguments);
    };
    a._olm_account_sign = function () {
      return (a._olm_account_sign = a.asm.C).apply(null, arguments);
    };
    a._olm_account_one_time_keys_length = function () {
      return (a._olm_account_one_time_keys_length = a.asm.D).apply(
        null,
        arguments
      );
    };
    a._olm_account_one_time_keys = function () {
      return (a._olm_account_one_time_keys = a.asm.E).apply(null, arguments);
    };
    a._olm_account_mark_keys_as_published = function () {
      return (a._olm_account_mark_keys_as_published = a.asm.F).apply(
        null,
        arguments
      );
    };
    a._olm_account_max_number_of_one_time_keys = function () {
      return (a._olm_account_max_number_of_one_time_keys = a.asm.G).apply(
        null,
        arguments
      );
    };
    a._olm_account_generate_one_time_keys_random_length = function () {
      return (a._olm_account_generate_one_time_keys_random_length =
        a.asm.H).apply(null, arguments);
    };
    a._olm_account_generate_one_time_keys = function () {
      return (a._olm_account_generate_one_time_keys = a.asm.I).apply(
        null,
        arguments
      );
    };
    a._olm_create_outbound_session_random_length = function () {
      return (a._olm_create_outbound_session_random_length = a.asm.J).apply(
        null,
        arguments
      );
    };
    a._olm_create_outbound_session = function () {
      return (a._olm_create_outbound_session = a.asm.K).apply(null, arguments);
    };
    a._olm_create_inbound_session = function () {
      return (a._olm_create_inbound_session = a.asm.L).apply(null, arguments);
    };
    a._olm_create_inbound_session_from = function () {
      return (a._olm_create_inbound_session_from = a.asm.M).apply(
        null,
        arguments
      );
    };
    a._olm_session_id_length = function () {
      return (a._olm_session_id_length = a.asm.N).apply(null, arguments);
    };
    a._olm_session_id = function () {
      return (a._olm_session_id = a.asm.O).apply(null, arguments);
    };
    a._olm_session_has_received_message = function () {
      return (a._olm_session_has_received_message = a.asm.P).apply(
        null,
        arguments
      );
    };
    a._olm_session_describe = function () {
      return (a._olm_session_describe = a.asm.Q).apply(null, arguments);
    };
    a._olm_matches_inbound_session = function () {
      return (a._olm_matches_inbound_session = a.asm.R).apply(null, arguments);
    };
    a._olm_matches_inbound_session_from = function () {
      return (a._olm_matches_inbound_session_from = a.asm.S).apply(
        null,
        arguments
      );
    };
    a._olm_remove_one_time_keys = function () {
      return (a._olm_remove_one_time_keys = a.asm.T).apply(null, arguments);
    };
    a._olm_encrypt_message_type = function () {
      return (a._olm_encrypt_message_type = a.asm.U).apply(null, arguments);
    };
    a._olm_encrypt_random_length = function () {
      return (a._olm_encrypt_random_length = a.asm.V).apply(null, arguments);
    };
    a._olm_encrypt_message_length = function () {
      return (a._olm_encrypt_message_length = a.asm.W).apply(null, arguments);
    };
    a._olm_encrypt = function () {
      return (a._olm_encrypt = a.asm.X).apply(null, arguments);
    };
    a._olm_decrypt_max_plaintext_length = function () {
      return (a._olm_decrypt_max_plaintext_length = a.asm.Y).apply(
        null,
        arguments
      );
    };
    a._olm_decrypt = function () {
      return (a._olm_decrypt = a.asm.Z).apply(null, arguments);
    };
    a._olm_sha256_length = function () {
      return (a._olm_sha256_length = a.asm._).apply(null, arguments);
    };
    a._olm_sha256 = function () {
      return (a._olm_sha256 = a.asm.$).apply(null, arguments);
    };
    a._olm_ed25519_verify = function () {
      return (a._olm_ed25519_verify = a.asm.aa).apply(null, arguments);
    };
    a._olm_pk_encryption_last_error = function () {
      return (a._olm_pk_encryption_last_error = a.asm.ba).apply(
        null,
        arguments
      );
    };
    a._olm_pk_encryption_size = function () {
      return (a._olm_pk_encryption_size = a.asm.ca).apply(null, arguments);
    };
    a._olm_pk_encryption = function () {
      return (a._olm_pk_encryption = a.asm.da).apply(null, arguments);
    };
    a._olm_clear_pk_encryption = function () {
      return (a._olm_clear_pk_encryption = a.asm.ea).apply(null, arguments);
    };
    a._olm_pk_encryption_set_recipient_key = function () {
      return (a._olm_pk_encryption_set_recipient_key = a.asm.fa).apply(
        null,
        arguments
      );
    };
    a._olm_pk_key_length = function () {
      return (a._olm_pk_key_length = a.asm.ga).apply(null, arguments);
    };
    a._olm_pk_ciphertext_length = function () {
      return (a._olm_pk_ciphertext_length = a.asm.ha).apply(null, arguments);
    };
    a._olm_pk_mac_length = function () {
      return (a._olm_pk_mac_length = a.asm.ia).apply(null, arguments);
    };
    a._olm_pk_encrypt_random_length = function () {
      return (a._olm_pk_encrypt_random_length = a.asm.ja).apply(
        null,
        arguments
      );
    };
    a._olm_pk_encrypt = function () {
      return (a._olm_pk_encrypt = a.asm.ka).apply(null, arguments);
    };
    a._olm_pk_decryption_last_error = function () {
      return (a._olm_pk_decryption_last_error = a.asm.la).apply(
        null,
        arguments
      );
    };
    a._olm_pk_decryption_size = function () {
      return (a._olm_pk_decryption_size = a.asm.ma).apply(null, arguments);
    };
    a._olm_pk_decryption = function () {
      return (a._olm_pk_decryption = a.asm.na).apply(null, arguments);
    };
    a._olm_clear_pk_decryption = function () {
      return (a._olm_clear_pk_decryption = a.asm.oa).apply(null, arguments);
    };
    a._olm_pk_private_key_length = function () {
      return (a._olm_pk_private_key_length = a.asm.pa).apply(null, arguments);
    };
    a._olm_pk_generate_key_random_length = function () {
      return (a._olm_pk_generate_key_random_length = a.asm.qa).apply(
        null,
        arguments
      );
    };
    a._olm_pk_key_from_private = function () {
      return (a._olm_pk_key_from_private = a.asm.ra).apply(null, arguments);
    };
    a._olm_pk_generate_key = function () {
      return (a._olm_pk_generate_key = a.asm.sa).apply(null, arguments);
    };
    a._olm_pickle_pk_decryption_length = function () {
      return (a._olm_pickle_pk_decryption_length = a.asm.ta).apply(
        null,
        arguments
      );
    };
    a._olm_pickle_pk_decryption = function () {
      return (a._olm_pickle_pk_decryption = a.asm.ua).apply(null, arguments);
    };
    a._olm_unpickle_pk_decryption = function () {
      return (a._olm_unpickle_pk_decryption = a.asm.va).apply(null, arguments);
    };
    a._olm_pk_max_plaintext_length = function () {
      return (a._olm_pk_max_plaintext_length = a.asm.wa).apply(null, arguments);
    };
    a._olm_pk_decrypt = function () {
      return (a._olm_pk_decrypt = a.asm.xa).apply(null, arguments);
    };
    a._olm_pk_get_private_key = function () {
      return (a._olm_pk_get_private_key = a.asm.ya).apply(null, arguments);
    };
    a._olm_pk_signing_size = function () {
      return (a._olm_pk_signing_size = a.asm.za).apply(null, arguments);
    };
    a._olm_pk_signing = function () {
      return (a._olm_pk_signing = a.asm.Aa).apply(null, arguments);
    };
    a._olm_pk_signing_last_error = function () {
      return (a._olm_pk_signing_last_error = a.asm.Ba).apply(null, arguments);
    };
    a._olm_clear_pk_signing = function () {
      return (a._olm_clear_pk_signing = a.asm.Ca).apply(null, arguments);
    };
    a._olm_pk_signing_seed_length = function () {
      return (a._olm_pk_signing_seed_length = a.asm.Da).apply(null, arguments);
    };
    a._olm_pk_signing_public_key_length = function () {
      return (a._olm_pk_signing_public_key_length = a.asm.Ea).apply(
        null,
        arguments
      );
    };
    a._olm_pk_signing_key_from_seed = function () {
      return (a._olm_pk_signing_key_from_seed = a.asm.Fa).apply(
        null,
        arguments
      );
    };
    a._olm_pk_signature_length = function () {
      return (a._olm_pk_signature_length = a.asm.Ga).apply(null, arguments);
    };
    a._olm_pk_sign = function () {
      return (a._olm_pk_sign = a.asm.Ha).apply(null, arguments);
    };
    a._olm_inbound_group_session_size = function () {
      return (a._olm_inbound_group_session_size = a.asm.Ia).apply(
        null,
        arguments
      );
    };
    a._olm_inbound_group_session = function () {
      return (a._olm_inbound_group_session = a.asm.Ja).apply(null, arguments);
    };
    a._olm_clear_inbound_group_session = function () {
      return (a._olm_clear_inbound_group_session = a.asm.Ka).apply(
        null,
        arguments
      );
    };
    a._olm_inbound_group_session_last_error = function () {
      return (a._olm_inbound_group_session_last_error = a.asm.La).apply(
        null,
        arguments
      );
    };
    a._olm_init_inbound_group_session = function () {
      return (a._olm_init_inbound_group_session = a.asm.Ma).apply(
        null,
        arguments
      );
    };
    a._olm_import_inbound_group_session = function () {
      return (a._olm_import_inbound_group_session = a.asm.Na).apply(
        null,
        arguments
      );
    };
    a._olm_pickle_inbound_group_session_length = function () {
      return (a._olm_pickle_inbound_group_session_length = a.asm.Oa).apply(
        null,
        arguments
      );
    };
    a._olm_pickle_inbound_group_session = function () {
      return (a._olm_pickle_inbound_group_session = a.asm.Pa).apply(
        null,
        arguments
      );
    };
    a._olm_unpickle_inbound_group_session = function () {
      return (a._olm_unpickle_inbound_group_session = a.asm.Qa).apply(
        null,
        arguments
      );
    };
    a._olm_group_decrypt_max_plaintext_length = function () {
      return (a._olm_group_decrypt_max_plaintext_length = a.asm.Ra).apply(
        null,
        arguments
      );
    };
    a._olm_group_decrypt = function () {
      return (a._olm_group_decrypt = a.asm.Sa).apply(null, arguments);
    };
    a._olm_inbound_group_session_id_length = function () {
      return (a._olm_inbound_group_session_id_length = a.asm.Ta).apply(
        null,
        arguments
      );
    };
    a._olm_inbound_group_session_id = function () {
      return (a._olm_inbound_group_session_id = a.asm.Ua).apply(
        null,
        arguments
      );
    };
    a._olm_inbound_group_session_first_known_index = function () {
      return (a._olm_inbound_group_session_first_known_index = a.asm.Va).apply(
        null,
        arguments
      );
    };
    a._olm_inbound_group_session_is_verified = function () {
      return (a._olm_inbound_group_session_is_verified = a.asm.Wa).apply(
        null,
        arguments
      );
    };
    a._olm_export_inbound_group_session_length = function () {
      return (a._olm_export_inbound_group_session_length = a.asm.Xa).apply(
        null,
        arguments
      );
    };
    a._olm_export_inbound_group_session = function () {
      return (a._olm_export_inbound_group_session = a.asm.Ya).apply(
        null,
        arguments
      );
    };
    a._olm_sas_last_error = function () {
      return (a._olm_sas_last_error = a.asm.Za).apply(null, arguments);
    };
    a._olm_sas_size = function () {
      return (a._olm_sas_size = a.asm._a).apply(null, arguments);
    };
    a._olm_sas = function () {
      return (a._olm_sas = a.asm.$a).apply(null, arguments);
    };
    a._olm_clear_sas = function () {
      return (a._olm_clear_sas = a.asm.ab).apply(null, arguments);
    };
    a._olm_create_sas_random_length = function () {
      return (a._olm_create_sas_random_length = a.asm.bb).apply(
        null,
        arguments
      );
    };
    a._olm_create_sas = function () {
      return (a._olm_create_sas = a.asm.cb).apply(null, arguments);
    };
    a._olm_sas_pubkey_length = function () {
      return (a._olm_sas_pubkey_length = a.asm.db).apply(null, arguments);
    };
    a._olm_sas_get_pubkey = function () {
      return (a._olm_sas_get_pubkey = a.asm.eb).apply(null, arguments);
    };
    a._olm_sas_set_their_key = function () {
      return (a._olm_sas_set_their_key = a.asm.fb).apply(null, arguments);
    };
    a._olm_sas_generate_bytes = function () {
      return (a._olm_sas_generate_bytes = a.asm.gb).apply(null, arguments);
    };
    a._olm_sas_mac_length = function () {
      return (a._olm_sas_mac_length = a.asm.hb).apply(null, arguments);
    };
    a._olm_sas_calculate_mac = function () {
      return (a._olm_sas_calculate_mac = a.asm.ib).apply(null, arguments);
    };
    a._olm_sas_calculate_mac_long_kdf = function () {
      return (a._olm_sas_calculate_mac_long_kdf = a.asm.jb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_size = function () {
      return (a._olm_outbound_group_session_size = a.asm.kb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session = function () {
      return (a._olm_outbound_group_session = a.asm.lb).apply(null, arguments);
    };
    a._olm_clear_outbound_group_session = function () {
      return (a._olm_clear_outbound_group_session = a.asm.mb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_last_error = function () {
      return (a._olm_outbound_group_session_last_error = a.asm.nb).apply(
        null,
        arguments
      );
    };
    a._olm_pickle_outbound_group_session_length = function () {
      return (a._olm_pickle_outbound_group_session_length = a.asm.ob).apply(
        null,
        arguments
      );
    };
    a._olm_pickle_outbound_group_session = function () {
      return (a._olm_pickle_outbound_group_session = a.asm.pb).apply(
        null,
        arguments
      );
    };
    a._olm_unpickle_outbound_group_session = function () {
      return (a._olm_unpickle_outbound_group_session = a.asm.qb).apply(
        null,
        arguments
      );
    };
    a._olm_init_outbound_group_session_random_length = function () {
      return (a._olm_init_outbound_group_session_random_length =
        a.asm.rb).apply(null, arguments);
    };
    a._olm_init_outbound_group_session = function () {
      return (a._olm_init_outbound_group_session = a.asm.sb).apply(
        null,
        arguments
      );
    };
    a._olm_group_encrypt_message_length = function () {
      return (a._olm_group_encrypt_message_length = a.asm.tb).apply(
        null,
        arguments
      );
    };
    a._olm_group_encrypt = function () {
      return (a._olm_group_encrypt = a.asm.ub).apply(null, arguments);
    };
    a._olm_outbound_group_session_id_length = function () {
      return (a._olm_outbound_group_session_id_length = a.asm.vb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_id = function () {
      return (a._olm_outbound_group_session_id = a.asm.wb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_message_index = function () {
      return (a._olm_outbound_group_session_message_index = a.asm.xb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_key_length = function () {
      return (a._olm_outbound_group_session_key_length = a.asm.yb).apply(
        null,
        arguments
      );
    };
    a._olm_outbound_group_session_key = function () {
      return (a._olm_outbound_group_session_key = a.asm.zb).apply(
        null,
        arguments
      );
    };
    var Ea = (a._malloc = function () {
      return (Ea = a._malloc = a.asm.Ab).apply(null, arguments);
    });
    a._free = function () {
      return (a._free = a.asm.Bb).apply(null, arguments);
    };
    var Za = (a.stackSave = function () {
        return (Za = a.stackSave = a.asm.Cb).apply(null, arguments);
      }),
      Fa = (a.stackAlloc = function () {
        return (Fa = a.stackAlloc = a.asm.Db).apply(null, arguments);
      }),
      $a = (a.stackRestore = function () {
        return ($a = a.stackRestore = a.asm.Eb).apply(null, arguments);
      });
    a.asm = Ya;
    a.ALLOC_STACK = 1;
    var ab;
    a.then = function (b) {
      if (ab) b(a);
      else {
        var c = a.onRuntimeInitialized;
        a.onRuntimeInitialized = function () {
          c && c();
          b(a);
        };
      }
      return a;
    };
    Ra = function bb() {
      ab || cb();
      ab || (Ra = bb);
    };
    function cb() {
      function b() {
        if (!ab && ((ab = !0), !Da)) {
          Ka(Ma);
          Ka(Na);
          if (a.onRuntimeInitialized) a.onRuntimeInitialized();
          if (a.postRun)
            for (
              "function" == typeof a.postRun && (a.postRun = [a.postRun]);
              a.postRun.length;

            ) {
              var b = a.postRun.shift();
              Oa.unshift(b);
            }
          Ka(Oa);
        }
      }
      if (!(0 < D)) {
        if (a.preRun)
          for (
            "function" == typeof a.preRun && (a.preRun = [a.preRun]);
            a.preRun.length;

          )
            Pa();
        Ka(La);
        0 < D ||
          (a.setStatus
            ? (a.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  a.setStatus("");
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    a.run = cb;
    if (a.preInit)
      for (
        "function" == typeof a.preInit && (a.preInit = [a.preInit]);
        0 < a.preInit.length;

      )
        a.preInit.pop()();
    cb();
    function H() {
      var b = a._olm_outbound_group_session_size();
      this.Gb = I(b);
      this.Fb = a._olm_outbound_group_session(this.Gb);
    }
    function J(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_outbound_group_session_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    H.prototype.free = function () {
      a._olm_clear_outbound_group_session(this.Fb);
      K(this.Fb);
    };
    H.prototype.pickle = L(function (b) {
      b = F(b);
      var c = J(a._olm_pickle_outbound_group_session_length)(this.Fb),
        d = y(b),
        e = y(c + 1);
      try {
        J(a._olm_pickle_outbound_group_session)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    H.prototype.unpickle = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c);
      try {
        J(a._olm_unpickle_outbound_group_session)(
          this.Fb,
          d,
          b.length,
          e,
          c.length
        );
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
    });
    H.prototype.create = L(function () {
      var b = J(a._olm_init_outbound_group_session_random_length)(this.Fb),
        c = N(b);
      J(a._olm_init_outbound_group_session)(this.Fb, c, b);
    });
    H.prototype.encrypt = function (b) {
      try {
        var c = C(b);
        var d = J(a._olm_group_encrypt_message_length)(this.Fb, c);
        var e = I(c + 1);
        B(b, z, e, c + 1);
        var f = I(d + 1);
        J(a._olm_group_encrypt)(this.Fb, e, c, f, d);
        u(f + d);
        return A(f, d);
      } finally {
        void 0 !== e && (M(e, c + 1), K(e)), void 0 !== f && K(f);
      }
    };
    H.prototype.session_id = L(function () {
      var b = J(a._olm_outbound_group_session_id_length)(this.Fb),
        c = y(b + 1);
      J(a._olm_outbound_group_session_id)(this.Fb, c, b);
      return A(c, b);
    });
    H.prototype.session_key = L(function () {
      var b = J(a._olm_outbound_group_session_key_length)(this.Fb),
        c = y(b + 1);
      J(a._olm_outbound_group_session_key)(this.Fb, c, b);
      var d = A(c, b);
      M(c, b);
      return d;
    });
    H.prototype.message_index = function () {
      return J(a._olm_outbound_group_session_message_index)(this.Fb);
    };
    olm_exports.OutboundGroupSession = H;
    function O() {
      var b = a._olm_inbound_group_session_size();
      this.Gb = I(b);
      this.Fb = a._olm_inbound_group_session(this.Gb);
    }
    function P(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_inbound_group_session_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    O.prototype.free = function () {
      a._olm_clear_inbound_group_session(this.Fb);
      K(this.Fb);
    };
    O.prototype.pickle = L(function (b) {
      b = F(b);
      var c = P(a._olm_pickle_inbound_group_session_length)(this.Fb),
        d = y(b),
        e = y(c + 1);
      try {
        P(a._olm_pickle_inbound_group_session)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    O.prototype.unpickle = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c);
      try {
        P(a._olm_unpickle_inbound_group_session)(
          this.Fb,
          d,
          b.length,
          e,
          c.length
        );
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
    });
    O.prototype.create = L(function (b) {
      b = F(b);
      var c = y(b);
      try {
        P(a._olm_init_inbound_group_session)(this.Fb, c, b.length);
      } finally {
        for (M(c, b.length), c = 0; c < b.length; c++) b[c] = 0;
      }
    });
    O.prototype.import_session = L(function (b) {
      b = F(b);
      var c = y(b);
      try {
        P(a._olm_import_inbound_group_session)(this.Fb, c, b.length);
      } finally {
        for (M(c, b.length), c = 0; c < b.length; c++) b[c] = 0;
      }
    });
    O.prototype.decrypt = L(function (b) {
      try {
        var c = I(b.length);
        Ha(b, c);
        var d = P(a._olm_group_decrypt_max_plaintext_length)(
          this.Fb,
          c,
          b.length
        );
        Ha(b, c);
        var e = I(d + 1);
        var f = y(4);
        var k = P(a._olm_group_decrypt)(this.Fb, c, b.length, e, d, f);
        u(e + k);
        return { plaintext: A(e, k), message_index: Aa(f, "i32") };
      } finally {
        void 0 !== c && K(c), void 0 !== e && (M(e, k), K(e));
      }
    });
    O.prototype.session_id = L(function () {
      var b = P(a._olm_inbound_group_session_id_length)(this.Fb),
        c = y(b + 1);
      P(a._olm_inbound_group_session_id)(this.Fb, c, b);
      return A(c, b);
    });
    O.prototype.first_known_index = L(function () {
      return P(a._olm_inbound_group_session_first_known_index)(this.Fb);
    });
    O.prototype.export_session = L(function (b) {
      var c = P(a._olm_export_inbound_group_session_length)(this.Fb),
        d = y(c + 1);
      J(a._olm_export_inbound_group_session)(this.Fb, d, c, b);
      b = A(d, c);
      M(d, c);
      return b;
    });
    olm_exports.InboundGroupSession = O;
    function db() {
      var b = a._olm_pk_encryption_size();
      this.Gb = I(b);
      this.Fb = a._olm_pk_encryption(this.Gb);
    }
    function Q(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_pk_encryption_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    db.prototype.free = function () {
      a._olm_clear_pk_encryption(this.Fb);
      K(this.Fb);
    };
    db.prototype.set_recipient_key = L(function (b) {
      b = F(b);
      var c = y(b);
      Q(a._olm_pk_encryption_set_recipient_key)(this.Fb, c, b.length);
    });
    db.prototype.encrypt = L(function (b) {
      try {
        var c = C(b);
        var d = I(c + 1);
        B(b, z, d, c + 1);
        var e = Q(a._olm_pk_encrypt_random_length)();
        var f = N(e);
        var k = Q(a._olm_pk_ciphertext_length)(this.Fb, c);
        var p = I(k + 1);
        var v = Q(a._olm_pk_mac_length)(this.Fb),
          ha = y(v + 1);
        u(ha + v);
        var U = Q(a._olm_pk_key_length)(),
          G = y(U + 1);
        u(G + U);
        Q(a._olm_pk_encrypt)(this.Fb, d, c, p, k, ha, v, G, U, f, e);
        u(p + k);
        return { ciphertext: A(p, k), mac: A(ha, v), ephemeral: A(G, U) };
      } finally {
        void 0 !== f && M(f, e),
          void 0 !== d && (M(d, c + 1), K(d)),
          void 0 !== p && K(p);
      }
    });
    function R() {
      var b = a._olm_pk_decryption_size();
      this.Gb = I(b);
      this.Fb = a._olm_pk_decryption(this.Gb);
    }
    function S(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_pk_decryption_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    R.prototype.free = function () {
      a._olm_clear_pk_decryption(this.Fb);
      K(this.Fb);
    };
    R.prototype.init_with_private_key = L(function (b) {
      var c = y(b.length);
      a.HEAPU8.set(b, c);
      var d = S(a._olm_pk_key_length)(),
        e = y(d + 1);
      try {
        S(a._olm_pk_key_from_private)(this.Fb, e, d, c, b.length);
      } finally {
        M(c, b.length);
      }
      return A(e, d);
    });
    R.prototype.generate_key = L(function () {
      var b = S(a._olm_pk_private_key_length)(),
        c = N(b),
        d = S(a._olm_pk_key_length)(),
        e = y(d + 1);
      try {
        S(a._olm_pk_key_from_private)(this.Fb, e, d, c, b);
      } finally {
        M(c, b);
      }
      return A(e, d);
    });
    R.prototype.get_private_key = L(function () {
      var b = Q(a._olm_pk_private_key_length)(),
        c = y(b);
      S(a._olm_pk_get_private_key)(this.Fb, c, b);
      var d = new Uint8Array(new Uint8Array(a.HEAPU8.buffer, c, b));
      M(c, b);
      return d;
    });
    R.prototype.pickle = L(function (b) {
      b = F(b);
      var c = S(a._olm_pickle_pk_decryption_length)(this.Fb),
        d = y(b),
        e = y(c + 1);
      try {
        S(a._olm_pickle_pk_decryption)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    R.prototype.unpickle = L(function (b, c) {
      b = F(b);
      var d = y(b),
        e = F(c),
        f = y(e);
      c = S(a._olm_pk_key_length)();
      var k = y(c + 1);
      try {
        S(a._olm_unpickle_pk_decryption)(
          this.Fb,
          d,
          b.length,
          f,
          e.length,
          k,
          c
        );
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(k, c);
    });
    R.prototype.decrypt = L(function (b, c, d) {
      try {
        var e = C(d);
        var f = I(e + 1);
        B(d, z, f, e + 1);
        var k = F(b),
          p = y(k),
          v = F(c),
          ha = y(v);
        var U = S(a._olm_pk_max_plaintext_length)(this.Fb, e);
        var G = I(U + 1);
        var Ca = S(a._olm_pk_decrypt)(
          this.Fb,
          p,
          k.length,
          ha,
          v.length,
          f,
          e,
          G,
          U
        );
        u(G + Ca);
        return A(G, Ca);
      } finally {
        void 0 !== G && (M(G, Ca + 1), K(G)), void 0 !== f && K(f);
      }
    });
    function eb() {
      var b = a._olm_pk_signing_size();
      this.Gb = I(b);
      this.Fb = a._olm_pk_signing(this.Gb);
    }
    function fb(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_pk_signing_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    eb.prototype.free = function () {
      a._olm_clear_pk_signing(this.Fb);
      K(this.Fb);
    };
    eb.prototype.init_with_seed = L(function (b) {
      var c = y(b.length);
      a.HEAPU8.set(b, c);
      var d = fb(a._olm_pk_signing_public_key_length)(),
        e = y(d + 1);
      try {
        fb(a._olm_pk_signing_key_from_seed)(this.Fb, e, d, c, b.length);
      } finally {
        M(c, b.length);
      }
      return A(e, d);
    });
    eb.prototype.generate_seed = L(function () {
      var b = fb(a._olm_pk_signing_seed_length)(),
        c = N(b),
        d = new Uint8Array(new Uint8Array(a.HEAPU8.buffer, c, b));
      M(c, b);
      return d;
    });
    eb.prototype.sign = L(function (b) {
      try {
        var c = C(b);
        var d = I(c + 1);
        B(b, z, d, c + 1);
        var e = fb(a._olm_pk_signature_length)(),
          f = y(e + 1);
        fb(a._olm_pk_sign)(this.Fb, d, c, f, e);
        return A(f, e);
      } finally {
        void 0 !== d && (M(d, c + 1), K(d));
      }
    });
    function T() {
      var b = a._olm_sas_size(),
        c = a._olm_create_sas_random_length(),
        d = N(c);
      this.Gb = I(b);
      this.Fb = a._olm_sas(this.Gb);
      a._olm_create_sas(this.Fb, d, c);
      M(d, c);
    }
    function V(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_sas_last_error(arguments[0]))), Error("OLM." + c))
          );
        return c;
      };
    }
    T.prototype.free = function () {
      a._olm_clear_sas(this.Fb);
      K(this.Fb);
    };
    T.prototype.get_pubkey = L(function () {
      var b = V(a._olm_sas_pubkey_length)(this.Fb),
        c = y(b + 1);
      V(a._olm_sas_get_pubkey)(this.Fb, c, b);
      return A(c, b);
    });
    T.prototype.set_their_key = L(function (b) {
      b = F(b);
      var c = y(b);
      V(a._olm_sas_set_their_key)(this.Fb, c, b.length);
    });
    T.prototype.generate_bytes = L(function (b, c) {
      b = F(b);
      var d = y(b),
        e = y(c);
      V(a._olm_sas_generate_bytes)(this.Fb, d, b.length, e, c);
      return new Uint8Array(new Uint8Array(a.HEAPU8.buffer, e, c));
    });
    T.prototype.calculate_mac = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c),
        f = V(a._olm_sas_mac_length)(this.Fb),
        k = y(f + 1);
      V(a._olm_sas_calculate_mac)(this.Fb, d, b.length, e, c.length, k, f);
      return A(k, f);
    });
    T.prototype.calculate_mac_long_kdf = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c),
        f = V(a._olm_sas_mac_length)(this.Fb),
        k = y(f + 1);
      V(a._olm_sas_calculate_mac_long_kdf)(
        this.Fb,
        d,
        b.length,
        e,
        c.length,
        k,
        f
      );
      return A(k, f);
    });
    var I = a._malloc,
      K = a._free,
      g;
    function N(b) {
      var c = y(b);
      b = new Uint8Array(a.HEAPU8.buffer, c, b);
      aa(b);
      return c;
    }
    function L(b) {
      return function () {
        var c = Za();
        try {
          return b.apply(this, arguments);
        } finally {
          $a(c);
        }
      };
    }
    function M(b, c) {
      for (; 0 < c--; ) a.HEAP8[b++] = 0;
    }
    function W() {
      var b = a._olm_account_size();
      this.Gb = I(b);
      this.Fb = a._olm_account(this.Gb);
    }
    function X(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_account_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    W.prototype.free = function () {
      a._olm_clear_account(this.Fb);
      K(this.Fb);
    };
    W.prototype.create = L(function () {
      var b = X(a._olm_create_account_random_length)(this.Fb),
        c = N(b);
      X(a._olm_create_account)(this.Fb, c, b);
    });
    W.prototype.identity_keys = L(function () {
      var b = X(a._olm_account_identity_keys_length)(this.Fb),
        c = y(b + 1);
      X(a._olm_account_identity_keys)(this.Fb, c, b);
      return A(c, b);
    });
    W.prototype.sign = L(function (b) {
      var c = X(a._olm_account_signature_length)(this.Fb);
      b = F(b);
      var d = y(b),
        e = y(c + 1);
      try {
        X(a._olm_account_sign)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    W.prototype.one_time_keys = L(function () {
      var b = X(a._olm_account_one_time_keys_length)(this.Fb),
        c = y(b + 1);
      X(a._olm_account_one_time_keys)(this.Fb, c, b);
      return A(c, b);
    });
    W.prototype.mark_keys_as_published = L(function () {
      X(a._olm_account_mark_keys_as_published)(this.Fb);
    });
    W.prototype.max_number_of_one_time_keys = L(function () {
      return X(a._olm_account_max_number_of_one_time_keys)(this.Fb);
    });
    W.prototype.generate_one_time_keys = L(function (b) {
      var c = X(a._olm_account_generate_one_time_keys_random_length)(
          this.Fb,
          b
        ),
        d = N(c);
      X(a._olm_account_generate_one_time_keys)(this.Fb, b, d, c);
    });
    W.prototype.remove_one_time_keys = L(function (b) {
      X(a._olm_remove_one_time_keys)(this.Fb, b.Fb);
    });
    W.prototype.pickle = L(function (b) {
      b = F(b);
      var c = X(a._olm_pickle_account_length)(this.Fb),
        d = y(b),
        e = y(c + 1);
      try {
        X(a._olm_pickle_account)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    W.prototype.unpickle = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c);
      try {
        X(a._olm_unpickle_account)(this.Fb, d, b.length, e, c.length);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
    });
    function Y() {
      var b = a._olm_session_size();
      this.Gb = I(b);
      this.Fb = a._olm_session(this.Gb);
    }
    function Z(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_session_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    Y.prototype.free = function () {
      a._olm_clear_session(this.Fb);
      K(this.Fb);
    };
    Y.prototype.pickle = L(function (b) {
      b = F(b);
      var c = Z(a._olm_pickle_session_length)(this.Fb),
        d = y(b),
        e = y(c + 1);
      try {
        Z(a._olm_pickle_session)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    Y.prototype.unpickle = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c);
      try {
        Z(a._olm_unpickle_session)(this.Fb, d, b.length, e, c.length);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
    });
    Y.prototype.create_outbound = L(function (b, c, d) {
      var e = Z(a._olm_create_outbound_session_random_length)(this.Fb),
        f = N(e);
      c = F(c);
      d = F(d);
      var k = y(c),
        p = y(d);
      try {
        Z(a._olm_create_outbound_session)(
          this.Fb,
          b.Fb,
          k,
          c.length,
          p,
          d.length,
          f,
          e
        );
      } finally {
        M(f, e);
      }
    });
    Y.prototype.create_inbound = L(function (b, c) {
      c = F(c);
      var d = y(c);
      try {
        Z(a._olm_create_inbound_session)(this.Fb, b.Fb, d, c.length);
      } finally {
        for (M(d, c.length), b = 0; b < c.length; b++) c[b] = 0;
      }
    });
    Y.prototype.create_inbound_from = L(function (b, c, d) {
      c = F(c);
      var e = y(c);
      d = F(d);
      var f = y(d);
      try {
        Z(a._olm_create_inbound_session_from)(
          this.Fb,
          b.Fb,
          e,
          c.length,
          f,
          d.length
        );
      } finally {
        for (M(f, d.length), b = 0; b < d.length; b++) d[b] = 0;
      }
    });
    Y.prototype.session_id = L(function () {
      var b = Z(a._olm_session_id_length)(this.Fb),
        c = y(b + 1);
      Z(a._olm_session_id)(this.Fb, c, b);
      return A(c, b);
    });
    Y.prototype.has_received_message = function () {
      return Z(a._olm_session_has_received_message)(this.Fb) ? !0 : !1;
    };
    Y.prototype.matches_inbound = L(function (b) {
      b = F(b);
      var c = y(b);
      return Z(a._olm_matches_inbound_session)(this.Fb, c, b.length) ? !0 : !1;
    });
    Y.prototype.matches_inbound_from = L(function (b, c) {
      b = F(b);
      var d = y(b);
      c = F(c);
      var e = y(c);
      return Z(a._olm_matches_inbound_session_from)(
        this.Fb,
        d,
        b.length,
        e,
        c.length
      )
        ? !0
        : !1;
    });
    Y.prototype.encrypt = L(function (b) {
      try {
        var c = Z(a._olm_encrypt_random_length)(this.Fb);
        var d = Z(a._olm_encrypt_message_type)(this.Fb);
        var e = C(b);
        var f = Z(a._olm_encrypt_message_length)(this.Fb, e);
        var k = N(c);
        var p = I(e + 1);
        B(b, z, p, e + 1);
        var v = I(f + 1);
        Z(a._olm_encrypt)(this.Fb, p, e, k, c, v, f);
        u(v + f);
        return { type: d, body: A(v, f) };
      } finally {
        void 0 !== k && M(k, c),
          void 0 !== p && (M(p, e + 1), K(p)),
          void 0 !== v && K(v);
      }
    });
    Y.prototype.decrypt = L(function (b, c) {
      try {
        var d = I(c.length);
        Ha(c, d);
        var e = Z(a._olm_decrypt_max_plaintext_length)(this.Fb, b, d, c.length);
        Ha(c, d);
        var f = I(e + 1);
        var k = Z(a._olm_decrypt)(this.Fb, b, d, c.length, f, e);
        u(f + k);
        return A(f, k);
      } finally {
        void 0 !== d && K(d), void 0 !== f && (M(f, e), K(f));
      }
    });
    Y.prototype.describe = L(function () {
      try {
        var b = I(256);
        Z(a._olm_session_describe)(this.Fb, b, 256);
        return A(b);
      } finally {
        void 0 !== b && K(b);
      }
    });
    function gb() {
      var b = a._olm_utility_size();
      this.Gb = I(b);
      this.Fb = a._olm_utility(this.Gb);
    }
    function hb(b) {
      return function () {
        var c = b.apply(this, arguments);
        if (c === g)
          throw (
            ((c = A(a._olm_utility_last_error(arguments[0]))),
            Error("OLM." + c))
          );
        return c;
      };
    }
    gb.prototype.free = function () {
      a._olm_clear_utility(this.Fb);
      K(this.Fb);
    };
    gb.prototype.sha256 = L(function (b) {
      var c = hb(a._olm_sha256_length)(this.Fb);
      b = F(b);
      var d = y(b),
        e = y(c + 1);
      try {
        hb(a._olm_sha256)(this.Fb, d, b.length, e, c);
      } finally {
        for (M(d, b.length), d = 0; d < b.length; d++) b[d] = 0;
      }
      return A(e, c);
    });
    gb.prototype.ed25519_verify = L(function (b, c, d) {
      b = F(b);
      var e = y(b);
      c = F(c);
      var f = y(c);
      d = F(d);
      var k = y(d);
      try {
        hb(a._olm_ed25519_verify)(
          this.Fb,
          e,
          b.length,
          f,
          c.length,
          k,
          d.length
        );
      } finally {
        for (M(f, c.length), b = 0; b < c.length; b++) c[b] = 0;
      }
    });
    olm_exports.Account = W;
    olm_exports.Session = Y;
    olm_exports.Utility = gb;
    olm_exports.PkEncryption = db;
    olm_exports.PkDecryption = R;
    olm_exports.PkSigning = eb;
    olm_exports.SAS = T;
    olm_exports.get_library_version = L(function () {
      var b = y(3);
      a._olm_get_library_version(b, b + 1, b + 2);
      return [Aa(b, "i8"), Aa(b + 1, "i8"), Aa(b + 2, "i8")];
    });

    return Module;
  };
})();
if (typeof exports === "object" && typeof module === "object")
  module.exports = Module;
else if (typeof define === "function" && define["amd"])
  define([], function () {
    return Module;
  });
else if (typeof exports === "object") exports["Module"] = Module;
var olmInitPromise;

olm_exports["init"] = function (opts) {
  if (olmInitPromise) return olmInitPromise;

  if (opts) OLM_OPTIONS = opts;

  olmInitPromise = new Promise(function (resolve, reject) {
    onInitSuccess = function () {
      resolve();
    };
    onInitFail = function (err) {
      reject(err);
    };
    Module();
  });
  return olmInitPromise;
};

if (typeof window !== "undefined") {
  // We've been imported directly into a browser. Define the global 'Olm' object.
  // (we do this even if module.exports was defined, because it's useful to have
  // Olm in the global scope for browserified and webpacked apps.)
  window["Olm"] = olm_exports;
}

if (typeof module === "object") {
  // Emscripten sets the module exports to be its module
  // with wrapped c functions. Clobber it with our higher
  // level wrapper class.
  module.exports = olm_exports;
}
