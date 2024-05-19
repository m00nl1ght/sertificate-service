/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JournalFilterDto } from './JournalFilterDto';
import type { PageableSortingDto } from './PageableSortingDto';
export type PageableFilterDto = {
    search?: string;
    sorting?: Array<PageableSortingDto>;
    filters?: JournalFilterDto;
};

