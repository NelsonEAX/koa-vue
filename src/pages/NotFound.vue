<template>
  <div>
    <h1 class="display-2 primary--text">
      Whoops
    </h1>
    <p>Not Found</p>
    <v-btn
            outlined
            color="primary"
            @click="$router.go(-1)"
    >
      Get me out of here!
    </v-btn>
  </div>
</template>
