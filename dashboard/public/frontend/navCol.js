class navCol extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<span onclick="((event) => {
            event.preventDefault()
            let p = event.target;
            while (p.tagName != 'P')
                p = p.children[0]
            window.location.href = window.location.origin + window.location.pathname + window.location.hash.split(':')[0] + ':' + p.innerHTML

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
        })(event)"><span class="material-symbols-outlined">folder</span><p>${this.getAttribute('collection')}</p></span>`;
    }
}

customElements.define('f-navcol', navCol);