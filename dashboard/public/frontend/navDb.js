class navDb extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<details>
            <summary onclick="((event) => {
                let p = event.target;
                if (p.tagName)
                    while (p.tagName != 'P')
                        p = p.children[0]
                window.location.href = window.location.href.split('#')[0] + '#' + p.innerHTML
        
                if (window.location.hash.split(':').length > 1) {
                    document.querySelector('#dbManage > .default_db').style.display = 'none';
                    document.querySelector('#dbManage > .default_col').style.display = 'none';
                    document.querySelector('#dbManage > .content').style.display = 'flex';
                }
                else if (window.location.hash != '') {
                    document.querySelector('#dbManage > .default_db').style.display = 'none';
                    document.querySelector('#dbManage > .default_col').style.display = 'flex';
                    document.querySelector('#dbManage > .content').style.display = 'none';
                }
                else {
                    document.querySelector('#dbManage > .default_db').style.display = 'flex';
                    document.querySelector('#dbManage > .default_col').style.display = 'none';
                    document.querySelector('#dbManage > .content').style.display = 'none';
                }
            })(event)"><span class="material-symbols-outlined">database</span><p>${this.getAttribute('database')}</p></summary>
            ${this.innerHTML}
        </details>`;
    }
}

customElements.define('f-navdb', navDb);