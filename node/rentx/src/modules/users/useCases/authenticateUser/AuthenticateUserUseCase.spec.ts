import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


describe('Authenticate User', () => {
	let fakeUsersRepository: FakeUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let authenticateUserUseCase: AuthenticateUserUseCase;
	const user = {
		email: 'teste@mail.com',
		password: '123123'
	}
	beforeAll(async () => {
		fakeUsersRepository = new FakeUsersRepository();
		createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
		authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);

		await createUserUseCase.execute({
			name: 'Testonio',
			driver_license: '12312321',
			email: 'teste@mail.com',
			password: '123123'
		})
	})

	it('Should be able to authenticate a user', async () => {
		const result = await authenticateUserUseCase.execute({ ...user });

		expect(result).toEqual({
			token: expect.any(String),
			user: {
				email: user.email,
				driver_license: expect.any(String),
				id: expect.any(String),
				name: expect.any(String),
			}
		})
	})
	it('Should not be able to authenticate an user that don\'t exists', async () => {
		await expect(authenticateUserUseCase.execute({ ...user, email: 'aehuheiuaiehua' })).rejects.toBeInstanceOf(AppError);
	})
	it('Should not be able to authenticate an user with wrong password', async () => {
		await expect(authenticateUserUseCase.execute({ ...user, password: 'kkkkkkkkkkk' })).rejects.toBeInstanceOf(AppError);
	})

})