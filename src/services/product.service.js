import { httpService } from './http.service.js'

export const productService = {
    query,
    getById,
    save,
    remove,
    // getEmptyproduct,
}

window.cs = productService // for console usage

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('product', filterBy)
}
function getById(productId) {
    return httpService.get(`product/${productId}`)
}
async function remove(productId) {
    return httpService.delete(`product/${productId}`)
}
async function save(product) {
    var savedproduct
    if (product._id) {
        savedproduct = await httpService.put(`product/${product._id}`, product)
    } else {
        savedproduct = await httpService.post('product', product)
    }
    return savedproduct
}

// function getEmptyproduct() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }