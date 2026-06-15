'use server'
import { createCart, addToCart, updateCartLine, removeCartLines, getCart } from './index'
import type { ShopifyCart } from '@/types/shopify'

export async function getCartAction(cartId: string): Promise<ShopifyCart | null> {
  return getCart(cartId)
}

export async function createCartAction(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  return createCart(lines)
}

export async function addToCartAction(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  return addToCart(cartId, lines)
}

// Fetches fresh cart from Shopify, deduplicates by variantId server-side
export async function addToCartSafeAction(
  cartId: string,
  variantId: string,
): Promise<ShopifyCart> {
  const currentCart = await getCart(cartId)
  if (!currentCart) {
    return createCart([{ merchandiseId: variantId, quantity: 1 }])
  }
  const existingLine = currentCart.lines.nodes.find((l) => l.merchandise.id === variantId)
  if (existingLine) {
    return updateCartLine(cartId, existingLine.id, existingLine.quantity + 1)
  }
  return addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }])
}

export async function updateCartLineAction(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  return updateCartLine(cartId, lineId, quantity)
}

export async function removeCartLinesAction(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  return removeCartLines(cartId, lineIds)
}
