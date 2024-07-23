import {
  authentication,
  createDirectus,
  createCollection,
  DirectusCollection,
  NestedPartial,
  readCollection,
  rest,
  login,
} from '@directus/sdk';
import dotenv from 'dotenv';
import AthleteCategoriesCollection from './Collections/AthleteCategoriesCollection';

dotenv.config();

type CollectionWithFields = {
  fields: any[]; // fields prop is not available through the sdk
};

type ExtendedCollection = NestedPartial<DirectusCollection<any>> &
  CollectionWithFields;

class Main {
  // Define constants for admin environment variables
  static readonly CMS_URL: string = <string>process.env.CMS_DIRECTUS_URL;
  static readonly ADMIN_EMAIL: string = <string>(
    process.env.CMS_DIRECTUS_ADMIN_EMAIL
  );
  static readonly ADMIN_PWD: string = <string>(
    process.env.CMS_DIRECTUS_ADMIN_PASSWORD
  );
  // Define constants for the collection
  static readonly CMS_ATHLETE_CATEGORIES_COLLECTION: string =
    'athlete_categories';
  static readonly CMS_SPORT_EVENTS_COLLECTION: string = 'sport_events';

  /***
   * Log the .env variables
   */
  static logEnvInfo() {
    console.log(`CMS DIRECTUS PUBLIC URL: ${Main.CMS_URL}`);
    console.log(`CMS DIRECTUS ADMIN EMAIL: ${Main.ADMIN_EMAIL}`);
    console.log(
      `CMS DIRECTUS ATHLETE CATEGORIES COLLECTION: ${Main.CMS_ATHLETE_CATEGORIES_COLLECTION}`
    );
    console.log(
      `CMS DIRECTUS SPORT EVENTS COLLECTION: ${Main.CMS_SPORT_EVENTS_COLLECTION}`
    );
  }

  static buildAthleteCategoriesCollectionPayload(name: string) {
    const directusCollection: ExtendedCollection = {
      collection: name,
      schema: {
        name: name,
        schema: 'directus',
        comment: '',
      },
      meta: {
        collection: name,
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

  static buildSportEventsCollectionPayload(name: string) {
    const directusCollection: ExtendedCollection = {
      collection: name,
      schema: {
        name: name,
        schema: 'directus',
        comment: '',
      },
      meta: {
        collection: name,
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
            collection: name,
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
            collection: name,
            special: [],
            required: true,
          },
          schema: {},
        },
      ],
    };
    return directusCollection;
  }

  /***
   * If the useful collection not exist, create it.
   * @param client - Directus client
   */
  static async createAthleteCategoriesCollectionIfNotExist(client: any) {
    try {
      const foundCollection = await Main.getCollectionByName(
        client,
        Main.CMS_ATHLETE_CATEGORIES_COLLECTION
      );

      if (foundCollection != undefined) {
        // console.log(`[INFO] collection found: ${foundCollection.collection}`);
        console.log(`[INFO] collection found.`);

        } else {
        console.log(
          `[INFO] collection not found: ${Main.CMS_ATHLETE_CATEGORIES_COLLECTION}. Let's create it!`
        );

        const directusCollection = Main.buildAthleteCategoriesCollectionPayload(
          Main.CMS_ATHLETE_CATEGORIES_COLLECTION
        );
        let createCollectionResp = await client.request(
          createCollection(
            directusCollection as Partial<DirectusCollection<any>>
          )
        );
      }
    } catch (error) {
      console.error(`[ERROR] Failed to create a new collection`, error);
      throw error;
    }
  }

  /***
   * If the useful collection not exist, create it.
   * @param client - Directus client
   */
  static async createSportEventsCollectionIfNotExist(client: any) {
    try {
      const foundCollection = await Main.getCollectionByName(
        client,
        Main.CMS_SPORT_EVENTS_COLLECTION
      );
      if (foundCollection) {
        // console.log(`[INFO] collection found: ${foundCollection.collection}`);
        console.log(`[INFO] collection found.`);
      } else {
        console.log(
          `[INFO] collection not found: ${Main.CMS_SPORT_EVENTS_COLLECTION}. Let's create it!`
        );

        const directusCollection = Main.buildSportEventsCollectionPayload(
          Main.CMS_SPORT_EVENTS_COLLECTION
        );
        let createCollectionResp = await client.request(
          createCollection(
            directusCollection as Partial<DirectusCollection<any>>
          )
        );
      }
    } catch (error) {
      console.error(`[ERROR] Failed to create a new collection`, error);
      throw error;
    }
  }

  /***
   * Find a Directus collection by a name
   * @param client - Directus client
   * @param email - Email of the user
   */
  static async getCollectionByName(
    client: any,
    name: string
  ): Promise<DirectusCollection<any> | undefined> {
    try {
      console.log(`[INFO] Looking for collection: ${name}`);
      return await client.request(readCollection(name));
    } catch ($error) {}
  }

  /***
   * Main execution function
   */
  static async main() {
    const client = createDirectus<any>(Main.CMS_URL)
      .with(authentication('json'))
      .with(rest());

    try {
        Main.logEnvInfo();
        await client.login('directus@example.com', 'directus', {});
        let coll = new AthleteCategoriesCollection();
        coll.createCollectionIfNotExist(
            client
        )
    //   await Main.createAthleteCategoriesCollectionIfNotExist(client);
      await Main.createSportEventsCollectionIfNotExist(client);
    } catch (error: any) {
      console.error(`[ERROR] Main function encountered an error`, error);
    } finally {
      await client.logout();
    }
  }
}

Main.main();
