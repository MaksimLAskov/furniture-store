import { products as defaultProducts } from '../data/products'

export function getProducts() {
  const savedProducts = JSON.parse(localStorage.getItem('products'))

  if (savedProducts && savedProducts.length > 0) {
    return savedProducts
  }

  localStorage.setItem('products', JSON.stringify(defaultProducts))
  return defaultProducts
}

export function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products))
}

export function getProductById(id) {
  const products = getProducts()

  return products.find((product) => product.id === Number(id))
}