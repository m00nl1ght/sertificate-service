/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlankDamageDto } from '../models/BlankDamageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlankDamageControllerService {
    /**
     * @returns BlankDamageDto OK
     * @throws ApiError
     */
    public static getBlankDamage(): CancelablePromise<Array<BlankDamageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/blank-damage',
        });
    }
    /**
     * @param blankNumber
     * @returns BlankDamageDto OK
     * @throws ApiError
     */
    public static addBlankDamage(
        blankNumber: number,
    ): CancelablePromise<BlankDamageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/blank-damage',
            query: {
                'blankNumber': blankNumber,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteBlankDamage(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/blank-damage',
            query: {
                'id': id,
            },
        });
    }
}
