/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SignInDto } from '../models/SignInDto';
import type { TokenInfoDto } from '../models/TokenInfoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthControllerService {
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static signIn(
        requestBody: SignInDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sign-in',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param authorization
     * @returns TokenInfoDto OK
     * @throws ApiError
     */
    public static getTokenInfo(
        authorization: string,
    ): CancelablePromise<TokenInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get-token-info',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
