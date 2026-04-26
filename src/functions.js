import api from "./api"

export const addLikeds = async (id, setLikeds, profileInfo, item) => {
    if (!profileInfo) {
        const localLikeds = localStorage.getItem('localLikeds') ?
            JSON.parse(localStorage.getItem('localLikeds')) : [];
        localLikeds.push(item);
        localStorage.setItem('localLikeds', JSON.stringify(localLikeds));
        setLikeds([...localLikeds.map(e=>e._id)]);
        return;
    }
    try {
        const res = await api.post('/customer/addLikeds', { productId: id })
        const ids = res.data.map(item => item.product)
        setLikeds([...ids])
    } catch (error) {
        console.log(error)
    }
}

export const unLiked = async (id, setLikeds, profileInfo, item) => {
    try {
        if (!profileInfo) {
            const localLikeds = localStorage.getItem('localLikeds') ?
                JSON.parse(localStorage.getItem('localLikeds')) : [];
            const filteredLikeds = localLikeds.filter(e => e._id != id);
            localStorage.setItem('localLikeds', JSON.stringify(filteredLikeds));
            setLikeds([...filteredLikeds.map(e=>e._id)]);
            return;
        }
        const res = await api.delete(`/customer/unLiked/${id}`)
        const ids = res.data.map(item => item.product)
        setLikeds([...ids])
    } catch (error) {
        console.log(error)
    }
}

export const addToBasketFromLocal = async (itemId, quantity) => {
    try {
        const res = await api.post("/customer/addToBasket", {
            productId: itemId,
            quantity: quantity,
        });

        setBasketValue(res.data.count);
    } catch (error) {
        // throw new Error(`${error.response?.data?.message}`)
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
            message: error.response?.data?.message,
            head: 'Xəta!',
            showAlert: true,
            type: 'error'
        });
    }
    finally {
        setLoading(false)
    }
};


export const callLocalBasket = (item, setResponse, showResponse) => {
    const basketValues = localStorage.getItem('basketValues') ?
        JSON.parse(localStorage.getItem('basketValues')) : [];

    const ids = basketValues.map((e) => e._id)
    if (ids.includes(item._id)) {
        const quantity = basketValues.find((e) => e._id == item._id).quantity
        const newData = basketValues.filter((e) => e._id != item._id);
        newData.push({ ...item, quantity: Number(quantity) + 1 });
        localStorage.setItem('basketValues', JSON.stringify(newData));
    } else {
        basketValues.push({ ...item, quantity: 1 });
        localStorage.setItem('basketValues', JSON.stringify(basketValues));
    }
    window.dispatchEvent(new Event("basketUpdated"));

    showResponse && setResponse({
        type: "success",
        message: "Səbətə əlavə olundu ✅",
        showAlert: true,
        head: "Uğurlu!",
    });
};

export const decreaseItem = (item) => {
    const basketValues = localStorage.getItem('basketValues') ?
        JSON.parse(localStorage.getItem('basketValues')) : [];

    const ids = basketValues.map((e) => e._id)
    if (ids.includes(item._id)) {
        const quantity = basketValues.find((e) => e._id == item._id).quantity
        const newData = basketValues.filter((e) => e._id != item._id);
        newData.push({ ...item, quantity: Number(quantity) - 1 });
        localStorage.setItem('basketValues', JSON.stringify(newData));
    } else {
        basketValues.push({ ...item, quantity: 1 });
        localStorage.setItem('basketValues', JSON.stringify(basketValues));
    }
    window.dispatchEvent(new Event("basketUpdated"));
}

export const deleteItem = (item) => {
    const basketValues = localStorage.getItem('basketValues') ?
        JSON.parse(localStorage.getItem('basketValues')) : [];

    const ids = basketValues.map((e) => e._id)
    if (ids.includes(item._id)) {
        const newData = basketValues.filter((e) => e._id != item._id);
        localStorage.setItem('basketValues', JSON.stringify(newData));
    } else {
        basketValues.push({ ...item, quantity: 1 });
        localStorage.setItem('basketValues', JSON.stringify(basketValues));
    }
    window.dispatchEvent(new Event("basketUpdated"));
}


export const createSlug = (text) => {
    return text
        .split(" ").join('-').split('/').join('-')
        .toLowerCase()
        .trim()
        .replaceAll("ə", "e")
        .replaceAll("ü", "u")
        .replaceAll("ö", "o")
        .replaceAll("ğ", "g")
        .replaceAll("ş", "s")
        .replaceAll("ç", "c")
        .replaceAll("ı", "i")
        .replaceAll("İ", "i")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};