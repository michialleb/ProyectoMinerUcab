/*EMPRESA ALIADA A LA QUE SE REALIZARON MAS COMPRAS 1*/
select e.nombre_empresa, e.rif as rif
from compra_aliado c, empresa_aliada e
where c.fk_empresa_aliada=e.id_empresa_aliada
group by c.fk_empresa_aliada, e.nombre_empresa, e.rif 
having count(c.fk_empresa_aliada)in (select max (x.total)
									 from (select count(p.fk_empresa_aliada) as total
										   from compra_aliado p
										  group by p.fk_empresa_aliada) as x)


/*Inventario 10*/

select inventario.fecha, inventario.nom, inventario.pre, inventario.cantidad
from ((SELECT  M.nombre_mineral  AS nom, P.nombre_presentacion  AS pre, (dca.Cantidad) as cantidad, dca.fecha_compra_aliado as fecha
            FROM Mineral M  
            INNER JOIN Mineral_Presentacion MP 
            ON   M.id_mineral  = MP.fk_mineral 
            INNER JOIN Presentacion P 
            ON P.ID_PRESENTACION =  MP.FK_PRESENTACION  
            INNER JOIN Compra_aliado DCA  
            ON MP.id_mineral_presentacion = DCa.fk_mineral_presentacion 
			where dca.fecha_compra_aliado between  '01-01-2014' and '12-31-2019'
			order by dca.fecha_compra_aliado)
            UNION ALL  
            (SELECT M.nombre_mineral  AS nom, P.nombre_presentacion AS pre, (-1)*(dcc.Cantidad) as cantidad, dcc.fecha_compra as fecha
            FROM Mineral M  
            INNER JOIN Mineral_Presentacion MP 
            ON  M.id_mineral = MP.fk_mineral  
            INNER JOIN Presentacion P
            ON P.ID_PRESENTACION =  MP.FK_PRESENTACION  
            INNER JOIN Compra_cliente DCC 
            ON MP.id_mineral_presentacion  = DCC.fk_mineral_presentacion
			where dcc.fecha_compra between  '01-01-2014' and '12-31-2019'
			order by dcc.fecha_compra) )as inventario
			
order by inventario.fecha asc
								  

/* 7.- Total de proyectos en los que trabajó un empleado por período de tiempo.*/
select nombre_empleado nombre , apellido_empleado apellido, y.cantidadProyecto cantidadProyectos
from empleado e,(select x.empleado,count(distinct x.proyecto) as cantidadProyecto
				 from (select distinct efc.fk_empleado as empleado, (select fk_proyecto from etapa_explotacion where id_etapa=f.fk_etapa_explotacion) as proyecto
	  					 from cargo_fase cf, fase f, empleado_fase_cargo efc
     					 where f.id_fase=cf.fk_fase
						 and f.fecha_inicio_fase between '05-2-2023' and '05-21-2023'
 					     and efc.fk_cargo_fase =cf.id_cargo_fase) as x, empleado e
				 where  49 in (x.empleado)
				 group by x.empleado) as y
where id_empleado=49;