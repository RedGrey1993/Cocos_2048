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
    private blockPositions: Vec3[][] = [];
    private blocks: Node[][] = [];
    private startPosition: Vec2;
    private endPosition: Vec2;
    private moveDirection = [0, -1]; //默认向左移动
    private canOperate = true;
    private acuallyMoved = false;   // 如果滑动事件后，没有一个格子能移动，则不新增格子
    // 前一次滑动是否是相同分数的合并，避免连环合并的情况
    // 如: 2 2 4，向左划，应该是4 4，而不应该是8
    private prevMerged: boolean[][] = [];

    drawBgBlocks() {
        this.blockSize = 
            (view.getVisibleSize().width - this.gap * (gBlockHorizontalNum + 1)) / gBlockHorizontalNum;

        this.blockPositions = [];
        var y = this.gap + this.blockSize / 2;
        for (var i=0;i<gBlockVerticalNum;++i) {
            var x = this.gap + this.blockSize / 2;
            this.blockPositions.push(new Array<Vec3>(gBlockHorizontalNum));
            for(var j=0;j<gBlockHorizontalNum;++j) {
                var block = instantiate(this.blockPrefab);
                var blockUiTransform = block.getComponent(UITransform);
                blockUiTransform.width = blockUiTransform.height = this.blockSize;
                block.setPosition(x, y, 0);
                this.blockPositions[i][j] = new Vec3(x, y, 1);
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
            this.blocks.push(new Array<Node>(gBlockHorizontalNum));
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
        block.setPosition(pos);
        // console.log(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);
        block.getComponent(Block).setNumber(gRandomGenerateNumbers[randomRangeInt(0, gRandomGenerateNumbers.length)]);
        this.background.addChild(block);
        // console.log(this.background.children)
        this.blocks[index[0]][index[1]] = block;
        return true;
    }

    moveAninmation(block: Node, pos: Vec3, callback) {
        this.acuallyMoved = true;
        var t = tween(block);
        t.to(0.01, {worldPosition: pos}, {easing: 'backOut'});
        t.call(()=>{
            callback && callback();
        })
        t.start();
    }

    inRange(x, y) {
        return x >= 0 && x < gBlockHorizontalNum && y >=0 && y < gBlockVerticalNum;
    }

    move(x, y, callback) {
        var tx = x + this.moveDirection[0];
        var ty = y + this.moveDirection[1];

        if (!this.inRange(tx, ty)) {
            callback && callback();
        } else if (this.blocks[tx][ty] == null) {
            var pos = this.blockPositions[tx][ty];
            this.blocks[tx][ty] = this.blocks[x][y]
            this.blocks[x][y] = null;
            this.moveAninmation(this.blocks[tx][ty], pos, () => {
                this.move(tx, ty, callback);
            });
        } else if (this.blocks[tx][ty].getComponent(Block).getNumber() ==
            this.blocks[x][y].getComponent(Block).getNumber()) {
            if (this.prevMerged[tx][ty]) {
                callback && callback();
                return;
            }
            var pos = this.blockPositions[tx][ty];
            this.moveAninmation(this.blocks[x][y], pos, () => {
                var num = this.blocks[tx][ty].getComponent(Block).getNumber();
                this.blocks[tx][ty].getComponent(Block).setNumber(num * 2);
                this.background.removeChild(this.blocks[x][y]);
                this.blocks[x][y].destroy();
                this.blocks[x][y] = null;
                this.prevMerged[tx][ty] = true;
                callback && callback();
            });
        } else { //和前一个格子数字不一样
            callback && callback();
        }
    }

    doMove(startx, endx, starty, endy, stepx, stepy) {
        var toMove = [];
        for (var i:number=startx;i!=endx;i+=stepx) {
            for(var j=starty;j!=endy;j+=stepy) {
                if (this.blocks[i][j] != null) {
                    toMove.push([i,j]);
                }
            }
        }
        var cur = 0;
        var moveFinish = () => {
            cur++;
            if (cur == toMove.length) {
                if (this.acuallyMoved) {
                    this.addRandomNumberBlock();
                }
                this.canOperate = true;
            } else {
                this.move(toMove[cur][0], toMove[cur][1], moveFinish);
            }
        };
        this.move(toMove[cur][0], toMove[cur][1], moveFinish);
    }

    moveRight() {
        console.log('move right');
        this.moveDirection = [0, 1];
        var startx=0, endx=gBlockHorizontalNum;
        var starty=gBlockVerticalNum-1, endy=-1;
        this.doMove(startx, endx, starty, endy, 1, -1);
    }

    moveLeft() {
        console.log('move left');
        this.moveDirection = [0, -1];
        var startx=0, endx=gBlockHorizontalNum;
        var starty=0, endy=gBlockVerticalNum;
        this.doMove(startx, endx, starty, endy, 1, 1);
    }

    moveUp() {
        console.log('move up');
        this.moveDirection = [1, 0];
        var startx=gBlockHorizontalNum-1, endx=-1;
        var starty=0, endy=gBlockVerticalNum;
        this.doMove(startx, endx, starty, endy, -1, 1);
    }

    moveDown() {
        console.log('move down');
        this.moveDirection = [-1, 0];
        var startx=0, endx=gBlockHorizontalNum;
        var starty=0, endy=gBlockVerticalNum;
        this.doMove(startx, endx, starty, endy, 1, 1);
    }

    touchEnd(event) {
        if (this.canOperate == false) {
            return;
        }
        this.endPosition = event.getLocation();
        // console.log(this.endPosition);
        var dirVec = this.endPosition.subtract(this.startPosition);
        // console.log(dirVec);
        if (dirVec.length() > gTouchMoveThreshold) {
            this.canOperate = false;
            this.acuallyMoved = false;
            for(var i=0;i<gBlockHorizontalNum;++i) {
                this.prevMerged[i]=[];
                for(var j=0;j<gBlockVerticalNum;++j) {
                    this.prevMerged[i][j] = false;
                }
            }
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

