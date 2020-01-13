# nodejs-mongodb-jwt-token
API to register and login a user to create contacts with authenticated routes


## Instructions to run the project

1. Download or Clone the repository to your system.

2. CD into the project direcotry

3. Type `npm start`

4. Server will be running on port 3001 on localhost. 

### Regsiter a user
5. To register a user, open postman, add URL to address bar: `http://localhost:3001/api/user/register` and select HTTP method GET.

6. Provide fields: name, email, passwors, dateOfBirth in raw jSON format in body of the request.


`{
	"name":"Developer",
	"email" : "developer-git@developer.com",
	"password": "12345678",
	"dateOfBirth": "12-03-1988"
}`

upon success a user id would be returned.

### User Login

1. Add following URL to address bar and Select HTTP method GET. `http://localhost:3001/api/user/login`

2. Provide username and password in raw jSON format in body of the request.

  `{
	  "email" : "developer-git@developer.com",
	  "password": "12345678"
  } `

3. Successfull login returns an auth-token


### Add a contact in an authenticated route

1. To add a new contact - Add following URL to address bar. `http://localhost:3001/api/contacts`. 

2. Select HTTP method POST.

3. Copy `auth-token` from login route returned data

4.Add a parameter `auth-token` to the headers and add the token value in vaue field.

5. Add required fields in raw jSON format in body of the request.

`{ 
	"name": "Dev contact",
	"phone": "0550234567",
	"email": "nodejs-developer@example.com",
	"address": "Address"
} `

6. Upon success MongoDB saved document is returned.


### Update a contact in an authenticated route

1. To add a update contact - Add following URL to address bar. `http://localhost:3001/api/contacts?id=5e1c59a16faab27458e57830`. 

2. Notice the id paramater with _id value to be updated in URL.

3. Select HTTP method PUT.

4. Copy `auth-token` from login route returned data

5.Add a parameter `auth-token` to the headers and add the token value in vaue field.

6. Add required fields in raw jSON format in body of the request.

`  {
        "name": "A contact",
        "email": "contact@gmail.com",
        "phone": "0581234567",
        "address": "This is address"
    }
    `
    
7. Upon success MongoDB saved document is returned.

 ### View all contacts in an authenticated route

1. To view all contacts - Add following URL to address bar. `http://localhost:3001/api/contacts 

2. Select HTTP method GET.

3. Copy `auth-token` from login route returned data

4. Add a parameter `auth-token` to the headers and add the token value in vaue field.

5. Click Send. and Youu can view all the contacts.




