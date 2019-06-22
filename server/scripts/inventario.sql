/* Inventario*/
 
 /* Inventario por detalle_compra_cliente*/
select mi.nombre_mineral as mineral, pe.nombre_presentacion, cliente.cantidad
from   mineral mi, mineral_presentacion mp, presentacion pe,
(select sum (i.cantidad) as cantidad, dc.fk_mineral_presentacion  as mpc 
from inventario i, detalle_compra_cliente dc
where i.fk_detalle_compra_cliente = dc.id_detalle_compra_cliente
group by dc.fk_mineral_presentacion) as cliente										
where mi.id_mineral = mp.fk_mineral
and pe.id_presentacion = mp.fk_presentacion
and (mp.id_mineral_presentacion = cliente.mpc);

 /* Inventario por detalle_compra_aliado*/

select mi.nombre_mineral as mineral, pe.nombre_presentacion, aliado.cantidad
from   mineral mi, mineral_presentacion mp, presentacion pe,
(select sum (i.cantidad) as cantidad, da.fk_mineral_presentacion  as mpa
from inventario i, detalle_compra_aliado da
where i.fk_detalle_compra_aliado = da.id_detalle_compra_aliado
group by da.fk_mineral_presentacion) as aliado										
where mi.id_mineral = mp.fk_mineral
and pe.id_presentacion = mp.fk_presentacion
and (mp.id_mineral_presentacion = aliado.mpa);
