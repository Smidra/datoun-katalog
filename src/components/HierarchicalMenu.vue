<template>
    <ul class="cv-side-nav-menu bx--side-nav__item">
        <li v-for="item in flattenedItems" :key="item.value" :class="{ 'bx--side-nav__item--active': item.isRefined }">
            <button class="bx--side-nav__submenu" @click="handleClick(item)"
                :style="{ fontWeight: item.isRefined ? 'bold' : 'normal', paddingLeft: `${item.depth * 1.5}rem` }">
                <span class="bx--side-nav__submenu-title"
                    :style="{ color: item.depth > 0 ? 'gray' : 'black', paddingLeft: '1rem' }">{{ item.label }} ({{
                        item.count }})</span>
                <div v-if="true" class="bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron"
                    :class="{ 'bx--side-nav__submenu-chevron--expanded': item.isRefined }">
                    <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" class="cv-side-nav-menu__chevron-svg" width="20" height="20" viewBox="0 0 32 32"
                        aria-hidden="true">
                        <path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path>
                    </svg>
                </div>

            </button>
        </li>
    </ul>
</template>
  
<script>
export default {
    name: 'HierarchicalMenu',
    props: ['items', 'refine', 'canRefine'],
    computed: {
        flattenedItems() {

            let stack = [...this.items.map(item => ({ ...item, depth: 0 }))];
            let flattened = [];

            while (stack.length > 0) {
                let { data, ...item } = stack.pop();
                flattened.push({ ...item });
                // console.log('----')
                // console.log(item)

                if (data) {
                    let itemsToPush = data.map(i => ({ ...i, depth: item.depth + 1 }));
                    stack.push(...itemsToPush);
                }
            }

            return flattened;
        },
    },
    methods: {
        handleClick(item) {
            this.refine(item.value);
        }
    },
};
</script>
  
<style scoped>
.bx--side-nav__submenu-chevron--expanded .cv-side-nav-menu__chevron-svg {
    transform: rotate(180deg);
    transition: transform 0.1s ease-in-out;
}

.cv-side-nav-menu {
    padding-top: 1rem;
}
</style>