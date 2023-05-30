System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, _dec, _class, _crd, ccclass, property, Game;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8af74h0+J5CZp9B7X6aXB2y", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec(_class = class Game extends Component {
        constructor(...args) {
          super(...args);
          this.scoreLabel = void 0;
          this.score = 0;
          this.blockPrefab = void 0;
          this.gap = 20;
          this.background = void 0;
        }

        start() {
          this.background = this.node.getChildByName("Background");
          this.scoreLabel = this.background.getChildByName("ScoreLabel").getComponent(Label);
          this.scoreLabel.string = "Score FHH";
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=35379a6247d0e2d00bff2cbb711389fb15e3718d.js.map