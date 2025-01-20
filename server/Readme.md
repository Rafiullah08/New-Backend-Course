==== class 8 =====
Custom api response and error handling | chai aur backend

cookies-parser
middlewear

example : app.post(err,req,res,next)
high order function => those funtion who accept function as a 
parameter or who return a funtion


==== class 9 =====
User and video model with hooks and JWT
JSON DATA VS BSON DATA(Binary json data)
mongoose-aggregate-paginate-v2 => for  plugin
jwt token => jwt is bearer token

ADD METHODS IN SCHEMA
ADD PLUGIN IS SCHEMA
PRE method 

==== class 10 =====
How to upload file in backend | Multer
--- for uploding file ---
1 - express file upload
2 - multer

fs => file system
unlink(path) for deleting file

for uploding file in cloudinary
configaration cloudnary 
setup multer 

==== class 11 ====
HTTP crash course | http Methods | http headers

hyper text transfer protocol

url => uniform resource locator
uri => uniform resource identifier
urn => uniform resource name 

--- what are http header ---
metadata => key-value sent along with request and response 
use headers in 
caching , authentication , manage data
x-prefix => 2012 [x- deprecated] // 2012 se pehle header mai subke sath x likna lazmi tha eg xname pr ab nhi hai

request headers => from clients
response headers => from server
representation header => encoding / compression
payload header => data


===== (most common headers) ====
accept => application /json
user-agent => user details isse nikalte hain
authorization => token etc
content type
cookie
cache-control


==== (cors) ====
access => control allow origin
access => control allow credential
access => control allow method

==== (security) ====
cross-origin-embededder- policy
content-security-policy


==== (http methods) ====
basic set of operation that can be used to interact 
with server

get => retrive a resource
head => no message body (response header only)
option => what operations are available
trace => loopback test (get some data)
delete
put => replace a resource
post 
patch => change part of a resource


==== (HTTP STATUS CODE) ==== 
* 1 xx informational 
* 2 xx success
* 3 xx redirection
* 4 xx client error
* 5 xx server error

101 continue              400 bad request 
102 processing            401 unauthorized 
200 ok                    402 payment required 
201 created               404 not found 
202 accepted              500 internal server 
307 tepm redirect         504 gate way time out 
308 perm redirect 


======= class 12 ==========
Logic building | Register controller

get user details from frontend

fronend se user ke details ya form mai ayega ya json type 
mai ayega to in sub surt mai data hme req.body ke andr mil jayega,
or agr data url mai aye to wo hme params mai milega

use of operators to find user in database
user.findOne({
    $or: [{ email}, {name}]
 })

( user register algorithm) 
get user details from frontend,
validation -  not empty
check if user already exists : username , email
chek for images chek or avatar
upload them to cloudinary avatar
create user object, create entry in db
remove password and refresh token from response (createduser.findOne({user._id}).select("-password -refreshtoken"))
check for user creation 
return response


===== class 13 =======
How to use postman for backend


===== class 15 ========
Access Refresh Token, Middleware and cookies in Backend
refresh token and access token

refresh token => long lift hotain hain
access token => short lift hotain hain

user login algorithm
get user data for req body'
user name or email
find the user
password chek
access and refresh token
send cookie


==== ( user logout) ===
iskeliye hum ek auth middlewear banate hain
jisme hum subse pehle user se toket ko get krte hai
jiski madad se hum user ko define krke fir uske accesstoken or refresh token ko remove 
krte hain


======= class 16 ========
Access token and refresh token in Backend
access token short lived hota hain.
refresh token long lived hota hain.


===== class 17 ===========
generateRefreshToken

user.findByIdAndUpdate(
    {
    req.user?.id,
    },
    {}, jo data update krna ho wo isma rk ke pass krte hain
    {new : true}, isme update hone ke bad jo data hota hia wo hme mil jata hai 
)

/// Note! 
kisi ek field ko update krne keliye $set: {}
ka use krte hai isse ek field update hoti hain 
pura objet update nhi hoti .


====== class 18 =========
Writing update controllers for user | Backend with JS

====== class 19 =========
Understand the subscription Schema
Subscription schema:
jp bhi hum kisi channel ko subscribe krte hain
to hamare pass ek naya documents create hota hai.
or subscriber ko count krne keliye hum documents yani channel ko 
fine krte hain or fir subscriber ko count krte hain.

// channel se subscriber milte hain or subscriber se channel.



======= class 19 ========
Learn Mongodb aggregation pipelines

aggregation:
aggregated pipelines almost return array


======= class 20 ========
How to write sub pipelines and routes
req.body._id => isse hme string milta hain mondo db k id nhi 
fir mongose k throw mongo db behind the seen sb kuch dek leta hain.

======= class 21 ========
Summary of our Backend Series

====== class 22 =========
MongoDB models for like playlist and tweet


===== class 23 ==========
Build in public and open source | Only video that you need 🔥
assingment
chai or backend complete