System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, color, _crd, colors;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      color = _cc.color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c763fxjSTBNb4YmFw8hweAh", "Colors", undefined);

      __checkObsolete__(['color']);

      _export("colors", colors = {});

      colors[0] = color(198, 184, 172, 255);
      colors[2] = color(235, 224, 213, 255);
      colors[4] = color(234, 219, 193, 255);
      colors[8] = color(240, 167, 110, 255);
      colors[16] = color(244, 138, 89, 255);
      colors[32] = color(245, 112, 85, 255);
      colors[64] = color(245, 83, 52, 255);
      colors[128] = color(234, 200, 103, 255);
      colors[256] = color(234, 197, 87, 255);
      colors[512] = color(234, 192, 71, 255);
      colors[1024] = color(146, 208, 80, 255);
      colors[2048] = color(0, 176, 240, 255);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b39d26017350e72d678535090d1b7794a266be9b.js.map