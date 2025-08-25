Feature: User Login
  Scenario: Successful login
    Given the user is on the login page
    When the user enter valid credentials
    Then the user should see their email and password in the URL