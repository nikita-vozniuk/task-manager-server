import { register } from '../src/controllers/auth';
import { getUserByEmail } from '../src/db/users';

jest.mock('../src/db/users');

const mockedGetUserByEmail = getUserByEmail as jest.Mock;

describe('User Controller - register', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        req = {
            body: {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            sendStatus: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user', async () => {
        mockedGetUserByEmail.mockResolvedValue(null);

        await register(req, res);

        expect(mockedGetUserByEmail).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});