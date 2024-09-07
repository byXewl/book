vue3组合式API通过setup()方法返回。组合式API，setup() 避免使用 this


```
<script>
import { ref, onMounted } from "vue";
export default {
  name: "Hello",
  setup() {
    const count = ref(0);
    function increment() {
      count.value++;
    }
    onMounted(() => {
      console.log(count + '哈哈');
    });
    return { count, increment };
  },
};
</script>
```
ref();返回一个响应式引用对象，js中通过.value获取值。
reactive({}) 创建响应式对象。
```

<template>
  <div>
    <p>{{ count }}</p>在模板中ref返回的响应式引用对象可以直接使用显示值，不用count.value
    <p>{{ state.count }}</p>在模板中reactive 返回的响应式对象获取属性要state.count 
    <button @click="increment">Increment</button>
  </div>
</template>
<script>
  import { ref, reactive } from 'vue';
  export default {
    setup() {
      // 使用 ref 创建响应式引用对象
      const count = ref(1);
      // 使用 reactive 创建响应式对象
      const state = reactive({
        count: 0,
      });
      // 使用 increment 方法修改引用对象的值和响应式对象的属性值
      const increment = () => {
        count.value++; // 修改引用对象的值
        state.count++; // 修改响应式对象的属性值
      };
      return {
        count,
        state,
        increment,
      };
    },
  };
</script>
```
学习vue3的项目：<https://github.com/sherwinshen/vue-admin>