import {
    createCollection,
    DirectusCollection,
    readCollection,
  } from '@directus/sdk';
import {
    ICollection,
    TExtendedCollection
 } from './ICollection'

export abstract class CollectionBase implements ICollection {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract buildCollectionPayload(): TExtendedCollection;

    /***
     * Find a Directus collection by a name
     * @param client - Directus client
     * @param name - name of the collection
     */
    private async guessCollection(
        client: any
    ): Promise<DirectusCollection<any> | undefined> {
        try {
            console.log(`[INFO] Looking for collection: ${this.name}`);
            return await client.request(
                readCollection(this.name)
            );
        } catch ($error) {}
    }

    /***
     * If the useful collection not exist, create it.
     * @param client - Directus client
     */
    public async createCollectionIfNotExist(client: any) {
        try {
            await this.guessCollection(client).then(
                () => {
                    console.log(`[INFO] collection found.`);
                }
            ).catch(
                () => {
                    console.log(`[INFO] collection not found: ${this.name}. Let's create it!`);
                    let createCollectionResp = client.request(
                        createCollection(
                            this.buildCollectionPayload() as Partial<DirectusCollection<any>>
                        )
                    );
                    console.log(`[INFO] collection created: ${createCollectionResp}`);
                }
            );

        } catch (error) {
            console.error(`[ERROR] Failed to create a new collection`, error);
            throw error;
        }
    }
}
