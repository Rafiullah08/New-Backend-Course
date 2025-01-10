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

