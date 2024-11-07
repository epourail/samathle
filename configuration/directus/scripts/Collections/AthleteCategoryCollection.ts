import { TExtendedCollection, ICollection } from './ICollection';

export default class AthleteCategoryCollection implements ICollection {
  public static getName(): string {
    return 'athlete_categories';
  }

  public static buildCollectionPayload(): TExtendedCollection {
    const directusCollection: TExtendedCollection = {
      collection: this.getName(),
      meta: {
        collection: this.getName(),
        icon: "person_play",
        note: null,
        display_template: null,
        hidden: false,
        singleton: false,
        translations: [
          {
            language: "en-US",
            translation: "Athlete Category",
            singular: "Athlete Category",
            plural: "Athlete Categories"
          },
          {
            language: "fr-FR",
            translation: "Catégorie d'Athlète",
            singular: "Catégorie d'Athlète",
            plural: "Catégories d'Athlète"
          }
        ],
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: null,
        accountability: "all",
        color: null,
        item_duplication_fields: null,
        sort: 3,
        group: null,
        collapse: "open",
        preview_url: null,
        versioning: false
      },
      schema: {
        name: this.getName(),
        schema: "directus",
        comment: "",
        collation: "utf8mb4_bin",
        engine: "InnoDB"
      },
      fields: [
        {
          collection: this.getName(),
          field: "id",
          type: "uuid",
          schema: {
            name: "id",
            table: this.getName(),
            data_type: "char",
            default_value: null,
            generation_expression: null,
            max_length: 36,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: false,
            is_unique: false,
            is_indexed: false,
            is_primary_key: true,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
            comment: ""
          },
          meta: {
            collection: this.getName(),
            field: "id",
            special: [
              "uuid"
            ],
            interface: "input",
            options: null,
            display: null,
            display_options: null,
            readonly: true,
            hidden: true,
            sort: 1,
            width: "full",
            translations: null,
            note: null,
            conditions: null,
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "date_created",
          type: "timestamp",
          schema: {
            name: "date_created",
            table: this.getName(),
            data_type: "timestamp",
            default_value: null,
            generation_expression: null,
            max_length: null,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: false,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
            comment: ""
          },
          meta: {

            collection: this.getName(),
            field: "date_created",
            special: [
              "date-created"
            ],
            interface: "datetime",
            options: null,
            display: "datetime",
            display_options: {
              relative: true
            },
            readonly: true,
            hidden: true,
            sort: 2,
            width: "half",
            translations: null,
            note: null,
            conditions: null,
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "date_updated",
          type: "timestamp",
          schema: {
            name: "date_updated",
            table: this.getName(),
            data_type: "timestamp",
            default_value: null,
            generation_expression: null,
            max_length: null,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: false,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
            comment: ""
          },
          meta: {

            collection: this.getName(),
            field: "date_updated",
            special: [
              "date-updated"
            ],
            interface: "datetime",
            options: null,
            display: "datetime",
            display_options: {
              relative: true
            },
            readonly: true,
            hidden: true,
            sort: 3,
            width: "half",
            translations: null,
            note: null,
            conditions: null,
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "technical_id",
          type: "string",
          schema: {
            name: "technical_id",
            table: this.getName(),
            data_type: "varchar",
            default_value: null,
            generation_expression: null,
            max_length: 255,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: false,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
            comment: ""
          },
          meta: {

            collection: this.getName(),
            field: "technical_id",
            special: null,
            interface: "input",
            options: null,
            display: null,
            display_options: null,
            readonly: false,
            hidden: false,
            sort: 4,
            width: "full",
            translations: null,
            note: null,
            conditions: null,
            required: true,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "label",
          type: "string",
          schema: {
            name: "label",
            table: this.getName(),
            data_type: "varchar",
            default_value: null,
            generation_expression: null,
            max_length: 255,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: false,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: null,
            foreign_key_table: null,
            comment: ""
          },
          meta: {

            collection: this.getName(),
            field: "label",
            special: null,
            interface: "input",
            options: null,
            display: null,
            display_options: null,
            readonly: false,
            hidden: false,
            sort: 5,
            width: "full",
            translations: null,
            note: null,
            conditions: null,
            required: true,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "performance",
          type: "alias",
          schema: null,
          meta: {

            collection: this.getName(),
            field: "performance",
            special: [
              "o2m"
            ],
            interface: "list-o2m",
            options: {
              enableCreate: false,
              enableSelect: false
            },
            display: null,
            display_options: null,
            readonly: false,
            hidden: true,
            sort: null,
            width: "full",
            translations: null,
            note: null,
            conditions: null,
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        }
      ]
    };
    return directusCollection;
  }
}
