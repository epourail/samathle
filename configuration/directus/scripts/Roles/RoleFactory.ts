import {
  createPermissions,
  createRole,
  DirectusRole,
  NestedPartial,
  readRoles,
} from '@directus/sdk';

// Type for the actions of the permissions
export type PermissionsAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'share';

export default class RoleFactory {
  public static async createRoleIfNotExist(
    client: any,
    name: string,
    actions: PermissionsAction[]
  ) {
    try {
      const found = await this.guessRole(client, name);
      if (found) {
        console.log(`[INFO][${name}] role found.`);
        return found;
      }

      console.log(`[INFO][${name}] role not found. Let's create it!`);
      const rolePayload: NestedPartial<DirectusRole<any>> = {
        name: name,
        app_access: false,
        admin_access: false,
      };
      const role = await client.request(createRole(rolePayload));

      console.log(
        `[INFO][${name}] set role permissions (${actions.join(',')})`
      );
      const permissions = actions.map((action) => ({
        role,
        collection: '*',
        action,
        fields: '*',
        permissions: {},
        validation: {},
      }));

      await client.request(createPermissions(permissions));

      return role;
    } catch (error) {
      console.error(`[ERROR][${name}] Failed to create a new role`, error);
      throw error;
    }
  }

  /***
   * @param client - Directus client
   * @param name - Name of the role
   */
  static async guessRole(
    client: any,
    name: string
  ): Promise<DirectusRole<any> | undefined> {
    try {
      const query = { filter: { name: { _eq: name } } };
      const roles = await client.request(readRoles(query));
      if (roles.length > 1) {
        throw new Error('multiple role(s) found');
      }

      return roles[0];
    } catch (error) {
      console.error(`[ERROR][${name}] Failed to fetch role: `, error);
    }
  }
}
