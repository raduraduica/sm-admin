<template>
    <v-card>
        <v-navigation-drawer
            app
            permanent
            expand-on-hover
        >
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                </v-list-item-avatar>
            </v-list-item>
            <h1></h1>
            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Sandra Adams
                    </v-list-item-title>
                    <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
            dense
            v-for="(m,i) in menus"
            :key="i"
        >
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>{{ m.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    <router-link :to="m.link">{{ m.label }}</router-link>
                </v-list-item-title>
            </v-list-item>

        </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    name: "Navigation",
    props: [],
    data() {
        return {
            menus: [
                {link: '/', label: 'Home', icon: 'mdi-folder'},
                {link: '/articles', label: 'Articles', icon: 'mdi-account-multiple'},
                {link: '/users', label: 'Users', icon: 'mdi-star'},
                {link: '/about', label: 'About', icon: 'mdi-star'},
            ]
        }
    }
}
</script>

<style scoped>

</style>
