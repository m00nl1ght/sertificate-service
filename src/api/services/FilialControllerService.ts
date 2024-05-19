/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountDto } from '../models/AccountDto';
import type { FilialDto } from '../models/FilialDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilialControllerService {
    /**
     * @param requestBody
     * @returns FilialDto OK
     * @throws ApiError
     */
    public static saveFilial(
        requestBody: FilialDto,
    ): CancelablePromise<FilialDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/filial/save',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param accountId
     * @param filialId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAccount(
        accountId: number,
        filialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/filial/delete-account',
            query: {
                'accountId': accountId,
                'filialId': filialId,
            },
        });
    }
    /**
     * @param accountId
     * @param filialId
     * @returns any OK
     * @throws ApiError
     */
    public static addAccount(
        accountId: number,
        filialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/filial/add-account',
            query: {
                'accountId': accountId,
                'filialId': filialId,
            },
        });
    }
    /**
     * @param filialId
     * @returns FilialDto OK
     * @throws ApiError
     */
    public static getFilial(
        filialId: number,
    ): CancelablePromise<FilialDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/filial/get-by-id',
            query: {
                'filialId': filialId,
            },
        });
    }
    /**
     * @returns FilialDto OK
     * @throws ApiError
     */
    public static getAllFilialList(): CancelablePromise<Array<FilialDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/filial/get-all',
        });
    }
    /**
     * @param filialId
     * @returns AccountDto OK
     * @throws ApiError
     */
    public static getAllAccounts(
        filialId: number,
    ): CancelablePromise<Array<AccountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/filial/get-all-accounts',
            query: {
                'filialId': filialId,
            },
        });
    }
    /**
     * @param filialId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteFilial(
        filialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/filial/delete',
            query: {
                'filialId': filialId,
            },
        });
    }
}
