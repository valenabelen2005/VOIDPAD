const domain = process.env.SHOPIFY_STORE_DOMAIN!
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const endpoint = `https://${domain}/api/2025-01/graphql.json`

type GraphQLResponse<T> = {
  data: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)

  const json: GraphQLResponse<T> = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)

  return json.data
}
