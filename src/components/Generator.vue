<template>
    <div>
<div class="text-center p-5 mt-10 bg-white text-black w-2/3 mx-auto">
    <div class="mb-5">
        <i class=" fi fi-rr-copy-alt text-3xl mr-2 cursor-pointer" title="Копировать в буфер обмена"
            @click="copyPassword"></i>
        <i class="fi fi-rr-refresh text-3xl cursor-pointer" title="Обновить пароль" @click="getPassword"></i>
    </div>
    <h1 class="font-extrabold text-2xl mx-5 overflow-hidden text-ellipsis cursor-pointer" @click="copyPassword">
        {{ password }}</h1>
</div>
<div class="bg-white text-black mt-3 p-5 w-2/3 mx-auto">
    <h1 class="text-xl">Модифицируйте свой пароль</h1>
    <hr>
    <div class="lg:flex lg:items-center lg:justify-between">
        <div class="text-2xl">
            <h1>Количество символов</h1>
            <input type="number" min="1" max="50" @input="getPassword" v-model="passwordLength">
            <input type="range" min="1" max="50" class="custom-range__input" @input="getPassword"
                v-model="passwordLength">
        </div>
        <div>
            <div class="text-2xl">
                <input type="radio" name="radio" class="mr-3" @input="easyToRead">
                <label for="">Легко читается</label>
            </div>
            <div class="text-2xl">
                <input type="radio" @input="easyToSay" name="radio" class="mr-3">
                <label for="">Легко говорится</label>
            </div>
        </div>
        <div>
            <div class="text-lg my-2">
                <input type="checkbox" v-model="includeUppercase" class="mr-3">
                <label for="">Верхний регистр</label>
            </div>
            <div class="text-lg my-2">
                <input type="checkbox" v-model="includeLowercase" class="mr-3">
                <label for="">Нижний регистр</label>
            </div>
            <div class="text-lg my-2">
                <input type="checkbox" v-model="includeNumbers" class="mr-3" :disabled="flag">
                <label for="">Наличие цифр</label>
            </div>
            <div class="text-lg my-2">
                <input type="checkbox" v-model="includeSpecial" class="mr-3" :disabled="flag">
                <label for="">Наличие специальных знаков</label>
            </div>
            <MyButton @click="getPassword">Обновить настройки</MyButton>
        </div>
    </div>
</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/runtime-core';
import { onMounted } from 'vue';
import MyButton from '@/components/UI/MyButton.vue'
import { useToast } from "vue-toastification";

let password = ref("");
let passwordLength = ref(12);
let includeLowercase = ref(true);
let includeUppercase = ref(true);
let includeNumbers = ref(true);
let includeSpecial = ref(true);
let flag = ref(false);
let readFlag = ref(false);

const toast = useToast()

function easyToSay() {
    includeNumbers.value = false;
    includeSpecial.value = false;
    flag.value = true;
}

function easyToRead() {
    readFlag.value = true;
    flag.value = false;
}

function copyPassword() {
    navigator.clipboard.writeText(password.value);
    toast.success("Вы успешно скопировали пароль", { timeout: 2000 })
}

function getPassword() {
    let charSet = '';
    let generatePassword = '';

    if (includeLowercase.value) {
        if (readFlag.value === true) {
            charSet += "abcdefghijkmnopqrstuvwxyz";
        }
        charSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (includeUppercase.value) {
        if (readFlag.value === true) {
            charSet += "ABCDEFGHJKMNPQRSTUVWXYZ";
        } charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeNumbers.value) {
        if (readFlag.value === true) {
            charSet += "23456789";
        } charSet += "0123456789";
    }
    if (includeSpecial.value) {
        charSet += "!@#$%^&*()_+-=[]{}|;':,.<>?";
    }

    if (passwordLength.value <= 0) {
        passwordLength.value = 1;
        toast.error("Пароль должен иметь хотя бы 1 символ", { timeout: 2000 })
    }

    if (passwordLength.value > 50) {
        passwordLength.value = 50;
        toast.error("Пароль не может быть длиннее 50 символов", { timeout: 2000 })
    }

    if (!includeLowercase.value && !includeSpecial.value && !includeNumbers.value && !includeUppercase.value) {
        toast.error("Нужно выбрать как минимум один критерий", { timeout: 1000 })
    }

    for (let i = 0; i < passwordLength.value; i++) {
        generatePassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    password.value = generatePassword
}

onMounted(() => {
    getPassword()
})
</script>

<style scoped>

</style>