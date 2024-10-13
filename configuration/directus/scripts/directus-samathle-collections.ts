import { authentication, createDirectus, rest } from '@directus/sdk';
import dotenv from 'dotenv';
import CollectionBuilder from './Collections/CollectionBuilder';

dotenv.config();

class Main {
  // Define constants for admin environment variables
  static readonly CMS_URL: string = <string>process.env.CMS_DIRECTUS_URL;
  static readonly ADMIN_EMAIL: string = <string>(
    process.env.CMS_DIRECTUS_ADMIN_EMAIL
  );
  static readonly ADMIN_PWD: string = <string>(
    process.env.CMS_DIRECTUS_ADMIN_PASSWORD
  );

  /***
   * Log the .env variables
   */
  static logEnvInfo() {
    console.log(`CMS DIRECTUS PUBLIC URL: ${Main.CMS_URL}`);
    console.log(`CMS DIRECTUS ADMIN EMAIL: ${Main.ADMIN_EMAIL}`);
  }

  /***
   * Main execution function
   */
  static async main() {
    Main.logEnvInfo();
    const client = createDirectus<any>(Main.CMS_URL)
      .with(authentication('json'))
      .with(rest());
    try {
      await client.login(this.ADMIN_EMAIL, this.ADMIN_PWD, {});

      let collBuilder = new CollectionBuilder(client);
      await collBuilder.WithAthleteCategories().WithSportEvents().build();
    } catch (error: any) {
      console.error(`[ERROR] Main function encountered an error`, error);
      console.error(error);
    } finally {
      await client.logout();
    }
  }
}

Main.main();
