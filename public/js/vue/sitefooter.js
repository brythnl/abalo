export default {
    emits: ['toggle-impressum'],

    methods: {
        showImpressum() {
            this.$emit('toggle-impressum');
        },
    },
    template: `<div>
        <a @click="showImpressum">Impressum</a>
    </div>`
}
