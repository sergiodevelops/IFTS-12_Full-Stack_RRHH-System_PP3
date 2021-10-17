CREATE TABLE `usuarios` (
     `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
     `userType` tinyint(3) NOT NULL,
     `userFullname` varchar(50) NOT NULL,
     `username` char(20) NOT NULL,
     `password` varchar(35) NOT NULL,
     `startDate` varchar(10) NOT NULL,
     PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
