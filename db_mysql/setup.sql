CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del usuario',
    `userType` tinyint(3) NOT NULL COMMENT 'Si el usuario es un postulante =1 , o es un solicitante = 2 , o es Administrativo = 3',
    `userFullname` char(20) NOT NULL COMMENT 'Alias con el que ingresa al sistema',
    `password` varchar(35) NOT NULL COMMENT 'Clave necesaria para ingresar al sistema',
    `startDate` date DEFAULT NULL COMMENT 'Fecha en que se dió de alta el usuario',
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Usuarios que pueden ingresar al sistema.  Postulantes, Solicitantes y Administradores';
