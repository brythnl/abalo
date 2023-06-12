import { DockMenu } from "vue-dock-menu";

export default {
    compilerOptions: {
        isCustomElement: (tag) => tag.includes('vue-dock-menu')
    },
    components: {
        DockMenu
    },
    data() {
        return {
            items: [
                {
                    name: "Home"
                },
                {
                    name: "Kategorien"
                },
                {
                    name: "Verkaufen"
                },
                {
                    name: "Unternehmen",
                    menu: [{ name: "Philosophie" }, { name: "Karriere" }]
                }
            ]
        }
    },
    template: `
        <vue-dock-menu :items="items">
        </vue-dock-menu>
    `
};
