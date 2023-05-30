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
            if (!event.target.matches('.Dropdown-button')) {
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
                <li v-for="item in menu" :key="item[0]">
                    <button v-if="item.length > 1" class="Dropdown-button" @click="toggleDropdown">
                        {{ item[0] }}
                    </button>
                    <a v-else>{{ item[0] }}</a>
                    <ul v-if="item.length > 1" class="dropList" v-show="isDropdownVisible">
                        <li v-for="(subItem, index) in item.slice(1)" :key="index">
                            <a>{{ subItem }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    `
}
