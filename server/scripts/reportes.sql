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
								  
/* 5 Fases y Etapas de los proyectos que no han iniciado en un periodo de tiempo*/
select et.nombre_etapa , x.nombre_fase, x.numero_fase
from etapa_explotacion et,
(select f.nombre_fase as nombre_fase, f.numero_fase as numero_fase, f.id_fase id_fase, f.fk_etapa_explotacion id_etapa
from fase f, etapa_explotacion e, proyecto p
where e.fk_proyecto = p.id_proyecto
and   f.fk_etapa_explotacion = e.id_etapa
and exists ( select fa.id_fase
		     from fase fa, etapa_explotacion et
		     where  et.id_etapa = fa.fk_etapa_explotacion
		     and   	et.fk_proyecto = p.id_proyecto
		     and  	fa.fecha_inicio_fase is null
		     and  	fa.numero_fase =1
		     and    et.numero_etapa =1
		     and    fa.fecha_inicio_estimada between '2015-04-09' and '2015-05-20')) as x
where et.id_etapa = x.id_etapa
order by et.fk_proyecto, et.numero_etapa, x.numero_fase


/*7 - Total de proyectos en los que trabajó un empleado por período de tiempo.*/
select count(distinct et.fk_proyecto)
from empleado e, empleado_fase_cargo efc, fase f, etapa_explotacion et, cargo_fase cf
where e.cedula_identidad = 99952
and e.id_empleado = efc.fk_empleado
and efc.fk_cargo_fase= cf.id_cargo_fase
and cf.fk_fase = f.id_fase
and f.fk_etapa_explotacion =et.id_etapa
and f.fecha_inicio_fase between '1993-01-01' and '2028-01-01';

/* query de proyectos incompleto*/
select distinct y.fecha, x.costo, pro.nombre_proyecto
from (  select sum (f.costo_fase) as costo, p.nombre_proyecto as proyecto,
	    p.id_proyecto as id_p 
		from fase f, etapa_explotacion e, proyecto p
		where f.fk_etapa_explotacion = e.id_etapa
		and e.fk_proyecto = p.id_proyecto
		group by p.nombre_proyecto, p.id_proyecto) as x, (select fa.fecha_inicio_estimada as fecha, pr.nombre_proyecto as proyecto
														  from fase fa, etapa_explotacion et, proyecto pr
														   where fa.numero_fase=1 
						  							       and et.numero_etapa =1 
					                                	   and fa.fk_etapa_explotacion = et.id_etapa
														   and et.fk_proyecto= pr.id_proyecto
														  ) as y, proyecto pro
where pro.nombre_proyecto = x.proyecto
and  pro.nombre_proyecto = y.proyecto