/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlankFilialDto } from '../models/BlankFilialDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlankFilialControllerService {
    /**
     * @param requestBody
     * @returns BlankFilialDto OK
     * @throws ApiError
     */
    public static saveBlankFilial(
        requestBody: BlankFilialDto,
    ): CancelablePromise<BlankFilialDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/blank-filial/save',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param blankFilialId
     * @returns BlankFilialDto OK
     * @throws ApiError
     */
    public static getBlankFilialById(
        blankFilialId: number,
    ): CancelablePromise<BlankFilialDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/blank-filial/get-by-id',
            query: {
                'blankFilialId': blankFilialId,
            },
        });
    }
    /**
     * @returns BlankFilialDto OK
     * @throws ApiError
     */
    public static getAllBlankFilial(): CancelablePromise<Array<BlankFilialDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/blank-filial/get-all',
        });
    }
    /**
     * @param blankFilialId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteBlankFilial(
        blankFilialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/blank-filial/delete',
            query: {
                'blankFilialId': blankFilialId,
            },
        });
    }
}
