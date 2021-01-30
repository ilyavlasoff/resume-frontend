<template>
    <div class="row">
        <div class="col justify-content-center">
            <h1 class="mt-5">Страница не найдена</h1>
            <h5><a @click="redirectToMain">Вернуться на главную</a></h5>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NotFoundPage',
    methods: {
        redirectToMain: function() {
            this.$router.push({name: 'homepage'});
        }
    }
}
</script>