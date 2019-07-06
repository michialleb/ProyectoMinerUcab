/*EMPRESA ALIADA A LA QUE SE REALIZARON MAS COMPRAS*/
select e.nombre_empresa
from compra_aliado c, empresa_aliada e
where c.fk_empresa_aliada=e.id_empresa_aliada
group by c.fk_empresa_aliada, e.nombre_empresa
having count(c.fk_empresa_aliada)in (select max (x.total)
									 from (select count(p.fk_empresa_aliada) as total
										   from compra_aliado p
										  group by p.fk_empresa_aliada) as x)

/**/
select a.nombre_empresa, count(c.fk_empresa_aliada) max
from compra_aliado c, empresa_aliada a
where c.fk_empresa_aliada=a.id_empresa_aliada
group by c.fk_empresa_aliada, a.nombre_empresa
having count (c.fk_empresa_aliada)=(select max (x.total)
						          from (select count (p.fk_empresa_aliada) as total
								  from compra_aliado p
								  group by p.fk_empresa_aliada) as x);
								  
								  