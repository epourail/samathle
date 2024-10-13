import {
  createUser,
  DirectusRole,
  DirectusUser,
  NestedPartial,
  readUsers,
  updateRole,
} from '@directus/sdk';

export default class ClientBuilder {
  client: any;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  token: string = '';
  status: string = 'active';
  role: DirectusRole<any>;

  constructor(client: any) {
    this.client = client;
  }

  /*
   * PUBLIC
   **/
  public WithName(firstName: string, lastName: string): ClientBuilder {
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  }

  public WithEmail(email: string): ClientBuilder {
    this.email = email;
    return this;
  }

  public WithPassword(password: string): ClientBuilder {
    this.password = password;
    return this;
  }

  public WithToken(token: string): ClientBuilder {
    this.token = token;
    return this;
  }

  public WithStatus(status: string): ClientBuilder {
    this.status = status;
    return this;
  }

  public WithRole(role: DirectusRole<any>): ClientBuilder {
    this.role = role as DirectusRole<any>;
    return this;
  }

  public async build() {

    try {
      const found = await this.guessUser(this.client, this.email);
      if (found) {
        console.log(`[INFO][${this.email}] user found.`);
        return found;
      }

      const user: NestedPartial<DirectusUser<any>> = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        token: this.token,
        status: this.status,
      };

      const newUser = await this.client.request(
        createUser(user)
      );

      const rolePayload: NestedPartial<DirectusRole<any>> = {
        users: [newUser.id],
      };

      const newRole = await this.client.request(
        updateRole(this.role.id as string, rolePayload)
      );

      return await this.client.request(createUser(user));
    } catch (error) {
      console.error(`[ERROR][${this.email}] Failed to build client: `, error);
    }
  }

  /***
 * @param client - Directus client
 * @param email - Email of the user
 */
  private async guessUser(
    client: any,
    email: string
  ): Promise<DirectusUser<any> | undefined> {
    try {
      const query = { filter: { email: { _eq: email } } };
      const users = await client.request(readUsers(query));
      if (users.length > 1) {
        throw new Error('multiple users(s) found');
      }

      return users[0];
    } catch (error) {
      console.error(`[ERROR][${email}] Failed to fetch users: `, error);
    }
  }
}
