export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyPriceRange = {
  minVariantPrice: { amount: string; currencyCode: string }
  maxVariantPrice: { amount: string; currencyCode: string }
}

export type ShopifyProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: { amount: string; currencyCode: string }
  compareAtPrice: { amount: string; currencyCode: string } | null
}

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: { nodes: ShopifyImage[] }
  priceRange: ShopifyPriceRange
  variants: { nodes: ShopifyProductVariant[] }
  options: { name: string; values: string[] }[]
  tags: string[]
  collections: { nodes: { handle: string; title: string }[] }
}

export type ShopifyCollection = {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: { nodes: ShopifyProduct[]; pageInfo?: PageInfo }
}

export type ShopifyCartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: { handle: string; title: string; featuredImage: ShopifyImage | null }
    price: { amount: string; currencyCode: string }
  }
  cost: {
    totalAmount: { amount: string; currencyCode: string }
  }
}

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { nodes: ShopifyCartLine[] }
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount: { amount: string; currencyCode: string }
  }
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string
}
