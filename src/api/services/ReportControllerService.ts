/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlankReportFilterDto } from '../models/BlankReportFilterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportControllerService {
    /**
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static getBlankReportXlsx(
        requestBody: BlankReportFilterDto,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/report/blank-xlsx',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
