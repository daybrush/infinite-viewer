<script>
  import InfiniteViewer from "./svelte-infinite-viewer";
</script>

<style>
  :global(.viewer) {
    border: 1px solid black;
    position: relative;
    width: 800px;
    height: 800px;
  }
  .viewport {
    position: relative;
    width: 400px;
    height: 600px;
    background: #f55;
  }
</style>

<InfiniteViewer className="viewer">
  <div class="viewport">AA</div>
</InfiniteViewer>
