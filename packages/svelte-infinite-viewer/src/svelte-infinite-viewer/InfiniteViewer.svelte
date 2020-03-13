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
  let container;
  let scrollArea;

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
      container,
      scrollArea.nextElementSibling,
      {
        ...options,
        scrollArea,
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

<div class={`${className || ''} ${CLASS_NAME}`} bind:this={container}>
  <div bind:this={scrollArea} />
  <slot />
</div>
