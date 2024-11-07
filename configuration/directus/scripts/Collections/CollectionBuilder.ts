import fs from 'fs';
import {
  createCollection,
  DirectusCollection,
  readCollection,
  readFieldsByCollection,
} from '@directus/sdk';
import { TExtendedCollection } from './ICollection';

import AthleteCollection from './AthleteCollection';
import AthleteCategoryCollection from './AthleteCategoryCollection';
import EventCollection from './EventCollection';
import SportCollection from './SportCollection';
import PerformanceCollection from './PerformanceCollection';

export default class CollectionBuilder {
  client: any;

  hasAthleteColl: boolean = false;
  hasAthleteCategoryColl: boolean = false;
  hasEventColl: boolean = false;
  hasSportColl: boolean = false;
  hasPerformanceColl: boolean = false;

  constructor(client: any) {
    this.client = client;
  }

  /*
   * PUBLIC
   **/
  public WithAthletes(): CollectionBuilder {
    this.hasAthleteColl = true;
    return this;
  }

  public WithAthleteCategories(): CollectionBuilder {
    this.hasAthleteCategoryColl = true;
    return this;
  }

  public WithEvents(): CollectionBuilder {
    this.hasEventColl = true;
    return this;
  }

  public WithSports(): CollectionBuilder {
    this.hasSportColl = true;
    return this;
  }

  public WithPerformances(): CollectionBuilder {
    this.hasPerformanceColl = true;
    return this;
  }

  public async build() {
    if (this.hasAthleteColl) {
      await this.createCollectionIfNotExist(
        AthleteCollection.getName(),
        AthleteCollection.buildCollectionPayload()
      );
    }

    if (this.hasAthleteCategoryColl) {
      await this.createCollectionIfNotExist(
        AthleteCategoryCollection.getName(),
        AthleteCategoryCollection.buildCollectionPayload()
      );
    }

    if (this.hasSportColl) {
      await this.createCollectionIfNotExist(
        SportCollection.getName(),
        SportCollection.buildCollectionPayload()
      );
    }

    if (this.hasEventColl) {
      await this.createCollectionIfNotExist(
        EventCollection.getName(),
        EventCollection.buildCollectionPayload()
      );
    }

    if (this.hasPerformanceColl) {
      await this.createCollectionIfNotExist(
        PerformanceCollection.getName(),
        PerformanceCollection.buildCollectionPayload()
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
    } catch ($error) { }
  }

  /**
   * Serialize objct to json string
   * @param obj - directus collection 
   * @returns 
   */
  private async backupCollection(
    obj: DirectusCollection<any>
  ) {
    let path = './backup'
    let name = obj.collection;

    (obj as any).fields = await this.client.request(readFieldsByCollection(name));

    if (!fs.existsSync(`${path}`)) {
      fs.mkdirSync(`${path}`);
    }
    fs.writeFileSync(`${path}/${name}.json`, JSON.stringify(obj, null, 4), {
      flag: "w+"
    });

    console.log(`[INFO][${name}] collection saved.`);
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
        this.backupCollection(found);
        return found;
      }

      console.log(`[INFO][${name}] collection not found. Let's create it!`);
      return await this.client.request(
        createCollection(coll as Partial<DirectusCollection<any>>)
      );
    } catch (error) {
      console.error(
        `[ERROR][${name}] Failed to create a new collection`,
        JSON.stringify(error)
      );
    }
  }
}
