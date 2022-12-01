<script setup>
</script>

<template>

    <ais-hits>
        <template v-slot:item="{ item }">
            <div class="w-full">

                <div class="w-full flex flex-row justify-between">
                    <n-h2>{{ item.jmeno_firmy }}, {{ item.vyrobny[0].lokalita.hezkyNazev }}</n-h2>
                    <a :href="item.eshop" target="_blank">
                        <n-button size="small" href="googl.com" target="_blank">e-shop</n-button>
                    </a>
                </div>

                <n-collapse>
                    <n-collapse-item title="Více" name="1">
                        <n-p>{{ item.popisek_firmy }}</n-p>

                        <n-alert type="warning" :show-icon="false">
                            {{ item.poznamky_k_vyrobe }}
                        </n-alert>
                        
                        <n-icon-wrapper :size="24" :border-radius="10">
                            <n-icon :size="18" :component="Checkmark16" />
                        </n-icon-wrapper>

                    </n-collapse-item>
                </n-collapse>
            </div>
        </template>
    </ais-hits>

    <!--     <ais-hits>
        <template v-slot:item="{ item }">
            <a class="">{{ item.jmeno_firmy }}
            </a> <a class="italic">{{ item.vyrobny[0].lokalita.hezkyNazev }}</a>
            <p class="">{{ item.popisek_firmy }}<a :href=item.eshop>{{ item.eshop }}</a></p>
        </template>
    </ais-hits>
 -->
</template>