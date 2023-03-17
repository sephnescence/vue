import { ref } from "vue";

const cardList = ref([])
const cardListError = ref(null)
const cardListStoreStatus = ref('idle')

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