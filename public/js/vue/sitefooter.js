export default {
    emits: ['toggle-impressum'],

    methods: {
        showImpressum() {
            this.$emit('toggle-impressum');
        },
    },
    template: `<footer>
        <a @click="showImpressum">Impressum</a>
    </footer>`
}
