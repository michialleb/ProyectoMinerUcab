select h.dia_de_semana, h.hora_inicio, h.hora_salida
from Horario h, horario_empleado he, empleado_fase_cargo efc
where he.fk_empl_horario_fase= (select efc.id_empleado_cargo_fase
							    from empleado_fase_cargo efc
							    where efc.fk_empleado =4)
and he.fk_horario=h.id_horario;