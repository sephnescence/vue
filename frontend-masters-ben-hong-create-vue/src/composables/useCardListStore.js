import { ref } from "vue";

const cardList = ref([])
const cardListError = ref(null)
const cardListStoreIsLoading = ref(true)

// BTTODO - Figure out how to abandon the ajax call if the component is unmounted. Suspense seems to interfere
//  There appears to be no harm in leaving it here, and moving to a singleton thing really helps a lot anyways
const loadCardList = () => {
    if (cardListStoreIsLoading.value === false) {
        return {
            cardList: cardList.value,
            error: cardListError.value,
            loading: cardListStoreIsLoading.value,
        }
    }

    // BTTODO - I'm not sure if there's a react-query equivalent to use in vue
    fetch('http://localhost/api/snap_fan_cards/all')
        .then((response) => response.json())
        .then((jsonResponse) => {
            cardListStoreIsLoading.value = false
            cardList.value = jsonResponse
        })
        .catch((error) => {
            cardListStoreIsLoading.value = false
            cardListError.value = error
        })

    return {
        cardList: cardList.value,
        error: cardListError.value,
        loading: cardListStoreIsLoading.value,
    }
}

export {
    cardList,
    cardListError,
    cardListStoreIsLoading,
    loadCardList
}