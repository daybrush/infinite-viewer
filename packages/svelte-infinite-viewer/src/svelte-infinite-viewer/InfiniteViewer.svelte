<script>
  import VanillaInfiniteViewer, {
    OPTIONS,
    PROPERTIES,
    EVENTS,
    CLASS_NAME
  } from "infinite-viewer";

  import {
    onMount,
    onDestroy,
    createEventDispatcher,
    beforeUpdate
  } from "svelte";

  const dispatch = createEventDispatcher();

  export let className = "";
  let infiniteViewer;

  let wrapperElement;
  let containerElement;
  let scrollAreaElement;
  let horizontalScrollElement;
  let verticalScrollElement;

  export function getInstance() {
    return infiniteViewer;
  }

  beforeUpdate(() => {
    if (!infiniteViewer) {
      return;
    }

    PROPERTIES.forEach(name => {
      if (name in $$props) {
        infiniteViewer[name] = $$props[name];
      }
    });
  });
  onMount(() => {
    const options = {};

    PROPERTIES.forEach(name => {
      if (name in $$props && typeof $$props[name] !== "undefined") {
        options[name] = $$props[name];
      }
    });

    infiniteViewer = new VanillaInfiniteViewer(
      containerElement,
      scrollAreaElement.nextElementSibling,
      {
        ...options,
        wrapperElement,
        scrollAreaElement,
        horizontalScrollElement,
        verticalScrollElement,
      },
    );

    EVENTS.forEach((name, i) => {
      infiniteViewer.on(name, e => {
        const result = dispatch(name, e);

        if (result === false) {
          e.stop();
        }
      });
    });
  });
  onDestroy(() => {
    infiniteViewer.destroy();
  });
</script>
<div class={`${className || ''} ${CLASS_NAME}`} bind:this={containerElement}>
    <div class="infinite-viewer-wrapper" bind:this={wrapperElement}>
        <div class="infinite-viewer-scroll-area" bind:this={scrollAreaElement}></div>
        <slot />
    </div>
    <div class="infinite-viewer-scroll-bar infinite-viewer-horizontal-scroll-bar" bind:this={horizontalScrollElement}>
        <div class="infinite-viewer-scroll-thumb"></div>
    </div>
    <div class="infinite-viewer-scroll-bar infinite-viewer-vertical-scroll-bar" bind:this={verticalScrollElement}>
        <div class="infinite-viewer-scroll-thumb"></div>
    </div>
</div>
