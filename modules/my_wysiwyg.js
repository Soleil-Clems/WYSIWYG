export class MyWysiwyg {
    constructor(element, options) {
        const defaultOptions = {
            buttons: ["bold", "italic", "underline", "strike", "link", "size"]
        };

        
        this.options = { ...defaultOptions, ...options };
    }

    showParams() {
        return  this.options;
    }
}
