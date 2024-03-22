<template>
  <div class="container">
    <div>
      <form @submit="submitForm" method="post">
        <label for="name">姓名:</label>
        <input type="text" id="name" name="name" v-model="Data.name" required />

        <label for="age">年龄:</label>
        <input type="number" id="age" name="age" v-model="Data.age" required />

        <button type="submit">提交</button>
      </form>
    </div>
    <button class="back" @click="goToForm">返回</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import request from "@/request.js";
import { ref } from "vue";

const router = useRouter();

const Data = ref({
  name: "",
  age: null,
});

const goToForm = () => {
  router.push("/");
};

const submitForm = async (event) => {
  event.preventDefault(); // 阻止默认的表单提交行为

  try {
    console.log(Data.value);
    const response = await request.post("/students", {
      // 从表单中获取输入的数据
      name: Data.value.name,
      age: Data.value.age,
    });

    // 处理请求成功的逻辑
    console.log("请求成功", response.data);

    // 可以选择在请求成功后进行路由跳转或其他操作
    router.push("/"); // 假设跳转到成功页面
  } catch (error) {
    // 处理请求失败的逻辑
    console.error("请求失败", error);
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
  }

  label {
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="number"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
    margin-bottom: 16px;
  }

  button[type="submit"] {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }

  button[class="back"] {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4575a0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[class="back"]:hover {
    background-color: #31597c;
  }
}
</style>
