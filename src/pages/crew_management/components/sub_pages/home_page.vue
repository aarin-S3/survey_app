<template>
    <div class="home-container" :style="$q.screen.lt.sm ? 'height: 75vh' : '' || $q.screen.lt.md ? 'height: 60vh' : 'height: 90vh'">
        <h3 style="color: #90a4ae; text-align: center;">{{ name }}</h3>
    </div>


</template>

<script>
    export default {
        name: 'HomePage',
        props: {
            name: {
                type: String,
            }
        }
    }
</script>

<style scoped>
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px 5px 0px;
    /* margin-top: -18px */
}
</style>