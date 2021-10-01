# #include&lt;codeTheCamp&gt;, a functional coding bootcamp website

## Hosted at https://codethecamp.darshsikka.repl.co/

## Version control at https://github.com/DarshSikka/codeTheCamp

### Pages:

#### Home Page

#### Signin/Signup(Authentication page)

#### Dashboard Page

#### View Article/Lecture page

#### Admin Page

## Home

##### This site has a static landing home page, which contains a hero section, course overview, curriculum overview and pricing section. At the bottom is a contact us link.

## Signin/Signup page

##### This is an authentication page which can be reached by clicking the user icon in the navbar on homepage, this user icon will be replaced by your username once you login,this would be a logout button. But once you reach here by clicking the user icon, you can signup for a new account, or login into an existing one. To signup, click on the signup navigator on the top and fill in essential details. Make sure to use a valid email that you have access to, as you will later be asked to confirm it. Once logged in / signed up, you are navigated to home.

## Dashboard

##### This is a protected page, you can access it only after logging in Click on the logo in the home page to reach it.Once you reach here, you see details about your account. Below, you can also access articles and lectures. It will initially show your email has not been verified. For this you will have to click the link at the end of the information. Then an otp will be mailed to you, and you have to check your mail and fill it in the form

## View Article/Lecture page

##### Come here by clicking on any article/lecture in the dashboard. This is a protected page, you can access it only after logging in and confirming your email. You will be rejected access if you are a free pack user and have exceeded your limit of 2 articles or 1 lecture.This page fetches the article/lecture from the database and shows it to you

## Admin page

Access at https://codethecamp.darshsikka.repl.co/auth/admin
_Please enter 12345 wherever a password is asked in admin page_

##### This is the page for administrators. Here you will be asked a password, for that you need to enter `12345`, wherever asked. In this page, you can manage students and resources. For reaching the page you need to manage, use the navbar on top of the page(below the main navbar). In the manage students tab, you can enter email of the student to manage, and then you will be asked the password again. You need to enter it, then you will see the student details. Now, you can change the pack of the student to Bronze, Silver or Gold. This would show up in their dashboard too. This would also give them access to unlimited articles and lectures. The next tab is the upload articles tab. Here you can just enter the title, HTML and `12345` as the password for the article. Not entering 12345 will restrict you access. Upon pressing submit, the article will be visible on all student dashboards. Similarly, the lecture tab is where you can enter the title of the lecture, upload the lecture video, enter the password. Then the video will be available on the dashboard of all students.
