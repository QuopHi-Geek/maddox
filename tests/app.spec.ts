import { test } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';


//initialize .env 
const env = process.env;
const BASE_URL = env.BASE_URL;
const EMAIL = env.EMAIL;
const PASSWORD = env.PASSWORD;


// TEST 1 - LOGIN USER
test("should login successfully",async({page})=>{
  const login = new LoginPage(page);

  await login.gotoLogin(BASE_URL+ "/login");
  await login.fillUserDetails(EMAIL,PASSWORD);

  await login.clickLogin();

  //verify user redirected to the home page
  await login.verifyLoginSuccess(BASE_URL);

})


test("should test unsuccessful login",async({page})=>{
  const login = new LoginPage(page);

  await login.gotoLogin(BASE_URL + "/login");
  //attempt login with invalid credentials
  await login.fillUserDetails(EMAIL,PASSWORD+"wp");

  await login.clickLogin();

  //verify unsuccessful login with error
  await login.verifyLoginError();

})


// TEST 2 - COUNTER FUNCTIONALITY
test("should test counter functionality",async({page})=>{
  const login = new LoginPage(page);
  const homepage = new HomePage(page);

  await login.gotoLogin(BASE_URL + "/login");
  await login.fillUserDetails(EMAIL,PASSWORD);

  await login.clickLogin();
  //verify user redirected to the home page
  await login.verifyLoginSuccess(BASE_URL);


  //verify increase counter
  await homepage.increaseCounter(12)


  //verify decrease counter
  await homepage.decreaseCounter(7)
  
 
  //verify reset counter
  await homepage.resetCounter(0)
 

})


// TEST 3 - LOGOUT USER
test("should test successful user logout",async({page})=>{
  const login = new LoginPage(page);
  const homepage = new HomePage(page);

  await login.gotoLogin(BASE_URL + "/login");
  await login.fillUserDetails(EMAIL,PASSWORD);

  await login.clickLogin();
  //verify user redirected to the home page
  await login.verifyLoginSuccess(BASE_URL);

  //logout user
  await homepage.logout();

  //verify successful logout and redirected to login
  await homepage.verifySuccessLogout(BASE_URL + "/login");

})