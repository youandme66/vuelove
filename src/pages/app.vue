<style>
.test > p {
    background-color: aqua;
}
</style>

<template>
    <article class="test">
        <p>{{vue}}</p>
    </article>
</template>

<script>
import { mapState } from 'vuex';
import MODULE_TYPE from '../stores/module-type';
export default {
    computed: mapState({
        vue: (state) => {
            return state[MODULE_TYPE.APP].vue;
        }
    })
}
</script>