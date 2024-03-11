<template>
  <table class="dark:divide-slate-700 min-w-full table-fixed divide-y">
    <thead>
    <tr>
      <slot name="head"></slot>
    </tr>
    </thead>
    <tbody class="dark:divide-slate-700 divide-y">
    <slot name="body"></slot>
    </tbody>
    <tfoot>
    <slot name="foot"></slot>
    </tfoot>
  </table>
</template>