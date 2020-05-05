import VanillaInfiniteViewer, {
    InfiniteViewerOptions, OPTIONS, EVENTS, PROPERTIES, CLASS_NAME, METHODS,
    InfiniteViewerProperties, InfiniteViewerMethods,
} from 'infinite-viewer';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { Properties, withMethods, MethodInterface } from 'framework-utils';
import { isUndefined } from '@daybrush/utils';

@Component({})
@Properties(OPTIONS as any, (prototype, name) => {
    Prop()(prototype, name);
})
export default class VueInfiniteViewer extends Vue {
    @withMethods(METHODS as any)
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
            const value = props[name];

            if (!isUndefined(value)) {
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
            const value = props[name];

            if (infiniteViewer[name] !== value && !isUndefined(value)) {
                (infiniteViewer as any)[name] = props[name];
            }
        });
    }
    public beforeDestroy() {
        this.infiniteViewer.destroy();
    }
}
export default interface VueInfiniteViewer extends InfiniteViewerProperties,
    MethodInterface<InfiniteViewerMethods, VanillaInfiniteViewer, VueInfiniteViewer> { }
