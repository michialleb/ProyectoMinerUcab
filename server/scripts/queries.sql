/*inventario query*/
select todo.nom,todo.pre, sum(todo.sum)
from 
((Select M.nombre_mineral as nom, P.nombre_presentacion as pre, SUM(dca.Cantidad)
FROM Mineral M 
INNER JOIN Mineral_Presentacion MP ON M.id_mineral = MP.fk_mineral
INNER JOIN Presentacion P ON P.ID_PRESENTACION = MP.FK_PRESENTACION
INNER JOIN Compra_aliado DCa ON MP.id_mineral_presentacion = DCa.fk_mineral_presentacion
Group BY M.nombre_mineral, P.nombre_presentacion)
union all
(Select M.nombre_mineral as nom, P.nombre_presentacion as pre, (-1)*SUM(dcc.Cantidad)
FROM Mineral M 
INNER JOIN Mineral_Presentacion MP ON M.id_mineral = MP.fk_mineral
INNER JOIN Presentacion P ON P.ID_PRESENTACION = MP.FK_PRESENTACION
INNER JOIN Compra_cliente DCc ON MP.id_mineral_presentacion = DCc.fk_mineral_presentacion
Group BY M.nombre_mineral, P.nombre_presentacion) ) as todo 
group by todo.nom,todo.pre



/*selecciona la ultima fecha de cambio de yacimiento*/
select nombre_tipo_status 
from tipo_status
 where id_tipo_status=(
     select fk_tipo_status
    from status_yacimiento 
    where fecha_cambio=(
        select fecha_cambio 
        from status_yacimiento 
        order by fecha_cambio 
        limit 1));


/* query: consultar estado y municipio de una parroquia dada*/
select uno.nombre_lugar,dos.nombre_lugar,tres.nombre_lugar
from lugar uno,lugar dos,lugar tres
where tres.fk_lugar=dos.id_lugar and
tres.id_lugar=367 and dos.fk_lugar=uno.id_lugar ;
/*dado un municipio mostrar todas sus parroquias*/
select dos.nombre_lugar
from lugar uno,lugar dos
where dos.fk_lugar=uno.id_lugar and
uno.id_lugar=26;




