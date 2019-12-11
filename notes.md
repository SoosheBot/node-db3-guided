#Wednesday Warmup
In sqlite (Using the northwind database in node-db3-guided) -- You can get:

SELECT e.firstName
    , e.lastName
    , o.id
    , o.CustomerId
    , o.ShipCountry
    , c.CompanyName
FROM [Order] as o
JOIN Employee as e
    ON o.EmployeeId = e.id
JOIN Customer as c
    ON o.CustomerId = c.id;

By condensing this:
select employee.FirstName
, employee.LastName
, [Order].Id
, [Order].CustomerId
, [Order].ShipCountry from [Order]
join Customer on [Order].CustomerId = Customer.Id;

select EmployeeId from [Order];
select * from Employee;



#Joins
A `Foreign Key` is _a column on a table that references the primary key of another table_
....which means:
--A way to link an entry (a record or row) in one table to a record in another table!
OR...
--A `foreign key` is a column which pairs to another table's primary key showing the relationship between the rows
OR... (I like this definition the least tbh, b/c it is hella vague.)
--A `foreign key` is a column or group of columns in a relational database table that provides a link between data in two tables. It acts as a cross-reference between tables because it references the primary key of another table, thereby establishing a link between them.

## (Layers) Application Architecture

_Opinion_
For an API we normally have (at least) three layers:
- Routing (this is the `express` i stuff, the endpoints, the middleware) -> routers, middleware, etc
- Data Access (this is the Knex + SqLite||Postgres stuff) -> you can name it anything, but it is the 'models', like in your sprint challenge, with the action-model and project-model files...
- Business Logic (this makes your application unique) -> regular pure functions packed into a module
