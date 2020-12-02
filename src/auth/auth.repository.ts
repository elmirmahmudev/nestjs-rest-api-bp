import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth.credentials";
import { UserEntity } from "./user.entity";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;

        const user = new UserEntity();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {// duplicate username error code
                throw new ConflictException('duplicate username');
            } else {
                throw new InternalServerErrorException();
            }            
        }
    }
}