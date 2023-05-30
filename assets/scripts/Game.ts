import { _decorator, Component, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

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

    start() {
        this.scoreLabel.string = "HHHHH";
    }

    update(deltaTime: number) {
        
    }
}

