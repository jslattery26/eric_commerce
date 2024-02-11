import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'cart-store',
    state: () => {
        return {
            cart: [],
        }
    },
    actions: {
        addValueToFilterList(value: string) {
            this.filtersList.push(value)
        },
    },
    getters: {
        // filtersList: state => state.filtersList,
        cart: state => state.cart,
    },
})