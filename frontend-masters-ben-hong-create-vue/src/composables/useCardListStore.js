import { ref } from "vue";

const cardList = ref([])
const cardListError = ref(null)
const cardListStoreStatus = ref('idle')

// BTTODO - Figure out how to abandon the ajax call if the component is unmounted
const loadCardList = () => {
    if (cardListStoreStatus.value === 'complete') {
        return {
            cardList: cardList.value,
            error: cardListError.value,
            status: cardListStoreStatus.value,
        }
    }

    if (cardListStoreStatus.value === 'idle') {
        cardListStoreStatus.value = 'pending'
        // BTTODO - I'm not sure if there's a react-query equivalent to use in vue
        fetch('http://localhost/api/snap_fan_cards/all')
        .then((response) => response.json())
        .then((jsonResponse) => {
            cardListStoreStatus.value = 'complete'
            cardList.value = jsonResponse
        })
        .catch((error) => {
            cardListStoreStatus.value = 'error'
            cardListError.value = error
        })
    }

    return {
        cardList: cardList.value,
        error: cardListError.value,
        status: cardListStoreStatus.value,
    }
}

export {
    cardList,
    cardListError,
    cardListStoreStatus,
    loadCardList
}