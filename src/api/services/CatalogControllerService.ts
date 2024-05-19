/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryDto } from '../models/CountryDto';
import type { FormDto } from '../models/FormDto';
import type { IdNameDto } from '../models/IdNameDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CatalogControllerService {
    /**
     * @returns IdNameDto OK
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<Array<IdNameDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/status',
        });
    }
    /**
     * @returns IdNameDto OK
     * @throws ApiError
     */
    public static getPlatform(): CancelablePromise<Array<IdNameDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/platform',
        });
    }
    /**
     * @returns IdNameDto OK
     * @throws ApiError
     */
    public static getJournalType(): CancelablePromise<Array<IdNameDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/journal-type',
        });
    }
    /**
     * @returns FormDto OK
     * @throws ApiError
     */
    public static getForm(): CancelablePromise<Array<FormDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/form',
        });
    }
    /**
     * @returns IdNameDto OK
     * @throws ApiError
     */
    public static getFormGroup(): CancelablePromise<Array<IdNameDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/form-group',
        });
    }
    /**
     * @returns CountryDto OK
     * @throws ApiError
     */
    public static getCountry(): CancelablePromise<Array<CountryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/country',
        });
    }
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static getCertificatePrice(): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/catalog/certificate-price',
        });
    }
}
