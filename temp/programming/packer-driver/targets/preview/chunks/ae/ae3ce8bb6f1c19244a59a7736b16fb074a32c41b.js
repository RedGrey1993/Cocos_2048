System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Label, Node, Prefab, UITransform, Vec2, view, Block, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Game;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBlock(extras) {
    _reporterNs.report("Block", "./Block", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      view = _cc.view;
    }, function (_unresolved_2) {
      Block = _unresolved_2.Block;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8af74h0+J5CZp9B7X6aXB2y", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Label', 'Node', 'Prefab', 'Sprite', 'UITransform', 'Vec2', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = class Game extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scoreLabel", _descriptor, this);

          this.score = 0;

          _initializerDefineProperty(this, "blockPrefab", _descriptor2, this);

          this.gap = 20;

          _initializerDefineProperty(this, "background", _descriptor3, this);

          this.blockSize = 0;
          this.blockHorizontalNum = 4;
          this.blockVerticalNum = 4;
          this.blockPositions = [];
          this.blocks = [];
        }

        drawBgBlocks() {
          this.blockSize = (view.getVisibleSize().width - this.gap * 5) / 4;
          this.blockPositions = [];
          var y = this.gap + this.blockSize / 2;

          for (var i = 0; i < this.blockVerticalNum; ++i) {
            var x = this.gap + this.blockSize / 2;
            this.blockPositions.push([0, 0, 0, 0]);

            for (var j = 0; j < this.blockHorizontalNum; ++j) {
              var block = instantiate(this.blockPrefab);
              var blockUiTransform = block.getComponent(UITransform);
              blockUiTransform.width = blockUiTransform.height = this.blockSize;
              block.setPosition(x, y);
              this.blockPositions[i][j] = new Vec2(x, y);
              block.getComponent(_crd && Block === void 0 ? (_reportPossibleCrUseOfBlock({
                error: Error()
              }), Block) : Block).setNumber(0);
              this.background.addChild(block);
              x += this.gap + this.blockSize;
            }

            y += this.gap + this.blockSize;
          } // console.log(this.blockPositions);

        }

        init() {
          this.updateScore(0);

          for (var i = 0; i < this.blocks.length; ++i) {
            for (var j = 0; j < this.blocks[i].length; ++j) {
              if (this.blocks[i][j] != null) {
                this.blocks[i][j].destroy();
              }
            }
          }
        }

        updateScore(num) {
          this.score = num;
          this.scoreLabel.string = '分数: ' + num;
        }

        start() {
          this.drawBgBlocks();
          this.init();
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blockPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ae3ce8bb6f1c19244a59a7736b16fb074a32c41b.js.map