import { Axios } from 'axios'

export interface AuthFormData {
  username: string,
  password: string,
  grant_type: string
}

const baseUrl = process.env.BASE_URL || 'http://localhost:3001'

export default class extends Axios{

  constructor() {
    super({
      baseURL: baseUrl
    });
  }

  private authInfo= {}

  async authenticate(form: AuthFormData): Promise<void> {

  }

}
