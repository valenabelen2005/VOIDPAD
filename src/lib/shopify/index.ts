import { shopifyFetch } from './client'
import {
  GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE, CART_CREATE, CART_LINES_ADD,
  CART_LINES_UPDATE, CART_LINES_REMOVE, GET_CART,
} from './queries'
import type { ShopifyProduct, ShopifyCollection, ShopifyCart, PageInfo } from '@/types/shopify'

// Products
export async function getProducts(options: {
  first?: number
  after?: string
  sortKey?: string
  reverse?: boolean
  query?: string
} = {}): Promise<{ products: ShopifyProduct[]; pageInfo: PageInfo }> {
  const data = await shopifyFetch<{
    products: { nodes: ShopifyProduct[]; pageInfo: PageInfo }
  }>(GET_PRODUCTS, { first: 20, ...options })
  return { products: data.products.nodes, pageInfo: data.products.pageInfo }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE, { handle }
  )
  return data.productByHandle
}

// Collections
export async function getCollections(first = 12): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{ collections: { nodes: ShopifyCollection[] } }>(
    GET_COLLECTIONS, { first }
  )
  return data.collections.nodes
}

export async function getCollectionByHandle(handle: string, first = 20, after?: string) {
  const data = await shopifyFetch<{
    collection: ShopifyCollection & { products: { nodes: ShopifyProduct[]; pageInfo: PageInfo } }
  }>(GET_COLLECTION_BY_HANDLE, { handle, first, after })
  return data.collection
}

// Cart
export async function createCart(lines?: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CART_CREATE, { lines: lines ?? [] }
  )
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    CART_LINES_ADD, { cartId, lines }
  )
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    CART_LINES_UPDATE, { cartId, lines: [{ id: lineId, quantity }] }
  )
  return data.cartLinesUpdate.cart
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    CART_LINES_REMOVE, { cartId, lineIds }
  )
  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(GET_CART, { cartId })
  return data.cart
}
