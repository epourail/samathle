import { TExtendedCollection, ICollection } from './ICollection';

export default class SportEventsCollection implements ICollection {
  public static getName(): string {
    return 'sport_events';
  }

  public static buildCollectionPayload(): TExtendedCollection {
    const directusCollection: TExtendedCollection = {
      collection: this.getName(),
      schema: {
        name: this.getName(),
        schema: 'directus',
        comment: '',
      },
      meta: {
        collection: this.getName(),
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
            special: [],
            required: true,
          },
          schema: {},
        },
        {
          field: 'label',
          type: 'string',
          meta: {
            interface: 'input',
            special: [],
            required: true,
          },
          schema: {},
        },
      ],
    };
    return directusCollection;
  }
}
