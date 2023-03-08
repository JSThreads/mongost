

class navGen extends HTMLElement {
    connectedCallback() {
        const dbs = window.dbs;

        let innerHTML = ``;
        dbs.forEach(db => {
            innerHTML += `<f-navdb database="${db.name}">`;

            db.collections.forEach(collection => {
                innerHTML += `<f-navcol collection="${collection}"></f-navcol>`;
            });

            innerHTML += `<div><span class="material-symbols-outlined">add</span><p>New collection</p></div></f-navdb>
            `;
        });

        this.innerHTML = innerHTML;
    }
}

customElements.define('f-navgen', navGen);