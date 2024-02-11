// export default function ({ store }, inject) {
//   store.commit("cart/LoadCart");

//   inject("formatMoney", (money) => {
//     return new Intl.NumberFormat("en-US", {
//       currency: "USD",
//       style: "currency",
//     }).format(money);
//   });
// }

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.store.commit("cart/LoadCart");
  // nuxtApp.$formatMoney = (money) => {
  //   return new Intl.NumberFormat("en-US", {
  //     currency: "USD",
  //     style: "currency",
  //   }).format(money);
  // };
});
