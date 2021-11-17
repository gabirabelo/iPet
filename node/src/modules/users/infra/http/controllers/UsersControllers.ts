import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateUserService from "@modules/users/services/CreateUserService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    console.log(request)

    const { 
      name, 
      email, 
      password, 
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
    } = request.body;


    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
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

    return response.json(classToClass(user));
  }
}
