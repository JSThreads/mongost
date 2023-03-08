class manageDb extends HTMLElement {
    connectedCallback() {
        const dbs = window.dbs;

        let innerHTML = ``;
        dbs.forEach(db => {
            innerHTML += `<f-carddb database="${db.name}"></f-carddb>`;
        });

        innerHTML += `<div style="display: flex; gap: 10px; align-items: center;"><span class="material-symbols-outlined">add</span><p>New database</p></div>`;

        this.innerHTML = innerHTML;
    }
}

customElements.define('f-managedb', manageDb);