import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { colors } from './Colors'
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {
    @property({type: Label})
    private numberLabel: Label;
    private num: number = 0;

    setNumber(num: number) {
        if (num == 0) {
            this.numberLabel.node.active = false;
        }
        this.num = num;
        this.numberLabel.string = num.toString();
        var blockSprite = this.getComponent(Sprite);
        if (num in colors) {
            blockSprite.color = colors[num];
        }
    }

    getNumber() {
        return this.num;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

