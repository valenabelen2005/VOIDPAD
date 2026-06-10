'use server'
import { createCart, addToCart, updateCartLine, removeCartLines } from './index'
import type { ShopifyCart } from '@/types/shopify'

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
