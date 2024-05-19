/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilialDto } from '../models/FilialDto';
import type { JournalDto } from '../models/JournalDto';
import type { PageableFilterDto } from '../models/PageableFilterDto';
import type { PageableTableDtoJournalDto } from '../models/PageableTableDtoJournalDto';
import type { PageableTableDtoJournalHistoryDto } from '../models/PageableTableDtoJournalHistoryDto';
import type { StringDto } from '../models/StringDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JournalControllerService {
    /**
     * @param journalId
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static statusProcess(
        journalId: number,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/status-process',
            query: {
                'journalId': journalId,
            },
        });
    }
    /**
     * @param journalId
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static statusNew(
        journalId: number,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/status-new',
            query: {
                'journalId': journalId,
            },
        });
    }
    /**
     * @param journalId
     * @param statusId
     * @param requestBody
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static setStatus(
        journalId: number,
        statusId: number,
        requestBody: StringDto,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/set-status',
            query: {
                'journalId': journalId,
                'statusId': statusId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param field
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static inputHelper(
        field: 'REQUESTER_NAME' | 'PRODUCT_NAME' | 'CERTIFICATE_BLANK_NUMBER' | 'RECEIVER_FIO',
        requestBody: StringDto,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/input-helper',
            query: {
                'field': field,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page
     * @param size
     * @param requestBody
     * @returns PageableTableDtoJournalDto OK
     * @throws ApiError
     */
    public static getJournals(
        page?: number,
        size: number = 10,
        requestBody?: PageableFilterDto,
    ): CancelablePromise<PageableTableDtoJournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/get-journals',
            query: {
                'page': page,
                'size': size,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param journalId
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static getJournal(
        journalId: number,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/get-journal',
            query: {
                'journalId': journalId,
            },
        });
    }
    /**
     * @param journalId
     * @param page
     * @param size
     * @returns PageableTableDtoJournalHistoryDto OK
     * @throws ApiError
     */
    public static getJournalHistory(
        journalId: number,
        page?: number,
        size: number = 10,
    ): CancelablePromise<PageableTableDtoJournalHistoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/get-journal-history',
            query: {
                'page': page,
                'size': size,
                'journalId': journalId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static editJournal(
        requestBody: JournalDto,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/edit-journal',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns JournalDto OK
     * @throws ApiError
     */
    public static createJournal(
        requestBody: JournalDto,
    ): CancelablePromise<JournalDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/journal/create-journal',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns FilialDto OK
     * @throws ApiError
     */
    public static getAccountFilial(): CancelablePromise<Array<FilialDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/journal/get-account-filial',
        });
    }
    /**
     * @param journalId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteJournal(
        journalId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/journal/delete',
            query: {
                'journalId': journalId,
            },
        });
    }
    /**
     * @param journalId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteJournalHistory(
        journalId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/journal/delete-history',
            query: {
                'journalId': journalId,
            },
        });
    }
}
