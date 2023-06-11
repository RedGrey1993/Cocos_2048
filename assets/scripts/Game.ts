import { _decorator, Component, instantiate, Label, Node, NodeEventType, Prefab, randomRangeInt, Sprite, tween, UITransform, Vec2, Vec3, view } from 'cc';
import { colors }  from './Colors';
import { Block } from './Block';
const { ccclass, property } = _decorator;

// 格子行数
const gBlockHorizontalNum: number = 4;
// 格子列数
const gBlockVerticalNum: number = 4;
// 新格子可能随机生成的数字
const gRandomGenerateNumbers: number[] = [2, 4];
// 操作滑动距离阈值，超过该阈值才认为是有效的滑动，否则不响应，单位是像素
const gTouchMoveThreshold: number = 50;

@ccclass('Game')
export class Game extends Component {
    @property({type: Label})
    private scoreLabel: Label;
    private score: number = 0;
    @property({type: Prefab})
    private blockPrefab: Prefab;
    private gap: number = 20;
    @property({type: Node})
    private background: Node;
    private blockSize: number = 0;
    private blockPositions: Vec2[][] = [];
    private blocks = [];
    private startPosition: Vec2;
    private endPosition: Vec2;
    private moveDirection = [0, -1]; //默认向左移动

    drawBgBlocks() {
        this.blockSize = 
            (view.getVisibleSize().width - this.gap * (gBlockHorizontalNum + 1)) / gBlockHorizontalNum;

        this.blockPositions = [];
        var y = this.gap + this.blockSize / 2;
        for (var i=0;i<gBlockVerticalNum;++i) {
            var x = this.gap + this.blockSize / 2;
            this.blockPositions.push(new Array<Vec2>(gBlockHorizontalNum));
            for(var j=0;j<gBlockHorizontalNum;++j) {
                var block = instantiate(this.blockPrefab);
                var blockUiTransform = block.getComponent(UITransform);
                blockUiTransform.width = blockUiTransform.height = this.blockSize;
                block.setPosition(x, y);
                this.blockPositions[i][j] = new Vec2(x, y);
                block.getComponent(Block).setNumber(0);
                this.background.addChild(block);
                x += this.gap + this.blockSize;
            }
            y += this.gap + this.blockSize;
        }
        // console.log(this.blockPositions);
    }

    // 初始化的时候调用一次
    init() {
        this.updateScore(0);

        for(var i=0;i<this.blocks.length;++i) {
            for(var j=0;j<this.blocks[i].length;++j) {
                if (this.blocks[i][j] != null) {
                    this.blocks[i][j].destroy();
                }
            }
        }

        this.blocks = [];
        for (var i=0;i<gBlockVerticalNum;++i) {
            this.blocks.push(new Array(gBlockHorizontalNum));
            for (var j=0;j<gBlockHorizontalNum;++j) {
                this.blocks[i][j] = null;
            }
        }
        // console.log(this.blocks);
        // console.log(this.getFreeBlocksXy());

        this.addRandomNumberBlock();
        this.addRandomNumberBlock();
        this.addRandomNumberBlock();
    }

    // 更新总分数
    updateScore(num: number) {
        this.score = num;
        this.scoreLabel.string = '分数: ' + num;
    }

    // 获取空白块的xy下标
    getFreeBlocksXy() {
        var freeBlocksXy = [];
        for(var i = 0; i<this.blocks.length;++i) {
            for(var j =0;j<this.blocks[i].length;++j) {
                if (this.blocks[i][j] == null) {
                    freeBlocksXy.push([i, j]);
                }
            }
        }
        return freeBlocksXy;
    }

    // 随机在空白位置处添加一个数字块
    addRandomNumberBlock() {
        var freeBlocksXy = this.getFreeBlocksXy();
        if (freeBlocksXy.length == 0) return false;
        var index = freeBlocksXy[randomRangeInt(0, freeBlocksXy.length)];
        // console.log(index);
        var pos = this.blockPositions[index[0]][index[1]];
        // console.log(pos);
        var block = instantiate(this.blockPrefab);
        var blockUiTransform = block.getComponent(UITransform);
        blockUiTransform.width = blockUiTransform.height = this.blockSize;
        block.setPosition(pos.x, pos.y);
        // console.log(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);
        block.getComponent(Block).setNumber(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);
        this.background.addChild(block);
        // console.log(this.background.children)
        this.blocks[index[0]][index[1]] = block;
        return true;
    }

    moveAninmation() {
        for(var i=0;i<gBlockHorizontalNum;++i) {
            for(var j=0;j<gBlockVerticalNum;++j) {
                if (j > 0 && this.blocks[i][j] != null) {
                    var t = tween(this.blocks[i][j]);
                    t.to(0.5, {worldPosition: new Vec3(this.blockPositions[i][j-1].x, this.blockPositions[i][j-1].y, 1)}, {easing: 'backOut'});
                    t.call(()=>{
                        
                    })
                    t.start();
                }
            }
        }
    }

    moveRight() {
        console.log('move right');
        this.moveDirection = [0, 1];
    }

    moveLeft() {
        console.log('move left');
        this.moveDirection = [0, -1];
        this.moveAninmation();
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
        this.endPosition = event.getLocation();
        // console.log(this.endPosition);
        var dirVec = this.endPosition.subtract(this.startPosition);
        // console.log(dirVec);
        if (dirVec.length() > gTouchMoveThreshold) {
            if (Math.abs(dirVec.x) > Math.abs(dirVec.y)) { // 水平滑动
                if (dirVec.x > 0) {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
            } else { // 竖直滑动
                if (dirVec.y > 0) {
                    this.moveUp();
                } else {
                    this.moveDown();
                }
            }
        }
    }

    addEventHandler() {
        this.background.on(NodeEventType.TOUCH_START, (event) => {
            this.startPosition = event.getLocation();
            // console.log(this.startPosition);
        });

        this.background.on(NodeEventType.TOUCH_END, (event) => {
            this.touchEnd(event);
        });

        this.background.on(NodeEventType.TOUCH_CANCEL, (event) => {
            this.touchEnd(event);
        });
    }

    start() {
        this.drawBgBlocks();
        this.init();
        this.addEventHandler();
    }

    update(deltaTime: number) {
        
    }
}

