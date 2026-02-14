import { toast } from 'sonner';

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'shop.luvrang.in';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'cdca70c21b78af1a2f64cc509a772159';

// ─── Storefront API Request Helper ──────────────────────────
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error('Store temporarily unavailable', {
      description: 'Please try again later or contact us at support@luvrang.in.',
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Store API error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }
  return data;
}

// ─── Types ──────────────────────────────────────────────────
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    compareAtPriceRange?: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          compareAtPrice?: { amount: string; currencyCode: string } | null;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
    tags?: string[];
    productType?: string;
  };
}

export interface ShopifyCollection {
  node: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: { url: string; altText: string | null } | null;
    products: {
      edges: ShopifyProduct[];
    };
  };
}

// ─── Queries ────────────────────────────────────────────────
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText } }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      tags
      productType
      priceRange {
        minVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        edges { node { url altText } }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            availableForSale
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
      options { name values }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText }
          products(first: 12) {
            edges {
              node {
                id
                title
                description
                handle
                tags
                productType
                priceRange { minVariantPrice { amount currencyCode } }
                compareAtPriceRange { minVariantPrice { amount currencyCode } }
                images(first: 5) { edges { node { url altText } } }
                variants(first: 20) {
                  edges {
                    node {
                      id title
                      price { amount currencyCode }
                      compareAtPrice { amount currencyCode }
                      availableForSale
                      selectedOptions { name value }
                    }
                  }
                }
                options { name values }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      title
      description
      image { url altText }
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            handle
            tags
            productType
            priceRange { minVariantPrice { amount currencyCode } }
            compareAtPriceRange { minVariantPrice { amount currencyCode } }
            images(first: 5) { edges { node { url altText } } }
            variants(first: 20) {
              edges {
                node {
                  id title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  availableForSale
                  selectedOptions { name value }
                }
              }
            }
            options { name values }
          }
        }
      }
    }
  }
`;

// ─── Fetchers ───────────────────────────────────────────────
export async function getProducts(first = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query });
  return data?.data?.products?.edges ?? [];
}

export async function getProductByHandle(handle: string) {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.productByHandle ?? null;
}

export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first });
  return data?.data?.collections?.edges ?? [];
}

export async function getCollectionByHandle(handle: string) {
  const data = await storefrontApiRequest(COLLECTION_BY_HANDLE_QUERY, { handle });
  return data?.data?.collectionByHandle ?? null;
}

// ─── Helpers ────────────────────────────────────────────────
export function formatPrice(amount: string, currencyCode = 'INR'): string {
  const num = parseFloat(amount);
  if (currencyCode === 'INR') {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return `${currencyCode} ${num.toFixed(2)}`;
}
