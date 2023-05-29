import Impressum from "./impressum.js";

export default {
    props: ['show-impressum'],

    components: {
        Impressum,
    },
    template: `<main>
        <impressum v-if="showImpressum"></impressum>
        <div v-else></div>
    </main>`
}
