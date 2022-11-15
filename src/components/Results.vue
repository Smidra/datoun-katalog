<template>
    <ais-hits><template v-slot:item="{ item }">
            <!-- The collapse itself -->
            <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 md:hover:text-accent">

                <!-- Name of the collapse -->
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium">
                    <a class="font-bold text-secondary">{{ item.jmeno_firmy }}
                    </a> <a class="italic">{{ item.vyrobny[0].lokalita }}</a>
                </div>
                <!-- Inside the collapse -->
                <div class="collapse-content">
                    <p class="text-base-content">{{ item.popisek_firmy }}<a :href=item.eshop>{{ item.eshop }}</a></p>
                </div>

            </div>
        </template></ais-hits>

</template>