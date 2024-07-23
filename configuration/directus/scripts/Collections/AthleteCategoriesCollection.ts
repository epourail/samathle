import {
    ICollection,
    TExtendedCollection
 } from './ICollection'

import {
    CollectionBase
} from './CollectionBase'

export default class AthleteCategoriesCollection extends CollectionBase implements ICollection {

    // Define constants for the collection
    static readonly CMS_COLLECTION: string = 'athlete_categories';

    constructor() {
        super(AthleteCategoriesCollection.CMS_COLLECTION)
    }

    public buildCollectionPayload(): TExtendedCollection {
        const directusCollection: TExtendedCollection = {
            collection: AthleteCategoriesCollection.CMS_COLLECTION,
            schema: {
                name: AthleteCategoriesCollection.CMS_COLLECTION,
                schema: 'directus',
                comment: '',
            },
            meta: {
                collection: AthleteCategoriesCollection.CMS_COLLECTION,
                singleton: false,
                hidden: false,
                archive_app_filter: true,
                collapse: 'open',
                icon: null,
                note: null,
                display_template: null,
                translations: null,
                archive_value: null,
                archive_field: null,
                unarchive_value: null,
                sort_field: null,
                accountability: 'all',
                color: null,
                item_duplication_fields: null,
                sort: null,
                group: null,
                preview_url: null,
            },
            fields: [
                {
                field: 'id',
                type: 'uuid',
                meta: {
                    hidden: true,
                    readonly: true,
                    interface: 'input',
                    special: ['uuid'],
                },
                schema: {
                    is_primary_key: true,
                    length: 36,
                    has_auto_increment: false,
                },
                },
                {
                field: 'date_created',
                type: 'timestamp',
                meta: {
                    special: ['date-created'],
                    interface: 'datetime',
                    readonly: true,
                    hidden: true,
                    width: 'half',
                    display: 'datetime',
                    display_options: {
                    relative: true,
                    },
                },
                schema: {},
                },
                {
                field: 'date_updated',
                type: 'timestamp',
                meta: {
                    special: ['date-updated'],
                    interface: 'datetime',
                    readonly: true,
                    hidden: true,
                    width: 'half',
                    display: 'datetime',
                    display_options: {
                    relative: true,
                    },
                },
                schema: {},
                },
                {
                field: 'technical_id',
                type: 'string',
                meta: {
                    interface: 'input',
                    special: null,
                    required: true,
                },
                schema: {},
                },
                {
                field: 'label',
                type: 'string',
                meta: {
                    interface: 'input',
                    special: null,
                    required: true,
                },
                schema: {},
                },
            ],
        };
        return directusCollection;
    }
}
