import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
  name: string;
  email: string;
  password: string;
  postal_code:string;
  address_line:string;
  number:string;
  district:string;
  city:string;
  state:string;
  complement:string;
  user_type:string;
  phone_number:string;
  price:number;
  pix: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password, postal_code, 
    address_line,
    number,
    district,
    city,
    state,
    complement,
    user_type,
    phone_number,
    price,
    pix
}: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      postal_code, 
      address_line,
      number,
      district,
      city,
      state,
      complement,
      user_type,
      phone_number,
      price,
      pix
    });

    return user;
  }
}

export default CreateUserService;
