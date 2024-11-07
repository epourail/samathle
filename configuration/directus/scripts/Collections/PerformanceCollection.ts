import { TExtendedCollection, ICollection } from './ICollection';
import AthleteCollection from './AthleteCollection';
import AthleteCategoryCollection from './AthleteCategoryCollection';
import SportCollection from './SportCollection';
import EventCollection from './EventCollection';

export default class PerformanceCollection implements ICollection {
  public static getName(): string {
    return 'performances';
  }

  public static buildCollectionPayload(): TExtendedCollection {
    const directusCollection: TExtendedCollection = {
      collection: this.getName(),
      meta: {
        collection: this.getName(),
        icon: null,
        note: null,
        display_template: null,
        hidden: false,
        singleton: false,
        translations: [
          {
            language: "en-US",
            translation: "Performance",
            singular: "Performance",
            plural: "Performances"
          },
          {
            language: "fr-FR",
            translation: "Performance",
            singular: "Performance",
            plural: "Performances"
          }
        ],
        archive_field: null,
        archive_app_filter: true,
        archive_value: null,
        unarchive_value: null,
        sort_field: null,
        accountability: "all",
        color: "#E35169",
        item_duplication_fields: null,
        sort: 1,
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
          field: "sportko",
          type: "string",
          schema: {
            name: "sportko",
            table: this.getName(),
            data_type: "char",
            default_value: null,
            generation_expression: null,
            max_length: null,
            numeric_precision: 10,
            numeric_scale: 0,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: true,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: "id",
            foreign_key_table: SportCollection.getName(),
            comment: ""
          },
          meta: {
            collection: this.getName(),
            field: "sportko",
            special: [
              "m2o"
            ],
            interface: "select-dropdown-m2o",
            options: {
              template: "{{label}}",
              enableCreate: false,
              filter: {
                _and: [
                  {
                    category: {
                      _eq: "{{ sport_type }}"
                    }
                  }
                ]
              }
            },
            display: "related-values",
            display_options: {
              template: "{{label}}"
            },
            readonly: false,
            hidden: false,
            sort: 8,
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
          field: "categoryko",
          type: "string",
          schema: {
            name: "categoryko",
            table: this.getName(),
            data_type: "char",
            default_value: null,
            generation_expression: null,
            max_length: 36,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: true,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: "id",
            foreign_key_table: AthleteCategoryCollection.getName(),
            comment: ""
          },
          meta: {
            collection: this.getName(),
            field: "categoryko",
            special: [
              "m2o"
            ],
            interface: "select-dropdown-m2o",
            options: {
              template: "{{label}}",
              enableCreate: false
            },
            display: "related-values",
            display_options: {
              template: "{{label}}"
            },
            readonly: false,
            hidden: false,
            sort: 6,
            width: "half",
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
          field: "eventko",
          type: "string",
          schema: {
            name: "eventko",
            table: this.getName(),
            data_type: "char",
            default_value: null,
            generation_expression: null,
            max_length: 36,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: true,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: "id",
            foreign_key_table: EventCollection.getName(),
            comment: ""
          },
          meta: {
            collection: this.getName(),
            field: "eventko",
            special: [
              "m2o"
            ],
            interface: "select-dropdown-m2o",
            options: {
              template: "{{label}} ({{date}})",
              enableCreate: false,
              filter: null
            },
            display: "related-values",
            display_options: {
              template: "({{date}}) {{label}}"
            },
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
          field: "athleteko",
          type: "string",
          schema: {
            name: "athleteko",
            table: this.getName(),
            data_type: "char",
            default_value: null,
            generation_expression: null,
            max_length: 36,
            numeric_precision: null,
            numeric_scale: null,
            is_generated: false,
            is_nullable: true,
            is_unique: false,
            is_indexed: true,
            is_primary_key: false,
            has_auto_increment: false,
            foreign_key_column: "id",
            foreign_key_table: AthleteCollection.getName(),
            comment: ""
          },
          meta: {
            collection: this.getName(),
            field: "athleteko",
            special: [
              "m2o"
            ],
            interface: "select-dropdown-m2o",
            options: {
              template: "{{lastname}} {{firstname}}",
              enableCreate: false
            },
            display: "related-values",
            display_options: {
              template: "{{lastname}} {{firstname}}"
            },
            readonly: false,
            hidden: false,
            sort: 5,
            width: "half",
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
          field: "result_time",
          type: "string",
          schema: {
            name: "result_time",
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
            field: "result_time",
            special: null,
            interface: "input",
            options: {
              iconLeft: "avg_pace",
              trim: true
            },
            display: null,
            display_options: null,
            readonly: false,
            hidden: false,
            sort: 10,
            width: "half",
            translations: null,
            note: null,
            conditions: [
              {
                name: "Hide if \"saut\" or \"lancer\"",
                rule: {
                  _and: [
                    {
                      sport_type: {
                        _neq: "course"
                      }
                    }
                  ]
                },
                readonly: true,
                hidden: true,
                required: false,
                options: {
                  font: "sans-serif",
                  trim: false,
                  masked: false,
                  clear: false,
                  slug: false
                }
              },
              {
                name: "Show and Require if \"course\"",
                rule: {
                  _and: [
                    {
                      sport_type: {
                        _eq: "course"
                      }
                    }
                  ]
                },
                hidden: false,
                required: true,
                options: {
                  font: "sans-serif",
                  trim: false,
                  masked: false,
                  clear: false,
                  slug: false
                },
                readonly: false
              }
            ],
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "result_length",
          type: "string",
          schema: {
            name: "result_length",
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
            field: "result_length",
            special: null,
            interface: "input",
            options: {
              iconLeft: "measuring_tape",
              trim: true
            },
            display: "formatted-value",
            display_options: {
              icon: "measuring_tape"
            },
            readonly: false,
            hidden: false,
            sort: 9,
            width: "half",
            translations: null,
            note: null,
            conditions: [
              {
                name: "Hide if \"course\"",
                rule: {
                  _and: [
                    {
                      sport_type: {
                        _eq: "course"
                      }
                    }
                  ]
                },
                readonly: true,
                hidden: true,
                required: false,
                options: {
                  font: "sans-serif",
                  trim: false,
                  masked: false,
                  clear: false,
                  slug: false
                }
              },
              {
                name: "Show and Require if \"saut\" or \"lancer\"",
                rule: {
                  _and: [
                    {
                      sport_type: {
                        _neq: "course"
                      }
                    }
                  ]
                },
                readonly: false,
                hidden: false,
                required: true,
                options: {
                  font: "sans-serif",
                  trim: false,
                  masked: false,
                  clear: false,
                  slug: false
                }
              }
            ],
            required: false,
            group: null,
            validation: null,
            validation_message: null
          }
        },
        {
          collection: this.getName(),
          field: "sport_type",
          type: "string",
          schema: {
            name: "sport_type",
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
            field: "sport_type",
            special: null,
            interface: "select-radio",
            options: {
              choices: [
                {
                  text: "Course",
                  value: "course"
                },
                {
                  text: "Lancer",
                  value: "lancer"
                },
                {
                  text: "Saut",
                  value: "saut"
                }
              ]
            },
            display: null,
            display_options: null,
            readonly: false,
            hidden: false,
            sort: 7,
            width: "full",
            translations: null,
            note: null,
            conditions: null,
            required: true,
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
