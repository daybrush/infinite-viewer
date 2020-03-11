import VanillaInfiniteViewer, {
    InfiniteViewerOptions, OPTIONS, EVENTS, PROPERTIES, CLASS_NAME,
} from 'infinite-viewer';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { Properties } from 'framework-utils';


@Component({})
@Properties(OPTIONS as any, (prototype, name) => {
    Prop()(prototype, name);
})
export default class VueInfiniteViewer extends Vue {
    private infiniteViewer!: VanillaInfiniteViewer;
    public render(h: CreateElement) {
        const props = this.$props;

        return h('div', {
            class: `${props.className || ''} ${CLASS_NAME}`,
            ref: 'container',
        }, [
            h('div', { ref: 'scrollArea' }),
            this.$slots.default,
        ]);
    }
    public mounted() {
        const options: Partial<InfiniteViewerOptions> = {};
        const props = this.$props;
        OPTIONS.forEach((name) => {
            if (name in props && typeof props[name] !== 'undefined') {
                options[name] = props[name];
            }
        });

        const refs = this.$refs;

        this.infiniteViewer = new VanillaInfiniteViewer(
            refs.container as HTMLElement,
            (refs.scrollArea as HTMLElement).nextElementSibling as HTMLElement,
            {
                ...options,
                scrollArea: refs.scrollArea as HTMLElement,
            },
        );

        const infiniteViewer = this.infiniteViewer;

        EVENTS.forEach((name, i) => {
            infiniteViewer.on(name, (e) => {
                this.$emit(name, { ...e });
            });
        });
    }
    public updated() {
        const props = this.$props;
        const infiniteViewer = this.infiniteViewer;

        PROPERTIES.forEach((name) => {
            if (name in props && infiniteViewer[name] !== props[name]) {
                (infiniteViewer as any)[name] = props[name];
            }
        });
    }
    public beforeDestroy() {
        this.infiniteViewer.destroy();
    }
}
