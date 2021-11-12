<template>
    <div v-bind:class="className || defaultClassName" ref="containerElement">
        <div ref="wrapperElement">
            <div ref="scrollAreaElement"></div>
            <slot />
        </div>
        <div ref="horizontalScrollElement">
            <div class="infinite-viewer-scroll-thumb"></div>
        </div>
        <div ref="verticalScrollElement">
            <div class="infinite-viewer-scroll-thumb"></div>
        </div>
    </div>
</template>
<script lang="ts">
import VanillaInfiniteViewer, {
    InfiniteViewerOptions, OPTIONS, EVENTS, PROPERTIES, METHODS,
} from 'infinite-viewer';
import { isUndefined } from '@daybrush/utils';

const methods: Record<string, any> = {};

METHODS.forEach(name => {
    methods[name] = function (this: any, ...args: any[]) {
        this.infiniteViewer[name](...args);
    };
});

export default {
    methods,
    props: OPTIONS,
    mounted(this: any) {
        const options: Partial<InfiniteViewerOptions> = {};
        const props = this.$props;
        OPTIONS.forEach((name) => {
            const value = props[name];

            if (!isUndefined(value)) {
                (options as any)[name] = props[name];
            }
        });
        const refs = this.$refs;

        this.infiniteViewer = new VanillaInfiniteViewer(
            refs.containerElement as HTMLElement,
            (refs.scrollAreaElement as HTMLElement).nextElementSibling as HTMLElement,
            {
                ...options,
                wrapperElement: refs.wrapperElement as HTMLElement,
                scrollAreaElement: refs.scrollAreaElement as HTMLElement,
                horizontalScrollElement: refs.horizontalScrollElement as HTMLElement,
                verticalScrollElement: refs.verticalScrollElement as HTMLElement,
            },
        );

        const infiniteViewer = this.infiniteViewer;

        EVENTS.forEach((name) => {
            infiniteViewer.on(name, (e: any) => {
                this.$emit(name, { ...e });
            });
        });
    },
    updated(this: any) {
        const props = this.$props;
        const infiniteViewer = this.infiniteViewer;

        PROPERTIES.forEach((name) => {
            const value = props[name];

            if (infiniteViewer[name] !== value && !isUndefined(value)) {
                (infiniteViewer as any)[name] = props[name];
            }
        });
    },
    beforeUnmount(this: any) {
        this.infiniteViewer.destroy();
    },
};
</script>