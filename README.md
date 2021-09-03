# 新版細單v2.0介紹
BN80以後的遊戲使用新版細單v2.0

---

## 架構流程圖
st=>start: 專案入口（Entry）
op1=>operation: 主框架（Layout）
cond=>condition: 遊戲內開啟?（Mode）
list=>subroutine: 列表頁（List）
detail=>subroutine: 詳細頁（Detail）
e=>end: 結束（end）

st->op1->cond
cond(yes)->list->detail->e
cond(no)->detail->e

- Entry：`src/project/BN{ID}/app.vue`各專案入口頁。
- Layout：`src/layout/Main.vue`專案app.vue引入layout/main.vue主框架。
- Mode：由Vuex(`src/store/index.js`)引入baseInfo（`src/utils/baseInfo.js`）判斷細單是由內部遊戲或外部平台開啟。
- List：`src/layout/List.vue`若細單由遊戲內部開啟，則顯示列表頁後再進入詳細頁。
- Detail：`src/layout/Detail.vue`若細單由外部平台開啟，則直接顯示詳細頁。

---

## 專案開發流程

1. 開新專案：輸入指令複製新專案（區分遊戲類型slot, fish....）。
2. 使用QA工具：https://assets.msgdev.info/game/qatool/#/，取得遊戲token並在app.vue中貼上。
