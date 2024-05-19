/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountDto } from '../models/AccountDto';
import type { PermissionDto } from '../models/PermissionDto';
import type { StringDto } from '../models/StringDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountControllerService {
    /**
     * @param requestBody
     * @returns AccountDto OK
     * @throws ApiError
     */
    public static saveAccount(
        requestBody: AccountDto,
    ): CancelablePromise<AccountDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/account/save',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param accountId
     * @param permissionId
     * @returns any OK
     * @throws ApiError
     */
    public static revokePermission(
        accountId: number,
        permissionId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/account/revoke-permission',
            query: {
                'accountId': accountId,
                'permissionId': permissionId,
            },
        });
    }
    /**
     * @param accountId
     * @param permissionId
     * @returns any OK
     * @throws ApiError
     */
    public static grantPermission(
        accountId: number,
        permissionId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/account/grant-permission',
            query: {
                'accountId': accountId,
                'permissionId': permissionId,
            },
        });
    }
    /**
     * @param accountId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static changePassword(
        accountId: number,
        requestBody: StringDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/account/change-password',
            query: {
                'accountId': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param accountId
     * @returns AccountDto OK
     * @throws ApiError
     */
    public static getAccountById(
        accountId: number,
    ): CancelablePromise<AccountDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/account/get-by-id',
            query: {
                'accountId': accountId,
            },
        });
    }
    /**
     * @returns AccountDto OK
     * @throws ApiError
     */
    public static getAllAccounts1(): CancelablePromise<Array<AccountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/account/get-all',
        });
    }
    /**
     * @returns PermissionDto OK
     * @throws ApiError
     */
    public static getAllPermissions(): CancelablePromise<Array<PermissionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/account/get-all-permissions',
        });
    }
    /**
     * @param accountId
     * @returns PermissionDto OK
     * @throws ApiError
     */
    public static getAccountPermissions(
        accountId: number,
    ): CancelablePromise<Array<PermissionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/account/get-account-permissions',
            query: {
                'accountId': accountId,
            },
        });
    }
    /**
     * @param accountId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteAccount1(
        accountId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/account/delete',
            query: {
                'accountId': accountId,
            },
        });
    }
}
