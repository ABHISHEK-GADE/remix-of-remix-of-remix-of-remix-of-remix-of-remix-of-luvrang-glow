const SHOPIFY_DOMAIN = 'luvrang.myshopify.com';
const STOREFRONT_TOKEN = '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';

const STOREFRONT_URL = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
  : '';

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!STOREFRONT_URL || !STOREFRONT_TOKEN) {
    throw new Error('Shopify credentials not configured');
  }

  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }
  return json.data;
}

// Types
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  tags: string[];
  productType: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: { node: ShopifyProduct }[] };
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    productType
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
  }
`;

export async function getProducts(first = 20) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { ...ProductFields } }
      }
    }
  `;
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(query, { first });
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `;
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct }>(query, { handle });
  return data.productByHandle;
}

export async function getCollections(first = 10) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            image { url altText width height }
            products(first: 12) {
              edges { node { ...ProductFields } }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(query, { first });
  return data.collections.edges.map((e) => e.node);
}

export async function getCollectionByHandle(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        handle
        title
        description
        image { url altText width height }
        products(first: 50) {
          edges { node { ...ProductFields } }
        }
      }
    }
  `;
  const data = await shopifyFetch<{ collectionByHandle: ShopifyCollection }>(query, { handle });
  return data.collectionByHandle;
}

export interface CartItem {
  variantId: string;
  quantity: number;
}

export async function createCheckout(lineItems: CartItem[]) {
  const query = `
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;
  const input = {
    lineItems: lineItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };
  const data = await shopifyFetch<{
    checkoutCreate: {
      checkout: { id: string; webUrl: string };
      checkoutUserErrors: { message: string; field: string[] }[];
    };
  }>(query, { input });

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors.map((e) => e.message).join(', '));
  }

  return data.checkoutCreate.checkout;
}

export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  if (price.currencyCode === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `${price.currencyCode} ${amount.toFixed(2)}`;
}

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);
}
