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