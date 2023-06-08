System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Sprite, colors, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Block;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfcolors(extras) {
    _reporterNs.report("colors", "./Colors", _context.meta, extras);
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
      Label = _cc.Label;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      colors = _unresolved_2.colors;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a8c17qjIrVPp6yZGPJF9Nci", "Block", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'Node', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Block", Block = (_dec = ccclass('Block'), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = class Block extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "numberLabel", _descriptor, this);
        }

        setNumber(num) {
          if (num == 0) {
            this.numberLabel.node.active = false;
          }

          this.numberLabel.string = num.toString();
          var blockSprite = this.getComponent(Sprite);

          if (num in (_crd && colors === void 0 ? (_reportPossibleCrUseOfcolors({
            error: Error()
          }), colors) : colors)) {
            blockSprite.color = (_crd && colors === void 0 ? (_reportPossibleCrUseOfcolors({
              error: Error()
            }), colors) : colors)[num];
          }
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "numberLabel", [_dec2], {
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
//# sourceMappingURL=ba41656d358f283850a9a199bb2a10960bbc0340.js.map