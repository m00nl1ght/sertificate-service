/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductTypeDto } from '../models/ProductTypeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductTypeControllerService {
    /**
     * @param requestBody
     * @returns ProductTypeDto OK
     * @throws ApiError
     */
    public static saveProductType(
        requestBody: ProductTypeDto,
    ): CancelablePromise<ProductTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/product-type/save',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param productTypId
     * @returns ProductTypeDto OK
     * @throws ApiError
     */
    public static getProductTypeById(
        productTypId: number,
    ): CancelablePromise<ProductTypeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/product-type/get-by-id',
            query: {
                'productTypId': productTypId,
            },
        });
    }
    /**
     * @returns ProductTypeDto OK
     * @throws ApiError
     */
    public static getAllProductTypes(): CancelablePromise<Array<ProductTypeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/product-type/get-all',
        });
    }
    /**
     * @param productTypId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteProductType(
        productTypId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/product-type/delete',
            query: {
                'productTypId': productTypId,
            },
        });
    }
}
