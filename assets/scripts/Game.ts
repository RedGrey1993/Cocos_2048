import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, UITransform, Vec2, view } from 'cc';
import { colors }  from './Colors';
import { Block } from './Block';
const { ccclass, property } = _decorator;

const gBlockHorizontalNum: number = 4;
const gBlockVerticalNum: number = 4;
const gRandomGenerateNumbers = [2, 4];

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
    private blockPositions = [];
    private blocks = [];

    drawBgBlocks() {
        this.blockSize = 
            (view.getVisibleSize().width - this.gap * (gBlockHorizontalNum + 1)) / gBlockHorizontalNum;

        this.blockPositions = [];
        var y = this.gap + this.blockSize / 2;
        for (var i=0;i<gBlockVerticalNum;++i) {
            var x = this.gap + this.blockSize / 2;
            this.blockPositions.push(new Array(gBlockHorizontalNum));
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
    }

    // 更新总分数
    updateScore(num: number) {
        this.score = num;
        this.scoreLabel.string = '分数: ' + num;
    }

    // 获取空白块的xy下表索引
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
    addNumberBlock() {

    }

    start() {
        this.drawBgBlocks();
        this.init();
    }

    update(deltaTime: number) {
        
    }
}

