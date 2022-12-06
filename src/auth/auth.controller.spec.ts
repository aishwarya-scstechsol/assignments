import { Test } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import {Response } from "express"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AppConstants } from "../core/constants/app.constants"
import { CoreModule } from "../core/core.module"
import { modelProviders } from "../db/model-Provider/model.provider"
const mockAuthService = {
    createUsers : jest.fn()
}

const token ='jwtToken'
describe("authController" ,() =>{
    let controller :AuthController 
    let service :AuthService
    let res : Response
    
    beforeEach(async () =>{
        const module =await Test.createTestingModule({
            controllers : [AuthController] ,
            imports : [CoreModule , PassportModule.register({defaultStrategy :'jwt'}),JwtModule.register({secret :AppConstants.SECRET_KEY ,signOptions :{expiresIn : '1h'}})] ,
            providers : [...modelProviders , AuthService ]
    
    
        }).compile()

        controller = module.get<AuthController>(AuthController)
        service = module.get<AuthService>(AuthService)
        
    })
    it('should be defined' ,() =>{
        expect(controller).toBeDefined()
    })

    describe('sign up ' , () =>{
        it('should create a user' , async () => {
            const signUpDTO ={
                name : "a",
                emailID : "testing@gmail.com" ,
                password : "password",
                role : "user"
            }

            jest.spyOn(service , 'createUser').mockImplementationOnce(() =>Promise.resolve())
    const result = await controller.createUsers(signUpDTO)
    expect(service.createUser).toHaveBeenCalled()
            
        }) 
       

    })

    describe('login' ,() =>{
        it('should let user login' ,async() =>{
            const loginDTo = {
                "emailID" : "testing@gmail.com",
                "password" : "password"
            }
            jest.spyOn(service ,'login').mockResolvedValueOnce(token) 
            const result = await controller.login(loginDTo )
            expect(service.login).toHaveBeenCalled()
            expect(result).toEqual(token)


        })
    })
})

