<script setup>
import { loginPlaceholderStore } from '../stores/login/placeholder';
import { loginPasswordStore } from '../stores/login/password';

const password = loginPasswordStore();
const placeholder = loginPlaceholderStore();

if (window.innerWidth <= 425) [placeholder.username, placeholder.password] = ['Username', 'Password'];
window.addEventListener('resize', () => { if (window.innerWidth <= 425) [placeholder.username, placeholder.password] = ['Username', 'Password']; else [placeholder.username, placeholder.password] = ['', '']; })
</script>
<template>
    <div>
        <div>
            <h1>Mongost</h1>
            <div><label>Username</label><input :placeholder="[placeholder.username]"></div>
            <div><label>Password</label><input :type="[password.type]" :placeholder="[placeholder.password]"><span class="material-symbols-outlined" @click="password.toggle">{{password.visibility}}</span></div>
            <button>Submit</button>
        </div>
    </div>
</template>
<style scoped>
    main > div {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: var(--light);
    }
    main > div > div {
        position: absolute;
        padding: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 5px 5px 5px #00000027;

        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    main > div > div > div {
        display: flex;
        gap: 5px;
        align-items: center;
    }
    main > div > div > div label {
        display: block;
        width: 100px;
    }
    input {
        border: none;
        font-size: 14px;
        border-bottom: 1px solid var(--dark);
    }
    button {
        margin-top: 8px;
        font-size: 16px;
        border: 0px;
        padding-top: 5px;
        padding-bottom: 5px;
        transition: 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
    }
    button:hover {
        background: var(--color);
    }
    @media screen and (max-width: 425px) {
        main > div > div {
            width: 100%;
            box-shadow: none;
        }
        input {
            width: 100%;
        }
        main > div > div > div {
            gap: 15px;
        }
        main > div > div > div label {
            display: none;
        }
    }
</style>