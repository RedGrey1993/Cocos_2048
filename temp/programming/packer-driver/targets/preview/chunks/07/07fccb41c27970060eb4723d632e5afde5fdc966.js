System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Label, Node, NodeEventType, Prefab, randomRangeInt, tween, UITransform, Vec2, view, Block, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, gBlockHorizontalNum, gBlockVerticalNum, gRandomGenerateNumbers, gTouchMoveThreshold, Game;

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
      NodeEventType = _cc.NodeEventType;
      Prefab = _cc.Prefab;
      randomRangeInt = _cc.randomRangeInt;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      view = _cc.view;
    }, function (_unresolved_2) {
      Block = _unresolved_2.Block;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8af74h0+J5CZp9B7X6aXB2y", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Label', 'Node', 'NodeEventType', 'Prefab', 'randomRangeInt', 'Sprite', 'tween', 'UITransform', 'Vec2', 'view']);

      ({
        ccclass,
        property
      } = _decorator); // 格子行数

      gBlockHorizontalNum = 4; // 格子列数

      gBlockVerticalNum = 4; // 新格子可能随机生成的数字

      gRandomGenerateNumbers = [2, 4]; // 操作滑动距离阈值，超过该阈值才认为是有效的滑动，否则不响应，单位是像素

      gTouchMoveThreshold = 50;

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
          this.blockPositions = [];
          this.blocks = [];
          this.startPosition = void 0;
          this.endPosition = void 0;
          this.moveDirection = [0, -1];
        }

        //默认向左移动
        drawBgBlocks() {
          this.blockSize = (view.getVisibleSize().width - this.gap * (gBlockHorizontalNum + 1)) / gBlockHorizontalNum;
          this.blockPositions = [];
          var y = this.gap + this.blockSize / 2;

          for (var i = 0; i < gBlockVerticalNum; ++i) {
            var x = this.gap + this.blockSize / 2;
            this.blockPositions.push(new Array(gBlockHorizontalNum));

            for (var j = 0; j < gBlockHorizontalNum; ++j) {
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

        } // 初始化的时候调用一次


        init() {
          this.updateScore(0);

          for (var i = 0; i < this.blocks.length; ++i) {
            for (var j = 0; j < this.blocks[i].length; ++j) {
              if (this.blocks[i][j] != null) {
                this.blocks[i][j].destroy();
              }
            }
          }

          this.blocks = [];

          for (var i = 0; i < gBlockVerticalNum; ++i) {
            this.blocks.push(new Array(gBlockHorizontalNum));

            for (var j = 0; j < gBlockHorizontalNum; ++j) {
              this.blocks[i][j] = null;
            }
          } // console.log(this.blocks);
          // console.log(this.getFreeBlocksXy());


          this.addRandomNumberBlock();
          this.addRandomNumberBlock();
          this.addRandomNumberBlock();
        } // 更新总分数


        updateScore(num) {
          this.score = num;
          this.scoreLabel.string = '分数: ' + num;
        } // 获取空白块的xy下标


        getFreeBlocksXy() {
          var freeBlocksXy = [];

          for (var i = 0; i < this.blocks.length; ++i) {
            for (var j = 0; j < this.blocks[i].length; ++j) {
              if (this.blocks[i][j] == null) {
                freeBlocksXy.push([i, j]);
              }
            }
          }

          return freeBlocksXy;
        } // 随机在空白位置处添加一个数字块


        addRandomNumberBlock() {
          var freeBlocksXy = this.getFreeBlocksXy();
          if (freeBlocksXy.length == 0) return false;
          var index = freeBlocksXy[randomRangeInt(0, freeBlocksXy.length)]; // console.log(index);

          var pos = this.blockPositions[index[0]][index[1]]; // console.log(pos);

          var block = instantiate(this.blockPrefab);
          var blockUiTransform = block.getComponent(UITransform);
          blockUiTransform.width = blockUiTransform.height = this.blockSize;
          block.setPosition(pos.x, pos.y); // console.log(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);

          block.getComponent(_crd && Block === void 0 ? (_reportPossibleCrUseOfBlock({
            error: Error()
          }), Block) : Block).setNumber(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);
          this.background.addChild(block); // console.log(this.background.children)

          this.blocks[index[0]][index[1]] = block;
          return true;
        }

        moveAninmation() {
          for (var i = 0; i < gBlockHorizontalNum; ++i) {
            for (var j = 0; j < gBlockVerticalNum; ++j) {
              if (j > 0 && this.blocks[i][j] != null) {
                var t = tween(this.blocks[i][j]);
                t.to(0.5, {
                  worldPosition: this.blockPositions[i][j - 1]
                }, {
                  easing: 'backOut'
                });
                t.call(() => {});
                t.start();
              }
            }
          }
        }

        moveRight() {
          console.log('move right');
          this.moveDirection = [0, 1];
          this.moveAninmation();
        }

        moveLeft() {
          console.log('move left');
          this.moveDirection = [0, -1];
        }

        moveUp() {
          console.log('move up');
          this.moveDirection = [1, 0];
        }

        moveDown() {
          console.log('move down');
          this.moveDirection = [-1, 0];
        }

        touchEnd(event) {
          this.endPosition = event.getLocation(); // console.log(this.endPosition);

          var dirVec = this.endPosition.subtract(this.startPosition); // console.log(dirVec);

          if (dirVec.length() > gTouchMoveThreshold) {
            if (Math.abs(dirVec.x) > Math.abs(dirVec.y)) {
              // 水平滑动
              if (dirVec.x > 0) {
                this.moveRight();
              } else {
                this.moveLeft();
              }
            } else {
              // 竖直滑动
              if (dirVec.y > 0) {
                this.moveUp();
              } else {
                this.moveDown();
              }
            }
          }
        }

        addEventHandler() {
          this.background.on(NodeEventType.TOUCH_START, event => {
            this.startPosition = event.getLocation(); // console.log(this.startPosition);
          });
          this.background.on(NodeEventType.TOUCH_END, event => {
            this.touchEnd(event);
          });
          this.background.on(NodeEventType.TOUCH_CANCEL, event => {
            this.touchEnd(event);
          });
        }

        start() {
          this.drawBgBlocks();
          this.init();
          this.addEventHandler();
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
//# sourceMappingURL=07fccb41c27970060eb4723d632e5afde5fdc966.js.map