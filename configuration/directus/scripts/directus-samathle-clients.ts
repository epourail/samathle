import { authentication, createDirectus, rest } from '@directus/sdk';
import dotenv from 'dotenv';
import ClientBuilder from './Clients/ClientBuilder';
import RoleFactory from './Roles/RoleFactory';

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
      await client.login(Main.ADMIN_EMAIL, Main.ADMIN_PWD, {});

      const roleContributor = await RoleFactory.createRoleIfNotExist(
        client,
        'SAMATHLE CONTRIBUTOR',
        ['read', 'create', 'update', 'delete']
      );

      const roleReader = await RoleFactory.createRoleIfNotExist(
        client,
        'SAMATHLE READER',
        ['read']
      );

      const contributor = new ClientBuilder(client);
      await contributor
        .WithName('ClientContributor', 'SAMAthle')
        .WithEmail('contributor@samathle.com')
        .WithPassword('Qn8wezuE96VQwtdG7jsA')
        .WithToken('ilPcK1g13eldfoQsMcTnTc7N6stLrNg1')
        .WithRole(roleContributor)
        .build();

      const reader = new ClientBuilder(client);
      await reader
        .WithName('ClientReader', 'SAMAthle')
        .WithEmail('reader@samathle.com')
        .WithPassword('v867faBHDyiRz4mpsWvJ')
        .WithToken('ARMrAk5OUepZOZAz41xpQG3UzdRYPEMF')
        .WithRole(roleReader)
        .build();
    } catch (error) {
      console.error(`[ERROR] Main function encountered an error`, error);
    } finally {
      await client.logout();
    }
  }
}

Main.main();
