/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Products_Query($channel: String!, $first: Int!) {\n    products(channel: $channel, first: $first) {\n      edges {\n        node {\n          ...ProductCard_ProductFragment\n        }\n      }\n    }\n  }\n": types.Products_QueryDocument,
    "\n  fragment ProductCard_ProductFragment on Product {\n    name\n    description\n    ...ProductCardThumbnail_ProductFragment\n    ...ProductCardDescription_ProductFragment\n  }\n": types.ProductCard_ProductFragmentFragmentDoc,
    "\n  fragment ProductCardThumbnail_ProductFragment on Product {\n    name\n    thumbnail {\n      url\n      alt\n    }\n  }\n": types.ProductCardThumbnail_ProductFragmentFragmentDoc,
    "\n  fragment ProductCardDescription_ProductFragment on Product {\n    description\n  }\n": types.ProductCardDescription_ProductFragmentFragmentDoc,
    "\n  query StaticConfig_Query {\n    channels {\n      slug\n      isActive\n      defaultCountry {\n        code\n      }\n    }\n  }\n": types.StaticConfig_QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products_Query($channel: String!, $first: Int!) {\n    products(channel: $channel, first: $first) {\n      edges {\n        node {\n          ...ProductCard_ProductFragment\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').Products_QueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCard_ProductFragment on Product {\n    name\n    description\n    ...ProductCardThumbnail_ProductFragment\n    ...ProductCardDescription_ProductFragment\n  }\n"): typeof import('./graphql').ProductCard_ProductFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardThumbnail_ProductFragment on Product {\n    name\n    thumbnail {\n      url\n      alt\n    }\n  }\n"): typeof import('./graphql').ProductCardThumbnail_ProductFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductCardDescription_ProductFragment on Product {\n    description\n  }\n"): typeof import('./graphql').ProductCardDescription_ProductFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StaticConfig_Query {\n    channels {\n      slug\n      isActive\n      defaultCountry {\n        code\n      }\n    }\n  }\n"): typeof import('./graphql').StaticConfig_QueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
