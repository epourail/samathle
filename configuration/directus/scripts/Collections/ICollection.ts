import {
    DirectusCollection,
    NestedPartial,
} from '@directus/sdk';

export type TExtendedCollection = NestedPartial<DirectusCollection<any>> & {
    fields: any[]; // fields prop is not available through the sdk
};

export interface ICollection {
    buildCollectionPayload(): TExtendedCollection
}
