CREATE TABLE IF NOT EXISTS role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS tier (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nameTier VARCHAR(25),
  rate INT,
  color VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS pokemon (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pokedexid INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(25) NOT NULL,
    tierID INT DEFAULT 1,
    FOREIGN KEY (tierId) REFERENCES tier(id)
);

CREATE TABLE IF NOT EXISTS avatar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    name VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    roleID INT DEFAULT 1,
    avatarID INT DEFAULT 1,
    FOREIGN KEY (roleId) REFERENCES role(id),
    FOREIGN KEY (avatarId) REFERENCES avatar(id)
);

CREATE TABLE IF NOT EXISTS bagpokemon (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    pokemonId INT NOT NULL,
    FOREIGN KEY (pokemonId) REFERENCES pokemon (id)
);

CREATE TABLE IF NOT EXISTS pokeball (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nameBall VARCHAR(25) NOT NULL,
  url VARCHAR(255) NOT NULL,
  rate FLOAT NOT NULL,
  price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS bagBall (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id),
    pokeballId INT NOT NULL,
    FOREIGN KEY (pokeballId) REFERENCES pokeball (id),
    quantity INT NOT NULL DEFAULT 0,
    CHECK (quantity >= 0)
);

CREATE TRIGGER tr_user_created
AFTER INSERT
ON user FOR EACH ROW
BEGIN
  -- Insérer un nouvel enregistrement dans la table bagBall avec les quantités appropriées
  INSERT INTO bagBall (userId, pokeballId, quantity)
  VALUES (NEW.id, 1, 20),
         (NEW.id, 2, 0),
         (NEW.id, 3, 0),
         (NEW.id, 4, 0);
END;

CREATE TRIGGER tr_pokeball_created
AFTER INSERT
ON pokeball FOR EACH ROW
BEGIN
  -- Récupérer tous les "userId" distincts de la table "user"
  DECLARE done INT DEFAULT 0;
  DECLARE userId INT;
  DECLARE cur CURSOR FOR SELECT DISTINCT id FROM user;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  -- Ouvrir le curseur pour récupérer les "userId"
  OPEN cur;

  -- Parcourir les "userId" et insérer un enregistrement dans la table "bagBall" avec une quantité de 0 pour chaque "userId"
  read_loop: LOOP
    FETCH cur INTO userId;
    IF done THEN
      LEAVE read_loop;
    END IF;
    INSERT INTO bagBall (userId, pokeballId, quantity) VALUES (userId, NEW.id, 0);
  END LOOP;

  -- Fermer le curseur
  CLOSE cur;
END;

INSERT INTO role (name) VALUES ("basic"), ("vip"), ("admin");

INSERT INTO pokeball (nameBall, url, rate, price) VALUES 
("PokeBall", "https://www.pokepedia.fr/images/0/07/Miniature_Pok%C3%A9_Ball_HOME.png", 1, 100), 
("SuperBall", "https://www.pokepedia.fr/images/2/23/Miniature_Super_Ball_HOME.png", 1.5, 250),
("HyperBall", "https://www.pokepedia.fr/images/a/a2/Miniature_Hyper_Ball_HOME.png", 2, 700),
("MasterBall", "https://www.pokepedia.fr/images/3/34/Miniature_Master_Ball_HOME.png", 255, 100000);

INSERT INTO avatar (url, name) VALUES ("https://archives.bulbagarden.net/media/upload/9/9a/Spr_B2W2_Red.png", "Red"), ("https://archives.bulbagarden.net/media/upload/f/f4/Spr_B2W2_Blue.png", "Blue");

INSERT INTO tier (nameTier, rate, color) VALUES ("Commun", 1, "#56D3FF"), ("Rare", 2, "#FF6C00"), ("Super Rare", 3, "#FFF000"), ("Legendary", 4, "#FF00FF"), ("Shiny", 5, "#9B00FF");

INSERT INTO pokemon (pokedexId, url, name, tierID) VALUES
(1, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__001__xy.gif", "Bulbasaur", 1),
(2, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__002__xy.gif", "Ivysaur", 2),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__003_m_xy.gif", "Venusaur", 3),
(4, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__004__xy.gif", "Charmander", 1),
(5, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__005__xy.gif", "Charmeleon", 2),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006__xy.gif", "Charizard", 3),
(7, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__007__xy.gif", "Squirtle", 1),
(8, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__008__xy.gif", "Wartortle", 2),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__009__xy.gif", "Blastoise", 3),
(132, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__132__xy.gif", "Ditto", 3),
(133, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__133__xy.gif", "Eevee", 2),
(134, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__134__xy.gif", "Vaporeon", 3),
(135, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__135__xy.gif", "Jolteon", 3),
(136, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__136__xy.gif", "Flareon", 3),
(144, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__144__xy.gif", "Articuno", 4),
(145, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__145__xy.gif", "Zapdos", 4),
(146, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__146__xy.gif", "Moltres", 4),
(132, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_132__xy.gif", "Ditto", 5),
(208, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_208-mega__oras.gif", "Mega Steelix", 5),
(382, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_382-primal__oras.gif", "Primal Kyogre", 5),
(383, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_383-primal__oras.gif", "Primal Groudon", 5),
(384, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_384-mega__oras.gif", "Mega Rayquaza", 5),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_094-mega__xy.gif", "Mega Gengar", 5),
(718, "https://play.pokemonshowdown.com/sprites/xyani-shiny/zygarde-complete.gif", "Zygarde 100%", 5),
(10, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__010__xy.gif", "Caterpie", 1),
(11, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__011__xy.gif", "Metapod", 2),
(12, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__012_f_xy.gif", "Butterfree", 3),
(13, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__013__xy.gif", "Weedle", 1),
(14, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__014__xy.gif", "Kakuna", 2),
(15, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__015__xy.gif", "Beedrill", 3),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__003-mega__xy.gif", "Mega Venusaur", 4),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006-mega-x__xy.gif", "Mega Charizard X", 4),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006-mega-y__xy.gif", "Mega Charizard Y", 4),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__009-mega__xy.gif", "Mega Blastoise", 4),
(15, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__015-mega__oras.gif", "Mega Beedrill", 4),
(16, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__016__xy.gif", "Pidgey", 1),
(17, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__017__xy.gif", "Pidgeotto", 2),
(18, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__018__xy.gif", "Pidgeot", 3),
(18, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__018-mega__oras.gif", "Mega Pidgeot", 4),
(19, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__019_f_xy.gif", "Rattata", 1),
(20, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__020_f_xy.gif", "Raticate", 2),
(21, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__021__xy.gif", "Spearow", 1),
(22, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__022__xy.gif", "Fearow", 2),
(23, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__023__xy.gif", "Ekans", 1),
(24, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__024__xy.gif", "Arbok", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025_m_xy.gif", "Pikachu", 1),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-rock-star__oras.gif", "Pikachu Rock Star", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-belle__oras.gif", "Pikachu Belle", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-pop-star__oras.gif", "Pikachu Pop Star", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-phd__oras.gif", "Pikachu Ph. D.", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-libre__oras.gif", "Pikachu Libre", 2),
(26, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__026_f_xy.gif", "Raichu", 2),
(27, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__027__xy.gif", "Sandshrew", 1),
(28, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__028__xy.gif", "Sandslash", 2),
(29, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__029__xy.gif", "Nidoran ♀", 1),
(30, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__030__xy.gif", "Nidorina", 2),
(31, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__031__xy.gif", "Nidoqueen", 3),
(32, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__032__xy.gif", "Nidoran ♂", 1),
(33, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__033__xy.gif", "Nidorino", 2),
(34, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__034__xy.gif", "Nidoking", 3),
(92, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__092__xy.gif", "Gastly", 1),
(93, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__093__xy.gif", "Haunter", 2),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__094__xy.gif", "Gengar", 3),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__094-mega__xy.gif", "Mega Gengar", 4),
(129, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__129_f_xy.gif", "Magikarp", 1),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__130_f_xy.gif", "Gyarados", 3),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__130-mega__xy.gif", "Mega Gyarados", 4),
(131, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__131__xy.gif", "Lapras", 3),
(142, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__142__xy.gif", "Aerodactyl", 3),
(142, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__142-mega__xy.gif", "Mega Aerodactyl", 4),
(147, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__147__xy.gif", "Dratini", 1),
(148, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__148__xy.gif", "Dragonair", 2),
(149, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__149__xy.gif", "Dragonite", 3),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150__xy.gif", "Mewtwo", 4),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150-mega-x__xy.gif", "Mega Mewtwo X", 4),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150-mega-y__xy.gif", "Mega Mewtwo Y", 4),
(151, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__151__xy.gif", "Mew", 4),
(152, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__152__xy.gif", "Chikorita", 1),
(153, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__153__xy.gif", "Bayleef", 2),
(154, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__154_f_xy.gif", "Meganium", 3),
(155, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__155__xy.gif", "Cyndaquil", 1),
(156, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__156__xy.gif", "Quilava", 2),
(157, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__157__xy.gif", "Typhlosion", 3),
(158, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__158__xy.gif", "Totodile", 1),
(159, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__159__xy.gif", "Croconaw", 2),
(160, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__160__xy.gif", "Feraligatr", 3),
(169, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__169__xy.gif", "Crobat", 3),
(196, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__196__xy.gif", "Espeon", 3),
(197, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__197__xy.gif", "Umbreon", 3),
(243, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__243__xy.gif", "Raikou", 4),
(244, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__244__xy.gif", "Entei", 4),
(245, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__245__xy.gif", "Suicune", 4),
(246, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__246__xy.gif", "Larvitar", 1),
(247, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__247__xy.gif", "Pupitar", 2),
(248, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__248__xy.gif", "Tyranitar", 3),
(248, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__248-mega__xy.gif", "Mega Tyranitar", 4),
(249, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__249__xy.gif", "Lugia", 4),
(250, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__250__xy.gif", "Ho-Oh", 4),
(251, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__251__xy.gif", "Celebi", 4);
