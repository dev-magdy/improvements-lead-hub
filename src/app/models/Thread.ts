import { Reply } from "./Reply";

export class Thread {
    author: string;
    severity: string;
    label: string;
    location: string;
    text: string;
    replies: Reply[];

    constructor() {
        this.author = '';
        this.severity = '';
        this.label = '';
        this.location = '';
        this.text = '';
        this.replies = []
    }
}