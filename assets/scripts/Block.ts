import { _decorator, Component, Label, Node, Sprite } from 'cc';
import { colors } from './Colors'
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {
    @property({type: Label})
    private numberLabel: Label;

    setNumber(num: number) {
        if (num == 0) {
            this.numberLabel.node.active = false;
        }
        this.numberLabel.string = num.toString();
        var blockSprite = this.getComponent(Sprite);
        if (num in colors) {
            blockSprite.color = colors[num];
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

