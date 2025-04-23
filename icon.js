class CatciIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'weight'];
    }

    constructor() {
        super();
        this.ensureFontAwesomeLoaded();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    ensureFontAwesomeLoaded() {
        const faHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

        if (![...document.styleSheets].some(
            sheet => sheet.href && sheet.href.includes('font-awesome/6.5.0/css/all.min.css')
        )) {

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = faHref;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        }
    }

    render() {
        const name = this.getAttribute('name') || '';
        const weight = this.getAttribute('weight') || 'solid';

        const weightMap = {
            solid: 'fa-solid',
            regular: 'fa-regular',
            brands: 'fa-brands',
            light: 'fa-light',
            thin: 'fa-thin',
            duotone: 'fa-duotone'
        };

        const styleClass = weightMap[weight] || 'fa-solid';

        this.innerHTML = `<i class="${styleClass} fa-${name}"></i>`;
    }
}

customElements.define('catci-icon', CatciIcon);