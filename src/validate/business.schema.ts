import { JSONSchema7 } from 'json-schema';
import { v4 } from 'uuid';

export const catalogSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    number: { type: 'string' },
    limit: { type: 'number' },
  },
};

export const collectionsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    number: { type: 'string' },
    limit: { type: 'number' },
  },
};

export const createProductSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    name: { type: 'string' },
    retailerId: { type: 'string' },
    url: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    currency: { type: 'string' },
    isHidden: { type: 'boolean' },
    originCountryCode: { type: 'string' },
    images: { type: 'array', items: { type: 'string' } },
  },
  required: ['name', 'description', 'price', 'currency', 'images'],
};

export const updateProductSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    productId: { type: 'string' },
    name: { type: 'string' },
    retailerId: { type: 'string' },
    url: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    currency: { type: 'string' },
    isHidden: { type: 'boolean' },
    images: { type: 'array', items: { type: 'string' } },
  },
  required: ['productId'],
};

export const deleteProductSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    productIds: { type: 'array', items: { type: 'string' } },
  },
  required: ['productIds'],
};
