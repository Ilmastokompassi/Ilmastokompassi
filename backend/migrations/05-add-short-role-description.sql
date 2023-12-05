BEGIN;

ALTER TABLE profiles 
  ADD COLUMN short_description TEXT;

UPDATE profiles SET short_description = 'Ilmastoasiantuntija-hiiri joka osoittaa tilastoja keltaisella taustalla. Tilastotaululla on myös maapallo, jolla on lippis päässä.' WHERE id = 1;
UPDATE profiles SET short_description = 'Mielipidevaikuttaja-pupu sinisellä taustalla, jolla on kädessään kyltti missä ilmaistaan "minä rakastan maapalloa". Maapallolla on baskeri päässä.' WHERE id = 2;
UPDATE profiles SET short_description = 'Kestävän elämäntavan etsijä-ilves oranssilla taustalla, jonka puhekuplassa on maapallo jolla on cowboy-hattu päässä.' WHERE id = 3;
UPDATE profiles SET short_description = 'Eettinen kuluttaja-kettu vihreällä taustalla, joka osoittaa hänen t-paitaan jossa ilmaistaan "minä rakastan maapalloa". Maapallolla on pipo päässä.' WHERE id = 4;

COMMIT;