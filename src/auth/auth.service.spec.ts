import { JwtModule } from "@nestjs/jwt"
import { getModelToken } from "@nestjs/mongoose"
import { PassportModule } from "@nestjs/passport"
import { Test } from "@nestjs/testing"
import { Model } from "mongoose"
import { modelProviders } from "../db/model-Provider/model.provider"
import { AppConstants } from "../core/constants/app.constants"
import { CoreModule } from "../core/core.module"
import { User } from "../core/schemas/users.schema"
import { AuthService } from "./auth.service"
import { PasswordHasher } from "../core/helper/passwordHasher.helper"
import * as  bcrypt from "bcrypt"
import { BadRequestException, ConflictException, HttpException, HttpStatus } from "@nestjs/common"
import { ExceptionConstants } from "../core/constants/exception.constants"
import { UserDAO } from "../core/dao/users.dao"
import { PasswordCompare } from "../core/helper/passwordCompare.helper"
import { Tokengeneration } from "../core/helper/tokenGeneration.helper"
const mockAuthService ={
    create : jest.fn()
}
const mockUser ={
    _id: '63846534c20228501ca51bd1',
    name : "a",
    emailID : "testing@gmail.com",
    password : "hashedPaasword",
    role : "user",
}
const mockMatch  :Boolean = true
const token = 'jwtToken'
describe('authService',() =>{
    
    let service :AuthService 
    let model : Model<User>
    let userDAO : UserDAO
    let passwordHash : PasswordHasher
    let passwordCompare :PasswordCompare
    let tokenGeneration : Tokengeneration
    beforeEach(async() =>{
        const module =await Test.createTestingModule({
            imports : [CoreModule , PassportModule.register({defaultStrategy :'jwt'}),JwtModule.register({secret :AppConstants.SECRET_KEY ,signOptions :{expiresIn : '1h'}})] ,
            providers : [...modelProviders ,AuthService , {
                provide : getModelToken (User.name) , useValue : mockAuthService }]
    
    
        }).compile()
        service = module.get(AuthService)
        model = module.get(getModelToken(User.name))
        userDAO = module.get(UserDAO)
        passwordHash = module.get(PasswordHasher)
        passwordCompare = module.get(PasswordCompare)
        tokenGeneration = module.get(Tokengeneration)

    })
    
    it('should be defined' , () =>{
        expect(service).toBeDefined()
    })

    describe('createUser', ()=>{
        const signUpDTO = {
            name : "a",
            emailID : "testing@gmail.com",
            password : "hashedPaasword",

        }
        it('should register new user',async() =>{
            jest.spyOn(passwordHash,'hashPassword').mockResolvedValueOnce(mockUser.password)
            jest.spyOn (userDAO,'createUser').mockImplementationOnce(() =>Promise.resolve(mockUser))
            


const result = await service.createUser(signUpDTO)

          expect(passwordHash.hashPassword).toHaveBeenCalled()
          expect(userDAO.createUser).toHaveBeenCalled()


})
        
    })

    describe('login' , () =>{
        it('should log in the user' ,async () =>{
            const loginDTO =  {
emailID : "testing@gmail.com" ,password : "hashedPaasword"
            }
            jest.spyOn (userDAO,'user').mockImplementationOnce(() =>Promise.resolve(mockUser)),
            


            jest.spyOn(passwordCompare,'comparePassword').mockResolvedValueOnce(mockMatch),
            jest.spyOn(tokenGeneration , 'generateToken').mockResolvedValueOnce(token)

            const result = await service.login(loginDTO)

            expect(userDAO.user).toHaveBeenCalled()
            expect(passwordCompare.comparePassword).toHaveBeenCalled()
            expect (tokenGeneration.generateToken).toHaveBeenCalled()

            expect(result).toEqual(token)








        })
    }) 
})