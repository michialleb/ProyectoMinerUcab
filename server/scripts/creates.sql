create table Lugar (
  id_lugar serial,
  nombre_lugar varchar (50) not null,
  tipo_lugar varchar (30) not null,
  fk_lugar integer,
  constraint fk_lugar_lugar foreign key (fk_lugar)
  references Lugar (id_lugar),
  constraint pk_id_lugar primary key (id_lugar)
);

CREATE TABLE empresa_aliada (
     id_empresa_aliada SERIAL,
     nombre_empresa VARCHAR(30) NOT NULL,
     fecha_creacion_empresa DATE,
     descripcion_empresa VARCHAR(100),
     fk_lugar integer NOT NULL,
     CONSTRAINT fk_empresa_aliada_lugar FOREIGN KEY (fk_Lugar)
     REFERENCES Lugar (id_lugar),
     CONSTRAINT pk_id_empresa_aliada PRIMARY KEY (id_empresa_aliada)
);

create table Presentacion(
    id_presentacion serial,
    nombre_presentacion varchar(30) not null,
    constraint pk_id_presentacion primary key (id_presentacion)
);

CREATE TABLE tipo_status(
     id_tipo_status SERIAL,
     nombre_tipo_status VARCHAR(30) NOT NULL,
     CONSTRAINT pk_id_tipo_status PRIMARY KEY (id_tipo_status)
);


create table Inventario(
    numero serial,
    cantidad integer not null,
    constraint pk_inventario  primary key (numero)
);
create table Mineral_Metalico(
    id_mineral serial,
    nombre_mineral varchar (50) not null,
    valor_economico varchar (10) not null,
    costo_tonelada  integer not null,
    descripcion_mineral varchar (100) not null,
    fecha_ini_explotacion date not null,
    fecha_nacionalizacion date not null,
    fk_lugar integer not null,
    constraint pk_mineral_metalico primary key (id_mineral),
    constraint fk_lugar_inicio_mineral foreign key (fk_lugar)
    references Lugar (id_lugar),
	constraint check_valor_economico check 
	(valor_economico in ('Bajo','Medio','Alto'))
);

create table Mineral_NoMetalico(
    id_mineral serial,
    nombre_mineral varchar (50) not null,
    valor_economico varchar (10) not null,
    costo_tonelada  integer not null,
    descripcion_mineral varchar (100) not null,
    industria_dirigida varchar(50) not null,
    constraint pk_mineral_nometalico primary key (id_mineral),
	constraint check_valor_economico check 
	(valor_economico in ('Bajo','Medio','Alto'))
);

CREATE TABLE Cargo (
    id_cargo serial,
    tipo_cargo VARCHAR(15) NOT NULL,
    salario_empleado NUMERIC,
    CONSTRAINT pk_id_cargo PRIMARY KEY(id_cargo)
    );


CREATE TABLE Banco (
    id_Banco serial,
    nombre_banco VARCHAR(20) NOT NULL,
    CONSTRAINT pk_id_banco PRIMARY KEY(id_banco)
    );

CREATE TABLE Permiso (
    id_permiso serial,
    nombre_permiso VARCHAR(20) NOT NULL,
    descripcion_permiso VARCHAR(225),
    CONSTRAINT pk_id_permiso PRIMARY KEY(id_permiso)
    );

CREATE TABLE Rol (
    id_rol serial,
    tipo_rol VARCHAR(15) NOT NULL,
    descripcion_rol VARCHAR(225), 
    CONSTRAINT pk_id_rol PRIMARY KEY(id_rol)
    );

CREATE TABLE Permiso_Rol (
    id_permiso_rol serial,
    FK_Permiso integer,
    FK_Rol integer,
    CONSTRAINT pk_id_perm_rol PRIMARY KEY(id_permiso_rol,FK_Permiso,FK_Rol),
    CONSTRAINT fk_perm_rol_permiso FOREIGN KEY(FK_Permiso) 
    REFERENCES Permiso(id_Permiso),
    CONSTRAINT fk_perm_rol_rol FOREIGN KEY(FK_Rol) 
    REFERENCES Rol(id_Rol)
    );

CREATE TABLE Empresa (
    id_cliente serial,
    rif VARCHAR(11) NOT NULL UNIQUE,
    nombre_empresa VARCHAR(50) NOT NULL,
    FK_Lugar INTEGER NOT NULL,
    CONSTRAINT fk_empresa_lugar FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_lugar),
    CONSTRAINT pk_id_empresa PRIMARY KEY(id_cliente)
    );

    CREATE TABLE Persona (
    id_cliente serial,
    cedula_identidad integer NOT NULL UNIQUE,
    nombre_persona VARCHAR(50) NOT NULL,
    apellido_persona VARCHAR(50) NOT NULL,
    fecha_nacimiento TIMESTAMP NOT NULL, 
    sexo CHAR(1) NOT NULL,
    FK_Lugar INTEGER NOT NULL, 
    CONSTRAINT fk_persona_lugar FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_Lugar),
    CONSTRAINT check_sexo_pers CHECK(sexo in('M','F')), 
    CONSTRAINT pk_id_persona PRIMARY KEY(id_cliente)
    );

CREATE TABLE Empleado (
    id_empleado serial,
    cedula_identidad integer NOT NULL UNIQUE,
    nombre_empleado VARCHAR(50) NOT NULL,
    apellido_empleado VARCHAR(50) NOT NULL,
    fecha_nacimiento TIMESTAMP NOT NULL, 
    sexo CHAR(1) NOT NULL,
    FK_Cargo INTEGER NOT NULL,
    FK_Lugar INTEGER NOT NULL, 
    CONSTRAINT fk_cargo_empleado FOREIGN KEY (FK_Cargo)
    REFERENCES Cargo (id_cargo),
    CONSTRAINT fk_lugar_empleado FOREIGN KEY (FK_Lugar)
    REFERENCES Lugar (id_lugar),
    CONSTRAINT check_sexo_emp CHECK(sexo in('M','F')), 
    CONSTRAINT pk_id_empleado PRIMARY KEY(id_empleado)
    );


CREATE TABLE Usuario (
    id_usuario serial,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(15) NOT NULL,
    FK_Cliente_Persona integer UNIQUE,
    FK_Cliente_Empresa integer UNIQUE,
    FK_Empleado integer UNIQUE,
    FK_Rol integer NOT NULL,
    CONSTRAINT pk_id_usuario PRIMARY KEY(id_usuario),
    CONSTRAINT fk_usuario_empleado FOREIGN KEY (FK_empleado)
    REFERENCES Empleado (id_empleado),
    CONSTRAINT pk_usuario_cliente_empresa FOREIGN KEY (FK_Cliente_Empresa)
    REFERENCES Empresa (id_cliente),
    CONSTRAINT pk_usuario_cliente_persona FOREIGN KEY (FK_Cliente_Persona)
    REFERENCES Persona (id_cliente)
    );

CREATE TABLE Horario (
    id_horario serial,
    hora_inicio time NOT NULL,
    hora_salida time NOT NULL,
    dia_de_semana VARCHAR(10) NOT NULL, 
    CONSTRAINT pk_id_horario PRIMARY KEY(id_horario),
    CONSTRAINT check_dia CHECK (dia_de_semana in ('Lunes', 'Martes','Miercoles','Jueves',
    'Viernes','Sabado','Domingo'))
    );


CREATE TABLE Horario_Empleado (
    id_horario_empleado serial,
    FK_Empleado integer,
    FK_Horario integer, 
    CONSTRAINT pk_id_horario_empleado PRIMARY KEY(id_horario_empleado, FK_Empleado, FK_Horario),
    CONSTRAINT fk_horario_empleado_e FOREIGN KEY(FK_Empleado) 
    REFERENCES Empleado(id_empleado),
    CONSTRAINT fk_horario_empleado_h FOREIGN KEY(FK_Horario) 
    REFERENCES Horario(id_horario)
    );


CREATE TABLE Mineral_Empresa (
        id_mineral_empresa serial, 
        cantidad numeric NOT NULL,
        FK_Mineral_Metalico integer,
        FK_Mineral_No_Metalico integer,
        FK_Empresa_Aliada integer,
        FK_Presentacion integer NOT NULl,
        CONSTRAINT pk_id_min_empr PRIMARY KEY(id_mineral_empresa, FK_Empresa_Aliada),
        CONSTRAINT FK_mineral_metalico_empresa FOREIGN KEY (FK_Mineral_Metalico) 
        REFERENCES Mineral_Metalico(id_mineral),
        CONSTRAINT FK_mineral_no_metalico_empresa FOREIGN KEY (FK_Mineral_No_Metalico) 
        REFERENCES Mineral_NoMetalico(id_mineral),
        CONSTRAINT FK_mineral_empresa_aliada FOREIGN KEY (FK_Empresa_Aliada) 
        REFERENCES Empresa (id_cliente),
        CONSTRAINT FK_mineral_empresa_presentacion FOREIGN KEY (FK_Presentacion) 
        REFERENCES Presentacion(id_presentacion)
        );

CREATE TABLE Compra_Cliente (
     id_compra_cliente serial,
     fecha_compra TIMESTAMP NOT NULL,
      monto_total_compra numeric NOT NULL,
      FK_Empresa integer,
      FK_Persona integer,
      CONSTRAINT pk_id_compra_cliente PRIMARY KEY(id_compra_cliente),
      CONSTRAINT FK_compra_cliente_empresa FOREIGN KEY(FK_Empresa) 
      REFERENCES Empresa(id_cliente),
      CONSTRAINT FK_compra_cliente_persona FOREIGN KEY(FK_Persona) 
      REFERENCES Persona(id_cliente)
      );

      
 CREATE TABLE Detalle_Compra_Cliente (
        id_detalle_compra_cliente serial, 
        cantidad numeric NOT NULL,
        FK_Compra_Cliente integer,
        FK_Mineral_Metalico integer,
        FK_Mineral_No_Metalico integer,
        CONSTRAINT pk_id_detalle_compra_cliente PRIMARY KEY(id_detalle_compra_cliente, FK_Compra_Cliente),
        CONSTRAINT FK_detalle_compra_cliente_compra_cliente FOREIGN KEY(FK_Compra_Cliente)
        REFERENCES Compra_Cliente(id_compra_cliente)
     );

 CREATE TABLE pago (
     id_pago SERIAL,
     fecha_pago DATE NOT NULL,
     monto_total_pagado INTEGER NOT NULL,
     fk_compra_cliente INTEGER NOT NULL,
     CONSTRAINT pk_id_pago PRIMARY KEY (id_pago),
     CONSTRAINT fk_compra_cliente_pago FOREIGN KEY (fk_compra_cliente)
     REFERENCES compra_cliente (id_compra_cliente)
);


create table Tipo_Pago(
    id_tipo_pago serial,
    numero integer not null unique,
    concepto varchar (50),
    numero_confirmacion integer,
    tipo_tarjeta_credito varchar (15),
    fecha_vencimiento date,
    codigo_secreto integer,
    tipo varchar (30) not null,
    constraint pk_id_tipo_pago primary key (id_tipo_pago),
    constraint check_tipo_tarjeta_credito check (tipo_tarjeta_credito in ('Visa', 'MasterCard')),
    constraint  tipo_pago check (tipo in ('Transferencia','Tarjeta_Credito', 'Cheque', 'Tarjeta_Debito'))
);

CREATE TABLE pago_pago (
     id_pago_pago SERIAL,
     monto_total_pagado INTEGER NOT NULL,
     fk_tipo_pago INTEGER,
     fk_pago INTEGER,
     CONSTRAINT pk_id_pago_pago PRIMARY KEY (id_pago_pago,fk_tipo_pago,fk_pago),
     CONSTRAINT fk_tipo_pago_pago FOREIGN KEY (fk_tipo_pago)
     REFERENCES tipo_pago (id_tipo_pago),
     CONSTRAINT fk_pago_pago FOREIGN KEY (fk_pago)
     REFERENCES pago (id_pago)
);


CREATE TABLE tipo_pago_banco (
     id_tipo_pago_banco SERIAL,
     fk_tipo_pago INTEGER,
     fk_banco INTEGER,
     CONSTRAINT pk_id_tipo_pago_banco PRIMARY KEY (id_tipo_pago_banco,fk_tipo_pago,fk_banco),
     CONSTRAINT fk_tipo_pago_tipo_banco FOREIGN KEY (fk_tipo_pago)
     REFERENCES tipo_pago (id_tipo_pago),
     CONSTRAINT fk_banco_tipo_pago FOREIGN KEY (fk_banco)
     REFERENCES banco (id_banco)
);


create table Mineral_Mineral (
  id_mineral_mineral serial,
  fk_mineral_metalico integer,
  fk_mineral_no_metalico integer,
  constraint pk_id_mineral primary key (id_mineral_mineral),
  constraint fk_mineral_mineralmetalico foreign key (fk_mineral_metalico)
  references Mineral_Metalico (id_mineral),
  constraint fk_mineral_mineralnometalico foreign key (fk_mineral_no_metalico)
  references Mineral_NoMetalico (id_mineral)
);


create table Yacimiento (
    id_yacimiento serial,
    nombre_yacimiento varchar (50) not null,
    kilometros integer not null,
    fk_lugar integer not null,
    constraint pk_id_yacimiento primary key (id_yacimiento),
    constraint fk_yacimiento_lugar foreign key (fk_lugar)
    references Lugar (id_lugar)
);


create table Mineral_Yacimiento(
    id_mineral_yacimiento serial,
    cantidad integer not null,
    fk_mineral_metalico integer,
    fk_mineral_no_metalico integer,
    fk_yacimiento integer not null,
    fk_presentacion integer not null,
    constraint pk_id_mineral_yacimiento primary key (id_mineral_yacimiento, fk_yacimiento),
    constraint fk_mineral_metalico_yacimiento foreign key (fk_mineral_metalico)
    references Mineral_Metalico (id_mineral),
    constraint fk_mineral_no_metalico_yacimiento foreign key (fk_mineral_no_metalico)
    references Mineral_NoMetalico (id_mineral),
    constraint fk_mineral_yacimiento_presentacion foreign key (fk_presentacion)
    references Presentacion (id_presentacion),
	constraint fk_mineral_yacimiento foreign key (fk_yacimiento)
	references Yacimiento (id_yacimiento)
    );
	
	CREATE TABLE proyecto (
     id_proyecto SERIAL,
     nombre_proyecto VARCHAR(30) NOT NULL,
     duracion_proyecto INTEGER NOT NULL,
     fk_compra_cliente INTEGER UNIQUE,
     fk_mineral_yacimiento INTEGER ,
     fk_yacimiento INTEGER,
     CONSTRAINT pk_id_proyecto PRIMARY KEY (id_proyecto),
     CONSTRAINT fk_compra_cliente_proyecto FOREIGN KEY (fk_compra_cliente)
     REFERENCES compra_cliente (id_compra_cliente),
     CONSTRAINT fk_mineral_yacimiento_proyecto FOREIGN KEY (fk_mineral_yacimiento, fk_yacimiento)
     REFERENCES Mineral_Yacimiento (id_mineral_yacimiento, fk_yacimiento)

);


    CREATE TABLE etapa_explotacion (
     id_etapa SERIAL,
     nombre_etapa VARCHAR(30) NOT NULL,
     duracion_etapa INTEGER NOT NULL,
     descripcion_etapa VARCHAR(40),
     costo_etapa INTEGER NOT NULL ,
     numero_etapa INTEGER NOT NULL,
     fk_proyecto INTEGER NOT NULL,
     CONSTRAINT pk_id_etapa_explotacion PRIMARY KEY (id_etapa),
     CONSTRAINT fk_proyecto_etapa FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
);

create table Fase (
   id_fase  serial,
   numero_fase integer not null,
   nombre_fase  varchar(30) not null,
   descripcion_fase varchar (100),
   duracion_fase    integer not null,
   costo_fase   integer not null,
   fecha_inicio_fase date not null,
   fecha_final_fase date not null,
   fk_etapa_explotacion integer,
   constraint pk_fase primary key (id_fase, fk_etapa_explotacion),
   constraint fk_exploracion_etapa foreign key (fk_etapa_explotacion)
   references etapa_explotacion  (id_etapa)
);

 
CREATE TABLE Empleado_Fase(
    id_empleado_fase serial,
    FK_Empleado integer,
    FK_Fase integer,
    FK_Fase_Etapa integer,
    CONSTRAINT pk_id_empleadoo_fase PRIMARY KEY(id_empleado_fase,FK_Empleado, FK_Fase, FK_Fase_Etapa),
    CONSTRAINT fk_empleado_ FOREIGN KEY(FK_Empleado) 
    REFERENCES Empleado (id_empleado),
    CONSTRAINT fk_fase_ FOREIGN KEY(FK_Fase, FK_Fase_Etapa) 
    REFERENCES Fase (id_fase, fk_etapa_explotacion)
    );



CREATE TABLE compra_aliado (
     id_compra_aliado SERIAL,
     fecha_compra_aliado DATE NOT NULL,
     monto_total INTEGER NOT NULL,
     fk_empresa_aliada INTEGER NOT NULL,
     fk_proyecto INTEGER NOT NULL,
      CONSTRAINT pk_id_compra_aliado PRIMARY KEY (id_compra_aliado),
     CONSTRAINT fk_empresa_compra_aliado FOREIGN KEY (fk_empresa_aliada)
     REFERENCES empresa_aliada (id_empresa_aliada),
     CONSTRAINT fk_proyecto_compra_aliado FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
);

CREATE TABLE detalle_compra_aliado (
     id_detalle_compra_aliado SERIAL,
     cantidad INTEGER NOT NULL,
     precio INTEGER NOT NULL,
     fk_compra_aliado INTEGER,
     fk_mineral_metalico INTEGER,
     fk_mineral_no_metalico INTEGER,
     CONSTRAINT pk_id_detalle_compra_aliado PRIMARY KEY (id_detalle_compra_aliado, fk_compra_aliado ),
     CONSTRAINT fk_compra_aliado_detalle FOREIGN KEY (fk_compra_aliado)
     REFERENCES compra_aliado (id_compra_aliado),
     CONSTRAINT fk_mineral_metalico_compra_aliado FOREIGN KEY (fk_mineral_metalico)
     REFERENCES mineral_metalico (id_mineral),
     CONSTRAINT fk_mineral_no_metalico_compra_aliado FOREIGN KEY (fk_mineral_no_metalico)
     REFERENCES mineral_nometalico (id_mineral)
);


CREATE TABLE Detalle_Inventario (
       id_detalle_inventario serial,
       fecha TIMESTAMP NOT NULL,
       cantidad INTEGER NOT NULL,
       FK_Inventario integer,
       FK_Mineral_Metalico integer,
       FK_Mineral_No_Metalico integer,
       Fk_Detalle_Compra_Cliente integer UNIQUE,
       Fk_Detalle_Compra_Cliente_Cliente integer UNIQUE,
       Fk_Detalle_Compra_Aliado integer UNIQUE,
       Fk_Detalle_Compra_Aliado_Aliado integer UNIQUE,
       CONSTRAINT pk_id_detalle_inv PRIMARY KEY(id_detalle_inventario, FK_Inventario),
       CONSTRAINT FK_Detalle_inv_cliente FOREIGN KEY(Fk_Detalle_Compra_Cliente,Fk_Detalle_Compra_Cliente_Cliente)
       REFERENCES Detalle_Compra_Cliente(id_detalle_compra_cliente,FK_Compra_Cliente),
       CONSTRAINT FK_Detalle_inv_aliado FOREIGN KEY(Fk_Detalle_Compra_Aliado,Fk_Detalle_Compra_Aliado_Aliado)
       REFERENCES Detalle_Compra_Aliado(id_detalle_compra_aliado,fk_compra_aliado),
       CONSTRAINT fk_detalle_inventario_metalico FOREIGN KEY (FK_Mineral_Metalico)
       REFERENCES Mineral_Metalico(id_mineral),
       CONSTRAINT fk_detalle_inventario_no_metalico FOREIGN KEY (FK_Mineral_No_Metalico)
       REFERENCES Mineral_NoMetalico(id_mineral),
       CONSTRAINT fk_detalle_inventario_inventario FOREIGN KEY (FK_Inventario)
       REFERENCES Inventario(numero)
       );


CREATE TABLE telefono (
     id_telefono SERIAL, 
     nro_telefono INTEGER NOT NULL UNIQUE,
     fk_empleado INTEGER,
     fk_empresa INTEGER,
     fk_empresa_aliada INTEGER,
     fk_persona INTEGER,
     CONSTRAINT pk_id_telefono PRIMARY KEY (id_telefono),
     CONSTRAINT fk_empleado_telefono FOREIGN KEY (fk_empleado)
     REFERENCES empleado (id_empleado),
     CONSTRAINT fk_empresa_telefono FOREIGN KEY (fk_empresa)
     REFERENCES empresa (id_cliente),
     CONSTRAINT fk_empresa_aliada_telefono FOREIGN KEY (fk_empresa_aliada)
     REFERENCES empresa_aliada (id_empresa_aliada),
     CONSTRAINT fk_persona_telefono FOREIGN KEY (fk_persona)
     REFERENCES persona (id_cliente)
);


CREATE TABLE correo (
     id_correo SERIAL,
     correo_electronico VARCHAR(40) NOT NULL UNIQUE,
     fk_empleado INTEGER,
     fk_empresa INTEGER,
     fk_persona INTEGER,
     CONSTRAINT pk_id_correo PRIMARY KEY (id_correo),
     CONSTRAINT fk_empleado_correo FOREIGN KEY (fk_empleado)
     REFERENCES empleado (id_empleado),
     CONSTRAINT fk_empresa_correo FOREIGN KEY (fk_empresa)
     REFERENCES empresa (id_cliente),
     CONSTRAINT fk_persona_persona FOREIGN KEY (fk_persona)
     REFERENCES persona (id_cliente)
);

CREATE TABLE status_mineral_yacimiento(
     id_status_mineral_yacimiento SERIAL,
     fecha_cambio DATE NOT NULL,
     fk_tipo_status INTEGER,
     fk_mineral_yacimiento INTEGER,
     fk_yacimiento integer,
     CONSTRAINT pk_id_status_mineral_yacimiento PRIMARY KEY (id_status_mineral_yacimiento,fk_tipo_status,
     fk_mineral_yacimiento, fk_yacimiento),
     CONSTRAINT fk_tipo_status_mineral_yacimiento FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status (id_tipo_status),
     CONSTRAINT fk_mineral_yacimiento_status_mineral FOREIGN KEY (fk_mineral_yacimiento, fk_yacimiento)
     REFERENCES mineral_yacimiento (id_mineral_yacimiento, fk_yacimiento)
);

CREATE TABLE status_proyecto (
     id_status_proyecto SERIAL,
     fecha_cambio DATE NOT NULL,
     fk_tipo_status INTEGER,
     fk_proyecto INTEGER,
     CONSTRAINT pk_status_proyecto PRIMARY KEY (id_status_proyecto,fk_tipo_status,fk_proyecto),
     CONSTRAINT fk_tipo_status_proyecto FOREIGN KEY (fk_tipo_status)
     REFERENCES tipo_status (id_tipo_status),
     CONSTRAINT fk_proyecto_status FOREIGN KEY (fk_proyecto)
     REFERENCES proyecto (id_proyecto)
);
create table Status_Yacimiento (
    id_status_yacimiento serial,
    fecha_cambio date not null,
    fk_yacimiento integer,
    fk_tipo_status integer,
    constraint pk_status_yacimiento primary key (id_status_yacimiento, fk_yacimiento, fk_tipo_status),
    constraint fk_status_yacimiento_yacimiento  foreign key (fk_yacimiento)
    references Yacimiento (id_yacimiento),
    constraint fk_tipo_status_yacimiento foreign key (fk_tipo_status)
    references Tipo_Status (id_tipo_status)   
);

create table Status_Etapa_Explotacion (
    id_status_etapa_explotacion serial,
    fecha_cambio date not null,
    fk_etapa_explotacion integer,
    fk_tipo_status integer,
    constraint pk_status_etapa_explotacion primary key (id_status_etapa_explotacion, fk_etapa_explotacion, fk_tipo_status),
    constraint fk_status_etapa_explotacion  foreign key (fk_etapa_explotacion)
    references Etapa_Explotacion (id_etapa),
    constraint fk_tipo_status_etapa_explotacion foreign key (fk_tipo_status)
    references Tipo_Status (id_tipo_status)   
);

create table Status_Compra_Aliado (
    id_status_compra_aliado serial,
    fecha_cambio date not null,
    fk_compra_aliado integer,
    fk_tipo_status integer,
    constraint pk_status_compra_aliado primary key (id_status_compra_aliado, fk_compra_aliado, fk_tipo_status),
    constraint fk_status_compra_aliado  foreign key (fk_compra_aliado)
    references Compra_Aliado (id_compra_aliado),
    constraint fk_tipo_status_compra_aliado foreign key (fk_tipo_status)
    references Tipo_Status (id_tipo_status)   
);

create table Status_Compra_Cliente (
    id_status_compra_cliente serial,
    fecha_cambio date not null,
    fk_compra_cliente integer,
    fk_tipo_status integer,
    constraint pk_status_compra_cliente primary key (id_status_compra_cliente, fk_compra_cliente, fk_tipo_status),
    constraint fk_status_compra_cliente  foreign key (fk_compra_cliente)
    references Compra_Cliente (id_compra_cliente),
    constraint fk_tipo_status_compra_cliente foreign key (fk_tipo_status)
    references Tipo_Status (id_tipo_status)   
);


create table Status_Fase (
    id_status_fase serial,
    fecha_cambio date not null,
    fk_fase integer,
    fk_fase_etapa integer,
    fk_tipo_status integer,
    constraint pk_status_fase primary key (id_status_fase, fk_fase, fk_tipo_status, fk_fase_etapa),
    constraint fk_status_fase foreign key (fk_fase, fk_fase_etapa)
    references Fase (id_fase,  fk_etapa_explotacion),
    constraint fk_tipo_status_fase foreign key (fk_tipo_status)
    references Tipo_Status (id_tipo_status)   
);

