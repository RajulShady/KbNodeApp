# KbNodeApp

End Points

USER SIGNUP

https://kilobyte.herokuapp.com/signup
properties - name, email, password, role(either 1 or 2 - 1 for admin & 2 for subadmin)

USER LOGIN

https://kilobyte.herokuapp.com/login
properties - email, password

ADD STUDENT BY ADMIN

https://kilobyte.herokuapp.com/user/addStudent
properties - name, email, course, dob, phone, studentId

SEARCH STUDENT BY ADMIN/SUBADMIN

https://kilobyte.herokuapp.com/user/search?search=akki
or
https://kilobyte.herokuapp.com/user/search?search=rajul@gmail.com

search in query and by any search word(name, email, course or dob) as it will search the keyword in whole database.

