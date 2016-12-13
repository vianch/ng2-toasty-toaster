class ToastyConfig {
    public limit: number;
    public position: string;
    public showClose: boolean;
    public theme: string;
    public timeout: number;

    constructor() {
        this.limit = 5;
        this.position = ToastyPositions[0];
        this.showClose = true;
        this.theme = ToastyThemes[ToastyThemes.colored];
        this.timeout = 5000;
    }
}

const ToastyPositions = [
    "bottom-right", "bottom-left", "top-right", "top-left", "top-center", "bottom-center", "center-center"
];

enum ToastyThemes {
    colored,
    material,
    bootstrap,
}
enum ToastyTypes {
    default,
    info,
    success,
    wait,
    warning,
    error,
}

class Toast {
    public id: string;
    public type: string;
    public title: string;
    public message: string;

    constructor() {
        this.id = this.generateToastID();
        this.type = ToastyTypes[ToastyTypes.default];
        this.title = "";
        this.message = "";
    }

    private generateToastID(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
    }
}

export {
    ToastyPositions,
    ToastyThemes,
    ToastyTypes,
    ToastyConfig,
    Toast,
}

