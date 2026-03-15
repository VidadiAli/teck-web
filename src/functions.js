import api from "./api"

export const addLikeds = async (id, setLikeds) => {
    try {
        const res = await api.post('/customer/addLikeds', { productId: id })
        const ids = res.data.map(item => item.product)
        setLikeds([...ids])
    } catch (error) {
        console.log(error)
    }
}

export const unLiked = async (id, setLikeds) => {
    try {
        const res = await api.delete(`/customer/unLiked/${id}`)
        const ids = res.data.map(item => item.product)
        setLikeds([...ids])
    } catch (error) {
        console.log(error)
    }
}

export const addToBasket = async (productId, setLoading, setError, setBasketValue, setResponse, setShowCompanies, fromItem) => {
    try {
        setLoading(true)
        fromItem && setError("S")
        const res = await api.post("/customer/addToBasket", {
            productId,
            quantity: 1,
        });

        setBasketValue(res.data.count);

        setResponse({
            type: "success",
            message: "Səbətə əlavə olundu ✅",
            showAlert: true,
            head: "Uğurlu!",
        });

        fromItem && setShowCompanies(false);

    } catch (error) {
        setResponse({
            type: "error",
            message: "Səbətə əlavə edilə bilmədi ❌",
            showAlert: true
        });
    }
    finally {
        setLoading(false)
    }
};