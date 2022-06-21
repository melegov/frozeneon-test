<template>
<teleport :to="'body'">
<footer class="footer mt-auto py-3 bg-dark">
  <div class="container text-end">
    <span class="text-muted">Melegov Dmitry</span> <a href="http://github.com/melegov" class="link-secondary">github</a>
  </div>
</footer>
</teleport>
</template>

<style lang="scss" scoped>
footer {
    position: sticky;
    top: 100vh;
}
</style>