

export class User {
  constructor(
    public userId: string,
    public username: string,
    public email: string,
    public password: string,
    public role: string,
    public status: string,
    public firstName: string|null,
    public lastName: string|null,
    public address: string|null,
    public city: string|null,
    public postalCode: string|null,
    public country: string|null,
    public phoneNumber: string|null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
