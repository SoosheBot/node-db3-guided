You can get --
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

By condensing this --
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