import { FC, useEffect, useState } from 'react';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { localFavorites, strings } from '../../utils';
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  useEffect(() => {
    if (localFavorites.existInFavorites(pokemon.id)) setIsInFavorites(true);
  }, [pokemon.id]);

  return (
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card hoverable css={{ padding: '30px' }}>
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                '/img/no-image.png'
              }
              alt={pokemon.name}
              width="100%"
              height={200}
            />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Text h1 transform="capitalize">
              {pokemon.name}
            </Text>

            <Button
              color="gradient"
              ghost={!isInFavorites}
              onClick={onToggleFavorite}
            >
              {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
            </Button>
          </Card.Header>

          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction="row" display="flex" gap={0}>
              {[
                { sprite: pokemon.sprites.front_default },
                { sprite: pokemon.sprites.back_default },
                { sprite: pokemon.sprites.front_shiny },
                { sprite: pokemon.sprites.back_shiny },
              ].map(({ sprite }) => (
                <Image
                  key={sprite}
                  src={sprite}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              ))}
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
