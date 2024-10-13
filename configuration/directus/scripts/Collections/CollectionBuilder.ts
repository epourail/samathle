import {
  createCollection,
  DirectusCollection,
  readCollection,
} from '@directus/sdk';
import { TExtendedCollection } from './ICollection';

import AthleteCategoriesCollection from './AthleteCategoriesCollection';
import SportEventsCollection from './SportEventsCollection';

export default class CollectionBuilder {
  client: any;

  hasAthleteCategoriesColl: boolean = false;
  hasSportEventsColl: boolean = false;

  constructor(client: any) {
    this.client = client;
  }

  /*
   * PUBLIC
   **/
  public WithAthleteCategories(): CollectionBuilder {
    this.hasAthleteCategoriesColl = true;
    return this;
  }

  public WithSportEvents(): CollectionBuilder {
    this.hasSportEventsColl = true;
    return this;
  }

  public async build() {
    if (this.hasAthleteCategoriesColl) {
      await this.createCollectionIfNotExist(
        AthleteCategoriesCollection.getName(),
        AthleteCategoriesCollection.buildCollectionPayload()
      );
    }

    if (this.hasSportEventsColl) {
      await this.createCollectionIfNotExist(
        SportEventsCollection.getName(),
        SportEventsCollection.buildCollectionPayload()
      );
    }
  }
  /*
   * PRIVATE
   **/
  /***
   * Find a Directus collection by a name
   * @param name - name of the collection
   */
  private async guessCollection(
    name: string
  ): Promise<DirectusCollection<any> | undefined> {
    try {
      return await this.client.request(readCollection(name));
    } catch ($error) {}
  }

  /***
   * If the useful collection not exist, create it.
   * @param name - name of the collection
   * @param coll - directus collection payload
   */
  public async createCollectionIfNotExist(
    name: string,
    coll: TExtendedCollection
  ) {
    try {
      const found = await this.guessCollection(name);
      if (found) {
        console.log(`[INFO][${name}] collection found.`);
        return found;
      }

      console.log(`[INFO][${name}] collection not found. Let's create it!`);
      return await this.client.request(
        createCollection(coll as Partial<DirectusCollection<any>>)
      );
    } catch (error) {
      console.error(
        `[ERROR][${name}] Failed to create a new collection`,
        error
      );
    }
  }
}
