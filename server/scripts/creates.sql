create table Lugar (
    id_lugar serial,
    nombre_lugar varchar (300) not null,
    tipo_lugar varchar (300) not null,
    fk_lugar integer,
    constraint fk_lugar_lugar foreign key (fk_lugar) 
    references Lugar (id_lugar),
    constraint pk_id_lugar primary key (id_lugar));
alter sequence lugar_id_lugar_seq restart with 1;

CREATE TABLE empresa_aliada (
     id_empresa_aliada SERIAL,
     nombre_empresa VARCHAR(300) NOT NULL,
     rif bigint,
     fecha_creacion_empresa DATE,
     descripcion_empresa VARCHAR(300),
	 correo_empresa varchar(100),
	 telefono_empresa bigint,
     fk_lugar integer NOT NULL,
     CONSTRAINT fk_empresa_aliada_lugar FOREIGN KEY (fk_Lugar)
     REFERENCES Lugar (id_lugar),
     CONSTRAINT pk_id_empresa_aliada PRIMARY KEY (id_empresa_aliada)
);
alter sequence empresa_aliada_id_empresa_aliada_seq restart with 1;
create table Presentacion(
	id_presentacion serial,
	nombre_presentacion varchar(300) not null,
	constraint pk_id_presentacion primary key (id_presentacion));
alter sequence presentacion_id_presentacion_seq restart with 1;
create table Mineral(
    id_mineral serial,
    nombre_mineral varchar (50) not null,
    valor_economico varchar (10) not null,
    descripcion_mineral varchar (300) ,
    fecha_ini_explotacion date ,
    fecha_nacionalizacion date ,
    tipo_mineral varchar(50) not null,
    constraint pk_mineral primary key (id_mineral),
	constraint check_valor_economico check 
	(valor_economico in ('Bajo','Medio','Alto')),
    constraint check_tipo_mineral check 
	(tipo_mineral in ('Metalico','No metalico'))
);
alter sequence mineral_id_mineral_seq restart with 1;
CREATE TABLE Mineral_presentacion(
    id_mineral_presentacion serial,
    costo real not null,
    fk_presentacion integer not null,
    fk_mineral integer not null,
    CONSTRAINT pk_mineral_presentacion PRIMARY KEY (id_mineral_presentacion),
    CONSTRAINT fk_presentacion_mineral FOREIGN KEY (fk_presentacion) 
    REFERENCES Presentacion(id_presentacion) on delete cascade ,
    CONSTRAINT fk_mineral_presentacion FOREIGN KEY (fk_mineral) 
    REFERENCES Mineral(id_mineral) on delete cascade
);
alter sequence mineral_presentacion_id_mineral_presentacion_seq restart with 1;
CREATE TABLE tipo_status(
     id_tipo_status SERIAL,
     nombre_tipo_status VARCHAR(300) NOT NULL,
     CONSTRAINT pk_id_tipo_status PRIMARY KEY (id_tipo_status)
);
alter sequence tipo_status_id_tipo_status_seq restart with 1;
CREATE TABLE Empresa (
    id_cliente serial,
    rif bigint NOT NULL UNIQUE,
    nombre_empresa VARCHAR(50) NOT NULL,
	correo_empresa varchar(100),
	telefono_empresa bigint,
    FK_Lugar INTEGER NOT NULL,
    CONSTRAINT fk_empresa_lugar FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_lugar),
    CONSTRAINT pk_id_empresa PRIMARY KEY(id_cliente)
    );
alter sequence empresa_id_cliente_seq restart with 1;
    CREATE TABLE Persona (
    id_cliente serial,
    cedula_identidad integer NOT NULL UNIQUE,
    nombre_persona VARCHAR(50) NOT NULL,
    apellido_persona VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL, 
	correo_persona varchar(100),
	telefono_persona bigint,
    sexo CHAR(1) NOT NULL,
    FK_Lugar INTEGER NOT NULL, 
    CONSTRAINT fk_persona_lugar FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_Lugar),
    CONSTRAINT check_sexo_pers CHECK(sexo in('M','F')), 
    CONSTRAINT pk_id_persona PRIMARY KEY(id_cliente)
    );
alter sequence persona_id_cliente_seq restart with 1;
CREATE TABLE Compra_Cliente (
     id_compra_cliente serial,
      fecha_compra DATE NOT NULL,
      monto_total_compra real NOT NULL,
	  cantidad real NOT NULL,
      FK_Empresa integer,
      FK_Persona integer,
      fk_tipo_status integer not null,
	  fk_mineral_presentacion integer not null,
      CONSTRAINT pk_id_compra_cliente PRIMARY KEY(id_compra_cliente),
      CONSTRAINT FK_compra_cliente_empresa FOREIGN KEY(FK_Empresa)  
      REFERENCES Empresa(id_cliente) on delete cascade,
      CONSTRAINT FK_compra_cliente_persona FOREIGN KEY(FK_Persona) 
      REFERENCES Persona(id_cliente) on delete cascade,
	  CONSTRAINT FK_min_pre_comp_cli FOREIGN KEY(FK_mineral_presentacion) 
      REFERENCES Mineral_Presentacion(id_mineral_presentacion) on delete cascade ,
      CONSTRAINT FK_compra_cliente_status FOREIGN KEY(fk_tipo_status) 
      REFERENCES tipo_status(id_tipo_status)
      );

alter sequence compra_cliente_id_compra_cliente_seq restart with 1;


create table Yacimiento (
    id_yacimiento serial,
    nombre_yacimiento varchar (50) not null UNIQUE,
    fk_lugar integer not null,
    fk_tipo_status integer not null,
    kilometros real not null,
    constraint pk_id_yacimiento primary key (id_yacimiento),
    constraint fk_yacimiento_lugar foreign key (fk_lugar) 
    references Lugar (id_lugar),
    constraint fk_status_yacimiento foreign key (fk_tipo_status) 
    references tipo_status (id_tipo_status)
    );
alter sequence yacimiento_id_yacimiento_seq restart with 1;

	CREATE TABLE proyecto (
     id_proyecto SERIAL,
     nombre_proyecto VARCHAR(30) NOT NULL UNIQUE,
     duracion_proyecto INTEGER NOT NULL,
     fk_yacimiento INTEGER,
     fk_tipo_status integer not null,
     CONSTRAINT pk_id_proyecto PRIMARY KEY (id_proyecto),
     CONSTRAINT fk_yacimiento FOREIGN KEY (fk_yacimiento)
     REFERENCES Yacimiento (id_yacimiento) on delete cascade ,
     CONSTRAINT fk_tipo_status FOREIGN KEY (fk_tipo_status)
     REFERENCES Tipo_Status (id_tipo_status));

alter sequence proyecto_id_proyecto_seq restart with 1;
CREATE TABLE compra_aliado (
     id_compra_aliado SERIAL,
     fecha_compra_aliado DATE NOT NULL,
     cantidad real NOT NULL,
     monto_total real NOT NULL,
     fk_empresa_aliada INTEGER NOT NULL ,
     fk_proyecto INTEGER ,
     fk_tipo_status integer not null,
	 fk_mineral_presentacion INTEGER not null,
      CONSTRAINT pk_compra_aliado PRIMARY KEY (id_compra_aliado),
     CONSTRAINT fk_empresa_compra_aliado FOREIGN KEY (fk_empresa_aliada)
     REFERENCES empresa_aliada (id_empresa_aliada) on delete cascade,
     CONSTRAINT fk_proyecto_compra_aliado FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto),
	 CONSTRAINT fk_mineral_presentacion_com_al FOREIGN KEY (fk_mineral_presentacion)
     REFERENCES Mineral_presentacion(id_mineral_presentacion),
     CONSTRAINT fk_status_compra_aliado FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status(id_tipo_status)
);

alter sequence compra_aliado_id_compra_aliado_Seq restart with 1;
/*CREATE TABLE detalle_compra_aliado (
     id_detalle_compra_aliado SERIAL,
     cantidad real NOT NULL,
     precio real NOT NULL,
     fk_compra_aliado INTEGER not null,
     fk_mineral_presentacion INTEGER not null,
     CONSTRAINT pk_detalle_compra_aliado PRIMARY KEY (id_detalle_compra_aliado),
     CONSTRAINT fk_compra_aliado_detalle FOREIGN KEY (fk_compra_aliado)
     REFERENCES compra_aliado (id_compra_aliado),
     CONSTRAINT fk_mineral_presentacion_en_detalle FOREIGN KEY (fk_mineral_presentacion)
     REFERENCES Mineral_presentacion(id_mineral_presentacion)
);*/


/*detalle compra aliado y compra cliente*/




CREATE TABLE Cargo (
    id_cargo serial,
    tipo_cargo VARCHAR(100) NOT NULL,
    salario_empleado real,
    CONSTRAINT pk_id_cargo PRIMARY KEY(id_cargo)
    );

alter sequence cargo_id_cargo_seq restart with 1;

CREATE TABLE Permiso (
    id_permiso serial,
    nombre_permiso VARCHAR(70) NOT NULL,
    descripcion_permiso VARCHAR(225),
    CONSTRAINT pk_id_permiso PRIMARY KEY(id_permiso)
    );

alter sequence permiso_id_permiso_seq restart with 1;
CREATE TABLE Rol (
    id_rol serial,
    tipo_rol VARCHAR(70) NOT NULL,
    descripcion_rol VARCHAR(225), 
    CONSTRAINT pk_id_rol PRIMARY KEY(id_rol)
    );
alter sequence rol_id_rol_seq restart with 1;
CREATE TABLE Permiso_Rol (
    id_permiso_rol serial,
    FK_Permiso integer,
    FK_Rol integer,
    CONSTRAINT pk_id_perm_rol PRIMARY KEY(id_permiso_rol),
    CONSTRAINT fk_perm_rol_permiso FOREIGN KEY(FK_Permiso) 
    REFERENCES Permiso(id_Permiso),
    CONSTRAINT fk_perm_rol_rol FOREIGN KEY(FK_Rol) 
    REFERENCES Rol(id_rol)
    );

alter sequence permiso_rol_id_permiso_rol_seq restart with 1;


CREATE TABLE Empleado (
    id_empleado serial,
    cedula_identidad integer NOT NULL UNIQUE,
    nombre_empleado VARCHAR(50) NOT NULL,
    apellido_empleado VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL, 
    sexo CHAR(1) NOT NULL,
	correo_empleado varchar(100),
	telefono_empleado bigint,
    FK_Lugar INTEGER NOT NULL, 
    fk_cargo integer not null,
    fk_tipo_status integer,
    CONSTRAINT fk_empleado_status foreign key (fk_tipo_status)
    REFERENCES tipo_status (id_tipo_status),
    CONSTRAINT fk_lugar_empleado FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_lugar),
    CONSTRAINT check_sexo_emp CHECK(sexo in('M','F')), 
    CONSTRAINT pk_id_empleado PRIMARY KEY(id_empleado),
    CONSTRAINT fk_cargo_empleado FOREIGN KEY (fk_cargo)
    REFERENCES cargo(id_cargo)
	
    );
	
alter sequence empleado_id_empleado_seq restart with 1;


CREATE TABLE Usuario (
    id_usuario serial,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(15) NOT NULL,
    FK_Cliente_Persona integer ,
    FK_Cliente_Empresa integer ,
    FK_Empleado integer,
    FK_Rol integer NOT NULL,
    CONSTRAINT pk_id_usuario PRIMARY KEY(id_usuario),
    CONSTRAINT fk_usuario_empleado FOREIGN KEY (FK_empleado)
    REFERENCES Empleado (id_empleado),
    CONSTRAINT fk_usuario_cliente_empresa FOREIGN KEY (FK_Cliente_Empresa)
    REFERENCES Empresa (id_cliente),
    CONSTRAINT fk_usuario_cliente_persona FOREIGN KEY (FK_Cliente_Persona)
    REFERENCES Persona (id_cliente),
    CONSTRAINT fk_rol_usuario FOREIGN KEY (FK_Rol) 
    REFERENCES Rol (id_rol)
    );

alter sequence usuario_id_usuario_seq restart with 1;
CREATE TABLE Horario (
    id_horario serial,
    hora_inicio time NOT NULL,
    hora_salida time NOT NULL,
    dia_de_semana VARCHAR(10) NOT NULL, 
    CONSTRAINT pk_id_horario PRIMARY KEY(id_horario),
    CONSTRAINT check_dia CHECK (dia_de_semana in ('Lunes', 'Martes','Miercoles','Jueves',
    'Viernes','Sabado','Domingo'))
    );

alter sequence horario_id_horario_seq restart with 1;
    CREATE TABLE etapa_explotacion (
     id_etapa SERIAL,
     nombre_etapa VARCHAR(30) NOT NULL,
     duracion_etapa INTEGER NOT NULL,
     descripcion_etapa VARCHAR(40),
     costo_etapa real NOT NULL ,                         /*not null?*/
     numero_etapa INTEGER NOT NULL,
     fk_proyecto INTEGER NOT NULL,
     fk_tipo_status INTEGER NOT NULL,
     CONSTRAINT pk_id_etapa_explotacion PRIMARY KEY (id_etapa),
     CONSTRAINT fk_proyecto_etapa FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto) on delete cascade,
     CONSTRAINT fk_tipo_status_etapa FOREIGN KEY(fk_tipo_status)
     REFERENCES tipo_status(id_tipo_status)
);

alter sequence etapa_explotacion_id_etapa_seq restart with 1;
create table Fase (
   id_fase  serial,
   numero_fase integer not null,
   nombre_fase  varchar(200) not null,
   descripcion_fase varchar (100),
   duracion_fase    integer not null,
   costo_fase   real not null,
   fecha_inicio_fase date ,
   fecha_final_fase date ,
   fk_etapa_explotacion integer,
   fk_tipo_status INTEGER NOT NULL,
   constraint pk_fase primary key (id_fase),
   constraint fk_exploracion_etapa foreign key (fk_etapa_explotacion)
   references etapa_explotacion  (id_etapa) on delete cascade ,
   CONSTRAINT fk_tipo_status_fase FOREIGN KEY(fk_tipo_status)
     REFERENCES tipo_status(id_tipo_status)
);

alter sequence fase_id_fase_seq restart with 1;
CREATE TABLE Cargo_Fase(
    id_cargo_fase serial,
    cantidad integer not null,
    costo real ,                            /*ver*/
    FK_Cargo integer not null,
    FK_Fase integer not null,
    CONSTRAINT pk_cargo_fase PRIMARY KEY(id_cargo_fase),
    CONSTRAINT fk_cargo_en_fase FOREIGN KEY (FK_Cargo)
    REFERENCES Cargo(id_cargo) on delete cascade, 
     CONSTRAINT fk_fase_en_cargos FOREIGN KEY (FK_Fase)
    REFERENCES Fase(id_fase) on delete cascade
);
alter sequence Cargo_Fase_id_cargo_fase_seq restart with 1;
CREATE TABLE Empleado_Fase_Cargo(
    id_empleado_cargo_fase serial,
    FK_Empleado integer not null,
    FK_Cargo_Fase integer not null,
    CONSTRAINT pk_empleado_cargo_fase PRIMARY KEY(id_empleado_cargo_fase),
    CONSTRAINT fk_empleado_en_fase_cargo FOREIGN KEY (FK_Empleado)
    REFERENCES Empleado(id_empleado) on delete cascade , 
    CONSTRAINT fk_cargos_de_Fase FOREIGN KEY (FK_Cargo_Fase)
    REFERENCES Cargo_Fase(id_cargo_fase) on delete cascade
);

alter sequence Empleado_Fase_Cargo_id_empleado_cargo_fase_seq restart with 1;
CREATE TABLE Horario_empleado(
    id_horario_empleado serial,
    FK_horario integer not null,
    FK_empl_horario_fase integer not null,
    CONSTRAINT pk_horario_empl PRIMARY KEY(id_horario_empleado),
    CONSTRAINT fk_empl_cargo_fase_horario_ FOREIGN KEY (FK_empl_horario_fase) 
    REFERENCES Empleado_Fase_Cargo (id_empleado_cargo_fase),
    CONSTRAINT fk_horario_de_emp_fase FOREIGN KEY (FK_horario) 
    REFERENCES Horario(id_horario)
);


alter sequence Empleado_Fase_Cargo_id_empleado_cargo_fase_seq restart with 1;

CREATE TABLE Mineral_Empresa (
        id_mineral_empresa serial,
        FK_Mineral_presentacion integer,
        FK_Empresa_Aliada integer,
        CONSTRAINT pk_min_empr PRIMARY KEY(id_mineral_empresa),
        CONSTRAINT FK_mineral_pres_empresa FOREIGN KEY (FK_Mineral_presentacion) 
        REFERENCES Mineral_presentacion(id_mineral_presentacion) on delete cascade,
        CONSTRAINT FK_mineral_empresa_aliada FOREIGN KEY (FK_Empresa_Aliada) 
        REFERENCES empresa_aliada(id_empresa_aliada) on delete cascade

        );
        alter sequence mineral_empresa_id_mineral_empresa_seq restart with 1;




                                                                    /*revisar*/
CREATE TABLE Compra_cliente_proyecto(
    id_compra_cliente_proyecto serial,
    fk_compra_cliente integer ,  /* not null*/
    fk_proyecto integer,
    CONSTRAINT pk_compra_cliente_proyecto PRIMARY KEY(id_compra_cliente_proyecto),
    CONSTRAINT FK_compra_cliente FOREIGN KEY(fk_compra_cliente)
    REFERENCES Compra_Cliente(id_compra_cliente)  on delete cascade,
    CONSTRAINT FK_proyecto FOREIGN KEY(fk_proyecto) 
    REFERENCES proyecto(id_proyecto) on delete cascade
);
      
alter sequence compra_cliente_proyecto_id_compra_cliente_proyecto_seq restart with 1;
 

 CREATE TABLE pago (
     id_pago SERIAL,
     fecha_pago DATE NOT NULL,
     monto_total_pagado real NOT NULL,
     fk_compra_cliente INTEGER NOT NULL,
     fk_tipo_pago integer not null,
     CONSTRAINT pk_id_pago PRIMARY KEY (id_pago),
     CONSTRAINT fk_compra_cliente_pago FOREIGN KEY (fk_compra_cliente)
     REFERENCES Compra_Cliente(id_compra_cliente),
     CONSTRAINT fk_tipo_pago_pago FOREIGN KEY (fk_tipo_pago)
     REFERENCES Tipo_pago (id_tipo_pago)
);

alter sequence pago_id_pago_seq restart with 1;
create table Tipo_Pago(
    id_tipo_pago serial,
    tipo varchar (30) not null,
    banco varchar(50) not null,
    constraint pk_id_tipo_pago primary key (id_tipo_pago),
    constraint  tipo_pago check (tipo in ('Transferencia','Tarjeta_Credito','Tarjeta_Debito'))
);

alter sequence tipo_pago_id_tipo_pago_seq restart with 1;


/*CREATE TABLE tipo_pago_banco (
     id_tipo_pago_banco SERIAL,
     fk_tipo_pago INTEGER,
     fk_banco INTEGER,
     CONSTRAINT pk_id_tipo_pago_banco PRIMARY KEY (id_tipo_pago_banco,fk_tipo_pago,fk_banco),
     CONSTRAINT fk_tipo_pago_tipo_banco FOREIGN KEY (fk_tipo_pago)
     REFERENCES tipo_pago (id_tipo_pago),
     CONSTRAINT fk_banco_tipo_pago FOREIGN KEY (fk_banco)
     REFERENCES banco (id_banco)
);*/


create table Mineral_Mineral (
  id_mineral_mineral serial,
  fk_mineral integer,
  fk_mineral_comp integer,
  cantidad real not null,
  constraint pk_id_mineral primary key (id_mineral_mineral),
  constraint fk_mineral_n_a_m foreign key (fk_mineral)
  references Mineral(id_mineral),
  constraint fk_mineral_n_a_m_c foreign key (fk_mineral_comp)
  references Mineral(id_mineral)
);

alter sequence mineral_mineral_id_mineral_mineral_seq restart with 1;



create table Mineral_Yacimiento(
    id_mineral_yacimiento serial,
    cantidad real not null,
    fk_mineral integer not null,
    fk_yacimiento integer not null,
    constraint pk_mineral_yacimiento primary key (id_mineral_yacimiento),
    constraint fk_mineral_en_yacimiento foreign key (fk_mineral)
    references Mineral(id_mineral) on delete cascade ,
    constraint fk_yacimiento_con_minerales foreign key (fk_yacimiento)
    references Yacimiento (id_yacimiento) on delete cascade 
    );
	
alter sequence mineral_yacimiento_id_mineral_yacimiento_seq restart with 1;






 
/*CREATE TABLE Empleado_Fase(
    id_empleado_fase serial,
    FK_Empleado integer,
    FK_Fase integer,
    FK_Fase_Etapa integer,
    CONSTRAINT pk_id_empleadoo_fase PRIMARY KEY(id_empleado_fase,FK_Empleado, FK_Fase, FK_Fase_Etapa),
    CONSTRAINT fk_empleado_ FOREIGN KEY(FK_Empleado) 
    REFERENCES Empleado (id_empleado),
    CONSTRAINT fk_fase_ FOREIGN KEY(FK_Fase, FK_Fase_Etapa) 
    REFERENCES Fase (id_fase, fk_etapa_explotacion)
    );*/


CREATE TABLE maquinaria (
    id_maquinaria serial,
    cantidad integer not null,
    nombre_maquinaria varchar(100) not null,
    costo_maquinaria real not null,
    CONSTRAINT pk_id_maquinaria PRIMARY KEY (id_maquinaria)
);

alter sequence maquinaria_id_maquinaria_seq restart with 1;
CREATE TABLE Maquinaria_Fase (
    id_maquinaria_fase serial,
    cantidad integer not null,
	costo real not null,
    fk_fase integer not null,
    fk_maquinaria integer not null,
    CONSTRAINT pk_id_maq_fase PRIMARY KEY (id_maquinaria_fase),
    CONSTRAINT fk_fase2_maq FOREIGN KEY (fk_fase)
    REFERENCES fase(id_fase) on delete cascade ,
    CONSTRAINT fk_fase_maq2 FOREIGN KEY (fk_maquinaria)
    REFERENCES maquinaria(id_maquinaria)
);

alter sequence maquinaria_fase_id_maquinaria_fase_seq restart with 1;
CREATE TABLE Maquinaria_Activa(
    id_maquinaria_activa serial,
    fk_fase integer not null,
    fk_maquinaria integer not null,
    fk_tipo_status integer not null,
     CONSTRAINT fk_fase2_maq_act FOREIGN KEY (fk_fase)
     REFERENCES fase(id_fase) on delete cascade,
     CONSTRAINT fk_fase_maq2 FOREIGN KEY (fk_fase)
     REFERENCES maquinaria(id_maquinaria) on delete cascade ,
     CONSTRAINT fk_status_maq_act FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status(id_tipo_status)
);
alter sequence maquinaria_activa_id_maquinaria_activa_seq restart with 1;


///////////////////////////////////// VISTAS //////////////////////////////////////////////////

create view usuariospersonas as (
select u.nombre_usuario as usuario, u.contraseña , concat (e.nombre_empleado,' ', e.apellido_empleado) as nombre,
	   r.tipo_rol, e.cedula_identidad as cedula, u.id_usuario
from usuario u inner join empleado e on u.fk_empleado = e.id_empleado 
	inner join rol r on u.fk_rol = r.id_rol
where u.fk_empleado is not null 
union all
select u.nombre_usuario as usuario, u.contraseña , concat (c.nombre_persona,' ', c.apellido_persona) as nombre,
	   r.tipo_rol, c.cedula_identidad as cedula, u.id_usuario
from usuario u inner join persona c on u.fk_cliente_persona = c.id_cliente
	inner join rol r on u.fk_rol = r.id_rol
	where u.fk_cliente_persona is not null 
)

create view personas_Sistema as(
select concat ('Empleado: ',e.nombre_empleado ,' ',e.apellido_empleado) as nombre, 
	e.cedula_identidad as cedula 
	from empleado e
union all
select concat ('Cliente: ',c.nombre_persona ,' ',c.apellido_persona) as nombre, 
	c.cedula_identidad as cedula 
	from persona c
)