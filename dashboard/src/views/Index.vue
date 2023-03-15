<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div>
        <div>
            <h2>Databases</h2>
            <p>Databases section contains realtime options, databases modelisation or schema creation.</p>
            <RouterLink to="/databases"><button>Go to Databases</button></RouterLink>
        </div>
        <div>
            <h2>Analyses</h2>
            <p>This section contains statistics about the databases, collections or documents. You can see informations about the users like their localication or number of request.</p>
            <RouterLink to="/analyses"><button>Check analyses</button></RouterLink>
        </div>
        <div>
            <h2>Storage</h2>
            <p>Storage section contains all that you need to manage files with Mongost.</p>
            <RouterLink to="/storage"><button>Use storage</button></RouterLink>
        </div>
        <div>
            <h2>Authentication</h2>
            <p>This section contains authentication provider that can return user datas with simple pop-up windows.</p>
            <RouterLink to="/authentication"><button>Manage auth</button></RouterLink>
        </div>
        <div>
            <h2>Settings</h2>
            <p>Advance configuration section of Mongost, like user or permissions management.</p>
            <RouterLink to="/settings"><button>Manage Mongost</button></RouterLink>
        </div>
        <div>
            <h2>Functions</h2>
            <p>Functions are like IFTTT, under a form of API and container with a GUI configurator.</p>
            <RouterLink to="/IFTTT"><button>Manage your IFTTTs</button></RouterLink>
        </div>
        <div>
            <h2>API</h2>
            <p>API enables you to share databases in readonly.</p>
            <RouterLink to="/API"><button>Manage your APIs</button></RouterLink>
        </div>
    </div>
</template>
<style scoped>
.darkmode * {
    color: var(--light);
}
* {
    color: var(--dark);
}
main > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 50px;

    justify-content: space-between;
    padding: 30px;
    width: 100%;
}
main > div > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}
button {
    background: var(--color);
    color: var(--dark) !important;
    border: none;
    padding: 10px;
    margin-top: 20px;
}
p {
    font-size: 15px;
}
@media screen and (max-width: 770px) {
    main > div {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    main > div > div {
        max-width: 100%;
    }
}
</style>