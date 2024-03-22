<template>
  <div class="container">
    <div>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </thead>
        <tbody>
          <tr v-for="student in StudentList" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="add" @click="goToForm">新增</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import request from "@/request.js";

const router = useRouter();
const StudentList = ref([]);
// const StudentList = ref([
//   { id: 1, name: "张三", age: 18 },
//   { id: 2, name: "李四", age: 11 },
//   { id: 3, name: "王五", age: 23 },
// ]);

// 在页面加载时获取学生列表数据
onMounted(async () => {
  try {
    const response = await request.get("/students");
    StudentList.value = response.data;
  } catch (error) {
    console.error("获取学生列表失败：", error);
  }
});

const goToForm = () => {
  router.push("/form");
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;

  li {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #e5e5e5;
  }

  button[class="add"] {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[class="add"]:hover {
    background-color: #45a049;
  }
}
</style>
