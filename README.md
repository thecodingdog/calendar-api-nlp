### Task Management App

### User Stories
* able to add task and time in a single string input such as
* swimming next Friday at 2pm
* Nov 15, 2017, Harry’s   birthday
* able to search / filter for relevant tasks by time and keywords
* user able to signup / login to see his own tasks
* user able to check for clashes in timing before proceeding to book a slot
* able to add recurring schedule using the words 'birthday' or 'anniversary'

### Assumptions
* Upon clashes, users will be shown clashing schedule, but still allowed to proceed with booking
* Searches by "location" works like searching for "keyword". i.e. it includes searches for activity, name etc. in order to cover for cases like 'dinner at Jo's'
* String inputs without time will be defaulted to 12 noon
* String inputs without end time will be defaulted to end at start time
* String inputs without dates will be defaulted to today
* String inputs without AM/PM will be defaulted to PM if its between 1-4, else defaulted to AM
* Week starts from Monday - Sunday i.e. inputting 'jogging this Sunday' results in 22nd Oct 2017
* Doesn't account for different timezones
* Recurring events for daily will be repeated for 365 days (1 year)
* Recurring events for weekly will be repeated for 53 weeks (1 year)
* Recurring events for monthly will be repeated for 12 months (1 year)

### ERD

### Built With
* Node
* Express
* Handlebars
* PostgresSQL + Sequelize
* Mocha, Chai for testing

### Packages that helped
* Sequelize for ORM management
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
* Chrono-node is a good NLP parser that extracts date and times
https://github.com/wanasit/chrono
* Passport and sequelize tutorial
https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
* Chai-datetime plugin to help test time equality http://chaijs.com/plugins/chai-datetime/
* helper-moment is a good date time parser for SQL datetime
https://github.com/helpers/handlebars-helper-moment

### Test Case Coverage
Search for Time and Clashes
* Normal
Passed
* for a booked time slot of 2-6
* searched for 2-4
* searched for 1-3
* searched for 4-8
Failed
* Negative
* searched for 1-2
Passed
Failed
* Edge
Passed
Failed

### Solved bugs
* join wedding party at Raffles 'this Sunday' at 9pm results in 'last Sunday' because NLP assumes Sunday is start of week
* no AM/PM in user input results in AM by default. Added logic to only push to PM between 1-4. All else should be AM.

### Unsolved-challenges
* Recurring every June doesn't trigger yearly event (needs the keyword birthday or anniversary)
* Recurring every Tuesday doesn't trigger weekly event (needs the keyword week)
* Recurring every day from 2 to 4pm doesn't seem to pickup time
* to recognise 'for 20mins'
* sequential
* fix bug where 2 to 4am defaults to 14:00 to 4:00 coz of AM PM defaulting
* enable search to happen in NLP will help resolve the no time problem (both will query for 12 noon)
* fix interface
* modularise the nlp function into separate file?
* to not change page when parsing text just to show a form
* parsing text to numbers for time
* saying night does not equate PM
* saying noon does nothing, midnight
* last day of the month nothing
