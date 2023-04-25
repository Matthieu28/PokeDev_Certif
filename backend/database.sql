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
    regionForm INT NOT NULL DEFAULT 1,
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
    createdAccount DATE NOT NULL,
    gold INT NOT NULL DEFAULT 10000000,
    totalGold INT NOT NULL DEFAULT 10000000,
    totalBallBought INT NOT NULL DEFAULT 0,
    totalMasterBallBought INT NOT NULL DEFAULT 0,
    totalBallSent INT NOT NULL DEFAULT 0,
    totalCaught INT NOT NULL DEFAULT 0,
    totalCaughtC INT NOT NULL DEFAULT 0,
    totalCaughtR INT NOT NULL DEFAULT 0,
    totalCaughtSR INT NOT NULL DEFAULT 0,
    totalCaughtL INT NOT NULL DEFAULT 0,
    totalCaughtM INT NOT NULL DEFAULT 0,
    totalCaughtS INT NOT NULL DEFAULT 0,
    totalXp INT NOT NULL DEFAULT 0,
    totalAllXp INT NOT NULL DEFAULT 0,
    xpLimit INT NOT NULL DEFAULT 100,
    levelAccount INT NOT NULL DEFAULT 0,
    roleID INT DEFAULT 1,
    avatarID INT DEFAULT 1,
    FOREIGN KEY (roleId) REFERENCES role(id),
    FOREIGN KEY (avatarId) REFERENCES avatar(id)
);

CREATE TABLE IF NOT EXISTS bagpokemon (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    isFavorite TINYINT NOT NULL DEFAULT false,
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
  INSERT INTO bagBall (userId, pokeballId, quantity)
  VALUES (NEW.id, 1, 20);
END;

INSERT INTO role (name) VALUES ('Player'), ('VIP'), ('Admin');

INSERT INTO pokeball (nameBall, url, rate, price) VALUES 
("PokeBall", "https://www.pokepedia.fr/images/0/07/Miniature_Pok%C3%A9_Ball_HOME.png", 1, 100), 
("GreatBall", "https://www.pokepedia.fr/images/2/23/Miniature_Super_Ball_HOME.png", 1.5, 375),
("UltraBall", "https://www.pokepedia.fr/images/a/a2/Miniature_Hyper_Ball_HOME.png", 2, 500),
("MasterBall", "https://www.pokepedia.fr/images/3/34/Miniature_Master_Ball_HOME.png", 255, 100000);

INSERT INTO avatar (url, name) VALUES 
("https://archives.bulbagarden.net/media/upload/9/9a/Spr_B2W2_Red.png", "Red"), 
("https://archives.bulbagarden.net/media/upload/f/f4/Spr_B2W2_Blue.png", "Blue");

INSERT INTO tier (nameTier, rate, color) VALUES 
("Commun", 1, "#56D3FF"), 
("Rare", 2, "#FF6C00"), 
("Super Rare", 3, "#FFF000"), 
("Legendary", 4, "#FF00FF"),
("Mega", 5, "#00F204"),
("Shiny", 6, "#9B00FF");

INSERT INTO pokemon (pokedexId, url, name, tierID) VALUES
(1, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_001__xy.gif", "Bulbasaur", 1),
(1, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__001__xy.gif", "Bulbasaur", 6),
(2, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__002__xy.gif", "Ivysaur", 2),
(2, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_002__xy.gif", "Ivysaur", 6),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__003_m_xy.gif", "Venusaur", 3),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_003_m_xy.gif", "Venusaur", 6),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__003-mega__xy.gif", "Mega Venusaur", 5),
(3, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_003-mega__xy.gif", "Mega Venusaur", 6),
(4, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__004__xy.gif", "Charmander", 1),
(4, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_004__xy.gif", "Charmander", 6),
(5, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__005__xy.gif", "Charmeleon", 2),
(5, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_005__xy.gif", "Charmeleon", 6),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006__xy.gif", "Charizard", 3),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_006__xy.gif", "Charizard", 6),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006-mega-x__xy.gif", "Mega Charizard X", 5),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_006-mega-x__xy.gif", "Mega Charizard X", 6),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__006-mega-y__xy.gif", "Mega Charizard Y", 5),
(6, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_006-mega-y__xy.gif", "Mega Charizard Y", 6),
(7, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__007__xy.gif", "Squirtle", 1),
(7, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_007__xy.gif", "Squirtle", 6),
(8, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__008__xy.gif", "Wartortle", 2),
(8, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_008__xy.gif", "Wartortle", 6),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__009__xy.gif", "Blastoise", 3),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_009__xy.gif", "Blastoise", 6),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__009-mega__xy.gif", "Mega Blastoise", 5),
(9, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_009-mega__xy.gif", "Mega Blastoise", 6),
(10, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__010__xy.gif", "Caterpie", 1),
(11, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__011__xy.gif", "Metapod", 2),
(12, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__012_f_xy.gif", "Butterfree", 3),
(13, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__013__xy.gif", "Weedle", 1),
(14, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__014__xy.gif", "Kakuna", 2),
(15, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__015__xy.gif", "Beedrill", 3),
(15, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__015-mega__oras.gif", "Mega Beedrill", 5),
(16, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__016__xy.gif", "Pidgey", 1),
(17, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__017__xy.gif", "Pidgeotto", 2),
(18, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__018__xy.gif", "Pidgeot", 3),
(18, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__018-mega__oras.gif", "Mega Pidgeot", 5),
(19, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__019_f_xy.gif", "Rattata", 1),
(20, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__020_f_xy.gif", "Raticate", 2),
(21, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__021__xy.gif", "Spearow", 1),
(22, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__022__xy.gif", "Fearow", 2),
(23, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__023__xy.gif", "Ekans", 1),
(24, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__024__xy.gif", "Arbok", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025_m_xy.gif", "Pikachu", 2),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-rock-star__oras.gif", "Pikachu Rock Star", 3),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-belle__oras.gif", "Pikachu Belle", 3),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-pop-star__oras.gif", "Pikachu Pop Star", 3),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-phd__oras.gif", "Pikachu Ph. D.", 3),
(25, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__025-libre__oras.gif", "Pikachu Libre", 3),
(26, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__026_f_xy.gif", "Raichu", 3),
(27, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__027__xy.gif", "Sandshrew", 1),
(28, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__028__xy.gif", "Sandslash", 2),
(29, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__029__xy.gif", "Nidoran ♀", 1),
(30, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__030__xy.gif", "Nidorina", 2),
(31, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__031__xy.gif", "Nidoqueen", 3),
(32, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__032__xy.gif", "Nidoran ♂", 1),
(33, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__033__xy.gif", "Nidorino", 2),
(34, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__034__xy.gif", "Nidoking", 3),
(35, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__035__xy.gif", "Clefairy", 1),
(36, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__036__xy.gif", "Clefable", 2),
(37, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__037__xy.gif", "Vulpix", 1),
(38, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__038__xy.gif", "Ninetales", 2),
(39, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__039__xy.gif", "Jigglypuff", 1),
(40, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__040__xy.gif", "Wigglytuff", 2),
(41, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__041_m_xy.gif", "Zubat", 1),
(42, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__042_m_xy.gif", "Golbat", 2),
(43, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__043__xy.gif", "Oddish", 1),
(44, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__044_m_xy.gif", "Gloom", 2),
(45, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__045_m_xy.gif", "Vileplume", 3),
(46, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__046__xy.gif", "Paras", 1),
(47, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__047__xy.gif", "Parasect", 2),
(48, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__048__xy.gif", "Venonat", 1),
(49, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__049__xy.gif", "Venomoth", 2),
(50, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__050__xy.gif", "Diglett", 1),
(51, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__051__xy.gif", "Dutrio", 2),
(52, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__052__xy.gif", "Meowth", 1),
(53, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__053__xy.gif", "Persian", 2),
(54, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__054__xy.gif", "Psyduck", 1),
(55, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__055__xy.gif", "Golduck", 2),
(56, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__056__xy.gif", "Mankey", 1),
(57, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__057__xy.gif", "Primeape", 2),
(58, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__058__xy.gif", "Growlithe", 1),
(59, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__059__xy.gif", "Arcanine", 3),
(60, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__060__xy.gif", "Poliwag", 1),
(61, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__061__xy.gif", "Poliwhirl", 2),
(62, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__062__xy.gif", "Poliwrath", 3),
(63, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__063__xy.gif", "Abra", 1),
(64, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__064_m_xy.gif", "Kadabra", 2),
(65, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__065_m_xy.gif", "Alakazam", 3),
(65, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__065-mega__xy.gif", "Mega Alakazam", 5),
(66, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__066__xy.gif", "Machop", 1),
(67, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__067__xy.gif", "Machoke", 2),
(68, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__068__xy.gif", "Machamp", 3),
(69, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__069__xy.gif", "Bellsprout", 1),
(70, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__070__xy.gif", "Weepinbell", 2),
(71, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__071__xy.gif", "Victreelbel", 3),
(72, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__072__xy.gif", "Tentacool", 1),
(73, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__073__xy.gif", "Tentacruel", 2),
(74, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__074__xy.gif", "Geodule", 1),
(75, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__075__xy.gif", "Graveler", 2),
(76, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__076__xy.gif", "Golem", 3),
(77, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__077__xy.gif", "Ponyta", 1),
(78, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__078__xy.gif", "Rapidash", 3),
(79, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__079__xy.gif", "Slowpoke", 1),
(80, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__080__xy.gif", "Slowbro", 2),
(80, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__080-mega__oras.gif", "Mega Slowbro", 5),
(81, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__081__xy.gif", "Magnemite", 1),
(82, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__082__xy.gif", "magneton", 2),
(83, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__083__xy.gif", "Farfetch'd", 2),
(84, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__084_m_xy.gif", "Doduo", 1),
(85, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__085_m_xy.gif", "Dodrio", 2),
(86, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__086__xy.gif", "Seel", 1),
(87, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__087__xy.gif", "Dewgong", 2),
(88, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__088__xy.gif", "Grimer", 1),
(89, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__089__xy.gif", "Muk", 2),
(90, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__090__xy.gif", "Shellder", 1),
(91, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__091__xy.gif", "Cloyster", 2),
(92, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__092__xy.gif", "Gastly", 1),
(93, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__093__xy.gif", "Haunter", 2),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__094__xy.gif", "Gengar", 3),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__094-mega__xy.gif", "Mega Gengar", 5),
(94, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_094-mega__xy.gif", "Mega Gengar", 6),
(95, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__095__xy.gif", "Onyx", 2),
(96, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__096__xy.gif", "Drowzee", 1),
(97, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__097_m_xy.gif", "Hypno", 2),
(98, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__098__xy.gif", "Krabby", 1),
(99, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__099__xy.gif", "Kingler", 2),
(100, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__100__xy.gif", "Voltorb", 1),
(101, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__101__xy.gif", "Electrode", 2),
(102, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__102__xy.gif", "Exeggcute", 1),
(103, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__103__xy.gif", "Exeggutor", 3),
(104, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__104__xy.gif", "Cubone", 1),
(105, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__105__xy.gif", "Marowak", 2),
(106, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__106__xy.gif", "Hitmonlee", 2),
(107, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__107__xy.gif", "Hitmonchan", 2),
(108, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__108__xy.gif", "Lickitung", 2),
(109, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__109__xy.gif", "Koffing", 1),
(110, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__110__xy.gif", "Weezing", 2),
(111, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__111_m_xy.gif", "Rhyhorn", 1),
(112, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__112_m_xy.gif", "Rhydon", 2),
(113, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__113__xy.gif", "Chansey", 2),
(114, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__114__xy.gif", "Tangela", 1),
(115, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__115__xy.gif", "Kangaskhan", 2),
(115, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__115-mega__xy.gif", "Mega Kangaskhan", 5),
(116, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__116__xy.gif", "Horsea", 1),
(117, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__117__xy.gif", "Seadra", 2),
(118, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__118_m_xy.gif", "Goldeen", 1),
(119, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__119_m_xy.gif", "Seaking", 2),
(120, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__120__xy.gif", "Staryu", 1),
(121, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__121__xy.gif", "Starmie", 2),
(122, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__122__xy.gif", "Mr.Mime", 2),
(123, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__123_m_xy.gif", "Scyther", 2),
(124, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__124__xy.gif", "Jynx", 2),
(125, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__125__xy.gif", "Electabuzz", 2),
(126, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__126__xy.gif", "Magmar", 2),
(127, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__127__xy.gif", "Pinsir", 2),
(127, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__127-mega__xy.gif", "Mega Pinsir", 5),
(128, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__128__xy.gif", "Tauros", 2),
(129, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__129_f_xy.gif", "Magikarp", 1),
(129, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_129_m_xy.gif", "Magikarp", 6),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__130_f_xy.gif", "Gyarados", 3),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_130_m_xy.gif", "Gyarados", 6),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__130-mega__xy.gif", "Mega Gyarados", 5),
(130, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_130-mega__xy.gif", "Mega Gyarados", 6),
(131, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__131__xy.gif", "Lapras", 3),
(132, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__132__xy.gif", "Ditto", 3),
(132, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_132__xy.gif", "Ditto", 6),
(133, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__133__xy.gif", "Eevee", 2),
(134, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__134__xy.gif", "Vaporeon", 3),
(135, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__135__xy.gif", "Jolteon", 3),
(136, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__136__xy.gif", "Flareon", 3),
(137, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__137__xy.gif", "Porygon", 2),
(138, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__138__xy.gif", "Omanyte", 1),
(139, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__139__xy.gif", "Omastar", 2),
(140, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__140__xy.gif", "Kabuto", 1),
(141, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__141__xy.gif", "Kabutops", 2),
(142, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__142__xy.gif", "Aerodactyl", 3),
(142, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__142-mega__xy.gif", "Mega Aerodactyl", 5),
(143, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__143__xy.gif", "Snorlax", 3),
(144, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__144__xy.gif", "Articuno", 4),
(144, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_144__xy.gif", "Articuno", 6),
(145, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__145__xy.gif", "Zapdos", 4),
(145, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_145__xy.gif", "Zapdos", 6),
(146, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__146__xy.gif", "Moltres", 4),
(146, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_146__xy.gif", "Moltres", 6),
(147, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__147__xy.gif", "Dratini", 1),
(147, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_147__xy.gif", "Dratini", 6),
(148, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__148__xy.gif", "Dragonair", 2),
(148, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_148__xy.gif", "Dragonair", 6),
(149, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__149__xy.gif", "Dragonite", 3),
(149, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_149__xy.gif", "Dragonite", 6),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150__xy.gif", "Mewtwo", 4),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_150__xy.gif", "Mewtwo", 6),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150-mega-x__xy.gif", "Mega Mewtwo X", 4),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_150-mega-x__xy.gif", "Mega Mewtwo X", 6),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__150-mega-y__xy.gif", "Mega Mewtwo Y", 4),
(150, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_150-mega-y__xy.gif", "Mega Mewtwo Y", 6),
(151, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__151__xy.gif", "Mew", 4),
(151, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_151__xy.gif", "Mew", 6),
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
(208, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_208-mega__oras.gif", "Mega Steelix", 6),
(243, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__243__xy.gif", "Raikou", 4),
(244, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__244__xy.gif", "Entei", 4),
(245, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__245__xy.gif", "Suicune", 4),
(246, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__246__xy.gif", "Larvitar", 1),
(247, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__247__xy.gif", "Pupitar", 2),
(248, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__248__xy.gif", "Tyranitar", 3),
(248, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__248-mega__xy.gif", "Mega Tyranitar", 5),
(249, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__249__xy.gif", "Lugia", 4),
(250, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__250__xy.gif", "Ho-Oh", 4),
(251, "https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__251__xy.gif", "Celebi", 4),
(382, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_382-primal__oras.gif", "Primal Kyogre", 6),
(383, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_383-primal__oras.gif", "Primal Groudon", 6),
(384, "https://www.pokencyclopedia.info/sprites/3ds/ani_6_shiny/3ani_-S_384-mega__oras.gif", "Mega Rayquaza", 6),
(718, "https://play.pokemonshowdown.com/sprites/xyani-shiny/zygarde-complete.gif", "Zygarde 100%", 6);
