class cardDb extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div><div><h3>${this.getAttribute('database')}</h3><p>${/*window.props[this.getAttribute('database')].description || */ 'no description'}</p><span>${/*window.props[this.getAttribute('database')].size || */ 'no known size'}</span></div><div><div><span class="material-symbols-outlined">settings</span> Manage</div><div><span class="material-symbols-outlined" style="color: #ff6959">delete</span> Delete</div></div></div>`;
    }
}

customElements.define('f-carddb', cardDb);