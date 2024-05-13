<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AddTask from '@/components/AddTask.vue'
</script>

<template>
  <header>
    <nav class="wrapper">
      <RouterLink to="/">My tasks</RouterLink>
      <RouterLink to="/progress">In Progress</RouterLink>
      <RouterLink to="/completed">Completed</RouterLink>
    </nav>
  </header>
  <main>
    <div class="wrapper">
      <AddTask />
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss" scoped>
header {
  background: $light-blue;
}
.wrapper {
  max-width: 1024px;
  margin: 0 auto;
}

nav {
  display: flex;
  @include breakpoint($lg) {
    padding: 0 182px;
  }

  a {
    position: relative;
    padding: 24px 0;
    flex: 1 1 auto;
    @include NavTitle;
    &:hover {
      @include NavTitleHover;
    }
  }
  .router-link-active {
    @include NavTitleHover;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% * 160 / 220);
      height: 5px;
      background: $blue;
    }
  }
}

main {
  .wrapper {
    padding: 10px;
    @include breakpoint($lg) {
      padding: 22px 202px 64px;
    }
  }
}

.task-counter {
  padding: 0 0 0 33px;
  margin: 8px 0 0 0;
}
</style>
