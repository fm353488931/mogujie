<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<style>
#tab-bar{
    display: flex;
    background-color: beige;
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(10,10,10,0.5);
}
</style>