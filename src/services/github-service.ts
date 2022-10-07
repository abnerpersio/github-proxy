import axios from 'axios';

import { GithubUser, Repo, UserDetail } from '../infra/types/github';
import { BASE_GITHUB_URL, endpoints } from '../shared/constants/github';

export class GithubService {
  async listUsers(since?: number): Promise<{ users: GithubUser[]; next: string }> {
    const url = this.generateUrl(endpoints.users);

    const response = await axios.get<GithubUser[]>(url, {
      params: { since },
    });

    const users = response?.data ?? [];
    const next = response.headers.link ?? '';

    return { users, next };
  }

  async getUser(username: string): Promise<UserDetail> {
    const url = this.generateUrl(`${endpoints.users}/${username}`);
    return (await axios.get(url))?.data;
  }

  async listRepos(username: string): Promise<Repo[]> {
    const url = this.generateUrl(`${endpoints.users}/${username}/repos`);
    return (await axios.get(url))?.data;
  }

  private generateUrl(endpoint: string) {
    return `${BASE_GITHUB_URL}/${endpoint}`;
  }
}
