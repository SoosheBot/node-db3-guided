--One way of ordering a database
select (e.firstName || ' ' || e.lastName) as SoldBy
    ,o.id 
    ,o.CustomerId as Customer
    ,o.ShipCountry as ShippedTo
    , c.CompanyName as OrderedBy
from [order] as o
join employee as e 
    on o.EmployeeId = e.id
join customer as c 
    on o.CustomerId = c.id;

select p.ProductName, od.Quantity, p.UnitPrice, * from [Order] as o
join OrderDetail as od
    on o.id = od.OrderId
join product as p
    on od.productId = p.id;

    select o.id as OrderNumber
, p.ProductName
, od.Quantity
, p.UnitPrice as Price
, (od.Quantity * p.UnitPrice) as LineTotal
from [order] as o
join orderdetail as od
    on o.id = od.OrderId
join product as p
    on od.ProductId = p.Id;