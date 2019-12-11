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

--Another way to order 
select p.ProductName, od.Quantity, p.UnitPrice, * from [Order] as o
join OrderDetail as od
    on o.id = od.OrderId
join product as p
    on od.productId = p.id;

--join product unit price as Price 
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

--join supplier company name as SoldBy
select o.id as OrderNumber
, p.ProductName
, od.Quantity
, p.UnitPrice as Price
, (od.Quantity * p.UnitPrice) as LineTotal
, s.CompanyName as SoldBy
from [order] as o
join orderdetail as od
    on o.id = od.OrderId
join product as p
    on od.ProductId = p.Id
join supplier as s
    on s.Id = p.SupplierId;

select distinct c.id, c.CompanyName
from customer as c
join [order] as o on c.id = o.customerId
order by c.id; --16589 (90 unique)

-- all the customer even if they have no order
select c.id, c.companyName as Customer, o.Id
from customer as c
left join [order] as o on c.id = o.customerId
order by c.id;

select * from [order]
-- delete from [order]
where customerId = 'ALFKI'