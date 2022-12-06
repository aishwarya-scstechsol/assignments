export class LoggerConstants {

    public static CREATE_USER = 'user creation initiated'
    public static CREATE_USER_ERR = 'error while creating user'
    public static CREATE_USER_C = 'user creation initiated initiated at controller level'

    


    public static LOGIN_C = 'login initiated initiated at controller level'


    public static CREATE_USER_S = 'user creation initiated initiated at service level'

    public static RETRIEVE_USERS_S = 'retrieval initiated at service level'

 


    public static LOGIN_S = 'login initiated at service level'
    public static GUARD = 'roles guard initiated'
    public static GUARD_ERR = 'insufficient permissions'

   
    public static USER_EXISTS = "method for checking if user already exists initiated"
    public static USER_EXISTS_ERR = "user already exists"


    public static CHECK_AUTH = 'authorization token validation invoked'
    public static CHECK_AUTH_ERR = 'error while checking authenticity of token'



    public static PASSWORD_COMPARISION = 'password comparision method initiated'
    public static PASSWORD_COMPARISION_ERR = "error while comapring passwords"

    public static PASSWORD_ENCRYPTION = 'password encryption initiated'
    public static PASSWORD_ENCRYPTION_ERR = "error while encrypting password"

    public static TG = 'token generation method initiated'
    public static TG_ERR = 'error while generating jwt token'

    public static DECRYPTION = "decryption method initiated"
    public static DECRYPTION_ERR = "error while decrypting"
    public static ENCRYPTION = "encryption method initiated"
    public static ENCRYPTION_ERR = "error while encrypting"
    public static HASH_PASSWORD = "hash password method initiated"
    public static HASH_PASSWORD_ERR = "error while excecuting hash password method"


    public static MIDDLEWARE = "checkAuth middleware initiated"

    public static ID_PIPE = "mongoDB ID validation pipe initiated"

    public static REQ_BODY_PIPE = "request body validation pipe initiated"

    public static CREATE_BOOK = "book creation method initiated"
    public static CREATE_BOOK_S = "book creation method initiated at service level"
    public static CREATE_BOOK_C = "book creation method initiated at controller level"
    public static CREATE_BOOK_ERR = "error encountered while book creation"


    public static GET_BOOK = "retrieval of books method initiated"
    public static GET_BOOK_S = "retrieval of books method initiated at service Level"
    public static GET_BOOK_C = "retrieval of books method initiated at controller Level"
    public static GET_BOOK_ERR = "error encountered while retrieving book"
    

    
    public static GET_BOOK_BY_ID = "retrieval of books by ID  method initiated"
    public static GET_BOOK_BY_ID_S = "retrieval of books by ID method initiated at service Level"
    public static GET_BOOK_BY_ID_C = "retrieval of books by ID method initiated at controller Level"
    public static GET_BOOK_BY_ID_ERR = "error encountered while retrieving book by ID "

    public static BOOK_EXISTS = "method to check if book by this name exists initiated"
    public static BOOK_EXISTS_ERR = "book with this name already exists"

    public static UPDATE_BOOK = "book update method initiated"
    public static UPDATE_BOOK_S = "book update method initiated at service level"
    public static UPDATE_BOOK_C = "book update method initiated at controller level"
    public static UPDATE_BOOK_ERR = "error while updating book"
    
    
    public static DELETE_BOOK = "book delete method initiated"
    public static DELETE_BOOK_S = "book delete method initiated at service level"
    public static DELETE_BOOK_C = "book delete method initiated at controller level"
    public static DELETE_BOOK_ERR = "error while updating book"

    public static PIPE = "file mimetype validation method initiated"
    public static PIPE_ERR = "error while validation file mimetype"
    public static VALIDATING_PAYLOAD = "validating payload method initiated"
    public static VALIDATING_PAYLOAD_ERR = 'error while validating payload'



    
    
    








}