CREATE TABLE sports_cars (
  id TEXT PRIMARY KEY NOT NULL, make TEXT NOT NULL, model TEXT NOT NULL, summary TEXT NOT NULL,
  price_band TEXT NOT NULL, body_style TEXT NOT NULL, seats INTEGER NOT NULL, powertrain TEXT NOT NULL,
  character TEXT NOT NULL, daily_score INTEGER NOT NULL, track_score INTEGER NOT NULL
);
CREATE TABLE saved_cars (
  identity_id TEXT NOT NULL, car_id TEXT NOT NULL REFERENCES sports_cars(id) ON DELETE CASCADE,
  saved_at TEXT NOT NULL, PRIMARY KEY(identity_id, car_id)
);
INSERT INTO sports_cars VALUES
('mazda-mx5','Mazda','MX-5','Light, approachable and rewarding at road speeds.','accessible','convertible',2,'petrol','precision',8,6),
('toyota-gr86','Toyota','GR86','A playful rear-drive coupe with usable everyday manners.','accessible','coupe',4,'petrol','precision',7,8),
('porsche-911','Porsche','911 Carrera','A benchmark sports car balancing pace, polish and practicality.','serious','coupe',4,'petrol','touring',9,9),
('lotus-emira','Lotus','Emira','Mid-engine theatre with communicative steering and dramatic form.','serious','coupe',2,'petrol','precision',5,9),
('ferrari-296','Ferrari','296 GTB','Explosive hybrid performance with extraordinary agility.','exotic','coupe',2,'hybrid','theatre',5,10),
('porsche-taycan','Porsche','Taycan Turbo','Electric performance with genuine sports-car responses.','exotic','coupe',4,'electric','touring',10,8);
