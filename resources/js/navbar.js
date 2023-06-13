export default {
    data() {
        return {
            menu: [
                ["Home"],
                ["Kategorien"],
                ["Verkaufen"],
                ["Unternehmen", "Philosophie", "Karriere"],
            ],
            isDropdownVisible: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
        },
        closeDropdown(event) {
            if (!event.target.matches('.Dropdown-button') && !event.target.matches('.dropList > li')) {
                this.isDropdownVisible = false;
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.closeDropdown);
    },
    template: `
        <nav>
            <ul class="navbar" id="navBar">
                <li v-for="item in menu" :key="item[0]" >
                    <button v-if="item.length > 1" class="Dropdown-button navbar__Drop--Button" @click="toggleDropdown">
                        {{ item[0] }}
                    </button>
                    <button v-else>{{ item[0] }}</button>
                    <ul v-if="item.length > 1" class="dropList navbar__Drop--List" v-show="isDropdownVisible">
                        <li v-for="(subItem, index) in item.slice(1)" :key="index">
                            <button>{{ subItem }}</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    `
}
